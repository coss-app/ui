import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "@coss-app/ui/components/slider";
import { Label } from "@coss-app/ui/components/label";

const meta = {
  title: "Inputs/Slider",
  component: Slider,
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: {
    defaultValue: [40],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: "horizontal",
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Range: Story = {
  args: { defaultValue: [20, 80] },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<number[]>([24]);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label>回覆時限（小時）</Label>
          <span className="text-sm tabular-nums text-muted-foreground">{value[0]} 小時</span>
        </div>
        <Slider
          value={value}
          onValueChange={(v) => setValue(Array.isArray(v) ? [...v] : [v])}
          min={1}
          max={72}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>滿意度門檻（停用）</Label>
        <Slider defaultValue={[60]} disabled />
      </div>
      <div className="flex flex-col gap-2">
        <Label>步進 10</Label>
        <Slider defaultValue={[30]} step={10} />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-48 gap-8">
      <Slider defaultValue={[50]} orientation="vertical" />
      <Slider defaultValue={[25, 75]} orientation="vertical" />
    </div>
  ),
};
