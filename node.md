
1.
2.
3.git commitlint husky
4.markdownlint

lint 收敛 CLI
1. 一键接入 一键扫描 一键修复 一键升级

## 技术选型

1. 多包：monorepo lerna
2. 包管理工具：pnpm
3. lint
   1. markdownlint
   2. commitlint
   3. stylelint
   4. eslint
   5. prettier
4. CLI
5. jest mocha

## 课程安排

第一节课
1. 项目初始化 markdownlint changelog commitlint npm scripts 发包lerna
2. HTML GIT Markdown Changelog文档规范，vuepress 静态资源站点 githubIO
3. git action deploy

第二节课
1. CSS stylelint
2. eslint JS TS React Vue Node eslint 定制化的能力
3. prettier

第三节课
1.eslint plugins
2.CLI Node API

第四节课
1.husky代码规范的扫描
2.fix
3.完整的流程梳理，如何体现项目优势

lerna + pnpm

pnpm使用lerna要在文件pnpm-workspace.yaml中指定工作区

==> 实现markdownlint
创建一个包：
lerna create demo
index.js 配置markdownlint的入口 入参是json的格式 index.js -> index.json
参考markdownlint的配置：
https://www.npmjs.com/package/markdownlint#optionsconfig


项目中落地package.json 定制化

markdownlint[https://www.npmjs.com/package/markdownlint] 
采用业界内大家熟知的规范方式进行配置去用，或者在团队内定义一套自己的流程：
关于不同配置项内容的详细解释：https://github.com/DavidAnson/markdownlint/blob/HEAD/doc/Rules.md （See Rules.md for more details）
自己去选择符合自己的一套规范

commitlint：conventionalcommits（官方commit msg限制）[https://comventionalcommits.org/en/v1.0.0/#summary]

git action 云构建
编写一套自己发布的脚本 deploy.sh
CI 集成到workflow中 云端工作流
 





### 操作
项目初始化：

```bash
npm i -g lerna # 全局安转lerna
lerna init
```
```bash
npm i -g markdownlint-cli
pnpm run lint
```

```bash
npm install -g conventional-changelog-cli
pnpm run changelog
```


## 第二节课
1. stylelint CSS eslint JS TS Node编码规范
2. stylelint-config 测试用例
3. eslint-config 针对不同的项目 React Vue js TS 如何提供定制化的配置
4. prettier 如何去做，以及为什么要做。

### stylelint

block: 阻塞开发的问题 error
major：会影响开发内容的问题 warnning

cli 自动修复的场景

测试用例 jest


github workflow 基于当前action发布我们当前版本
.husky git hooks在提交commit的时候 使用commitlint限制commit msg
vscode config项目级别
docs - vuepress的项目
