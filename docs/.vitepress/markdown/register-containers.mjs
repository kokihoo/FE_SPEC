import container from 'markdown-it-container'

/** 显式使用默认标题（「强制」/「推荐」），无需写两遍类型名 */
const DEFAULT_TITLE_MARK = '#'

/**
 * 解析容器 info 行（`::: 强制` 后同一行的文字）→ 标题文案；`null` 表示不渲染标题。
 * @param {string} info
 * @param {string} name 类型名，如「强制」
 * @returns {string | null}
 */
function resolveTitle(info, name) {
  if (!info) return null
  if (info === DEFAULT_TITLE_MARK || info === name) return name
  return info
}

/**
 * 注册 ::: 推荐 / ::: 强制 容器（写法用中文，HTML class 用 ASCII 便于样式命中）。
 * @param {import('markdown-it').default} md
 * @param {string} name markdown 里写的类型名，如「推荐」
 * @param {string} className 加到 DOM 的 class，如 recommend
 */
function registerContainer(md, name, className) {
  md.use(container, name, {
    validate(params) {
      const trimmed = params.trim()
      return trimmed === name || trimmed.startsWith(`${name} `)
    },
    render(tokens, idx, _options, env) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        token.attrJoin('class', `${className} custom-block`)
        const attrs = md.renderer.renderAttrs(token)
        const info = token.info.trim().slice(name.length).trim()
        const titleText = resolveTitle(info, name)
        if (titleText === null) {
          return `<motion-div ${attrs}>\n`.replaceAll('motion-div', 'div')
        }
        const title = md.renderInline(titleText, {
          references: env.references,
        })
        return `<motion-div ${attrs}><p class="custom-block-title">${title}</p>\n`.replaceAll(
          'motion-div',
          'div',
        )
      }
      return '</div>\n'
    },
  })
}

/** @param {import('markdown-it').default} md */
export function registerSpecContainers(md) {
  registerContainer(md, '推荐', 'recommend')
  registerContainer(md, '强制', 'mandatory')
}
