export function parseExports(source) {
  const names = [];
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

export function formatImport(names, module) {
  const from = `"@coss-app/ui/components/${module}"`;
  const oneLine = `import { ${names.join(", ")} } from ${from};`;
  if (oneLine.length <= 80) return oneLine;
  return `import {\n${names.map((n) => `  ${n},`).join("\n")}\n} from ${from};`;
}
