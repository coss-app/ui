import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@coss-app/ui/components/chart";

const weekly = [
  { day: "週一", created: 86, resolved: 72 },
  { day: "週二", created: 105, resolved: 98 },
  { day: "週三", created: 92, resolved: 101 },
  { day: "週四", created: 120, resolved: 96 },
  { day: "週五", created: 134, resolved: 128 },
  { day: "週六", created: 58, resolved: 64 },
  { day: "週日", created: 41, resolved: 47 },
];

const weeklyConfig = {
  created: { label: "新建工單", color: "var(--chart-2)" },
  resolved: { label: "已結案", color: "var(--chart-1)" },
} satisfies ChartConfig;

const channels = [
  { channel: "line", tickets: 420, fill: "var(--color-line)" },
  { channel: "web", tickets: 310, fill: "var(--color-web)" },
  { channel: "email", tickets: 180, fill: "var(--color-email)" },
  { channel: "phone", tickets: 120, fill: "var(--color-phone)" },
  { channel: "other", tickets: 45, fill: "var(--color-other)" },
];

const channelConfig = {
  tickets: { label: "工單數" },
  line: { label: "LINE", color: "var(--chart-1)" },
  web: { label: "網站表單", color: "var(--chart-2)" },
  email: { label: "Email", color: "var(--chart-3)" },
  phone: { label: "電話", color: "var(--chart-4)" },
  other: { label: "其他", color: "var(--chart-5)" },
} satisfies ChartConfig;

const meta = {
  title: "Data Display/Chart",
  component: ChartContainer,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ChartContainer 的 config/children 為必填；每個 story 都用 render，args 只為了滿足型別
const baseArgs = { config: weeklyConfig, children: <></> };

export const BarMultiple: Story = {
  args: baseArgs,
  render: () => (
    <ChartContainer config={weeklyConfig} className="min-h-[240px] w-full max-w-2xl">
      <BarChart accessibilityLayer data={weekly}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="created" fill="var(--color-created)" radius={4} />
        <Bar dataKey="resolved" fill="var(--color-resolved)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};

export const BarStacked: Story = {
  args: baseArgs,
  render: () => (
    <ChartContainer config={weeklyConfig} className="min-h-[240px] w-full max-w-2xl">
      <BarChart accessibilityLayer data={weekly}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={32} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="created" stackId="a" fill="var(--color-created)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="resolved" stackId="a" fill="var(--color-resolved)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
};

export const LineChartStory: Story = {
  name: "Line",
  args: baseArgs,
  render: () => (
    <ChartContainer config={weeklyConfig} className="min-h-[240px] w-full max-w-2xl">
      <LineChart accessibilityLayer data={weekly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line dataKey="created" type="monotone" stroke="var(--color-created)" strokeWidth={2} dot={false} />
        <Line dataKey="resolved" type="monotone" stroke="var(--color-resolved)" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  ),
};

export const AreaChartStory: Story = {
  name: "Area",
  args: baseArgs,
  render: () => (
    <ChartContainer config={weeklyConfig} className="min-h-[240px] w-full max-w-2xl">
      <AreaChart accessibilityLayer data={weekly} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Area dataKey="created" type="natural" fill="var(--color-created)" fillOpacity={0.3} stroke="var(--color-created)" />
        <Area dataKey="resolved" type="natural" fill="var(--color-resolved)" fillOpacity={0.3} stroke="var(--color-resolved)" />
      </AreaChart>
    </ChartContainer>
  ),
};

export const PieDonut: Story = {
  args: baseArgs,
  render: () => {
    const total = channels.reduce((s, c) => s + c.tickets, 0);
    return (
      <ChartContainer config={channelConfig} className="mx-auto aspect-square max-h-[300px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="channel" />} />
          <Pie data={channels} dataKey="tickets" nameKey="channel" innerRadius={60} strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-semibold">
                        {total.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 22} className="fill-muted-foreground">
                        本月工單
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="channel" />} />
        </PieChart>
      </ChartContainer>
    );
  },
};

export const RadarChartStory: Story = {
  name: "Radar",
  args: baseArgs,
  render: () => (
    <ChartContainer config={weeklyConfig} className="mx-auto aspect-square max-h-[300px]">
      <RadarChart data={weekly}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="day" />
        <PolarGrid />
        <Radar dataKey="created" fill="var(--color-created)" fillOpacity={0.5} />
        <Radar dataKey="resolved" fill="var(--color-resolved)" fillOpacity={0.5} />
      </RadarChart>
    </ChartContainer>
  ),
};

export const Radial: Story = {
  args: baseArgs,
  render: () => (
    <ChartContainer config={channelConfig} className="mx-auto aspect-square max-h-[300px]">
      <RadialBarChart data={channels} innerRadius={30} outerRadius={110}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="channel" />} />
        <RadialBar dataKey="tickets" background />
      </RadialBarChart>
    </ChartContainer>
  ),
};
