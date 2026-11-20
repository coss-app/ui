import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "coss UI",
    brandImage: "./coss-logo.png",
    brandUrl: "https://ui.coss.com.tw",
    brandTarget: "_self",
    colorPrimary: "#316def",
    colorSecondary: "#0066ff",
    appBg: "#f0f2fa",
    appContentBg: "#ffffff",
    appPreviewBg: "#f0f2fa",
    appBorderColor: "#dee1f4",
    appBorderRadius: 10,
    textColor: "#2d336b",
    textMutedColor: "#5566a4",
    barTextColor: "#5566a4",
    barSelectedColor: "#316def",
    barBg: "#ffffff",
    inputBg: "#eff0f8",
    inputBorder: "#eff0f8",
    inputTextColor: "#2d336b",
    inputBorderRadius: 10,
    fontBase: '"Inter", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
  }),
});

const BRAND = "coss UI";
const rebrand = () => {
  const next = document.title
    .replace(/\s*⋅\s*Storybook$/, ` ⋅ ${BRAND}`)
    .replace(/^(.*\s-\s)?Storybook$/, BRAND);
  if (next !== document.title) document.title = next;
};
rebrand();
new MutationObserver(rebrand).observe(document.head, {
  subtree: true,
  childList: true,
  characterData: true,
});
