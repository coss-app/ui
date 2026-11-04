import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoldIcon, ItalicIcon, StarIcon, BellOffIcon, PinIcon } from "lucide-react";
import { Toggle } from "@coss-app/ui/components/toggle";

const variants = ["default", "outline"] as const;
const sizes = ["sm", "default", "lg"] as const;

const meta = {
  title: "Inputs/Toggle",
  component: Toggle,
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: sizes },
    disabled: { control: "boolean" },
    defaultPressed: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    defaultPressed: false,
    children: (
      <>
        <StarIcon data-icon="inline-start" />
        標記重要
      </>
    ),
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const VariantsAndSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          <span className="w-20 text-xs text-muted-foreground">{variant}</span>
          {sizes.map((size) => (
            <Toggle key={size} variant={variant} size={size} aria-label="置頂工單">
              <PinIcon />
            </Toggle>
          ))}
          {sizes.map((size) => (
            <Toggle key={`t-${size}`} variant={variant} size={size}>
              <BellOffIcon data-icon="inline-start" />
              靜音
            </Toggle>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle aria-label="粗體">
        <BoldIcon />
      </Toggle>
      <Toggle defaultPressed aria-label="斜體（已按下）">
        <ItalicIcon />
      </Toggle>
      <Toggle variant="outline" defaultPressed>
        已按下
      </Toggle>
      <Toggle disabled>停用</Toggle>
      <Toggle variant="outline" disabled defaultPressed>
        停用（已按下）
      </Toggle>
      <Toggle variant="outline" aria-invalid>
        錯誤
      </Toggle>
    </div>
  ),
};
