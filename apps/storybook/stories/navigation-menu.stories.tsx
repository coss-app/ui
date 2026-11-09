import type { Meta, StoryObj } from "@storybook/react-vite";
import { BookOpenIcon, HeadsetIcon, MessageSquareIcon, TicketIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@coss-app/ui/components/navigation-menu";

const products = [
  { icon: TicketIcon, title: "工單系統", desc: "集中管理客戶問題與處理進度" },
  { icon: MessageSquareIcon, title: "即時對話", desc: "網站、LINE、Messenger 一站回覆" },
  { icon: HeadsetIcon, title: "客服中心", desc: "電話客服排班與通話紀錄" },
  { icon: BookOpenIcon, title: "知識庫", desc: "常見問題與自助服務文章" },
];

const meta = {
  title: "Navigation/NavigationMenu",
  component: NavigationMenu,
  argTypes: {
    align: { control: "inline-radio", options: ["start", "center", "end"] },
  },
  args: { align: "start" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-80">
      <NavigationMenu {...args}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>產品</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-105 grid-cols-2 gap-1 p-1">
                {products.map(({ icon: Icon, title, desc }) => (
                  <li key={title}>
                    <NavigationMenuLink href="#" className="items-start">
                      <Icon className="mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{title}</span>
                        <span className="text-xs text-muted-foreground">{desc}</span>
                      </div>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>資源</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex w-56 flex-col gap-1 p-1">
                <li>
                  <NavigationMenuLink href="#">使用教學</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">API 文件</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">更新日誌</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {/* eslint-disable-next-line shadcn/require-static-classes -- 套件匯出的 navigationMenuTriggerStyle() 是官方用法 */}
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              價格方案
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled>企業版（即將推出）</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
