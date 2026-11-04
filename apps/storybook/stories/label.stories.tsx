import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@coss-app/ui/components/label";
import { Input } from "@coss-app/ui/components/input";
import { Checkbox } from "@coss-app/ui/components/checkbox";

const meta = {
  title: "Inputs/Label",
  component: Label,
  args: {
    children: "客戶姓名",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-2">
      <Label htmlFor="ticket-subject">工單主旨</Label>
      <Input id="ticket-subject" placeholder="例如：無法登入會員中心" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <Label>
      <Checkbox defaultChecked />
      同步通知負責人
    </Label>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input id="disabled-input" className="peer order-2" disabled defaultValue="T-20261104-001" />
        <Label htmlFor="disabled-input" className="order-1">
          工單編號（peer-disabled）
        </Label>
      </div>
      <div className="group flex flex-col gap-2" data-disabled="true">
        <Label>群組停用（group-data-disabled）</Label>
        <Input disabled placeholder="無法編輯" />
      </div>
    </div>
  ),
};
