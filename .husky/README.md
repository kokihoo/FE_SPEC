## 中文

### Husky 钩子的工作原理（和 Git 的关系）

1. **Git 自带「钩子」机制**  
   在你执行某些 Git 命令时（例如 `git commit`），Git 会在固定时机调用 **shell 脚本**。例如 **`commit-msg`**：在**提交说明已经写好、即将真正生成 commit 之前**运行；若脚本**非 0 退出**，Git 会**中止这次提交**。

2. **Husky 做的事**  
   把「要执行的钩子脚本」**集中放在仓库里的 `.husky/` 目录**（可版本管理），并在安装时让 Git 使用这个目录作为钩子路径（常见做法是通过 `husky` / `prepare` 配置 **`core.hooksPath`** 指向 `.husky`）。这样团队拉代码、装依赖后，**同一套钩子**就会生效。

3. **何时触发**  
   - 触发的是 **Git**，不是 pnpm/npm 自己。  
   - 例如：你执行 `git commit`，写完 message 保存后 → Git 调用 **`.husky/commit-msg`**（若已启用）。  
   - 其它钩子名（`pre-commit`、`pre-push` 等）对应其它 Git 时机，各自独立。

4. **你仓库里 `husky.sh` 的提示**  
   `.husky/_/husky.sh` 当前内容是 **弃用说明**（为将来 Husky v10 做准备）。**真正干活的**是下面 `npx commitlint ...` 这一行；上面 `source husky.sh` 在旧模板里常见，用于统一环境，以后可按提示删掉两行模板。

---

### `.husky/commit-msg` 文件逐行说明

```1:5:d:\project\FE_SPEC\.husky\commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx commitlint --edit $1
```

| 行 | 作用 |
|----|------|
| `#!/usr/bin/env sh` | 声明用 `sh` 执行（在 macOS/Linux 以及 **Git for Windows** 里通常能找到 `sh`）。 |
| `. "$(dirname -- "$0")/_/husky.sh"` | **当前脚本所在目录** 下的 `/_/husky.sh` 用 `.` **source 进来**（执行其中的 shell 逻辑；你这边主要是 Husky 的兼容/弃用提示）。`$0` 是当前钩子脚本路径。 |
| `npx commitlint --edit $1` | 用 **`npx`** 跑本地的 `@commitlint/cli`；**`--edit $1`** 表示校验 **Git 传给钩子的那个临时文件**里的提交说明（`$1` 是路径）。不通过则 commitlint 非 0 退出 → **提交被拒绝**。 |

**`$1` 是什么？**  
对 **`commit-msg`** 钩子，Git 约定传入 **一个文件路径**，文件里是本次提交的 message。`commitlint --edit` 就是读这个文件做规则检查（会用到你根目录的 `commitlint.config.js` 等配置）。

---

### 和 `package.json` 的配合

根目录 `"prepare": "husky install"` 会在 **`pnpm install` 等安装流程**里跑，用于**安装/更新 Git 钩子路径**，保证新克隆仓库的人在装依赖后 Husky 能接上 Git。  
**真正每次提交触发的**仍是：**你运行 `git commit` → Git 调 `.husky/commit-msg`**。

---
