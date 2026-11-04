import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@coss-app/ui/components/separator";

const meta = {
  title: "Layout/Separator",
  component: Separator,
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  args: { orientation: "horizontal" },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className={args.orientation === "vertical" ? "flex h-10 items-center gap-4" : "flex max-w-sm flex-col gap-4"}>
      <span className="text-sm">工單資訊</span>
      <Separator {...args} />
      <span className="text-sm">處理紀錄</span>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-sm">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold">工單 #1024</h4>
        <p className="text-sm text-muted-foreground">發票開立錯誤，需重新開立</p>
      </div>
      <Separator className="my-4" />
      <p className="text-sm">負責人：王小明</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>待受理 12</span>
      <Separator orientation="vertical" />
      <span>處理中 8</span>
      <Separator orientation="vertical" />
      <span>已結案 46</span>
    </div>
  ),
};
