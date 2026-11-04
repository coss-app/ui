import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@coss-app/ui/components/carousel";
import { Card, CardContent } from "@coss-app/ui/components/card";

const slides = ["退款申請", "訂單查詢", "發票更正", "配送問題", "帳號安全"];

function Slide({ label, index }: { label: string; index: number }) {
  return (
    <Card>
      <CardContent className="flex aspect-square flex-col items-center justify-center gap-2">
        <span className="text-4xl font-semibold text-heading">{index + 1}</span>
        <span className="text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  );
}

const meta = {
  title: "Data Display/Carousel",
  component: Carousel,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="px-12">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={s}>
              <Slide label={s} index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <div className="px-12">
      <Carousel opts={{ align: "start" }} className="w-full max-w-xl">
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={s} className="basis-1/2 md:basis-1/3">
              <Slide label={s} index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="py-14">
      <Carousel orientation="vertical" opts={{ align: "start" }} className="w-full max-w-xs">
        <CarouselContent className="h-[260px]">
          {slides.map((s, i) => (
            <CarouselItem key={s} className="basis-1/2">
              <Card>
                <CardContent className="flex items-center justify-center py-6">
                  <span className="font-semibold">
                    {i + 1}. {s}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

function WithApiExample() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return (
    <div className="px-12">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={s}>
              <Slide label={s} index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="mt-3 max-w-xs text-center text-sm text-muted-foreground">
        第 {current} / {slides.length} 張
      </p>
    </div>
  );
}

export const WithApi: Story = {
  render: () => <WithApiExample />,
};
