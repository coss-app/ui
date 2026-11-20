const noComments = {
  meta: {
    type: "problem",
    schema: [],
    messages: { comment: "程式碼不得有註釋。把知識寫成 lint／測試，或放進 .claude/rules。" },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const report = () => {
      const comments = sourceCode.getAllComments?.() ?? sourceCode.comments ?? [];
      for (const comment of comments) {
        context.report({ loc: comment.loc, messageId: "comment" });
      }
    };
    return { Program: report, StyleSheet: report };
  },
};

const MENU_LABEL = /^(DropdownMenu|ContextMenu|Menubar)Label$/;
const MENU_GROUP = /^(DropdownMenu|ContextMenu|Menubar)(Radio)?Group$/;

const elementName = (element) => element.openingElement?.name?.name;

const menuLabelInGroup = {
  meta: {
    type: "problem",
    schema: [],
    messages: { outside: "{{name}} 須放在對應的 *Group 內（Base UI 的 Menu Label 依賴 Group context）。" },
  },
  create(context) {
    return {
      JSXElement(node) {
        const name = elementName(node);
        if (!name || !MENU_LABEL.test(name)) return;
        const hasGroup = context.sourceCode
          .getAncestors(node)
          .some((ancestor) => ancestor.type === "JSXElement" && MENU_GROUP.test(elementName(ancestor) ?? ""));
        if (!hasGroup) context.report({ node, messageId: "outside", data: { name } });
      },
    };
  },
};

const SELECTED_STATE = /data-checked|aria-pressed|data-pressed|data-selected|data-\[selected|data-\[state=(on|selected)|range-start|range-end|selected-single/;
const INFO_COLOR = /^(bg|text|border|ring|fill)-info(-muted|-subtle|-foreground)?(\/\d+)?$/;
const SUCCESS_HOVER = /^(hover|aria-expanded):bg-success-muted$/;

const selectedUsesPrimary = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      info: "選中／勾選狀態用 primary／primary-muted，不用 info（info 只給連結與資訊提示）：{{token}}",
      success: "outline 的 hover／展開底色用 primary-muted，success-muted 只給成功狀態：{{token}}",
    },
  },
  create(context) {
    const check = (node, value) => {
      for (const token of value.split(/\s+/)) {
        const index = token.lastIndexOf(":");
        const variants = token.slice(0, index + 1);
        const utility = token.slice(index + 1);
        if (INFO_COLOR.test(utility) && SELECTED_STATE.test(variants)) {
          context.report({ node, messageId: "info", data: { token } });
        } else if (SUCCESS_HOVER.test(token)) {
          context.report({ node, messageId: "success", data: { token } });
        }
      }
    };
    return {
      Literal(node) {
        if (typeof node.value === "string") check(node, node.value);
      },
      TemplateElement(node) {
        check(node, node.value.raw);
      },
    };
  },
};

export default {
  meta: { name: "coss" },
  rules: {
    "no-comments": noComments,
    "menu-label-in-group": menuLabelInGroup,
    "selected-uses-primary": selectedUsesPrimary,
  },
};
