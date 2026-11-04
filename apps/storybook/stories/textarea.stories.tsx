import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@coss-app/ui/components/textarea";
import { Label } from "@coss-app/ui/components/label";

const meta = {
  title: "Inputs/Textarea",
  component: Textarea,
  argTypes: {
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "請描述問題發生的經過、時間與影響範圍",
    disabled: false,
    "aria-invalid": false,
  },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="ta-default">問題描述</Label>
        <Textarea id="ta-default" placeholder="請描述問題發生的經過" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="ta-filled">客服回覆</Label>
        <Textarea
          id="ta-filled"
          defaultValue={"您好，感謝您的來信。\n我們已收到您的報修申請，工程師將於明天上午 10 點前與您聯繫，請保持電話暢通。"}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="ta-error">結案說明</Label>
        <Textarea id="ta-error" aria-invalid defaultValue="已處理" />
        <p className="text-sm font-semibold text-destructive-foreground">結案說明至少需要 10 個字</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="ta-disabled">內部備註（已鎖定）</Label>
        <Textarea id="ta-disabled" disabled defaultValue="此工單已結案，無法編輯備註。" />
      </div>
    </div>
  ),
};
