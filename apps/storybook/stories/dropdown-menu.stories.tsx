import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ChevronDownIcon,
  CopyIcon,
  LanguagesIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PencilIcon,
  SettingsIcon,
  SunMoonIcon,
  Trash2Icon,
  UserPlusIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@coss-app/ui/components/avatar";
import { Button } from "@coss-app/ui/components/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@coss-app/ui/components/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@coss-app/ui/components/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@coss-app/ui/components/toggle-group";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

function TicketActionsMenu({
  side = "bottom",
  align = "start",
  defaultOpen,
}: {
  side?: Side;
  align?: Align;
  defaultOpen?: boolean;
}) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={<Button variant="neutral" />}>
        工單操作
        <ChevronDownIcon data-icon="inline-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align} className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>工單 #1024</DropdownMenuLabel>
          <DropdownMenuItem>
            <PencilIcon />
            編輯
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon />
            複製連結
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlusIcon />
              轉派給
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>王小明</DropdownMenuItem>
              <DropdownMenuItem>林雅婷</DropdownMenuItem>
              <DropdownMenuItem disabled>張志豪（休假中）</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem disabled>合併工單</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2Icon />
          刪除工單
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta = {
  title: "Overlays/DropdownMenu",
  component: TicketActionsMenu,
  argTypes: {
    side: { control: "select", options: ["top", "right", "bottom", "left"] },
    align: { control: "select", options: ["start", "center", "end"] },
  },
  args: { side: "bottom", align: "start" },
  decorators: [(Story) => <div className="min-h-136"><Story /></div>],
} satisfies Meta<typeof TicketActionsMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

function ViewOptionsMenu() {
  const [columns, setColumns] = useState({ customer: true, assignee: true, sla: false });
  const [sort, setSort] = useState("updated");
  return (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="檢視選項" />}>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>顯示欄位</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={columns.customer}
            onCheckedChange={(v) => setColumns((c) => ({ ...c, customer: v }))}
          >
            客戶名稱
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={columns.assignee}
            onCheckedChange={(v) => setColumns((c) => ({ ...c, assignee: v }))}
          >
            處理人
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={columns.sla}
            onCheckedChange={(v) => setColumns((c) => ({ ...c, sla: v }))}
          >
            SLA 剩餘時間
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem disabled checked>
            工單編號（必顯示）
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(v as string)}>
          <DropdownMenuLabel>排序方式</DropdownMenuLabel>
          <DropdownMenuRadioItem value="updated">最後更新</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="created">建立時間</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="priority">優先等級</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const CheckboxAndRadio: Story = {
  render: () => <ViewOptionsMenu />,
};

export const Inset: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger render={<Button variant="outline" />}>狀態</DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>變更狀態</DropdownMenuLabel>
          <DropdownMenuItem inset>待受理</DropdownMenuItem>
          <DropdownMenuItem inset>處理中</DropdownMenuItem>
          <DropdownMenuItem inset>已結案</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

const themes = [
  { value: "light", label: "淺色" },
  { value: "dark", label: "深色" },
  { value: "system", label: "跟隨系統" },
];
const locales = [
  { value: "zh-TW", label: "繁體中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

const user = { name: "王小明", email: "support@coss.com.tw" };

const userTrigger = (
  <Button variant="ghost" size="icon" aria-label="帳號選單" className="pointer-coarse:size-11" />
);

function UserAvatar() {
  return (
    <Avatar size="lg">
      <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
}

function UserIdentity() {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-heading">{user.name}</p>
      <p className="truncate text-xs text-muted-foreground" title={user.email}>
        {user.email}
      </p>
    </div>
  );
}

function UserMenuDesktop({ defaultOpen }: { defaultOpen?: boolean }) {
  const [theme, setTheme] = useState("system");
  const [locale, setLocale] = useState("zh-TW");
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={userTrigger}>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-3.5 py-2">
          <UserIdentity />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<a href="#settings" />}>
            <SettingsIcon />
            個人設定
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoonIcon />
              <span className="flex-1">主題</span>
              <span className="text-xs text-muted-foreground">{themes.find((t) => t.value === theme)?.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as string)}>
                {themes.map((t) => (
                  <DropdownMenuRadioItem key={t.value} value={t.value}>
                    {t.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <LanguagesIcon />
              <span className="flex-1">語言</span>
              <span className="text-xs text-muted-foreground">{locales.find((l) => l.value === locale)?.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={locale} onValueChange={(v) => setLocale(v as string)}>
                {locales.map((l) => (
                  <DropdownMenuRadioItem key={l.value} value={l.value}>
                    {l.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
          登出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenuMobile({ defaultOpen }: { defaultOpen?: boolean }) {
  const [theme, setTheme] = useState("system");
  const [locale, setLocale] = useState("zh-TW");
  return (
    <Drawer defaultOpen={defaultOpen}>
      <DrawerTrigger render={userTrigger}>
        <UserAvatar />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="sr-only">帳號選單</DrawerTitle>
          <UserIdentity />
        </DrawerHeader>
        <div className="grid gap-4 px-5 pb-2">
          <DrawerClose
            nativeButton={false}
            render={<a href="#settings" className="flex h-12 items-center gap-3 rounded-lg text-sm active:bg-muted" />}
          >
            <SettingsIcon className="size-4" />
            個人設定
          </DrawerClose>
          {[
            { label: "主題", options: themes, value: theme, onChange: setTheme },
            { label: "語言", options: locales, value: locale, onChange: setLocale },
          ].map(({ label, options, value, onChange }) => (
            <div key={label} className="grid gap-2">
              <span className="text-sm font-semibold text-placeholder">{label}</span>
              <ToggleGroup
                variant="outline"
                spacing={0}
                size="lg"
                aria-label={label}
                value={[value]}
                onValueChange={(v) => v[0] && onChange(v[0])}
                className="w-full"
              >
                {options.map((o) => (
                  <ToggleGroupItem key={o.value} value={o.value} className="flex-1">
                    {o.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <Button variant="ghost" size="lg">
            <LogOutIcon data-icon="inline-start" />
            登出
          </Button>
          <DrawerClose render={<Button variant="ghost" size="lg" />}>關閉</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const UserMenu: Story = {
  render: (args) => <UserMenuDesktop defaultOpen={args.defaultOpen} />,
  args: { defaultOpen: true },
  decorators: [(Story) => <div className="flex min-h-96 justify-end"><Story /></div>],
  parameters: { docs: { description: { story: "頭像選單：頂列最右側。登出、主題、語言都收在這裡，不在頂列另放切換鈕" } } },
};

export const UserMenuOnMobile: Story = {
  render: (args) => <UserMenuMobile defaultOpen={args.defaultOpen} />,
  args: { defaultOpen: true },
  globals: { viewport: { value: "mobile", isRotated: false } },
  parameters: {
    docs: {
      description: { story: "手機（< md）：底部 Drawer；主題、語言為分段按鈕" },
      story: { inline: false, height: "520px" },
    },
  },
  decorators: [(Story) => <div className="flex min-h-96 justify-end"><Story /></div>],
};
