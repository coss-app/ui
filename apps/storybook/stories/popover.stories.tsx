import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@coss-app/ui/components/button";
import { Input } from "@coss-app/ui/components/input";
import { Label } from "@coss-app/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@coss-app/ui/components/popover";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";
const sides: Side[] = ["top", "right", "bottom", "left"];
const aligns: Align[] = ["start", "center", "end"];

function ReminderPopover({
  side = "bottom",
  align = "center",
  defaultOpen,
  label = "設定提醒",
}: {
  side?: Side;
  align?: Align;
  defaultOpen?: boolean;
  label?: string;
}) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>{label}</PopoverTrigger>
      <PopoverContent side={side} align={align}>
        <PopoverHeader>
          <PopoverTitle>追蹤提醒</PopoverTitle>
          <PopoverDescription>在指定時間提醒你回覆工單 #1024。</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <Label htmlFor={`remind-${side}-${align}`}>提醒時間</Label>
          <Input id={`remind-${side}-${align}`} type="datetime-local" defaultValue="2026-11-05T10:00" />
        </div>
        <Button size="sm">儲存</Button>
      </PopoverContent>
    </Popover>
  );
}

const meta = {
  title: "Overlays/Popover",
  component: ReminderPopover,
  argTypes: {
    side: { control: "select", options: sides },
    align: { control: "select", options: aligns },
  },
  args: { side: "bottom", align: "center" },
  // 預設展開的浮層會浮在範例外：預留高度，Docs 頁預覽才不會蓋到下一個範例
  decorators: [(Story) => <div className="min-h-72"><Story /></div>],
} satisfies Meta<typeof ReminderPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3 py-40">
      {sides.map((side) => (
        <ReminderPopover key={side} side={side} label={side} />
      ))}
    </div>
  ),
};

export const Aligns: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {aligns.map((align) => (
        <ReminderPopover key={align} align={align} label={align} />
      ))}
    </div>
  ),
};
