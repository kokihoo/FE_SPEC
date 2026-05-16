# `markdownlint-config`

> TODO: description

支持配套的 [markdownlint 可共享配置](https://www.npmjs.com/package/markdownlint#optionsconfig)。

## 安装

需要先行安装 [markdownlint](https://www.npmjs.com/package/markdownlint)：

```bash
npm install markdownlint-config markdownlint --save-dev
```

## 使用

在 `.markdownlint.json` 中继承本包:

```json
{
  "extends": "markdownlint-config"
}
```

## 中文

`packages/markdownlint-config/index.json` 是 **markdownlint** 的配置文件：给 `markdownlint`（或编辑器里的 markdownlint 插件）用，用来统一 Markdown 的写法检查规则。别的项目可以通过 `extends` 或指向这个包里的 JSON 来复用同一套规则。

各字段含义大致如下：

| 配置项 | 作用 |
| --- | --- |
| **`$schema`** | 指向官方 JSON Schema，让编辑器能校验/补全配置。 |
| **`default: true`** | 先启用 markdownlint **全部内置规则**，下面只对需要改的项做覆盖。 |
| **`ul-style`** | 无序列表统一用 **短横线 `-`**，不用 `*` 或 `+`。 |
| **`no-trailing-spaces`** | 行尾空格：`br_spaces: 0` 表示换行处不要留尾随空格；`list_item_empty_lines: false` 控制列表项相关空行行为。 |
| **`list-marker-space: false`** | **关闭**「列表标记与正文之间必须有空格」这条规则（即不按该规则报错）。 |
| **`line-length: false`** | **关闭** 行长限制（不写死每行多少字符）。 |
| **`no-inline-html: false`** | **允许** 文档里写 HTML 标签。 |
| **`no-duplicate-header: false`** | **允许** 不同位置重复使用相同标题文案（默认会防重复 slug/可访问性等问题）。 |
| **`proper-names`** | 专有名词大小写：文档里出现列表中的词时，应按给定拼写写（如 `JavaScript` 不能写成 `javascript`）；`code_blocks: false` 表示 **不检查** 代码块里的内容。 |

`proper-names.names` 里是一长串前端/生态里常见的 **正确拼写**（语言、框架、浏览器、公司等），用于提示作者统一写法。

---

`default: true` 表示在运行时按当前版本的内置规则表**默认全开**，再按你在 JSON 里写的键做覆盖；与 `extends` 合并后的生效结果由 markdownlint 内部的 `getEffectiveConfig` 处理。
