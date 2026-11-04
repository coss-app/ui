import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@coss-app/ui/components/combobox";

const categories = ["帳務問題", "設備報修", "帳號與登入", "退貨退款", "物流配送", "發票開立", "其他"];

type Args = {
  disabled: boolean;
  showClear: boolean;
  showTrigger: boolean;
  invalid: boolean;
};

function CategoryCombobox({ disabled, showClear, showTrigger, invalid }: Args) {
  return (
    <Combobox items={categories} defaultValue={showClear ? "設備報修" : undefined}>
      <ComboboxInput
        placeholder="搜尋問題類型"
        disabled={disabled}
        showClear={showClear}
        showTrigger={showTrigger}
        aria-invalid={invalid || undefined}
        className="w-64"
      />
      <ComboboxContent>
        <ComboboxEmpty>找不到符合的類型</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const meta = {
  title: "Inputs/Combobox",
  component: CategoryCombobox,
  argTypes: {
    disabled: { control: "boolean" },
    showClear: { control: "boolean" },
    showTrigger: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: { disabled: false, showClear: false, showTrigger: true, invalid: false },
} satisfies Meta<typeof CategoryCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <CategoryCombobox disabled={false} showClear showTrigger invalid={false} />
      <CategoryCombobox disabled={false} showClear={false} showTrigger invalid />
      <CategoryCombobox disabled showClear={false} showTrigger invalid={false} />
    </div>
  ),
};

const teams = [
  { value: "北區客服組", items: ["林雅婷", "陳柏翰", "王志明"] },
  { value: "南區客服組", items: ["黃欣怡", "張家豪"] },
];

export const Groups: Story = {
  render: () => (
    <Combobox items={teams}>
      <ComboboxInput placeholder="指派客服人員" className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>找不到客服人員</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof teams)[number], index: number) => (
            <ComboboxGroup key={group.value} items={group.items}>
              {index > 0 && <ComboboxSeparator />}
              <ComboboxLabel>{group.value}</ComboboxLabel>
              {group.items.map((name) => (
                <ComboboxItem key={name} value={name}>
                  {name}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

const tags = ["緊急", "VIP 客戶", "重複來信", "需回電", "待主管確認", "已退款"];

function TagsCombobox() {
  const anchor = useComboboxAnchor();
  return (
    <Combobox items={tags} multiple defaultValue={["緊急", "VIP 客戶"]}>
      <ComboboxChips ref={anchor} className="w-80">
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="新增標籤" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>沒有符合的標籤</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const MultipleChips: Story = {
  render: () => <TagsCombobox />,
};
