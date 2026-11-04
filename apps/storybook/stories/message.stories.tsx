import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCheckIcon, FileTextIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@coss-app/ui/components/avatar";
import { Bubble, BubbleContent } from "@coss-app/ui/components/bubble";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@coss-app/ui/components/attachment";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@coss-app/ui/components/message";

const meta = {
  title: "Messaging/Message",
  component: Message,
  argTypes: {
    align: { control: "inline-radio", options: ["start", "end"] },
  },
  args: {
    align: "start",
  },
  render: (args) => (
    <div className="max-w-xl">
      <Message {...args}>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>陳</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>陳先生</MessageHeader>
          <Bubble variant={args.align === "end" ? "default" : "secondary"} align={args.align}>
            <BubbleContent>您好，我上週訂購的冷氣到現在還沒有安裝，可以幫我查一下進度嗎？</BubbleContent>
          </Bubble>
          <MessageFooter>14:32</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Conversation: Story = {
  name: "客服對話",
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>陳</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>陳先生 · 客戶</MessageHeader>
          <MessageGroup>
            <Bubble variant="secondary">
              <BubbleContent>您好，我上週訂購的冷氣到現在還沒有安裝。</BubbleContent>
            </Bubble>
            <Bubble variant="secondary">
              <BubbleContent>訂單編號是 A20261028-0042。</BubbleContent>
            </Bubble>
          </MessageGroup>
          <MessageFooter>14:32</MessageFooter>
        </MessageContent>
      </Message>

      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>王</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>王小明 · 客服</MessageHeader>
          <Bubble align="end">
            <BubbleContent>陳先生您好，已為您查詢，安裝師傅預計 11/6（四）下午 2–5 點到府，出發前會先致電給您。</BubbleContent>
          </Bubble>
          <MessageFooter>
            <span className="inline-flex items-center gap-1">
              14:35 <CheckCheckIcon className="size-3.5 text-info" /> 已讀
            </span>
          </MessageFooter>
        </MessageContent>
      </Message>

      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>陳</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>保固卡.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 320 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <MessageFooter>14:36</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
};

export const WithoutAvatar: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      <Message>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>請問可以改到週末安裝嗎？</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>可以的，已為您改到 11/8（六）上午。</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  ),
};

export const GhostSystemMessage: Story = {
  name: "系統訊息（ghost）",
  render: () => (
    <div className="max-w-xl">
      <Message>
        <MessageContent>
          <MessageHeader>系統</MessageHeader>
          <Bubble variant="ghost">
            <BubbleContent className="text-muted-foreground">工單已由「待受理」轉為「處理中」，指派給王小明。</BubbleContent>
          </Bubble>
          <MessageFooter>14:34</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
};
