# Changelog 规范

维护 **`CHANGELOG.md`**，记录版本间用户可见变更，并与规范化 **git 历史** 配合使用。

## 本 monorepo

- 根目录执行 **`pnpm run changelog`**，使用 `conventional-changelog` 从符合 Conventional Commits 的提交生成/更新 `CHANGELOG.md`。
- 多包发版：**`lerna publish`**，与代码风格 lint 为不同流水线。

## 书写建议

- 按版本分组，区分 `Features` / `Bug Fixes` / `BREAKING CHANGES` 等（与 angular 预设一致时可对齐工具输出）。
- 提交阶段已通过 [Git 提交规范](/commit/git) 时，changelog 生成更稳定。
