import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckIcon, ClockIcon, AlertTriangleIcon, ArrowRightIcon } from "lucide-react";
import { Badge } from "@coss-app/ui/components/badge";

const variants = ["default", "secondary", "info", "success", "warning", "destructive", "outline", "ghost", "link"] as const;

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  argTypes: {
    variant: { control: "select", options: variants },
  },
  args: {
    children: "處理中",
    variant: "info",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>一般諮詢</Badge>
      <Badge variant="secondary">帳務</Badge>
      <Badge variant="info">處理中</Badge>
      <Badge variant="success">已結案</Badge>
      <Badge variant="warning">待受理</Badge>
      <Badge variant="destructive">逾期</Badge>
      <Badge variant="outline">VIP 客戶</Badge>
      <Badge variant="ghost">草稿</Badge>
      <Badge variant="link">查看詳情</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">
        <CheckIcon data-icon="inline-start" />
        已結案
      </Badge>
      <Badge variant="warning">
        <ClockIcon data-icon="inline-start" />
        待受理
      </Badge>
      <Badge variant="destructive">
        <AlertTriangleIcon data-icon="inline-start" />
        逾期 2 天
      </Badge>
      <Badge variant="info">
        前往
        <ArrowRightIcon data-icon="inline-end" />
      </Badge>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge render={<a href="#tag-billing" />}>帳務問題</Badge>
      <Badge variant="info" render={<a href="#tag-processing" />}>
        處理中
      </Badge>
      <Badge variant="outline" render={<a href="#tag-vip" />}>
        VIP 客戶
      </Badge>
    </div>
  ),
};
