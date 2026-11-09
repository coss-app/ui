import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@coss-app/ui/components/button";
import { Input } from "@coss-app/ui/components/input";
import { Label } from "@coss-app/ui/components/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@coss-app/ui/components/dialog";

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function TransferForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="assignee">指派給</Label>
        <Input id="assignee" defaultValue="王小明（二線支援）" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="note">轉單備註</Label>
        <Input id="note" placeholder="例如：客戶需要退款，請協助確認金流" />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>轉派工單</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>轉派工單 #1024</DialogTitle>
          <DialogDescription>將工單轉給其他客服人員，原處理人會收到通知。</DialogDescription>
        </DialogHeader>
        <TransferForm />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>取消</DialogClose>
          <Button>確認轉派</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Open: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger render={<Button />}>轉派工單</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>轉派工單 #1024</DialogTitle>
          <DialogDescription>將工單轉給其他客服人員，原處理人會收到通知。</DialogDescription>
        </DialogHeader>
        <TransferForm />
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>取消</DialogClose>
          <Button>確認轉派</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger render={<Button variant="outline" />}>查看說明</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>服務時段說明</DialogTitle>
          <DialogDescription>
            客服專線服務時間為週一至週五 09:00–18:00，非服務時段的工單將於下個工作日依序處理。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>查看處理紀錄</DialogTrigger>
      <DialogContent className="max-h-4/5 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>處理紀錄</DialogTitle>
          <DialogDescription>工單 #1024「訂單未出貨」的完整處理歷程。</DialogDescription>
        </DialogHeader>
        <ol className="grid gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <li key={i} className="rounded-lg bg-muted p-3">
              <p className="font-semibold">2026/11/{String(i + 1).padStart(2, "0")} 10:{String(i * 4).padStart(2, "0")}</p>
              <p className="text-muted-foreground">客服人員已聯繫物流，確認包裹目前位於轉運中心。</p>
            </li>
          ))}
        </ol>
      </DialogContent>
    </Dialog>
  ),
};
