import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash2Icon, TriangleAlertIcon } from "lucide-react";
import { Button } from "@coss-app/ui/components/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@coss-app/ui/components/alert-dialog";

type ContentSize = "default" | "sm";

function DeleteTicketDialog({
  size = "default",
  defaultOpen,
  withMedia,
}: {
  size?: ContentSize;
  defaultOpen?: boolean;
  withMedia?: boolean;
}) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>刪除工單</AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {withMedia && (
            <AlertDialogMedia className="bg-destructive-muted text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
          )}
          <AlertDialogTitle>確定要刪除工單 #1024？</AlertDialogTitle>
          <AlertDialogDescription>
            刪除後無法復原，客戶的對話紀錄與附件也會一併移除。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction variant="destructive">刪除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const meta = {
  title: "Overlays/AlertDialog",
  component: DeleteTicketDialog,
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    withMedia: { control: "boolean" },
  },
  args: { size: "default", withMedia: false },
} satisfies Meta<typeof DeleteTicketDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const Small: Story = {
  args: { defaultOpen: true, size: "sm", withMedia: true },
};

export const WithMedia: Story = {
  args: { defaultOpen: true, withMedia: true },
};

export const Warning: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger render={<Button variant="outline" />}>結案</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-warning-muted text-warning">
            <TriangleAlertIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>客戶尚未回覆滿意度</AlertDialogTitle>
          <AlertDialogDescription>
            現在結案將不會再寄送滿意度問卷，確定要直接結案嗎？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>再等等</AlertDialogCancel>
          <AlertDialogAction>直接結案</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
