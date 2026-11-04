import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "@coss-app/ui/components/switch";
import { Label } from "@coss-app/ui/components/label";

const meta = {
  title: "Inputs/Switch",
  component: Switch,
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
  args: {
    size: "default",
    disabled: false,
    defaultChecked: true,
    "aria-label": "自動指派工單",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["default", "sm"] as const).map((size) => (
        <div key={size} className="flex items-center gap-6">
          <span className="w-16 text-xs text-muted-foreground">{size}</span>
          <Switch size={size} aria-label="關閉" />
          <Switch size={size} defaultChecked aria-label="開啟" />
        </div>
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label className="gap-3">
        <Switch defaultChecked />
        新工單通知
      </Label>
      <Label className="gap-3">
        <Switch />
        下班時間自動回覆
      </Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label className="gap-3">
        <Switch disabled />
        停用（關）
      </Label>
      <Label className="gap-3">
        <Switch disabled defaultChecked />
        停用（開）
      </Label>
      <Label className="gap-3">
        <Switch aria-invalid />
        錯誤：需同意服務條款
      </Label>
    </div>
  ),
};
