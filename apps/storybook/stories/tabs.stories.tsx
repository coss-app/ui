import type { Meta, StoryObj } from "@storybook/react-vite";
import { InboxIcon, ClockIcon, CheckCircle2Icon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@coss-app/ui/components/tabs";
import { Badge } from "@coss-app/ui/components/badge";

type ListVariant = "default" | "line";

function TicketTabs({
  variant = "default",
  orientation = "horizontal",
}: {
  variant?: ListVariant;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <Tabs defaultValue="pending" orientation={orientation} className="max-w-xl">
      <TabsList variant={variant}>
        <TabsTrigger value="pending">待受理</TabsTrigger>
        <TabsTrigger value="processing">處理中</TabsTrigger>
        <TabsTrigger value="done">已結案</TabsTrigger>
        <TabsTrigger value="archived" disabled>
          已封存
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pending" className="p-2">
        共 12 張工單等待客服受理，最早一張已等候 3 小時。
      </TabsContent>
      <TabsContent value="processing" className="p-2">
        8 張工單處理中，其中 2 張即將逾期。
      </TabsContent>
      <TabsContent value="done" className="p-2">
        本週已結案 46 張，平均處理時間 4.2 小時。
      </TabsContent>
      <TabsContent value="archived" className="p-2">
        封存資料僅供查詢。
      </TabsContent>
    </Tabs>
  );
}

const meta = {
  title: "Navigation/Tabs",
  component: TicketTabs,
  argTypes: {
    variant: { control: "select", options: ["default", "line"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  args: { variant: "default", orientation: "horizontal" },
} satisfies Meta<typeof TicketTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <TicketTabs variant="default" />
      <TicketTabs variant="line" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      <TicketTabs orientation="vertical" />
      <TicketTabs orientation="vertical" variant="line" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="inbox" className="max-w-xl">
      <TabsList>
        <TabsTrigger value="inbox">
          <InboxIcon />
          收件匣
          <Badge variant="info">12</Badge>
        </TabsTrigger>
        <TabsTrigger value="snoozed">
          <ClockIcon />
          稍後處理
        </TabsTrigger>
        <TabsTrigger value="resolved">
          <CheckCircle2Icon />
          已解決
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox" className="p-2">
        收件匣有 12 則新的客戶訊息。
      </TabsContent>
      <TabsContent value="snoozed" className="p-2">
        3 則訊息設定為明天上午提醒。
      </TabsContent>
      <TabsContent value="resolved" className="p-2">
        今日已解決 18 則。
      </TabsContent>
    </Tabs>
  ),
};
