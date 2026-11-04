import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileCodeIcon, TerminalIcon, TriangleAlertIcon } from "lucide-react";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@coss-app/ui/components/code-block";
import { useHighlightedCode } from "@coss-app/ui/hooks/use-highlighted-code";

const webhook = `// 工單建立時通知客服群組
export async function onTicketCreated(ticket: Ticket) {
  const message = \`新工單 \${ticket.id}：\${ticket.subject}\`;
  await notify("#cs-team", message);
  return { ok: true };
}
`;

const meta = {
  title: "Data Display/CodeBlock",
  component: CodeBlock,
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
    size: { control: "select", options: ["default", "sm"] },
  },
  args: { variant: "default", size: "default" },
  render: (args) => (
    <CodeBlock {...args} className="max-w-xl">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCodeIcon />
          webhook.ts
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={webhook} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>{webhook}</CodeBlockContent>
    </CodeBlock>
  ),
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Small: Story = { args: { size: "sm" } };

export const FloatingCopy: Story = {
  render: () => (
    <CodeBlock className="max-w-xl">
      <CodeBlockActions>
        <CodeBlockCopyButton value="npm install @coss-app/ui" />
      </CodeBlockActions>
      <CodeBlockContent>npm install @coss-app/ui</CodeBlockContent>
    </CodeBlock>
  ),
};

function HighlightedExample() {
  const lines = useHighlightedCode(webhook, "ts");
  return (
    <CodeBlock className="max-w-xl">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCodeIcon />
          webhook.ts（shiki 上色）
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={webhook} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, i) => (
          <CodeBlockLine key={i} variant={i === 3 ? "highlighted" : "default"}>
            {line}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  );
}

export const Highlighted: Story = {
  render: () => <HighlightedExample />,
};

export const Diff: Story = {
  render: () => (
    <CodeBlock className="max-w-xl">
      <CodeBlockHeader>
        <CodeBlockTitle>sla.config.json</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        <CodeBlockLine>{"{"}</CodeBlockLine>
        <CodeBlockLine variant="removed">{'  "firstResponseMinutes": 60,'}</CodeBlockLine>
        <CodeBlockLine variant="added">{'  "firstResponseMinutes": 30,'}</CodeBlockLine>
        <CodeBlockLine variant="highlighted">{'  "escalateTo": "主管"'}</CodeBlockLine>
        <CodeBlockLine />
        <CodeBlockLine>{"}"}</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  ),
};

export const Wrap: Story = {
  render: () => (
    <CodeBlock className="max-w-sm">
      <CodeBlockContent wrap>
        {"客戶留言：您好，我在 11/03 下單的商品到現在都還沒收到，物流查詢一直顯示「配送中」，請問可以幫我確認一下嗎？謝謝。"}
      </CodeBlockContent>
    </CodeBlock>
  ),
};

export const Destructive: Story = {
  render: () => (
    <CodeBlock variant="destructive" className="max-w-xl">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <TriangleAlertIcon />
          同步失敗
        </CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent>{"Error: 504 Gateway Timeout\n  at syncTickets (sync.ts:42)"}</CodeBlockContent>
      <CodeBlockFooter>
        <TerminalIcon className="size-3.5" />
        <span className="text-xs">2026/11/04 10:24 重試 3 次後放棄</span>
      </CodeBlockFooter>
    </CodeBlock>
  ),
};
