import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@coss-app/ui/components/button";
import { Input } from "@coss-app/ui/components/input";
import { Label } from "@coss-app/ui/components/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@coss-app/ui/components/sheet";

type Side = "top" | "right" | "bottom" | "left";
const sides: Side[] = ["top", "right", "bottom", "left"];
const sideLabel: Record<Side, string> = { top: "上方", right: "右側", bottom: "下方", left: "左側" };

function FilterSheet({
  side = "right",
  showCloseButton = true,
  defaultOpen,
}: {
  side?: Side;
  showCloseButton?: boolean;
  defaultOpen?: boolean;
}) {
  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger render={<Button variant="outline" />}>從{sideLabel[side]}開啟</SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>篩選工單</SheetTitle>
          <SheetDescription>依客戶、狀態與建立時間篩選工單列表。</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-5">
          <div className="grid gap-2">
            <Label htmlFor={`customer-${side}`}>客戶名稱</Label>
            <Input id={`customer-${side}`} placeholder="輸入客戶名稱" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`ticket-${side}`}>工單編號</Label>
            <Input id={`ticket-${side}`} placeholder="#1024" />
          </div>
        </div>
        <SheetFooter>
          <Button size="block">套用篩選</Button>
          <SheetClose render={<Button variant="ghost" />}>清除</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const meta = {
  title: "Overlays/Sheet",
  component: FilterSheet,
  argTypes: {
    side: { control: "select", options: sides },
    showCloseButton: { control: "boolean" },
  },
  args: { side: "right", showCloseButton: true },
} satisfies Meta<typeof FilterSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {sides.map((side) => (
        <FilterSheet key={side} side={side} />
      ))}
    </div>
  ),
};

export const WithoutCloseButton: Story = {
  args: { defaultOpen: true, side: "left", showCloseButton: false },
};
