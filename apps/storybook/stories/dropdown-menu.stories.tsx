import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDownIcon, CopyIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon, UserPlusIcon } from "lucide-react";
import { Button } from "@coss-app/ui/components/button";
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
