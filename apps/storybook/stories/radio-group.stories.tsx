import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "@coss-app/ui/components/radio-group";
import { Label } from "@coss-app/ui/components/label";

const priorities = [
  { value: "low", label: "低：一般諮詢" },
  { value: "medium", label: "中：影響部分功能" },
  { value: "high", label: "高：服務中斷" },
];

const meta = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: { defaultValue: "medium", disabled: false },
  render: (args) => (
    <RadioGroup {...args}>
      {priorities.map((p) => (
        <Label key={p.value}>
          <RadioGroupItem value={p.value} />
          {p.label}
        </Label>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="phone" className="flex flex-wrap gap-6">
      <Label>
        <RadioGroupItem value="phone" />
        電話
      </Label>
      <Label>
        <RadioGroupItem value="email" />
        Email
      </Label>
      <Label>
        <RadioGroupItem value="line" />
        LINE
      </Label>
    </RadioGroup>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">錯誤（尚未選擇）</span>
        <RadioGroup>
          {priorities.map((p) => (
            <Label key={p.value}>
              <RadioGroupItem value={p.value} aria-invalid />
              {p.label}
            </Label>
          ))}
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">整組停用</span>
        <RadioGroup defaultValue="high" disabled>
          {priorities.map((p) => (
            <Label key={p.value}>
              <RadioGroupItem value={p.value} />
              {p.label}
            </Label>
          ))}
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">單一選項停用</span>
        <RadioGroup defaultValue="low">
          {priorities.map((p) => (
            <Label key={p.value}>
              <RadioGroupItem value={p.value} disabled={p.value === "high"} />
              {p.label}
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  ),
};
