import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontalIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@coss-app/ui/components/card";
import { Badge } from "@coss-app/ui/components/badge";
import { Button } from "@coss-app/ui/components/button";

const cover =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="320"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#07ce6f"/><stop offset="1" stop-color="#0066ff"/></linearGradient></defs><rect width="640" height="320" fill="url(#g)"/><text x="320" y="175" font-family="sans-serif" font-size="36" fill="#fff" text-anchor="middle">客服中心公告</text></svg>`
  );

const meta = {
  title: "Data Display/Card",
  component: Card,
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
  },
  args: { size: "default" },
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>工單 #1024：無法登入會員帳號</CardTitle>
        <CardDescription>王小明・建立於 2026/11/04 10:24</CardDescription>
        <CardAction>
          <Badge variant="info">處理中</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        客戶反映輸入正確密碼後仍顯示「帳號或密碼錯誤」，已請客戶清除瀏覽器快取並重新嘗試。
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">回覆客戶</Button>
        <Button size="sm" variant="ghost">
          轉派
        </Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: "sm" } };

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {(["default", "sm"] as const).map((size) => (
        <Card key={size} size={size}>
          <CardHeader>
            <CardTitle>size = {size}</CardTitle>
            <CardDescription>今日待處理工單</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-heading">18</div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>客服滿意度</CardTitle>
        <CardDescription>近 30 天</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="更多">
            <MoreHorizontalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold text-heading">4.8 / 5</div>
        <p className="text-muted-foreground">較上月提升 0.3</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="max-w-sm">
      <img src={cover} alt="公告封面" className="aspect-[2/1] w-full object-cover" />
      <CardHeader>
        <CardTitle>雙十一客服加班公告</CardTitle>
        <CardDescription>11/10–11/12 客服時段延長至 24:00</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size="block">我知道了</Button>
      </CardFooter>
    </Card>
  ),
};

export const HeaderBorder: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>處理紀錄</CardTitle>
        <CardDescription>依時間排序</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-muted-foreground">
        <p>10:24 林雅婷 受理工單</p>
        <p>10:31 林雅婷 回覆客戶</p>
        <p>10:45 客戶補充截圖</p>
      </CardContent>
    </Card>
  ),
};
