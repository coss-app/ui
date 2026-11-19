import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";

const uiSrc = fileURLToPath(new URL("../../../packages/ui/src", import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    {
      name: "@storybook/addon-docs",
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
        alias: [
          { find: /^@coss-app\/ui\/components\//, replacement: `${uiSrc}/components/ui/` },
          { find: /^@coss-app\/ui\/lib\//, replacement: `${uiSrc}/lib/` },
          { find: /^@coss-app\/ui\/hooks\//, replacement: `${uiSrc}/hooks/` },
          { find: /^@\//, replacement: `${uiSrc}/` },
        ],
      },
      build: {
        rolldownOptions: {
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
