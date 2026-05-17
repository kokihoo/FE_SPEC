# Git 提交规范

提交说明采用 **Conventional Commits**，由 [commitlint](https://commitlint.js.org/) 校验。

## 本仓库配置

- 配置包：`packages/commitlint-config`（npm 名 **`commitlint-config`**）
- 根目录 `commitlint.config.js` 继承上述包
- Husky：`.husky/commit-msg` 执行 `npx commitlint --edit $1`

## 业务项目典型流程（`encode-fe-lint`，规划中）

1. **`encode-fe-lint init`**：生成 `commitlint.config.js` 与 Husky 钩子  
2. **pre-commit**：`encode-fe-lint commit-file-scan`（仅扫本次提交文件）  
3. **commit-msg**：`encode-fe-lint commit-msg-scan` → 内部调用 **commitlint**

不符合规范的提交说明将被拒绝。

## 安装示例

```bash
pnpm add -D commitlint-config @commitlint/cli husky
```

```js
// commitlint.config.js
module.exports = {
  extends: ['commitlint-config'],
};
```
