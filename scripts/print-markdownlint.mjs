/**
 * 处理流程（顺序有原因）：
 * 1. 解析仓库根：readConfig / 动态 import rules 都依赖「当前工作目录」与可预期的绝对路径。
 * 2. 确保 full-config 存在：writeFileSync 要求父目录已存在；mkdirSync(..., { recursive: true })
 *    在「无则建、有则不动」，因此放在「写文件之前」、合并逻辑之后或之前均可；这里在写盘前
 *    显式调用一次，语义即「要落盘了，先保证目录在」。
 * 3. readConfig：只合并 extends 链，得到磁盘上的「文件级合并配置」。
 * 4. getEffectiveConfig + ruleList：与引擎一致，把 default、别名键展开为每条 MDxxx 的
 *    enabled / severity / options（options 为空对象表示未在 JSON 覆盖，默认值在规则源码里）。
 */
import { getVersion } from 'markdownlint';
import { readConfig } from 'markdownlint/sync';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
process.chdir(root);

/**
 * 若不存在则创建 `full-config`（及中间路径）；已存在则不做任何事。
 * 必须在首次 writeFileSync 之前调用，否则会 ENOENT。
 * @param {string} dir 绝对路径
 */
function ensureFullConfigDir(dir) {
  mkdirSync(dir, { recursive: true });
}

/**
 * @param {import('markdownlint').Rule[]} ruleList
 * @returns {Object.<string, string[]>}
 */
function mapAliasToRuleNames(ruleList) {
  /** @type {Object.<string, string[]>} */
  const aliasToRuleNames = {};
  for (const rule of ruleList) {
    const ruleName = rule.names[0].toUpperCase();
    for (const name of rule.names) {
      aliasToRuleNames[name.toUpperCase()] = [ ruleName ];
    }
    for (const tag of rule.tags) {
      const tagUpper = tag.toUpperCase();
      const ruleNames = aliasToRuleNames[tagUpper] || [];
      ruleNames.push(ruleName);
      aliasToRuleNames[tagUpper] = ruleNames;
    }
  }
  return aliasToRuleNames;
}

/**
 * @param {import('markdownlint').Rule[]} ruleList
 * @param {import('markdownlint').Configuration} config
 * @param {Object.<string, string[]>} aliasToRuleNames
 */
function getEffectiveConfig(ruleList, config, aliasToRuleNames) {
  let ruleDefaultEnable = true;
  /** @type {'error' | 'warning'} */
  let ruleDefaultSeverity = 'error';
  Object.entries(config).every(([ key, value ]) => {
    if (key.toUpperCase() === 'DEFAULT') {
      ruleDefaultEnable = !!value;
      if (value === 'warning') {
        ruleDefaultSeverity = 'warning';
      }
      return false;
    }
    return true;
  });
  /** @type {import('markdownlint').Configuration} */
  const effectiveConfig = {};
  /** @type {Map<string, boolean>} */
  const rulesEnabled = new Map();
  /** @type {Map<string, 'error' | 'warning'>} */
  const rulesSeverity = new Map();
  const emptyObject = Object.freeze({});
  for (const ruleName of ruleList.map((rule) => rule.names[0].toUpperCase())) {
    effectiveConfig[ruleName] = emptyObject;
    rulesEnabled.set(ruleName, ruleDefaultEnable);
    rulesSeverity.set(ruleName, ruleDefaultSeverity);
  }
  for (const [ key, value ] of Object.entries(config)) {
    const keyUpper = key.toUpperCase();
    let enabled = false;
    /** @type {'error' | 'warning'} */
    let severity = 'error';
    let effectiveValue = {};
    if (value) {
      if (value instanceof Object) {
        const valueObject = value;
        enabled = (valueObject.enabled === undefined) ? true : !!valueObject.enabled;
        severity = (valueObject.severity === 'warning') ? 'warning' : 'error';
        effectiveValue = Object.fromEntries(
          Object.entries(value).filter(
            ([ k ]) => (k !== 'enabled') && (k !== 'severity')
          )
        );
      } else {
        enabled = true;
        severity = (value === 'warning') ? 'warning' : 'error';
      }
    }
    for (const ruleName of (aliasToRuleNames[keyUpper] || [])) {
      Object.freeze(effectiveValue);
      effectiveConfig[ruleName] = effectiveValue;
      rulesEnabled.set(ruleName, enabled);
      rulesSeverity.set(ruleName, severity);
    }
  }
  return {
    effectiveConfig,
    rulesEnabled,
    rulesSeverity
  };
}

const outDir = resolve(root, 'full-config');
const fileMergedPath = join(outDir, 'markdownlint-file-merged.json');
const effectivePath = join(outDir, 'markdownlint-effective-rules.json');

try {
  const rulesPath = join(root, 'node_modules', 'markdownlint', 'lib', 'rules.mjs');
  const { default: ruleList } = await import(pathToFileURL(rulesPath).href);

  // 内存中完成「extends 合并」与「规则生效展开」，不依赖输出目录是否已存在
  const fileMerged = readConfig(resolve(root, '.markdownlint.json'));
  const alias = mapAliasToRuleNames(ruleList);
  const { effectiveConfig, rulesEnabled, rulesSeverity } = getEffectiveConfig(
    ruleList,
    fileMerged,
    alias
  );

  /** @type {Record<string, unknown>} */
  const rulesEffective = {};
  for (const rule of ruleList) {
    const id = rule.names[0].toUpperCase();
    const opts = effectiveConfig[id];
    rulesEffective[id] = {
      aliases: rule.names.slice(1),
      enabled: rulesEnabled.get(id),
      severity: rulesSeverity.get(id),
      options: opts && typeof opts === 'object' ? { ...opts } : opts
    };
  }

  const effectiveDoc = {
    _note:
      'options 来自配置合并；空对象表示未在 JSON 中覆盖该规则参数，' +
      '各字段在规则实现内的默认值见对应版本 doc/Rules.md。' +
      '逻辑与 markdownlint 内部 getEffectiveConfig 一致。',
    markdownlintVersion: getVersion(),
    rules: rulesEffective
  };

  // 写盘前保证目录存在：无则新建 full-config，有则直接写入
  ensureFullConfigDir(outDir);
  writeFileSync(fileMergedPath, JSON.stringify(fileMerged, null, 2), 'utf8');
  writeFileSync(effectivePath, JSON.stringify(effectiveDoc, null, 2), 'utf8');

  console.log('OK file-merged:', fileMergedPath);
  console.log('OK effective: ', effectivePath);
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
