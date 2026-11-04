import type { Meta, StoryObj } from "@storybook/react-vite";
import { DirectionProvider } from "@coss-app/ui/components/direction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@coss-app/ui/components/tabs";
import { ScrollArea } from "@coss-app/ui/components/scroll-area";

function DirectionDemo({ direction = "ltr" }: { direction?: "ltr" | "rtl" }) {
  return (
    <DirectionProvider direction={direction}>
      <div dir={direction} className="flex max-w-lg flex-col gap-6 rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">
          目前方向：<span className="font-semibold text-foreground">{direction}</span>
          （Base UI 組件的鍵盤方向鍵、捲軸位置會依 DirectionProvider 調整；版面需搭配 dir 屬性）
        </p>
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">待受理</TabsTrigger>
            <TabsTrigger value="b">處理中</TabsTrigger>
            <TabsTrigger value="c">已結案</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="p-2">
            用 ← → 鍵切換分頁，RTL 時方向相反。
          </TabsContent>
          <TabsContent value="b" className="p-2">
            處理中的工單。
          </TabsContent>
          <TabsContent value="c" className="p-2">
            已結案的工單。
          </TabsContent>
        </Tabs>
        <ScrollArea className="h-32 rounded-lg border">
          <div className="p-3 text-sm">
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i}>第 {i + 1} 則客戶留言</p>
            ))}
          </div>
        </ScrollArea>
      </div>
    </DirectionProvider>
  );
}

const meta = {
  title: "Layout/Direction",
  component: DirectionDemo,
  argTypes: { direction: { control: "inline-radio", options: ["ltr", "rtl"] } },
  args: { direction: "ltr" },
} satisfies Meta<typeof DirectionDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LTR: Story = {};

export const RTL: Story = { args: { direction: "rtl" } };

export const SideBySide: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <DirectionDemo direction="ltr" />
      <DirectionDemo direction="rtl" />
    </div>
  ),
};
