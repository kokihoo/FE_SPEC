# `commitlint-config`
本仓库里可发布的包在 packages/commitlint-config/，npm 名是 commitlint-config。它导出一份 commitlint 可共享配置，用来校验 Conventional Commits 风格的 git commit 说明。

核心规则在 packages/commitlint-config/index.js：

支持配套的 [commitlint 配置](https://commitlint.js.org/#/concepts-shareable-config)，用于对 `git commit message` 进行校验。

## 安装

使用时，需要安装 [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)：

```bash
npm install encode-fe-commitlint-config @commitlint/cli --save-dev
```

## 使用

在 `commitlint.config.js` 中集成本包:

```javascript
module.exports = {
	extends: ['encode-fe-commitlint-config'],
};
```

## 设置 git hook

可通过 [husky](https://www.npmjs.com/package/husky) 设置在 `git commit` 时触发 `commitlint`。

首先安装 husky：

```bash
npm install husky --save-dev
```

然后执行添加`commit-msg`:

```bash
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

更多信息可参考 [commitlint 文档](https://commitlint.js.org/#/guides-local-setup?id=install-husky)。
