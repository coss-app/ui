import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "coss UI",
    brandImage: "./coss-logo.png",
    brandUrl: "https://ui.coss.com.tw",
    brandTarget: "_self",
    colorPrimary: "#00a756",
    colorSecondary: "#0066ff",
    appBg: "#f7f8fe",
    appContentBg: "#ffffff",
    appPreviewBg: "#f7f8fe",
    appBorderColor: "#dee1f4",
    appBorderRadius: 10,
    textColor: "#2d336b",
    textMutedColor: "#5566a4",
    barTextColor: "#5566a4",
    barSelectedColor: "#00a756",
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
