# 文档站说明

本目录为 VitePress 文档源，配置见 `.vitepress/config.mjs`。

## 自定义提示块（规范用语）

与 `::: tip` 相同写法，已注册：

```markdown
::: 推荐
建议性说明正文。
:::

::: 强制
必须遵守的说明正文。
:::

::: 推荐 自定义标题
正文仍写在容器内。
:::
```

实现：`/.vitepress/markdown/register-containers.mjs`；样式：`/.vitepress/theme/custom-blocks.css`。
