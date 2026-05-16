## 中文

这个文件是 **Commitlint 的配置入口**：用 CommonJS 导出**一个对象**，供 `@commitlint/cli` 或 `commitlint.config.js` 引用。整体在做两件事：指定 **Conventional Commits** 解析方式，以及逐条 **打开/关闭规则并设严重级别**。

```1:17:d:\project\FE_SPEC\packages\commitlint-config\index.js
module.exports = {
    parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
      'body-leading-blank': [1, 'always'],
      'body-max-line-length': [2, 'always', 100],
      'footer-leading-blank': [1, 'always'],
      'footer-max-line-length': [2, 'always', 100],
      'header-max-length': [2, 'always', 100],
      'scope-case': [2, 'always', 'lower-case'],
      'subject-case': [0],
      'subject-empty': [2, 'never'],
      'subject-full-stop': [2, 'never', '.'],
      'type-case': [2, 'always', 'lower-case'],
      'type-empty': [2, 'never'],
      'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore', 'revert']],
    },
  };
```

### 严重级别数字（Commitlint 约定）

- **`0`**：关闭  
- **`1`**：警告（通常仍可通过，看 CI 是否把警告当失败）  
- **`2`**：错误（校验失败）

数组里一般是 **`[级别, 'always' | 'never', ...其它参数]`**，具体含义因规则而异。

### 各字段含义（按块说）

- **`parserPreset`**：使用 `conventional-changelog-conventionalcommits` 这套解析器，把提交说明解析成 **type / scope / subject / body / footer** 等结构（和 Angular 式 conventional commit 常见写法一致）。

- **`rules`**（节选解释）  
  - **`body-leading-blank` [1]**：正文前建议空一行（警告）。  
  - **`body-max-line-length` [2, 100]**：正文单行最长 100（错误）。  
  - **`footer-leading-blank` [1]**：footer 前建议空一行（警告）。  
  - **`footer-max-line-length` [2, 100]**：footer 单行最长 100（错误）。  
  - **`header-max-length` [2, 100]**：整行 header（第一行）最长 100（错误）。  
  - **`scope-case` [2, 'lower-case']**：若有 scope，必须小写（错误）。  
  - **`subject-case` [0]**：**不检查** subject 的大小写风格（关闭），避免和团队习惯冲突。  
  - **`subject-empty` [2, 'never']**：subject 不能为空（错误）。  
  - **`subject-full-stop` [2, 'never', '.']**：subject **不能以英文句号 `.` 结尾**（错误）。  
  - **`type-case` [2, 'lower-case']**：type 必须小写（错误）。  
  - **`type-empty` [2, 'never']**：type 不能为空（错误）。  
  - **`type-enum` [2, 'always', [...]]**：type **只能是** 列表里的那些：`feat`、`fix`、`docs`、`style`、`test`、`refactor`、`chore`、`revert`（错误）。

### 和「一条合法提交」的关系（直观理解）

大致对应形如：

`feat(scope): subject`  

或没有 scope 的：

`fix: subject`  

且 **type 在枚举里、小写、subject 非空、不以 `.` 结尾**，长度与 body/footer 换行、行宽按上面规则约束。

---
