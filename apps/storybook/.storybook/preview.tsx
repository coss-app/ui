import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import { TooltipProvider } from "@coss-app/ui/components/tooltip";
import { DocsPage } from "./docs-page";
import { transformSource } from "./source-transform";

import "../../../packages/ui/src/styles/globals.css";

const viewports = {
  mobile: { name: "Mobile 375", styles: { width: "375px", height: "812px" }, type: "mobile" },
  tablet: { name: "Tablet 768", styles: { width: "768px", height: "1024px" }, type: "tablet" },
  laptop: { name: "Laptop 1024", styles: { width: "1024px", height: "768px" }, type: "desktop" },
  desktop: { name: "Desktop 1440", styles: { width: "1440px", height: "900px" }, type: "desktop" },
} as const;

const preview: Preview = {
  // 每個組件自動產生 Docs 頁（頂端顯示 import 寫法，見 docs-page.tsx）
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      page: DocsPage,
      codePanel: true,
      source: { transform: transformSource },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: { options: viewports },
    options: {
      storySort: {
        order: [
          "使用手冊",
          [
            "首頁",
            "安裝",
            "新專案",
            "舊專案遷移",
            "主題與深色模式",
            "Claude Code Skill",
            "更新與版本",
            "貢獻組件",
          ],
          "Foundations",
          "Inputs",
          "Overlays",
          "Navigation",
          "Data Display",
          "Feedback",
          "Messaging",
          "Layout",
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="min-h-screen bg-background p-6 text-foreground">
          <Story />
        </div>
      </TooltipProvider>
    ),
    withThemeByClassName({
      // key 用英文：Storybook 的 URL globals 只接受英數，?globals=theme:dark 才能直接連結深色
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
      parentSelector: "html",
    }),
  ],
};

export default preview;
