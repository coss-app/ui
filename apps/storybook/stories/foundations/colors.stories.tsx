import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import globalsCss from "../../../../packages/ui/src/styles/globals.css?raw";

type Token = { name: string; comment: string };

/** 從 globals.css 的 :root 區塊取出所有色彩 token（值為 # 開頭），註解一併帶出 */
function parseRootColorTokens(css: string): Token[] {
  const root = css.match(/:root\s*\{([\s\S]*?)\n\}/);
  if (!root) return [];
  const tokens: Token[] = [];
  const re = /(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;[ \t]*(?:\/\*\s*(.*?)\s*\*\/)?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(root[1]))) {
    tokens.push({ name: m[1], comment: m[3] ?? "" });
  }
  return tokens;
}

const GROUPS: { title: string; test: (name: string) => boolean }[] = [
  { title: "Sidebar", test: (n) => n.startsWith("--sidebar") },
  { title: "Chart", test: (n) => n.startsWith("--chart") },
  { title: "即時統計 Stat", test: (n) => n.startsWith("--stat") },
  { title: "看板 Banner", test: (n) => n.startsWith("--banner") },
  {
    title: "狀態 Status",
    test: (n) =>
      /^--(destructive|success|info|warning|star)/.test(n),
  },
  {
    title: "表面與浮層 Surface",
    test: (n) => /^--(card|popover|toast|overlay|viewer)/.test(n),
  },
  { title: "品牌與動作 Brand", test: (n) => /^--(primary|brand|secondary|accent)/.test(n) },
  {
    title: "基礎 Base",
    test: () => true,
  },
];

function groupTokens(tokens: Token[]) {
  const result = new Map<string, Token[]>();
  for (const g of [...GROUPS].reverse()) result.set(g.title, []);
  for (const t of tokens) {
    const g = GROUPS.find((g) => g.test(t.name))!;
    result.get(g.title)!.push(t);
  }
  const order = ["基礎 Base", "品牌與動作 Brand", "表面與浮層 Surface", "狀態 Status", "即時統計 Stat", "看板 Banner", "Chart", "Sidebar"];
  return order.map((title) => ({ title, tokens: result.get(title) ?? [] })).filter((g) => g.tokens.length);
}

/** html 的 class 變了（淺深色切換）就重新讀 computed 值 */
function useThemeVersion() {
  const [version, setVersion] = React.useState(0);
  React.useEffect(() => {
    const observer = new MutationObserver(() => setVersion((v) => v + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    return () => observer.disconnect();
  }, []);
  return version;
}

function Swatch({ token, version }: { token: Token; version: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hex, setHex] = React.useState("");
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    setHex(getComputedStyle(ref.current).getPropertyValue(token.name).trim());
  }, [token.name, version]);
  return (
    <div ref={ref} className="flex items-center gap-3 rounded-lg border bg-card p-2">
      <div
        className="size-12 shrink-0 rounded-md border"
        style={{ background: `var(${token.name})` }}
      />
      <div className="min-w-0">
        <div className="truncate font-mono text-[13px] font-semibold">{token.name}</div>
        <div className="font-mono text-xs text-muted-foreground uppercase">{hex}</div>
        {token.comment && (
          <div className="truncate text-xs text-muted-foreground" title={token.comment}>
            {token.comment}
          </div>
        )}
      </div>
    </div>
  );
}

function ColorTokens() {
  const version = useThemeVersion();
  const groups = React.useMemo(() => groupTokens(parseRootColorTokens(globalsCss)), []);
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[25px] font-semibold text-heading">色彩 Tokens</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          以下色彩變數讀自 globals.css 的 :root，已全部內建在套件裡，專案 import globals.css 就能使用，不需要新增。HEX 是目前主題（淺色／深色）的實際值，切換工具列的主題時會跟著更新。
        </p>
      </div>
      {groups.map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-heading">{group.title}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.tokens.map((t) => (
              <Swatch key={t.name} token={t} version={version} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: ColorTokens,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof ColorTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTokens: Story = {};
