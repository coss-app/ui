import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileTextIcon, InboxIcon, SettingsIcon, TicketIcon, UserIcon } from "lucide-react";
import { Button } from "@coss-app/ui/components/button";
import { Kbd } from "@coss-app/ui/components/kbd";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@coss-app/ui/components/command";

function CommandBody() {
  return (
    <>
      <CommandInput placeholder="搜尋工單、客戶或指令…" />
      <CommandList>
        <CommandEmpty>找不到符合的結果</CommandEmpty>
        <CommandGroup heading="最近的工單">
          <CommandItem>
            <TicketIcon />
            #1024 訂單未出貨
          </CommandItem>
          <CommandItem data-checked="true">
            <TicketIcon />
            #1018 退款進度查詢
          </CommandItem>
          <CommandItem disabled>
            <TicketIcon />
            #0999 已封存的工單
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="快速前往">
          <CommandItem>
            <InboxIcon />
            收件匣
            <CommandShortcut>⌘1</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <UserIcon />
            客戶列表
            <CommandShortcut>⌘2</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FileTextIcon />
            回覆範本
            <CommandShortcut>⌘3</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            設定
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}

const meta = {
  title: "Overlays/Command",
  component: Command,
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: () => (
    <Command className="max-w-md border shadow-menu">
      <CommandBody />
    </Command>
  ),
};

function EmptyDemo() {
  // cmdk 的 Input 內部受控，不能用 defaultValue
  const [search, setSearch] = useState("不存在的關鍵字");
  return (
    <Command className="max-w-md border shadow-menu">
      <CommandInput placeholder="搜尋工單…" value={search} onValueChange={setSearch} />
      <CommandList>
        <CommandEmpty>找不到符合「不存在的關鍵字」的工單</CommandEmpty>
        <CommandGroup heading="工單">
          <CommandItem>#1024 訂單未出貨</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export const Empty: Story = {
  render: () => <EmptyDemo />,
};

function DialogDemo({ defaultOpen }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        開啟指令面板 <Kbd>⌘K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="指令面板" description="搜尋工單、客戶或指令">
        <Command>
          <CommandBody />
        </Command>
      </CommandDialog>
    </>
  );
}

export const Dialog: Story = {
  render: () => <DialogDemo />,
};

export const DialogOpen: Story = {
  render: () => <DialogDemo defaultOpen />,
};
