# Markdown 文档规范

由 [markdownlint](https://github.com/DavidAnson/markdownlint) 校验。本仓库共享配置：**`markdownlint-config`**（`packages/markdownlint-config/index.json`）。

## 安装

```bash
pnpm add -D markdownlint-config markdownlint markdownlint-cli2
```

## 使用

根目录 `.markdownlint.json`：

```json
{
  "extends": "./packages/markdownlint-config/index.json"
}
```

或发布后：

```json
{
  "extends": "markdownlint-config"
}
```

## 校验与修复

```bash
pnpm exec markdownlint-cli2 "**/*.md"
pnpm exec markdownlint-cli2 "**/*.md" --fix
```

部分规则无自动修复，需手改。配置项说明见 `packages/markdownlint-config/README.md`。
