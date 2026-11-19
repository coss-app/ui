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
import { formatImport, parseExports } from "../../../scripts/parse-exports.mjs";

const componentSources = import.meta.glob<string>(
  "../../../packages/ui/src/components/ui/*.tsx",
  { query: "?raw", import: "default" },
);

function moduleFromFileName(fileName: string | undefined) {
  const match = fileName?.match(/([\w-]+)\.stories\.tsx$/);
  return match?.[1];
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
        <a href="/?path=/docs/使用手冊-安裝--docs" target="_top">
          安裝
        </a>
        。
      </p>
    </>
  );
}

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
