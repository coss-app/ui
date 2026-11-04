import * as React from "react";
import {
  Controls,
  Description,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
  useOf,
} from "@storybook/addon-docs/blocks";

/* 每個組件原始碼（lazy，只有打開該頁才載入）：從檔尾的 export { … } 取出可用名稱 */
const componentSources = import.meta.glob<string>(
  "../../../packages/ui/src/components/ui/*.tsx",
  { query: "?raw", import: "default" },
);

function moduleFromFileName(fileName: string | undefined) {
  // ./stories/button-group.stories.tsx → button-group
  const match = fileName?.match(/([\w-]+)\.stories\.tsx$/);
  return match?.[1];
}

function parseExports(source: string) {
  const names: string[] = [];
  for (const block of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const raw of block[1].split(",")) {
      const name = raw.trim().split(/\s+as\s+/).pop()?.trim();
      if (name && !name.startsWith("type ")) names.push(name);
    }
  }
  for (const m of source.matchAll(/export\s+(?:function|const)\s+(\w+)/g)) {
    names.push(m[1]);
  }
  return [...new Set(names)];
}

function formatImport(names: string[], module: string) {
  const from = `"@coss-app/ui/components/${module}"`;
  const oneLine = `import { ${names.join(", ")} } from ${from};`;
  if (oneLine.length <= 80) return oneLine;
  return `import {\n${names.map((n) => `  ${n},`).join("\n")}\n} from ${from};`;
}

function ImportSnippet() {
  const { preparedMeta } = useOf("meta", ["meta"]);
  const module = moduleFromFileName(preparedMeta.parameters?.fileName);
  const [code, setCode] = React.useState<string>();

  React.useEffect(() => {
    if (!module) return;
    const load = componentSources[`../../../packages/ui/src/components/ui/${module}.tsx`];
    if (!load) return;
    let cancelled = false;
    load().then((source) => {
      if (!cancelled) setCode(formatImport(parseExports(source), module));
    });
    return () => {
      cancelled = true;
    };
  }, [module]);

  if (!module || !code) return null;

  return (
    <>
      <h3 id="import">引用方式</h3>
      <Source code={code} language="tsx" dark />
      <p style={{ fontSize: 15, marginTop: -8 }}>
        尚未安裝？見{" "}
        <a href="/?path=/docs/使用手冊-安裝與權限--docs" target="_top">
          安裝與權限
        </a>
        。
      </p>
    </>
  );
}

/** 組件 Docs 頁：標題 → 引用方式 → 說明 → 主要範例＋Controls → 全部範例 */
export function DocsPage() {
  return (
    <>
      <Title />
      <Subtitle />
      <ImportSnippet />
      <Description />
      <Primary />
      <Controls />
      <Stories title="範例" />
    </>
  );
}
