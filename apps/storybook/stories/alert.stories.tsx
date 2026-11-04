import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@coss-app/ui/components/alert";
import { Button } from "@coss-app/ui/components/button";

const variants = ["default", "success", "warning", "destructive"] as const;

const icons = {
  default: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  destructive: OctagonXIcon,
} as const;

const copy = {
  default: { title: "系統維護通知", description: "11 月 8 日 02:00–04:00 進行例行維護，期間工單將暫停自動派送。" },
  success: { title: "工單已結案", description: "工單 #1024 已由客服人員王小明結案，並寄送滿意度問卷給客戶。" },
  warning: { title: "即將逾期", description: "有 3 張工單將在 2 小時內超過 SLA 回覆時限，請盡快處理。" },
  destructive: { title: "附件上傳失敗", description: "檔案超過 10 MB 上限，請壓縮後重新上傳。" },
} as const;

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  argTypes: {
    variant: { control: "select", options: variants },
  },
  args: {
    variant: "default",
  },
  render: (args) => {
    const Icon = icons[args.variant ?? "default"];
    const text = copy[args.variant ?? "default"];
    return (
      <Alert {...args} className="max-w-xl">
        <Icon />
        <AlertTitle>{text.title}</AlertTitle>
        <AlertDescription>{text.description}</AlertDescription>
      </Alert>
    );
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      {variants.map((variant) => {
        const Icon = icons[variant];
        return (
          <Alert key={variant} variant={variant}>
            <Icon />
            <AlertTitle>{copy[variant].title}</AlertTitle>
            <AlertDescription>{copy[variant].description}</AlertDescription>
          </Alert>
        );
      })}
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      {variants.map((variant) => {
        const Icon = icons[variant];
        return (
          <Alert key={variant} variant={variant}>
            <Icon />
            <AlertTitle>{copy[variant].title}</AlertTitle>
          </Alert>
        );
      })}
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      {variants.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertTitle>{copy[variant].title}</AlertTitle>
          <AlertDescription>{copy[variant].description}</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>即將逾期</AlertTitle>
        <AlertDescription>
          有 3 張工單將在 2 小時內超過 SLA 回覆時限。<a href="#overdue">查看清單</a>
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="outline">
            處理
          </Button>
        </AlertAction>
      </Alert>
      <Alert>
        <InfoIcon />
        <AlertTitle>有新版本的回覆範本</AlertTitle>
        <AlertAction>
          <Button size="xs" variant="ghost">
            更新
          </Button>
        </AlertAction>
      </Alert>
    </div>
  ),
};
