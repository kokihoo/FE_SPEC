通篇看下来是lerna结构定义的。
encode-fe-spec/
├── .github/  
│   └── workflows/
│       └── deploy.yml
├── .husky/
│   ├── commit-msg
│   └── _/
├── .vscode/
├── docs/
│   ├── index.md
│   ├── .vuepress/
│   │   ├── config.ts
│   │   └── public/img/logo.png
│   ├── cli/
│   │   └── encode-fe-lint.md
│   ├── coding/
│   │   ├── *.md (css, html, javascript, node, typescript)
│   │   └── img/
│   ├── engineering/
│   │   └── changelog.md, doc.md, git.md
│   └── npm/
│       └── commitlint, eslint, eslint-plugin, markdownlint, stylelint
├── packages/
│   ├── commitlint-config/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── README.md
│   ├── encode-fe-lint/
│   │   ├── src/
│   │   │   ├── cli.ts, index.ts, types.ts
│   │   │   ├── actions/        (init, scan, update)
│   │   │   ├── config/         (*.ejs templates, _vscode/*.ejs)
│   │   │   ├── lints/
│   │   │   │   ├── eslint/
│   │   │   │   ├── markdownlint/
│   │   │   │   ├── prettier/
│   │   │   │   └── stylelint/
│   │   │   └── utils/
│   │   ├── test/ (+ fixtures: autofix, template/init)
│   │   ├── package.json, tsconfig.json, README.md
│   │   └── .eslintrc.js, .eslintignore, …
│   ├── eslint-config/
│   │   ├── index.js, es5.js, react.js, vue.js, node.js, jsx-a11y.js, …
│   │   ├── essential/ (+ rules/, typescript/)
│   │   ├── rules/ (+ base/)
│   │   ├── typescript/
│   │   └── __tests__/ (+ fixtures/)
│   ├── eslint-plugin/
│   │   ├── index.js, configs/recommended.js
│   │   └── rules/  (no-*, custom rules)
│   ├── markdownlint-config/
│   │   ├── index.json
│   │   └── package.json, README.md
│   └── stylelint-config/
│       ├── index.js
│       ├── __tests__/ (+ fixtures/)
│       └── package.json, README.md
├── CHANGELOG.md, README.md, LICENSE
├── commitlint.config.js, deploy.sh
├── package.json, pnpm-workspace.yaml, pnpm-lock.yaml, lerna.json
└── … (root dotfiles: .gitignore, .prettierrc.js, .stylelintrc, …)

lern + pnpm
package.JSON dev 安装pnpm lerna
1.先配置lerna -》 lerna.json
2.配置packgae.json -> 定义scripts 配置项publicConfig
    git/hooks  提供hooks模版给husky配置使用

markdownlint-config
markdownlint

pnpm使用lerna在外部定义工作区域.pnpm-workspace.yaml
lerna create markdownlint-config
本地配置入口配置：
index.json

 commitlint

 commitlint husky conventional changelo
 commit 提交触发husky钩子

本地开发的npm包
pnpm publish
发完包后，还需要自动化部署一个静态站点 使用gitaction 使用github的云构建过程
编辑一个deploy.sh
这个发布主要针对vuepress的那个静态站点