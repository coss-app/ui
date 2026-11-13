import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyIcon, ReplyIcon, Trash2Icon } from "lucide-react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@coss-app/ui/components/context-menu";

function MessageContextMenu({ defaultOpen }: { defaultOpen?: boolean }) {
  const [pinned, setPinned] = useState(false);
  const [priority, setPriority] = useState("normal");
  return (
    <ContextMenu defaultOpen={defaultOpen}>
      <ContextMenuTrigger className="flex h-48 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border-strong text-sm text-muted-foreground">
        在此區域按右鍵（或長按）開啟選單
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuLabel>客戶訊息</ContextMenuLabel>
          <ContextMenuItem>
            <ReplyIcon />
            回覆
            <ContextMenuShortcut>R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <CopyIcon />
            複製內容
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>轉為內部備註</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>加上標籤</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>退款</ContextMenuItem>
              <ContextMenuItem>物流</ContextMenuItem>
              <ContextMenuItem>帳號問題</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          釘選訊息
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={priority} onValueChange={(v) => setPriority(v as string)}>
          <ContextMenuLabel inset>優先等級</ContextMenuLabel>
          <ContextMenuRadioItem value="high">高</ContextMenuRadioItem>
          <ContextMenuRadioItem value="normal">一般</ContextMenuRadioItem>
          <ContextMenuRadioItem value="low">低</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          刪除訊息
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

const meta = {
  title: "Overlays/ContextMenu",
  component: MessageContextMenu,
  // 預設展開的浮層會浮在範例外：預留高度，Docs 頁預覽才不會蓋到下一個範例
  decorators: [(Story) => <div className="min-h-90"><Story /></div>],
} satisfies Meta<typeof MessageContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};
