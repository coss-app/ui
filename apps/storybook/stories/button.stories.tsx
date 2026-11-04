import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon, SendIcon, PaperclipIcon, XIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@coss-app/ui/components/button";
import { Spinner } from "@coss-app/ui/components/spinner";

const variants = ["default", "outline", "secondary", "neutral", "ghost", "destructive", "link"] as const;
const sizes = ["default", "xs", "sm", "lg", "block"] as const;
const iconSizes = ["icon", "icon-xs", "icon-sm", "icon-lg"] as const;

const meta = {
  title: "Inputs/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: [...sizes, ...iconSizes] },
    disabled: { control: "boolean" },
  },
  args: {
    children: "建立工單",
    variant: "default",
    size: "default",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>建立工單</Button>
      <Button variant="outline">儲存草稿</Button>
      <Button variant="secondary">
        <PaperclipIcon data-icon="inline-start" />
        上傳附件
      </Button>
      <Button variant="neutral">指派</Button>
      <Button variant="ghost">取消</Button>
      <Button variant="destructive">刪除工單</Button>
      <Button variant="link">查看處理紀錄</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          <span className="w-24 text-xs text-muted-foreground">{variant}</span>
          {(["xs", "sm", "default", "lg"] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              回覆客戶
            </Button>
          ))}
        </div>
      ))}
      <div className="max-w-sm">
        <Button size="block">送出申請</Button>
      </div>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {iconSizes.map((size) => (
        <Button key={size} size={size} aria-label="新增工單">
          <PlusIcon />
        </Button>
      ))}
      <Button variant="ghost" size="icon" aria-label="關閉">
        <XIcon />
      </Button>
      <Button variant="neutral" size="icon-sm" aria-label="新增">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="送出">
        <SendIcon />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <PlusIcon data-icon="inline-start" />
        新增工單
      </Button>
      <Button variant="outline">
        下一步
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            停用
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled>
          <Spinner data-icon="inline-start" />
          寄送中
        </Button>
        <Button variant="outline" disabled>
          <Spinner data-icon="inline-start" />
          驗證中
        </Button>
        <Button variant="neutral" aria-invalid>
          格式錯誤
        </Button>
      </div>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Button render={<a href="#ticket-1024" />} nativeButton={false}>
      前往工單 #1024
    </Button>
  ),
};
