import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(root, "deploy.sh");

function resolveBash() {
  if (process.env.BASH) return process.env.BASH;
  if (process.platform !== "win32") return "bash";

  const candidates = [
    "C:\\Program Files\\Git\\bin\\bash.exe",
    "C:\\Program Files (x86)\\Git\\bin\\bash.exe",
  ];
  const found = candidates.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      "未找到 bash。请安装 Git for Windows，或将 Git\\bin 加入 PATH，或设置环境变量 BASH 指向 bash.exe",
    );
  }
  return found;
}

execFileSync(resolveBash(), [script], { cwd: root, stdio: "inherit" });
