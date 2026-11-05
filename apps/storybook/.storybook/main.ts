import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";

// 直接吃 packages/ui 原始碼：組件內部的 `@/` alias 指到 packages/ui/src
const uiSrc = fileURLToPath(new URL("../../../packages/ui/src", import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  // 部署到 Cloudflare Pages 的靜態檔（_headers）
  staticDirs: ["../public"],
  addons: [
    {
      name: "@storybook/addon-docs",
      // 手冊 MDX 用到表格與核取清單（GFM）
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        // story 用消費端的 import 路徑（文件上看到的就是實際寫法），這裡導回原始碼
        alias: [
          { find: /^@coss-app\/ui\/components\//, replacement: `${uiSrc}/components/ui/` },
          { find: /^@coss-app\/ui\/lib\//, replacement: `${uiSrc}/lib/` },
          { find: /^@coss-app\/ui\/hooks\//, replacement: `${uiSrc}/hooks/` },
          { find: /^@\//, replacement: `${uiSrc}/` },
        ],
      },
      build: {
        // 打包成靜態站時忽略 Base UI 等套件的 "use client" 指令警告（Storybook 不用 RSC）
        rolldownOptions: {
          // 保留函式／組件名稱：Show code 的 JSX 範例以 displayName／函式名產生標籤，
          // 被壓縮成 `<l>`、`<dn>` 就無法閱讀
          output: { keepNames: true },
          onwarn(warning, warn) {
            if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
            warn(warning);
          },
        },
      },
    });
  },
};

export default config;
