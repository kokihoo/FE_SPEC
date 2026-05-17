# HTML 编码规范

HTML(超文本标记语言——HyperText Markup Language)是构成Web世界的一砖一瓦。它定义了网页内容的含义与结构。本节约定 HTML 文档结构、语义化标签与可访问性相关写法。

>语义上：推荐 = 良好实践（绿），强制 = 必须遵守（紫）
::: 推荐 #
:::
::: 强制 #
:::

## 文档

### 文档类型
::: 强制 
使用HTML5 DOCTYPE。
:::


在`HTML`文档的开头使用`<!DOCTYPE html>`来声明文档的`HTML`版本。
```html
<!-- × 非HTML5 DOCTYPE -->
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <html></html>

 <!-- √  -->
 <!DOCTYPE html>
 <html></html>
```
---

### 语言 lang

::: 推荐
指定 `html` 标签上的 `lang` 属性。
:::

[HTML5 规范](http://w3c.github.io/html/semantics.html#the-html-element)中提到：
> 推荐开发者在 `html` 元素上指定 `lang` 属性，以指出文档的语言。这有助于读屏、翻译等工具的工作。

  `lang` 属性的值由 `language-subtags` 组成，在 [BCP47](http://www.ietf.org/rfc/bcp/bcp47.txt#) 中定义，[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)。

```html
  <html lang="zh-CN">
    <!-- ... -->
  </html>
```
---
### 元数据 meta

`<meta>` 放在 `<head>` 里，用来描述当前 `HTML` 文档本身的信息，而不是页面上可见的内容。浏览器、搜索引擎、社交平台、读屏工具等会读取这些元数据，从而决定如何解析、展示或分享页面。

**`<meta>`** 放在 `<head>` 里，用来描述**当前 HTML 文档本身**的信息，而不是页面上可见的内容。浏览器、搜索引擎、社交平台、读屏工具等会读取这些元数据，从而决定如何解析、展示或分享页面。

典型用法如下：
  
##### 1. 字符编码（必配之一）

告诉浏览器用哪种编码解析页面，避免乱码，并尽早确定渲染方式。

```html
<meta charset="utf-8" />
```

规范要求新业务统一 **UTF-8**。

---

##### 2. 移动端视口（viewport）

控制手机上的缩放、宽度如何对应屏幕，影响响应式布局是否正常。

```html
<meta name="viewport" content="width=device-width, minimum-scale=1.0, viewport-fit=cover" />
```

`viewport-fit=cover` 用于适配 iPhone 刘海屏等安全区域。

---

##### 3. SEO / 页面摘要

给搜索引擎用的页面描述、关键词（现代 SEO 里 `keywords` 权重已很低，但仍有团队保留）。

```html
<meta name="description" content="前端规范工程化 - " />
<meta name="keyword" content="规范" />
```

---

##### 4. 分享预览（Open Graph / Twitter 等）

微信、Slack、Twitter 等抓取链接时，会读 `og:title`、`og:image` 等，决定卡片标题、图、描述。这类也是 `meta`，只是 `name`/`property` 不同。

---

##### 5. 行为与安全策略

例如：

- `http-equiv="Content-Security-Policy"`：内容安全策略  
- `http-equiv="refresh"`：自动跳转（少用）  
- `name="robots"`：是否允许收录  
- `theme-color`：浏览器 UI 主题色  

---

#### 和 `<title>` 的区别

| | `<meta>` | `<title>` |
|---|---|---|
| 作用 | 各类**元信息**（编码、视口、描述、分享等） | 页面**标题**（标签栏、搜索结果主标题） |
| 用户是否直接看到 | 一般不显示在正文中 | 显示在浏览器标签、书签、搜索列表 |

规范里 **title 单独成章（1.5）**：页面必须有且仅有一个 `<title>`；meta 是另一类「关于文档的数据」。

---

#### 总结

**Meta = 写在 `<head>` 里、给机器读的「页面说明书」**：怎么解码、怎么在手机上布局、搜索引擎/社交平台怎么理解这页、是否允许索引等。正文用标签画界面，meta 描述文档属性，两者分工不同。

---


::: 推荐
`charset`: 使用 `UTF-8` 字符编码。
:::


声明一个明确的字符编码，可以让浏览器更快速高效地确定适合网页内容的渲染方式。由于历史原因，不同浏览器采用了不同的字符编码。但对于新业务，如无特殊要求，统一使用`UTF-8`字符编码，以便统一。

在`HTML`中使用`<meta charset="utf-8" />`声明文档的编码方式：
```html
<head>
    <meta charset="utf-8">
</head>
```
::: 推荐
`viewport`: 页面提供给移动设备使用时，需要设置 [viewport](https://drafts.csswg.org/css-device-adapt/#viewport-meta)。
设置 `viewport-fit` 设置为“cover”来兼容 `iPhone X` 的刘海屏，[了解更多](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) 。
:::


```html
<meta name="viewport" content="width=device-width, minimum-scale=1.0, viewport-fit=cover" />
```

### 资源加载
::: 推荐
引入 `CSS` 和 `JavaScript` 时无需指定 `type`。
:::


根据 `HTML5` 规范，引入 `CSS` 和 `JavaScript` 时通常不需要指明 `type`，因为 [text/css](https://html.spec.whatwg.org/multipage/obsolete.html#attr-style-type) 和 [text/javascript](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type) 分别是他们的默认值。


  ```html
  <!-- x -->
  <link type="text/css" rel="stylesheet" href="example.css" />
  <style type="text/css">
    /* ... */
  </style>
  <script type="text/javascript" src="example.js"></script>

  <!-- √ -->
  <link rel="stylesheet" href="example.css" />
  <style>
    /* ... */
  </style>
  <script src="example.js"></script>
  ```

::: 推荐
在 `head` 标签内引入 `CSS`，在 `body` 结束标签前引入 `JS`。
:::


 在 `<body></body>` 中指定外部样式表和嵌入式样式块可能会导致页面的重排和重绘，对页面的渲染造成影响。因此，一般情况下，CSS 应在 `<head></head>` 标签里引入，[了解更多](https://developer.yahoo.com/performance/rules.html#css_top)。


 > 在 `HTTP2`（Chrome 浏览器 69 版本之后，`Firefox` 和 `Edge`）中可以在 `body` 中使用 `link` 标签引入样式文件，但不推荐在 `body` 中使用 `<style>` 标签的内联样式。\*\*`<link rel="stylesheet">`。
 > 除了基础库等必须要在 DOM 加载之前运行的 JavaScript 脚本，其他都在靠近 `body` 结束标签前引入，以防止出现页面渲染的阻塞，[了解更多](https://developer.yahoo.com/performance/rules.html#js_bottom)。

  ```html
  <!-- x -->
  <!DOCTYPE html>
  <html>
    <head>
      <script src="mod-a.js"></script>
      <script src="jquery.js"></script>
    </head>
    <body>
      <style>
        .mod-example {
          padding-left: 15px;
        }
      </style>
    </body>
  </html>

  <!-- √ -->
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        .mod-example {
          padding-left: 15px;
        }
      </style>
    </head>
    <body>
      ...
      <script src="path/to/my/script.js"></script>
    </body>
  </html>
  ```

::: 推荐
外部资源的引用地址跟随页面协议，省略协议部分。
:::

```html
<link rel="stylesheet" href="//g.cdn.com/lib/style/index-min.css" />
```


::: 推荐
使用 `preload` 预加载关键资源，[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content)。
:::


  ```html
  <link rel="preload" href="style.css" as="style" />
  <link rel="preload" href="main.js" as="script" />
  ```

::: 推荐
使用`dns-prefetch`和`precpnnect`处理`DNS`解析延迟问题，提高网页加载性能，[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch)。
:::

这两条都是 `<link rel="...">` 的**资源提示（resource hints）**，用来在真正请求资源之前，提前完成一部分网络准备工作，从而减少首屏或关键资源加载时的等待。

---

#### `dns-prefetch`

**作用：只做 DNS 解析。**

浏览器会提前把目标域名解析成 IP，避免等到 `<script>`、`<img>`、`<link>` 等真正引用该域名时才开始查 DNS。

- **会做**：DNS lookup  
- **不会做**：TCP 连接、TLS 握手  
- **成本**：很低，适合对「可能会用到」的第三方域名做广撒网  
- **兼容性**：很好，老浏览器也普遍支持  

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
```

---

#### `preconnect`

**作用：提前建立完整连接（而不只是解析域名）。**

对 HTTPS 源，通常会依次完成：

1. DNS 解析  
2. TCP 三次握手  
3. TLS 协商  

等页面稍后真正请求该源时，连接已经就绪，可以更快发出 HTTP 请求。

- **会做**：DNS + TCP + TLS（HTTPS）  
- **成本**：比 `dns-prefetch` 高，会占用连接和带宽  
- **适用**：你**确定很快就要**连上的关键第三方（字体 CDN、API、关键静态资源域等）  
- **注意**：跨域且需要 CORS 的资源（如字体）应加 `crossorigin`，和你们规范里的示例一致：

```html
<link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin />
<link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
```

---

#### 对比（简表）

| | `dns-prefetch` | `preconnect` |
|---|---|---|
| DNS | ✅ | ✅ |
| TCP | ❌ | ✅ |
| TLS | ❌ | ✅（HTTPS） |
| 开销 | 小 | 较大 |
| 收益 | 省 DNS 时间 | 省 DNS + 建连时间 |

---

#### 为什么规范里两个一起写？

常见写法是：

- **`preconnect`**：现代浏览器，收益更大  
- **`dns-prefetch`**：不支持 `preconnect` 时的降级，至少还能提前做 DNS  

对**确定会用、且很快会用**的域名，优先 `preconnect`；对**可能用到、不确定时机**的第三方，用 `dns-prefetch` 更稳妥。两者不宜对大量域名滥用，尤其是 `preconnect`（每个都会占连接资源）。

更细的说明可参考 MDN：[DNS prefetching](https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch)、[`rel=preconnect`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/preconnect)。

---

### 页面标题
::: 强制
页面需要指定 title 标签，有且仅有 1 个。
:::


  ```html
  <head>
    <meta charset="utf-8" />
    <title>前端代码规范</title>
  </head>
  ```

## 编码
### 缩进
::: 推荐
统一使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进。
:::


  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>印客学院</title>
    </head>
    <body>
      <img src="images/company-logo.png" alt="Company" />
      <h1 class="hello-world">Hello, world!</h1>
    </body>
  </html>
  ```
---

### 注释
::: 强制
在 `HTML` 注释代码中，不允许出现任何敏感信息。
:::


  常见的敏感信息包括：

  - 相关敏感信息，例如业务规则
  - 个人隐私信息，例如邮箱、手机、身份证号码
  - AK（accessKey id, accesskey secret）
  - 证书、密码

::: 推荐
单行注释，需在注释内容和注释符之间需留有一个空格，以增强可读性。
:::


  ```html
  <!-- 单行注释 -->
  ```

::: 推荐
多行注释，注释符单独占一行，注释内容 2 个空格缩进。
:::


  ```html
  <!--
    多行注释
    多行注释
  -->
  ```
---

### 标签
::: 强制
标签名统一使用小写
:::


  ```html
  <!-- x -->
  <H1>Hello, world!</H1>

  <!-- √ -->
  <h1>Hello, world!</h1>
  ```

::: 推荐
不要省略自闭合标签结尾处的斜线，且斜线前需留有一个空格。
:::

  ```html
  <!-- x -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <img src="images/foo.png" alt="foo">

  <!-- √ -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <img src="images/foo.png" alt="foo" />
  ```
---

### 属性
::: 强制
属性值使用双引号，不要使用单引号。
:::

  ```html
  <!-- x -->
  <link rel='stylesheet' href='example.css' />

  <!-- √ -->
  <link rel="stylesheet" href="example.css" />
  ```

::: 推荐
不要为`Boolean`属性添加取值。
:::


XHTML 需要每个属性声明取值，但是 HTML5 并不需要。一个元素中 `Boolean` 属性存在即表示取值 `true`，不存在则表示取值 `false`，[了解更多](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes)。
  ```html
  <!-- x -->
  <input type="text" disabled="disabled" />
  <input type="checkbox" value="1" checked="checked" />
  <select>
    <option value="1" selected="selected">1</option>
  </select>

  <!-- √ -->
  <input type="text" disabled />
  <input type="checkbox" value="1" checked />
  <select>
    <option value="1" selected>1</option>
  </select>
  ```

::: 推荐
自定义属性的命名：以 `data-` 为前缀。
建议自定义属性的命名都以 `data-` 为前缀，以便区分。
:::


  ```html
  <!-- x -->
  <a modal="toggle" href="#">Example link</a>

  <!-- √ -->
  <a data-modal="toggle" href="#">Example link</a>
  ```
---

### 语义化
HTML 语义化，指的是用含义对应的标签来描述页面结构，而不是全靠 div + class 把页面「拼」出来。

标签本身就在告诉浏览器、搜索引擎、读屏软件：这块内容是什么（标题、段落、列表、导航、按钮、主内容区等），而不只是「长什么样」


其他常见对应关系：

- 段落 → `p`
- 标题 → `h1`–`h6`
- 链接 → `a`
- 强调 → `strong` / `em`
- 导航 → `nav`
- 主内容 → `main`
- 文章 → `article`
- 页脚 → `footer`
- 按钮行为 → `button`（而不是 `motion onclick` 冒充按钮）

---

#### 为什么要做语义化？

1. **可访问性**：读屏软件能正确朗读结构（标题层级、列表项数、按钮等）。
2. **SEO**：搜索引擎更容易理解页面主次与内容类型。
3. **可维护性**：看 HTML 就能懂结构，不依赖 class 命名猜用途。
4. **样式降级**：CSS 未加载时，浏览器仍能用默认样式合理展示（如列表有点、标题变大）。
   
:::推荐
尽量根据语义使用 HTML 标签。
:::

规范里也提到：语义化有助于 [Accessibility](https://developer.mozilla.org/zh-CN/docs/learn/Accessibility)，并在 CSS 加载失败时仍有较好展示效果。

  `HTML` 标签（更严谨的叫法是 HTML 元素）都有其语义，例如 `p` 标签即“paragraphs”用于章节，`a` 标签即“anchors”用于锚点链接，[了解更多](https://www.w3.org/TR/2018/WD-html53-20181018/fullindex.html#index-elements)。

  我们应优先选取符合当下所需语义的标签，这既有助于[可访问性（Accessibility）](https://developer.mozilla.org/zh-CN/docs/learn/Accessibility)，也可以在 CSS 加载失败时获得较好的展示效果。

  ```html
  <!-- x -->
  <div class="list">
    <div class="list-item">1</div>
    <div class="list-item">2</div>
    <div class="list-item">3</div>
  </div>

  <!-- 对 -->
  <ul class="list">
    <li class="list-item">1</li>
    <li class="list-item">2</li>
    <li class="list-item">3</li>
  </ul>
  ```
---


#### 总结
语义化 = 用对的 HTML 标签表达对的含义*让 HTML 描述「这是什么」，CSS 负责「长什么样」，JS 负责「怎么交互」。

---

### 可访问性
HTML 可访问性（Accessibility，常简称 a11y，a 与 y 之间有 11 个字母）指：让不同能力、不同设备、不同环境下的用户，都能同等顺畅地感知、理解并操作网页内容。

不只面向视障用户，也惠及键盘用户、听障用户、认知障碍用户，以及在强光下看手机、网络慢、暂时受伤等场景下的所有人

#### 和 HTML 的关系
可访问性贯穿 HTML 结构、CSS、JS，但 HTML 是基础：

1.**语义化标签**
nav、main、button、h1–h6 等，让辅助技术知道「这是导航 / 主内容 / 按钮 / 标题层级」。

2. **替代文本与标签**
   
规范举例：img 要有合适的 alt：

  ```html
  <!-- x - 缺少 alt 属性，无法被无障碍阅读器识别 -->
  <img src="hello.jpg" />

  <!-- √ -->
  <img src="hello.jpg" alt="Welcome to visit!" />

  <!-- √ - 图片无需被无障碍阅读器识别时 -->
  <img src="logo.jpg" alt="" />

  <!-- √ - 图片无需被无障碍阅读器识别时 -->
  <img src="logo.jpg" role="presentation" />
  ```

   - 有信息量的图：写清 `alt` 含义  
   - 纯装饰图：`alt=""` 或 `role="presentation"`，避免读屏重复啰嗦  

3. **表单可访问**  
   `input` 配 `label`（或 `aria-label`），错误提示能被读屏读到。

4. **可聚焦与可操作**  
   真按钮用 `<button>`，链接用 `<a href="...">`；自定义控件需支持键盘和合适的 ARIA（不要滥用）。

5. **语言与标题**  
   `<html lang="zh-CN">` 帮助读屏选对发音；页面有唯一、有意义的 `<title>`（你们 1.5 节）。

---

#### 常见实践（简表）

| 实践 | 作用 |
|------|------|
| 语义化 HTML | 结构清晰，读屏可导航 |
| `alt`、表格 `th`、表单 `label` | 非文字内容有文字等价 |
| 键盘可达、可见焦点 | 不用鼠标也能操作 |
| 足够对比度、可缩放文字 | 弱视用户能看清 |
| 不只用颜色传达信息 | 色盲用户能区分状态 |
| 合理的标题层级（h1→h2→h3） | 快速浏览目录结构 |

更系统的说明可看 MDN：[Accessibility](https://developer.mozilla.org/zh-CN/docs/learn/Accessibility)。

---

#### 和「语义化」的区别

- **语义化**：用对的标签表达对的含义（主要面向**结构**）。  
- **可访问性**：更广的目标——用户能否**感知、理解、操作**；语义化是其中重要一环，`alt`、键盘、对比度等是补充。

---

#### 总结
**HTML 可访问性 = 写出的页面能让尽可能多的人，用尽可能多的方式，无障碍地使用你的内容**；从正确的标签、`alt`、表单标签，到键盘与读屏友好开始做起。

---


## 脚手架模版
根据以上规范，建议的 `HTML` 脚手架模板如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="description" content="前端规范工程化" />
    <meta name="keyword" content="前端规范" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, viewport-fit=cover" />
    <title>前端规范</title>
    <link rel="stylesheet" href="example.css" />
  </head>
  <body>
    <div id="container"></div>
    <script src="example.js"></script>
  </body>
</html>
```
---

## 参考资料

- [Code Guide by @mdo](http://codeguide.co)
- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
