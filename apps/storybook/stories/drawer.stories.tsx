import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@coss-app/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@coss-app/ui/components/drawer";

type Direction = "down" | "up" | "left" | "right";
const directions: Direction[] = ["down", "up", "left", "right"];
const directionLabel: Record<Direction, string> = { down: "下方", up: "上方", left: "左側", right: "右側" };

function ReplyDrawer({
  swipeDirection = "down",
  showSwipeHandle = true,
  defaultOpen,
  snapPoints,
}: {
  swipeDirection?: Direction;
  showSwipeHandle?: boolean;
  defaultOpen?: boolean;
  snapPoints?: (number | string)[];
}) {
  return (
    <Drawer
      swipeDirection={swipeDirection}
      showSwipeHandle={showSwipeHandle}
      defaultOpen={defaultOpen}
      snapPoints={snapPoints}
    >
      <DrawerTrigger render={<Button variant="outline" />}>從{directionLabel[swipeDirection]}開啟</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>快速回覆範本</DrawerTitle>
          <DrawerDescription>選擇一則常用回覆，送出前仍可再編輯。</DrawerDescription>
        </DrawerHeader>
        <ul className="grid gap-2 p-5">
          {["您好，已收到您的問題，我們將於 24 小時內回覆。", "請提供訂單編號，以便我們查詢出貨狀態。", "退款已完成，約 3–5 個工作天入帳。"].map((text) => (
            <li key={text} className="rounded-lg bg-muted p-3 text-sm">
              {text}
            </li>
          ))}
        </ul>
        <DrawerFooter>
          <Button size="block">插入回覆</Button>
          <DrawerClose render={<Button variant="ghost" />}>取消</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const meta = {
  title: "Overlays/Drawer",
  component: ReplyDrawer,
  argTypes: {
    swipeDirection: { control: "select", options: directions },
    showSwipeHandle: { control: "boolean" },
  },
  args: { swipeDirection: "down", showSwipeHandle: true },
} satisfies Meta<typeof ReplyDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const Directions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {directions.map((direction) => (
        <ReplyDrawer key={direction} swipeDirection={direction} />
      ))}
    </div>
  ),
};

export const SnapPoints: Story = {
  args: { snapPoints: [0.5, 1] },
};
