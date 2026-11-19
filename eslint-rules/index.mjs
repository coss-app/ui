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

export default {
  meta: { name: "coss" },
  rules: { "no-comments": noComments, "menu-label-in-group": menuLabelInGroup },
};
