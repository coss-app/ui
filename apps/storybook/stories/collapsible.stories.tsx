import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@coss-app/ui/components/collapsible";
import { Button } from "@coss-app/ui/components/button";

function TicketHistory({ defaultOpen = false, disabled = false }: { defaultOpen?: boolean; disabled?: boolean }) {
  return (
    <Collapsible defaultOpen={defaultOpen} disabled={disabled} className="flex max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-1">
        <h4 className="text-sm font-semibold">工單 #1024 處理紀錄（3 筆）</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="展開處理紀錄" />}>
          <ChevronsUpDownIcon />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border px-4 py-2 text-sm">10:02 客戶建立工單</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-lg border px-4 py-2 text-sm">10:15 王小明 受理</div>
        <div className="rounded-lg border px-4 py-2 text-sm">11:40 已寄送退款確認信</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

const meta = {
  title: "Navigation/Collapsible",
  component: TicketHistory,
  argTypes: {
    defaultOpen: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { defaultOpen: false, disabled: false },
} satisfies Meta<typeof TicketHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = { args: { defaultOpen: true } };

export const Disabled: Story = { args: { disabled: true } };

function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex max-w-sm flex-col gap-2">
      <CollapsibleTrigger render={<Button variant="outline" />}>
        {open ? "收合進階篩選" : "展開進階篩選"}
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-lg border p-4 text-sm text-muted-foreground">
        依負責人、優先度、建立日期篩選工單。
      </CollapsibleContent>
    </Collapsible>
  );
}

export const ControlledState: Story = {
  name: "受控",
  render: () => <Controlled />,
};
