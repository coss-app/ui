import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRightIcon, FileTextIcon, InboxIcon, ShieldAlertIcon, TicketIcon } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@coss-app/ui/components/item";
import { Avatar, AvatarFallback } from "@coss-app/ui/components/avatar";
import { Badge } from "@coss-app/ui/components/badge";
import { Button } from "@coss-app/ui/components/button";

const variants = ["default", "outline", "muted"] as const;
const sizes = ["default", "sm", "xs"] as const;

const thumb =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#d9e6ff"/><rect x="18" y="22" width="44" height="36" rx="4" fill="#0066ff"/></svg>`
  );

const meta = {
  title: "Data Display/Item",
  component: Item,
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: sizes },
  },
  args: { variant: "outline", size: "default" },
  render: (args) => (
    <div className="max-w-md">
      <Item {...args}>
        <ItemMedia variant="icon">
          <TicketIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>工單 #1024：無法登入會員帳號</ItemTitle>
          <ItemDescription>客戶反映輸入正確密碼後仍顯示錯誤，已請客戶清除快取重試。</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="neutral">
            查看
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      {variants.map((variant) => (
        <Item key={variant} variant={variant}>
          <ItemContent>
            <ItemTitle>variant = {variant}</ItemTitle>
            <ItemDescription>退款申請已送出，預計 3–5 個工作天入帳。</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="success">已結案</Badge>
          </ItemActions>
        </Item>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      {sizes.map((size) => (
        <Item key={size} variant="outline" size={size}>
          <ItemMedia variant="image">
            <img src={thumb} alt="" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>size = {size}</ItemTitle>
            <ItemDescription>附件：訂單截圖.png</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div className="max-w-md">
      <Item variant="outline" render={<a href="#ticket-1025" />}>
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>常見問題：如何申請退款？</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </Item>
    </div>
  ),
};

export const GroupWithSeparator: Story = {
  render: () => (
    <ItemGroup className="max-w-md">
      {[
        { name: "王小明", text: "請問退款進度？", time: "10:24" },
        { name: "陳怡君", text: "我的訂單被重複扣款了", time: "09:58" },
        { name: "張志豪", text: "發票抬頭打錯，可以更改嗎？", time: "昨天" },
      ].map((c, i) => (
        <div key={c.name} role="listitem">
          {i > 0 && <ItemSeparator />}
          <Item>
            <ItemMedia>
              <Avatar>
                <AvatarFallback>{c.name[0]}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{c.name}</ItemTitle>
              <ItemDescription>{c.text}</ItemDescription>
            </ItemContent>
            <ItemContent>
              <span className="text-xs text-placeholder">{c.time}</span>
            </ItemContent>
          </Item>
        </div>
      ))}
    </ItemGroup>
  ),
};

export const HeaderAndFooter: Story = {
  render: () => (
    <div className="max-w-md">
      <Item variant="outline">
        <ItemHeader>
          <Badge variant="destructive">逾期</Badge>
          <span className="text-xs text-placeholder">SLA 超過 2 天</span>
        </ItemHeader>
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>商品到貨破損</ItemTitle>
          <ItemDescription>客戶李佳穎上傳了破損照片，需安排換貨。</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-xs text-muted-foreground">負責人：林雅婷</span>
          <Button size="xs">安排換貨</Button>
        </ItemFooter>
      </Item>
    </div>
  ),
};

export const Muted: Story = {
  render: () => (
    <div className="max-w-md">
      <Item variant="muted" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>收件匣已清空</ItemTitle>
          <ItemDescription>目前沒有待回覆的訊息。</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
};
