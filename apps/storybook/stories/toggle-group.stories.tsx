import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@coss-app/ui/components/toggle-group";

const meta = {
  title: "Inputs/ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
    spacing: { control: { type: "number", min: 0, max: 4 } },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "outline",
    size: "default",
    spacing: 0,
    orientation: "horizontal",
    multiple: false,
    disabled: false,
    defaultValue: ["pending"],
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="pending">待受理</ToggleGroupItem>
      <ToggleGroupItem value="processing">處理中</ToggleGroupItem>
      <ToggleGroupItem value="closed">已結案</ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["default", "outline"] as const).map((variant) =>
        ([0, 2] as const).map((spacing) => (
          <div key={`${variant}-${spacing}`} className="flex items-center gap-4">
            <span className="w-32 text-xs text-muted-foreground">
              {variant} / spacing {spacing}
            </span>
            <ToggleGroup variant={variant} spacing={spacing} defaultValue={["week"]}>
              <ToggleGroupItem value="day">今日</ToggleGroupItem>
              <ToggleGroupItem value="week">本週</ToggleGroupItem>
              <ToggleGroupItem value="month">本月</ToggleGroupItem>
            </ToggleGroup>
          </div>
        ))
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ToggleGroup key={size} variant="outline" size={size} spacing={0} defaultValue={["left"]}>
          <ToggleGroupItem value="left" aria-label="靠左">
            <AlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="置中">
            <AlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="靠右">
            <AlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple variant="outline" defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold" aria-label="粗體">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="斜體">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="底線">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" variant="outline" spacing={0} defaultValue={["phone"]}>
      <ToggleGroupItem value="phone">電話</ToggleGroupItem>
      <ToggleGroupItem value="email">電子郵件</ToggleGroupItem>
      <ToggleGroupItem value="line">LINE</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup disabled variant="outline" defaultValue={["a"]}>
        <ToggleGroupItem value="a">全部停用</ToggleGroupItem>
        <ToggleGroupItem value="b">選項 B</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant="outline" defaultValue={["a"]}>
        <ToggleGroupItem value="a">可用</ToggleGroupItem>
        <ToggleGroupItem value="b" disabled>
          單項停用
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
