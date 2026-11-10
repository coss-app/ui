import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@coss-app/ui/components/button";
import { Toaster, toast } from "@coss-app/ui/components/toast";

const types = ["success", "info", "warning", "error", "loading"] as const;

const copy: Record<(typeof types)[number], { title: string; description: string }> = {
  success: { title: "工單已建立", description: "工單 #1024 已指派給客服組，預計 30 分鐘內回覆。" },
  info: { title: "客戶已讀取訊息", description: "陳先生於 14:32 讀取了您的回覆。" },
  warning: { title: "即將逾期", description: "工單 #0987 距離 SLA 時限剩 15 分鐘。" },
  error: { title: "送出失敗", description: "網路連線中斷，請稍後再試。" },
  loading: { title: "上傳附件中", description: "發票照片.jpg（2.4 MB）" },
};

/** 掛載時先跳一則，畫面才有內容；固定 id 避免 StrictMode 重複新增 */
function ShowOnMount({ id, children }: { id: string; children?: React.ReactNode }) {
  React.useEffect(() => {
    // 子組件的 effect 比外層 Toaster（Provider）先跑，Provider 還沒訂閱 toast manager；延到下一輪再加
    const timer = setTimeout(() => {
      toast.add({ id, title: "歡迎回來", description: "您有 5 張待處理工單。", type: "info", timeout: 0 });
    });
    return () => clearTimeout(timer);
  }, [id]);
  return <>{children}</>;
}

const meta = {
  title: "Feedback/Toast",
  component: Toaster,
  decorators: [
    (Story) => (
      <Toaster>
        <Story />
      </Toaster>
    ),
  ],
  parameters: {
    docs: { story: { inline: false, height: "420px" } },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Types: Story = {
  render: () => (
    <ShowOnMount id="toast-types-welcome">
      <div className="flex flex-wrap gap-3">
        {types.map((type) => (
          <Button
            key={type}
            variant="neutral"
            onClick={() => toast.add({ ...copy[type], type, timeout: type === "loading" ? 0 : undefined })}
          >
            {type}
          </Button>
        ))}
      </div>
    </ShowOnMount>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast.add({ title: "已複製工單連結", type: "success" })}>
      複製連結
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ShowOnMount id="toast-action-welcome">
      <Button
        variant="destructive"
        onClick={() => {
          const id = toast.add({
            title: "工單已刪除",
            description: "工單 #1024 已移到垃圾桶。",
            timeout: 8000,
            actionProps: {
              children: "復原",
              onClick: () => {
                toast.close(id);
                toast.add({ title: "已復原工單 #1024", type: "success" });
              },
            },
          });
        }}
      >
        刪除工單
      </Button>
    </ShowOnMount>
  ),
};

export const PromiseToast: Story = {
  name: "Promise（載入 → 成功／失敗）",
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: { title: "寄送回覆中…", type: "loading" },
            success: { title: "回覆已寄出", description: "客戶將收到 Email 通知。", type: "success" },
            error: { title: "寄送失敗", type: "error" },
          })
        }
      >
        送出回覆（成功）
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast
            .promise(new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 1500)), {
              loading: { title: "寄送回覆中…", type: "loading" },
              success: { title: "回覆已寄出", type: "success" },
              error: { title: "寄送失敗", description: "郵件伺服器逾時，請稍後再試。", type: "error" },
            })
            .catch(() => {})
        }
      >
        送出回覆（失敗）
      </Button>
    </div>
  ),
};

export const Stacked: Story = {
  name: "多則堆疊",
  render: () => (
    <Button
      variant="secondary"
      onClick={() => {
        types.forEach((type, i) => {
          setTimeout(() => toast.add({ ...copy[type], type, timeout: 0 }), i * 200);
        });
      }}
    >
      一次跳出 5 則
    </Button>
  ),
};
