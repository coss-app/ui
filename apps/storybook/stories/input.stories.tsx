import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@coss-app/ui/components/input";
import { Label } from "@coss-app/ui/components/label";

const meta = {
  title: "Inputs/Input",
  component: Input,
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number", "search", "tel", "url", "file", "date"] },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    type: "text",
    placeholder: "請輸入工單標題",
    disabled: false,
    "aria-invalid": false,
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="in-default">客戶名稱</Label>
        <Input id="in-default" placeholder="例如：王小明" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="in-filled">聯絡電話</Label>
        <Input id="in-filled" type="tel" defaultValue="0912-345-678" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="in-error">電子郵件</Label>
        <Input id="in-error" type="email" defaultValue="service@" aria-invalid />
        <p className="text-sm font-semibold text-destructive-foreground">電子郵件格式不正確</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="in-disabled">工單編號（系統產生）</Label>
        <Input id="in-disabled" defaultValue="#TK-2026-1104" disabled />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="in-readonly">建立時間</Label>
        <Input id="in-readonly" defaultValue="2026/11/04 14:30" readOnly />
      </div>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Input type="password" placeholder="密碼" />
      <Input type="number" placeholder="處理時數" />
      <Input type="search" placeholder="搜尋工單" />
      <Input type="date" />
      <Input type="file" />
    </div>
  ),
};
