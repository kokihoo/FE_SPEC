# encode-fe-lint CLI（集成扩展）

自研 CLI（规划中），用于在业务项目中一键接入规范工具链。

## 能力

| 命令 | 说明 |
|------|------|
| `init` | 生成 ESLint / stylelint / markdownlint / commitlint 配置与 Husky 钩子 |
| `scan` | 全量或指定路径扫描 |
| `fix` | 扫描并自动修复（仅支持 fix 的规则） |
| `commit-file-scan` | pre-commit：扫描暂存区相关文件 |
| `commit-msg-scan` | commit-msg：调用 commitlint |

完整闭环说明见 [工程总览](/guide/overview)。

> 包尚未发布至本 monorepo `packages/`，落地后在此补充安装与版本说明。
