import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea, ScrollBar } from "@coss-app/ui/components/scroll-area";
import { Separator } from "@coss-app/ui/components/separator";

const tickets = Array.from({ length: 40 }, (_, i) => `#${1001 + i} ${["退款申請", "帳號無法登入", "發票修改", "商品瑕疵", "物流延遲"][i % 5]}`);

const meta = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-64 rounded-lg border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-semibold">工單列表</h4>
        {tickets.map((t) => (
          <div key={t}>
            <div className="text-sm">{t}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 rounded-lg border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {["客服一組", "客服二組", "帳務組", "技術支援", "物流組", "VIP 專線", "夜間值班"].map((team) => (
          <div key={team} className="flex h-24 w-36 items-center justify-center rounded-lg bg-muted text-sm">
            {team}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
