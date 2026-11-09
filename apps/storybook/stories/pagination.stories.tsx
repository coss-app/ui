import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@coss-app/ui/components/pagination";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text="上一頁" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" text="下一頁" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

function Interactive() {
  const total = 8;
  const [page, setPage] = useState(1);
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(Math.min(total, Math.max(1, p)));
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        第 {page} / {total} 頁，共 156 張工單
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text="上一頁"
              onClick={go(page - 1)}
              aria-disabled={page === 1}
            />
          </PaginationItem>
          {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink href="#" isActive={p === page} onClick={go(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              text="下一頁"
              onClick={go(page + 1)}
              aria-disabled={page === total}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export const InteractiveWithDisabled: Story = {
  name: "互動（首尾頁停用）",
  render: () => <Interactive />,
};

export const LinkSizes: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size, i) => (
          <PaginationItem key={size}>
            <PaginationLink href="#" size={size} isActive={i === 2}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  ),
};
