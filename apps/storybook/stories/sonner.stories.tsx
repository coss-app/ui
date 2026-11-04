import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";
import { Button } from "@coss-app/ui/components/button";
import { Toaster } from "@coss-app/ui/components/sonner";

const positions = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] as const;

const meta = {
  title: "Feedback/Sonner",
  component: Toaster,
  argTypes: {
    position: { control: "select", options: positions },
    richColors: { control: "boolean" },
    closeButton: { control: "boolean" },
    expand: { control: "boolean" },
  },
  args: {
    position: "bottom-right",
    richColors: false,
    closeButton: false,
    expand: false,
  },
  parameters: {
    docs: { story: { inline: false, height: "420px" } },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Types: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-wrap gap-3">
        <Button variant="neutral" onClick={() => toast("工單 #1024 已更新")}>
          default
        </Button>
        <Button
          variant="neutral"
          onClick={() => toast.success("工單已結案", { description: "已寄送滿意度問卷給客戶。" })}
        >
          success
        </Button>
        <Button variant="neutral" onClick={() => toast.info("客戶已讀取您的回覆")}>
          info
        </Button>
        <Button variant="neutral" onClick={() => toast.warning("工單 #0987 即將逾期")}>
          warning
        </Button>
        <Button variant="neutral" onClick={() => toast.error("送出失敗，請稍後再試")}>
          error
        </Button>
        <Button variant="neutral" onClick={() => toast.loading("正在同步客戶資料…")}>
          loading
        </Button>
      </div>
    </>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button
        variant="destructive"
        onClick={() =>
          toast("工單已刪除", {
            description: "工單 #1024 已移到垃圾桶。",
            action: { label: "復原", onClick: () => toast.success("已復原工單 #1024") },
          })
        }
      >
        刪除工單
      </Button>
    </>
  ),
};

export const PromiseToast: Story = {
  name: "Promise",
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "寄送回覆中…",
            success: "回覆已寄出",
            error: "寄送失敗",
          })
        }
      >
        送出回覆
      </Button>
    </>
  ),
};

export const RichColors: Story = {
  args: { richColors: true, closeButton: true },
  render: Types.render,
};
