// 建置後處理：Storybook 的 <title> 固定是「<title> - Storybook」且無設定可改，直接改寫成品的 index.html
import { readFileSync, writeFileSync } from "node:fs";

const file = new URL("../storybook-static/index.html", import.meta.url);
const html = readFileSync(file, "utf8");
const next = html.replace(/<title>[^<]*<\/title>/, "<title>coss UI</title>");

if (next === html && !html.includes("<title>coss UI</title>")) {
  console.error("rebrand-html: 找不到 <title>，Storybook 樣板可能改了");
  process.exit(1);
}
writeFileSync(file, next);
console.log("rebrand-html: <title> → coss UI");
