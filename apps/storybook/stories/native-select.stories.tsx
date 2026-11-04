import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@coss-app/ui/components/native-select";

const options = (
  <>
    <NativeSelectOption value="">請選擇問題類型</NativeSelectOption>
    <NativeSelectOption value="billing">帳務問題</NativeSelectOption>
    <NativeSelectOption value="repair">設備報修</NativeSelectOption>
    <NativeSelectOption value="account">帳號與登入</NativeSelectOption>
    <NativeSelectOption value="other">其他</NativeSelectOption>
  </>
);

const meta = {
  title: "Inputs/NativeSelect",
  component: NativeSelect,
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  args: { size: "default", disabled: false, "aria-invalid": false, children: options },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <NativeSelect>{options}</NativeSelect>
      <NativeSelect size="sm">{options}</NativeSelect>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <NativeSelect defaultValue="tp">
      <NativeSelectOptGroup label="北區">
        <NativeSelectOption value="tp">台北服務中心</NativeSelectOption>
        <NativeSelectOption value="ty">桃園服務中心</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="中南區">
        <NativeSelectOption value="tc">台中服務中心</NativeSelectOption>
        <NativeSelectOption value="ks">高雄服務中心</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <NativeSelect aria-invalid>{options}</NativeSelect>
      <NativeSelect disabled defaultValue="repair">{options}</NativeSelect>
    </div>
  ),
};
