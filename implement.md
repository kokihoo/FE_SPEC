# 规范先行，工具驱动

通过搭建Monorepo与自动化管道，将编码、提交、文档等分散环节统一为可复用的标准化产出。以下会涉及到前端工程化规范体系搭建、lerna多包管理及自动化文档部署。

## Monorepo(单一代码仓库)工作原理
Monorepo的物理基础是工作区。包管理工具(如Yarn、npm、pnpm)通过工作区功能，将一个仓库的根目录声明为工作区根，并在其下组织多个独立的包。

基于内容寻址存储与硬链接的现代方案（pnpm）
pnpm 采用了完全不同的原理，从根本上解决了幽灵依赖和磁盘空间浪费：

pnpm 不会将依赖平铺。它在根 node_modules 下只安装工作区包各自的符号链接，而真实包文件存储在全局的内容寻址存储中。

当 pnpm install 时：

解析所有包的依赖树，根据版本哈希从全局存储（或下载后存入全局存储）获取包文件，这些文件以内容哈希命名。
在包的 node_modules 内，用硬链接指向全局存储中的文件，构建出一个严格隔离的、与 package.json 完全对应的依赖树。
对于内部包 shared-utils，会在 apps/web-app/node_modules 下创建符号链接，指向 packages/shared-utils。而 shared-utils 自身的第三方依赖，则通过另一套符号链接与硬链接的组合，清晰地隔离在该包的虚拟目录中。
结果：每个包只能访问它明确声明的依赖，彻底杜绝幽灵依赖；同时由于硬链接共享全局存储，同一个包的相同版本在磁盘上只保存一份，极大节省空间。

这就是依赖解析的核心原理：将工作区内包名映射到本地路径，通过链接技术让模块系统无感地加载本地源码，同时保证依赖边界清晰。


1. pnpm workspace把所有本地包互相软链接
2. 业务项目直接依赖本地源码，不是远端npm包
3. 修改公共库即时生效，无需发包
4. 依赖统一安装、复用，体  积更小
5. 构建工具自动分析依赖顺序、增量打包
   
Monorepo的工作原理不是单一技术，而是一套工具协议与约定的精密协作：
- 包管理器的工作区协议将本地目录虚拟化为可链接的包
- 现代文件链接技术(符号链接、硬链接、内容寻址存储)实现零拷贝的内部依赖与严格隔离
- 基于依赖图的任务编排通过哈希指纹和缓存，实现最小增量构建
- Git的原子提交天然支撑挎包协同，结合代码所有权实现分权
- 影响分析与过滤机制让CI/CD永远只运行必要的工作

基于VuePress搭建静态文档站点，沉淀开发规范。
结合GitHub Actions实现自动化部署
定义并封装四个核心NPM包：
    - eslint-config（代码规范）
    - commitlint-config（提交规范）
    - markdownlint-config（文档规范）
    - stylelint-config（样式规范）

## 第一阶段：奠基
完成Monorepo环境搭建、四大规范包定义、VuePress站点初始化及Github Actions自动化部署流程

## 第二阶段：深化
基于AST开发自定义ESLint插件；编写交互式CLI工具，标准化项目初始化流程

## 第三阶段：闭环
集成代码扫描与一键修复能力；梳理完整工作流，指导在实际项目中落地体现工程价值



# 工程化落地和工具链实战 （第一节课）
1. 多包管理架构 Monorepo
        工具选型：lerna + pnpm
        npm i -g pnpm
        pnpm add lerna --save-dev
        工具选型：采用 Lerna + pnpm。

        目录结构：
        packages/：存放各个子包（如 eslint-config, commitlint-config 等）。
        docs/：存放 VitePress 文档源码。
        .github/workflows/：存放 CI/CD 配置文件。
        关键配置 (lerna.json)：
        version: "independent" 或固定版本号，本项目采用独立版本或统一管理视需求而定（文中提到保持一致便于管理）。
        npmClient: "pnpm"，指定包管理器。
        useWorkspaces: true，启用 pnpm workspaces。
        关键配置 (package.json)：
        scripts: 定义 dev, build, publish, lint 等指令。
        prepare: 安装 husky，在 install 后自动初始化 Git Hooks。

2. 静态文档站点搭建Vuepress
        初始化：使用 vitepress init 或在现有项目中配置。
        配置项 (docs/.vitepress/config.js)：
        base: 设置基础路径（如 /repo-name/），适配 GitHub Pages 二级目录。
        themeConfig: 配置导航栏、侧边栏、Logo、社交链接等。
        markdown: 配置代码行号、自定义锚点等。
        本地调试：运行 vitepress dev 启动本地服务，支持热更新。

3. 规范化校验工具集成
        MarkdownLint：
            创建 markdownlint-config包，导出配置对象。
            在主项目中通过extends继承配置。
            命令行执行markdownlint **.md进行校验
        CommitLint & Husky：
            安装@commitlint/cli和@commitlint/config-conventional
            配置commitlint.config.js定义规则
            Husky集成：在.husy/commit-msg中 执行npx --no-install commitlint --edit $1,拦截不符合规范的提交

4. 自动化部署(GitHub Actions)

下面进入第一节课的实操环节：
将pnpm与lerna结合使用 pnpm + lerna
https://lerna.js.org/docs/recipes/using-pnpm-with-lerna

1. 构建marklint-config   
## 使用lerna多包
Lerna是一个快速、线代的构建系统，用于管理和发布来自同一个存储库的多个JS/TS包。
```bash
pnpm add lerna --save-dev # 或
lerna init
```
为软件包管理器配置使用workspaces
package.json
+  "workspaces": [
    "packages/*"
  ],
