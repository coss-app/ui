import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyIcon, PaperclipIcon, SendIcon } from "lucide-react";
import { Button } from "@coss-app/ui/components/button";
import { Kbd } from "@coss-app/ui/components/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@coss-app/ui/components/tooltip";

type Side = "top" | "right" | "bottom" | "left";
const sides: Side[] = ["top", "right", "bottom", "left"];

function IconTooltip({
  side = "top",
  defaultOpen,
  content = "複製工單連結",
}: {
  side?: Side;
  defaultOpen?: boolean;
  content?: string;
}) {
  return (
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label={content} />}>
        <CopyIcon />
      </TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
}

const meta = {
  title: "Overlays/Tooltip",
  component: IconTooltip,
  argTypes: {
    side: { control: "select", options: sides },
    content: { control: "text" },
  },
  args: { side: "top", content: "複製工單連結" },
} satisfies Meta<typeof IconTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex justify-center py-16">
      <IconTooltip {...args} />
    </div>
  ),
};

export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <div className="flex justify-center py-16">
      <IconTooltip {...args} />
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-6 py-16">
      {sides.map((side) => (
        <IconTooltip key={side} side={side} content={`提示（${side}）`} />
      ))}
    </div>
  ),
};

export const WithKbd: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-4 py-16">
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button aria-label="送出回覆" />}>
          <SendIcon data-icon="inline-start" />
          送出
        </TooltipTrigger>
        <TooltipContent>
          送出回覆 <Kbd>⌘ Enter</Kbd>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="secondary" size="icon" aria-label="上傳附件" />}>
          <PaperclipIcon />
        </TooltipTrigger>
        <TooltipContent side="bottom">上傳附件（最大 10 MB）</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const DisabledTrigger: Story = {
  render: () => (
    <div className="flex justify-center py-16">
      <Tooltip>
        <TooltipTrigger render={<span tabIndex={0} />}>
          <Button disabled>結案</Button>
        </TooltipTrigger>
        <TooltipContent>需先填寫處理結果才能結案</TooltipContent>
      </Tooltip>
    </div>
  ),
};
