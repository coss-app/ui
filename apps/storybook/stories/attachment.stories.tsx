import type { Meta, StoryObj } from "@storybook/react-vite";
import { DownloadIcon, FileTextIcon, FileWarningIcon, ImageIcon, RotateCwIcon, XIcon } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@coss-app/ui/components/attachment";
import { Spinner } from "@coss-app/ui/components/spinner";

const states = ["idle", "uploading", "processing", "error", "done"] as const;
const sizes = ["default", "sm", "xs"] as const;
const orientations = ["horizontal", "vertical"] as const;

// 內嵌示意圖，不依賴外部圖片
const sampleImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#07ce6f"/><stop offset="1" stop-color="#0066ff"/></linearGradient></defs><rect width="160" height="160" fill="url(#g)"/><circle cx="56" cy="60" r="18" fill="#fff" opacity=".8"/><path d="M0 130 60 80l40 30 30-20 30 30v40H0z" fill="#fff" opacity=".6"/></svg>`
  );

const stateCopy: Record<(typeof states)[number], { title: string; description: string }> = {
  idle: { title: "拖曳檔案到這裡", description: "支援 JPG、PNG、PDF，上限 10 MB" },
  uploading: { title: "冷氣故障照片.jpg", description: "上傳中 45%" },
  processing: { title: "維修報價單.pdf", description: "掃描病毒中…" },
  error: { title: "安裝影片.mov", description: "檔案超過 10 MB 上限" },
  done: { title: "保固卡.pdf", description: "PDF · 320 KB" },
};

function StateMedia({ state }: { state: (typeof states)[number] }) {
  if (state === "uploading" || state === "processing") return <Spinner />;
  if (state === "error") return <FileWarningIcon />;
  if (state === "idle") return <ImageIcon />;
  return <FileTextIcon />;
}

const meta = {
  title: "Messaging/Attachment",
  component: Attachment,
  argTypes: {
    state: { control: "select", options: states },
    size: { control: "select", options: sizes },
    orientation: { control: "inline-radio", options: orientations },
  },
  args: {
    state: "done",
    size: "default",
    orientation: "horizontal",
  },
  render: (args) => {
    const state = args.state ?? "done";
    return (
      <Attachment {...args}>
        <AttachmentMedia>
          <StateMedia state={state} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{stateCopy[state].title}</AttachmentTitle>
          <AttachmentDescription>{stateCopy[state].description}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="移除附件">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    );
  },
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {states.map((state) => (
        <Attachment key={state} state={state} className="w-72">
          <AttachmentMedia>
            <StateMedia state={state} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{stateCopy[state].title}</AttachmentTitle>
            <AttachmentDescription>{stateCopy[state].description}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            {state === "error" ? (
              <AttachmentAction aria-label="重試">
                <RotateCwIcon />
              </AttachmentAction>
            ) : null}
            <AttachmentAction aria-label="移除附件">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <Attachment key={size} size={size}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>維修報價單（{size}）.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 1.2 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="下載">
              <DownloadIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  ),
};

export const ImageMedia: Story = {
  name: "圖片（horizontal／vertical）",
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      <Attachment>
        <AttachmentMedia variant="image">
          <img src={sampleImage} alt="冷氣室外機照片" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>室外機.jpg</AttachmentTitle>
          <AttachmentDescription>JPG · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      {(["done", "uploading", "error"] as const).map((state) => (
        <Attachment key={state} orientation="vertical" state={state}>
          <AttachmentMedia variant="image">
            {state === "uploading" ? <Spinner /> : <img src={sampleImage} alt="故障照片" />}
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>故障照片_{state}.jpg</AttachmentTitle>
            <AttachmentDescription>{state === "error" ? "上傳失敗" : "JPG · 1.8 MB"}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="移除附件" variant="secondary">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
      <Attachment orientation="vertical">
        <AttachmentMedia variant="image">
          <img src={sampleImage} alt="縮圖" />
        </AttachmentMedia>
      </Attachment>
    </div>
  ),
};

export const Clickable: Story = {
  name: "可點擊（AttachmentTrigger）",
  render: () => (
    <Attachment>
      <AttachmentTrigger aria-label="預覽 保固卡.pdf" onClick={() => {}} />
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>保固卡.pdf</AttachmentTitle>
        <AttachmentDescription>點擊預覽</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="下載">
          <DownloadIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="max-w-md">
      <AttachmentGroup>
        {["發票.jpg", "保固卡.pdf", "室外機.jpg", "安裝照片.png", "報價單.pdf"].map((name, i) => (
          <Attachment key={name} size="sm" state={i === 2 ? "uploading" : "done"}>
            <AttachmentMedia>{i === 2 ? <Spinner /> : <FileTextIcon />}</AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{name}</AttachmentTitle>
              <AttachmentDescription>{i === 2 ? "上傳中" : "已上傳"}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label={`移除 ${name}`}>
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
      </AttachmentGroup>
    </div>
  ),
};