添加pnpm-workspace.yaml 文件
+ packages:
  - "packages/*"
  
下面开始在本地构建markdownlint-config包
```bash
lerna create markdownlint-config
```

## markdownlint
markdownlint是一个用于Node.js的静态分析工具，它包含一个规则库，用于强制执行markdown文件的标准和一致性。
markdownlint-config的功能主要是基于markdownlint的功能执行本地配置的markdownlint规则来规范本地项目的markdown文本文件的格式，纠正格式与语法错误。
详细的规则对照：
https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md

1. 安装开发环境依赖markdownlint
```bash
npm install markdownlint --save-dev # 或
pnpm add markdownlint --save-dev # 或
pnpm add markdownlint -D
```

核心部分是维护一个自己的文档规范
```bash
# package.json
{
    main: index.json
}
```
markdown的规范是使用json来维护的，于是我们在markdownlint-config包中新建index.json 并编辑我们的文档规范
配置完成以后使用markdownlint工具来执行我们的规范

markdownlint是一款用于检查Markdown/CommonMark文件的Node.js样式和代码检查工具。是一个用于Node.js的静态分析工具，它包含一个规则库，
用于强制执行Markdown文件的标准和一致性。

packages/markdownlint-config/index.json是markdownlint的配置文件：给markdownlint(或编辑器里的markdownlint插件)用，用来统一Markdown
的写法检查规则。别的项目可以通过extends或指向这个包里的JSON来复用同一套规则。

### 如何在项目中使用markdownlint-config？
1. 包本身(packages/markdownlint-config)
   - npm包名是markdownlint-config，package.json里main指向index.json,即把整份markdownlint规则JSON作为包的入口导出
2. 本仓库根目录：直接extends本地路径
   - 根目录.markdownlint.json 用相对路径继承工作区里的配置（不经过node_moudules包名解析）：
    ```
        {
            "extends": "./packages/markdownlint-config/index.json"
        }
    ```
    extends用于markdownlint 官方配置里继承其他文件，也即自己项目定制化的配置规则。

    一键扫描文件了之后，尝试接入一键修复：（note： 不是每一条规则都能自动修：只有规则实现了fixInfo的才会被修）；很多是风格/语义类，只能手改。

    ```bash
    npm install markdownlint-cli2 --save-dev
    pnpm exec 
    ```
    修复：
    ```bash
    pnpm exec markdownlint-cli2 "README.md" "packages/markdownlint-config/README.md" --fix
    pnpm exec markdownlint-cli2 "**/*.md" --fix
    ```
    这里尝试了一下，有的规则不支持修复，所以使用markdownlint使用规则来约束文件以后可以根据命令行输出的内容
    error这类的，尝试调用大模型利用大模型来修正，不断的执行markdownlint 直至修复不报错为止。—— 这里可以接入大模型的能力。

    结论：markdownlint规则的自动修复还是放弃

## 接下来配置commilint 和 husky
commitlint-config导出一份commitlint可共享配置，用来校验Conventional Commits风格的git commit说明
核心在packages/commitlint-config/index.js
```bash
lerna create commitlint-config
```
package.json
修改入口文件main: index.js, 该文件时Commitlint的配置入口：用CommonJS导出一个对象使用module.exports。
供@commitlint/cli或commitlint.config.js 引入，并且执行使用conventional-changelog-conventionalcommits这套解析器。
因此接下来安装，配置相关文件。
1.在commitlint-config目录下安装开发依赖conventional-changelog-conventionalcommits
```bash
pnpm add conventional-changelog-conventionalcommits --save-dev
```
2.在项目根目录下新建commitlint.config.js,使用monorepo开发是，直接使用相对路径继承本地宝，而不是npm包名，配置commitlint的共享配置
```
    module.expots = {
        extends: "./packages/commitlint-config/index.js"
    }
```
3.CLI —— 在根目录下安装开发环境依赖@commitlint/cli，用于执行commitlint
```bash
    pnpm add @commitlint/cli --save-dev
    pnpm add husky --save-dev
```
通过husky设置在git commit时触发commitlint
4.Husky 提交commit触发git hooks钩子进而进行commitlint信息规则校验
   - 根目录安装开发依赖husky 且配置Husky的commot-msg钩子./husky/commit-msg
  prepare里husky install；./husky/commit-msg在每次commit时：执行
    npx commlint --edit $1
  也就是说：提交时触发Husky中的钩子进而调用commitlint，commitlint再读根目录的.commitlint.config.js，最终加载packages/commitlint-config/index.js的规则

  用 npx 跑本地的 @commitlint/cli；--edit $1 表示校验 Git 传给钩子的那个临时文件里的提交说明（$1 是路径）。
  对 commit-msg 钩子，Git 约定传入 一个文件路径，文件里是本次提交的 message。commitlint --edit 就是读这个文件做规则检查（会用到你根目录的 commitlint.config.js 等配置）。


  ## 接下来配置VitePress
  ```bash
    pnpm add -D vitepress@next
    pnpm vitepress init
  ```
  使用两种构建方式:
  ① 本机想把文档站发到GitHub Pages,可以执行pnpm run deploy，由bash跑这个脚本。
  ② 注意：仓库里的GitHub Actions(另一种部署方式.github/workflows/deploy.yml)在push到master时也会部署文档，但走的是pnpm run docs:build + JamesIves/github-pages-deploy-action，并没有调用deploy.sh

  脚本做的事可以概括为：
  构建VitePress文档静态站 ——> 把构建结果强制推到远程的gh-pages分支（给GitHub Pages用）。
  接下来写deploy.sh
