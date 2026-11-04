import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@coss-app/ui/components/select";

const statuses = [
  { value: "pending", label: "待受理" },
  { value: "processing", label: "處理中" },
  { value: "waiting", label: "等待客戶回覆" },
  { value: "closed", label: "已結案" },
];

type Args = {
  size: "sm" | "default";
  disabled: boolean;
  invalid: boolean;
};

function StatusSelect({ size, disabled, invalid }: Args) {
  return (
    <Select items={statuses} disabled={disabled}>
      <SelectTrigger size={size} aria-invalid={invalid || undefined} className="w-56">
        <SelectValue placeholder="選擇工單狀態" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const meta = {
  title: "Inputs/Select",
  component: StatusSelect,
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: { size: "default", disabled: false, invalid: false },
} satisfies Meta<typeof StatusSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <StatusSelect size="default" disabled={false} invalid={false} />
      <StatusSelect size="sm" disabled={false} invalid={false} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <StatusSelect size="default" disabled={false} invalid />
      <StatusSelect size="default" disabled invalid={false} />
    </div>
  ),
};

const agents = {
  north: [
    { value: "amy", label: "林雅婷" },
    { value: "ben", label: "陳柏翰" },
  ],
  south: [
    { value: "cindy", label: "黃欣怡" },
    { value: "david", label: "張家豪（休假中）", disabled: true },
  ],
};

export const GroupsAndDefaultValue: Story = {
  render: () => (
    <Select
      defaultValue="ben"
      items={[...agents.north, ...agents.south]}
    >
      <SelectTrigger className="w-56">
        <SelectValue placeholder="指派客服人員" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>北區客服組</SelectLabel>
          {agents.north.map((a) => (
            <SelectItem key={a.value} value={a.value}>
              {a.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>南區客服組</SelectLabel>
          {agents.south.map((a) => (
            <SelectItem key={a.value} value={a.value} disabled={a.disabled}>
              {a.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="選擇縣市" />
      </SelectTrigger>
      <SelectContent>
        {["台北市", "新北市", "基隆市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "台中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "台南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣"].map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};
