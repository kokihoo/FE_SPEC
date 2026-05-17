# JavaScript 编码规范

本仓库通过 **ESLint** 约束 JS 代码风格与常见错误（规划中：`encode-fe-eslint-config`、`encode-fe-eslint-plugin`）。

## 与工程的关系

| 规范领域 | 工具 | 本仓库 npm 包 |
|----------|------|---------------|
| JS / TS / Node | ESLint | 规划中 |

业务项目接入后，通常由 **`encode-fe-lint init`** 生成 `.eslintrc.js`，并在 **pre-commit** 阶段对变更文件执行扫描（见 [Git 提交规范](/commit/git)）。

> 详细规则条目待补充。
