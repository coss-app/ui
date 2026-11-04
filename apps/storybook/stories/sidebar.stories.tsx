import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BarChart3Icon,
  ChevronRightIcon,
  HomeIcon,
  InboxIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
  TicketIcon,
  UsersIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@coss-app/ui/components/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@coss-app/ui/components/collapsible";

type DemoProps = {
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  side?: "left" | "right";
  defaultOpen?: boolean;
  loading?: boolean;
};

const nav = [
  { icon: HomeIcon, label: "總覽" },
  { icon: InboxIcon, label: "收件匣", badge: "12", active: true },
  { icon: BarChart3Icon, label: "即時統計" },
  { icon: UsersIcon, label: "客戶" },
];

function SidebarDemo({
  variant = "sidebar",
  collapsible = "icon",
  side = "left",
  defaultOpen = true,
  loading = false,
}: DemoProps) {
  return (
    // Sidebar 桌面版用 fixed + h-svh；在 Storybook 內以 absolute 讓它限制在示範框裡
    <div className="relative h-[600px] overflow-hidden rounded-xl border">
      <SidebarProvider defaultOpen={defaultOpen} className="h-full min-h-0">
        <Sidebar variant={variant} collapsible={collapsible} side={side} className="absolute h-full">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="coss 客服">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <TicketIcon />
                  </div>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-semibold">coss 客服</span>
                    <span className="truncate text-xs text-muted-foreground">台北總部</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarInput placeholder="搜尋工單…" />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>工作區</SidebarGroupLabel>
              <SidebarGroupAction title="新增工單">
                <PlusIcon />
                <span className="sr-only">新增工單</span>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.map(({ icon: Icon, label, badge, active }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton isActive={active} tooltip={label}>
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                      {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  ))}
                  <Collapsible defaultOpen render={<SidebarMenuItem />}>
                    <CollapsibleTrigger render={<SidebarMenuButton tooltip="工單" />}>
                      <TicketIcon />
                      <span>工單</span>
                      <ChevronRightIcon className="ml-auto transition-transform in-data-open:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#" isActive>
                            <span>待受理</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#">
                            <span>處理中</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#" size="sm">
                            <span>已結案（sm）</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled tooltip="報表（停用）">
                      <BarChart3Icon />
                      <span>報表（停用）</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>我的團隊</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {loading ? (
                    Array.from({ length: 3 }, (_, i) => (
                      <SidebarMenuItem key={i}>
                        <SidebarMenuSkeleton showIcon />
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton variant="outline" tooltip="帳務組">
                          <UsersIcon />
                          <span>帳務組（outline）</span>
                        </SidebarMenuButton>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontalIcon />
                          <span className="sr-only">更多</span>
                        </SidebarMenuAction>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton size="sm" tooltip="技術支援組">
                          <UsersIcon />
                          <span>技術支援組（sm）</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="設定">
                  <SettingsIcon />
                  <span>設定</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-semibold">收件匣</span>
            <span className="ml-auto text-xs text-muted-foreground">⌘/Ctrl + B 切換側欄</span>
          </header>
          <div className="flex flex-1 flex-col gap-3 p-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="h-16 rounded-lg bg-muted" />
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

const meta = {
  title: "Navigation/Sidebar",
  component: SidebarDemo,
  argTypes: {
    variant: { control: "select", options: ["sidebar", "floating", "inset"] },
    collapsible: { control: "select", options: ["offcanvas", "icon", "none"] },
    side: { control: "inline-radio", options: ["left", "right"] },
    defaultOpen: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: { variant: "sidebar", collapsible: "icon", side: "left", defaultOpen: true, loading: false },
} satisfies Meta<typeof SidebarDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IconCollapsed: Story = {
  name: "收合為圖示",
  args: { defaultOpen: false, collapsible: "icon" },
};

export const Offcanvas: Story = {
  args: { collapsible: "offcanvas" },
};

export const Floating: Story = {
  args: { variant: "floating" },
};

export const Inset: Story = {
  args: { variant: "inset" },
};

export const RightSide: Story = {
  args: { side: "right" },
};

export const Loading: Story = {
  args: { loading: true },
};
