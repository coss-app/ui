import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@coss-app/ui/components/checkbox";
import { Label } from "@coss-app/ui/components/label";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  args: { disabled: false, indeterminate: false, "aria-invalid": false, defaultChecked: true },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label>
        <Checkbox />
        未選取
      </Label>
      <Label>
        <Checkbox defaultChecked />
        已選取：通知客戶處理進度
      </Label>
      <Label>
        <Checkbox indeterminate />
        部分選取（3 / 10 張工單）
      </Label>
      <Label>
        <Checkbox aria-invalid />
        我已閱讀並同意服務條款（必填）
      </Label>
      <Label>
        <Checkbox disabled />
        停用（未選取）
      </Label>
      <Label>
        <Checkbox disabled defaultChecked />
        停用（已選取）
      </Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex max-w-sm items-start gap-3">
      <Checkbox id="cb-desc" defaultChecked />
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cb-desc">結案後寄送滿意度調查</Label>
        <p className="text-sm text-muted-foreground">客戶會在工單結案 1 小時後收到問卷連結。</p>
      </div>
    </div>
  ),
};
