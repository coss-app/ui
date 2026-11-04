import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DateRange } from "react-day-picker";
import { zhTW } from "react-day-picker/locale";
import { Calendar } from "@coss-app/ui/components/calendar";

const month = new Date(2026, 10, 1);

type CalendarArgs = Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect" | "required">;

function SingleCalendar(props: CalendarArgs) {
  const [date, setDate] = React.useState<Date | undefined>();
  return (
    <Calendar
      {...(props as React.ComponentProps<typeof Calendar>)}
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  );
}

const meta = {
  title: "Inputs/Calendar",
  component: Calendar,
  argTypes: {
    captionLayout: { control: "select", options: ["label", "dropdown", "dropdown-months", "dropdown-years"] },
    buttonVariant: {
      control: "select",
      options: ["default", "outline", "secondary", "neutral", "ghost", "destructive", "link"],
    },
    showOutsideDays: { control: "boolean" },
    showWeekNumber: { control: "boolean" },
    numberOfMonths: { control: { type: "number", min: 1, max: 3 } },
  },
  args: {
    locale: zhTW,
    defaultMonth: month,
    captionLayout: "label",
    buttonVariant: "ghost",
    showOutsideDays: true,
    showWeekNumber: false,
    numberOfMonths: 1,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Single: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 4));
    return (
      <div className="flex flex-col gap-3">
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
        <p className="text-sm text-muted-foreground">
          預約回電日期：{date ? date.toLocaleDateString("zh-TW") : "未選擇"}
        </p>
      </div>
    );
  },
};

export const Range: Story = {
  render: (args) => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 10, 3),
      to: new Date(2026, 10, 12),
    });
    return (
      <Calendar
        {...args}
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
        className="rounded-lg border"
      />
    );
  },
};

export const DropdownCaption: Story = {
  args: { captionLayout: "dropdown", startMonth: new Date(2020, 0), endMonth: new Date(2030, 11) },
  render: (args) => <SingleCalendar {...args} />,
};

export const DisabledDays: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <SingleCalendar {...args} disabled={[{ dayOfWeek: [0, 6] }, { before: new Date(2026, 10, 4) }]} />
      <p className="text-sm text-muted-foreground">週末與今天之前不可預約。</p>
    </div>
  ),
};

export const WeekNumbers: Story = {
  args: { showWeekNumber: true },
  render: (args) => <SingleCalendar {...args} />,
};
