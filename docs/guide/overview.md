# 工程总览

本仓库 **fe-spec** 是 **pnpm + Lerna monorepo**：用 **VuePress（`docs/`）** 写可读规范，并产出 **npm 规则包 + 脚手架 CLI**。

>语义上：推荐 = 良好实践（绿），强制 = 必须遵守（紫），参考 = 延伸阅读(蓝)
::: 推荐 #
:::
::: 强制 #
:::
::: 参考 #
:::

## 规范与工具对照

| 规范领域 | 工具 | 本仓库 npm 包 |
|----------|------|---------------|
| JS / TS / Node | ESLint | 规划中（见 [集成扩展 / ESLint](/npm/eslint)） |
| CSS | stylelint | [stylint-config](/code/css) |
| Git 提交说明 | commitlint | [commitlint-config](/commit/git) |
| Markdown 文档 | markdownlint | [markdownlint-config](/md/markdown) |
| 一键接入 | encode-fe-lint | [CLI](/npm/cli)（规划中） |

**规范** = 文档约定 + 各包规则；**落地** = 业务项目装包、写配置或用 CLI 生成配置 + Git 钩子。
