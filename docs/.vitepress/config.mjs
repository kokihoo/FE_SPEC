import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'FE-SPEC',
  description: '前端编码规范工程化',
  base: '/FE_SPEC/',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '代码规范',
        activeMatch: '^/code/',
        items: [
          { text: 'HTML', link: '/code/html' },
          { text: 'JavaScript', link: '/code/javascript' },
          { text: 'TypeScript', link: '/code/typescript' },
          { text: 'CSS', link: '/code/css' },
          { text: 'Node', link: '/code/node' },
        ],
      },
      {
        text: '提交规范',
        activeMatch: '^/commit/',
        items: [
          { text: 'Git', link: '/commit/git' },
          { text: 'Changelog', link: '/commit/changelog' },
        ],
      },
      {
        text: '文档规范',
        link: '/md/markdown',
        activeMatch: '^/md/',
      },
      {
        text: '集成扩展',
        activeMatch: '^/npm/',
        items: [
          { text: 'CLI', link: '/npm/cli' },
          { text: 'ESLint', link: '/npm/eslint' },
        ],
      },
    ],

    sidebar: {
      '/code/': [
        {
          text: '代码规范',
          collapsed: false,
          items: [
            { text: 'HTML', link: '/code/html' },
            { text: 'JavaScript', link: '/code/javascript' },
            { text: 'TypeScript', link: '/code/typescript' },
            { text: 'CSS', link: '/code/css' },
            { text: 'Node', link: '/code/node' },
          ],
        },
      ],
      '/commit/': [
        {
          text: '提交规范',
          collapsed: false,
          items: [
            { text: 'Git', link: '/commit/git' },
            { text: 'Changelog', link: '/commit/changelog' },
          ],
        },
      ],
      '/md/': [
        {
          text: '文档规范',
          collapsed: false,
          items: [{ text: 'Markdown', link: '/md/markdown' }],
        },
      ],
      '/npm/': [
        {
          text: '集成扩展',
          collapsed: false,
          items: [
            { text: 'encode-fe-lint CLI', link: '/npm/cli' },
            { text: 'ESLint 配置', link: '/npm/eslint' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '项目指南',
          items: [{ text: '工程总览', link: '/guide/overview' }],
        },
      ],
      '/': [
        {
          text: '开始',
          items: [
            { text: '首页', link: '/' },
            { text: '工程总览', link: '/guide/overview' },
            { text: 'JavaScript 规范', link: '/code/javascript' },
          ],
        },
        {
          text: '规范入口',
          collapsed: true,
          items: [
            { text: 'Git 提交', link: '/commit/git' },
            { text: 'Markdown 文档', link: '/md/markdown' },
            { text: 'CLI 集成', link: '/npm/cli' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kokihoo/FE_SPEC' },
    ],

    editLink: {
      pattern: 'https://github.com/kokihoo/FE_SPEC/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    search: {
      provider: 'local',
    },
  },
})
