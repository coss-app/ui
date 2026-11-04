import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@coss-app/ui/components/menubar";

function TicketMenubar({ openFirst }: { openFirst?: boolean }) {
  const [showClosed, setShowClosed] = useState(false);
  const [showInternal, setShowInternal] = useState(true);
  const [density, setDensity] = useState("comfortable");
  return (
    <Menubar>
      <MenubarMenu defaultOpen={openFirst}>
        <MenubarTrigger>工單</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            新增工單 <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            匯入 CSV <MenubarShortcut>⌘I</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>匯出</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>匯出為 Excel</MenubarItem>
              <MenubarItem>匯出為 PDF</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem disabled>批次結案</MenubarItem>
          <MenubarItem variant="destructive">刪除選取的工單</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>檢視</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel inset>顯示</MenubarLabel>
            <MenubarCheckboxItem checked={showClosed} onCheckedChange={setShowClosed}>
              已結案工單
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showInternal} onCheckedChange={setShowInternal}>
              內部備註
            </MenubarCheckboxItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarRadioGroup value={density} onValueChange={(v) => setDensity(v as string)}>
            <MenubarLabel inset>列表密度</MenubarLabel>
            <MenubarRadioItem value="comfortable">舒適</MenubarRadioItem>
            <MenubarRadioItem value="compact">緊湊</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>說明</MenubarTrigger>
        <MenubarContent>
          <MenubarItem inset>使用手冊</MenubarItem>
          <MenubarItem inset>快捷鍵一覽</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

const meta = {
  title: "Overlays/Menubar",
  component: TicketMenubar,
} satisfies Meta<typeof TicketMenubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { openFirst: true },
};
