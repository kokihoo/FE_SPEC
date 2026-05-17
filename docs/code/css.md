# CSS 编码规范

样式相关约定由 **stylelint** 校验。本仓库维护共享包 **`stylint-config`**（目录名 `packages/stylint-config/`）。

## 安装（业务项目）

```bash
pnpm add -D stylelint stylint-config
```

## 使用

在 `.stylelintrc` 或 `stylelint.config.js` 中继承本仓库发布的配置（包名以 `package.json` 为准）：

```js
module.exports = {
  extends: ['stylint-config'],
};
```

详细说明见仓库内 `packages/stylint-config/README.md`。
