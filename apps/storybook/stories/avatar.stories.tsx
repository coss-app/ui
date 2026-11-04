import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckIcon, PlusIcon } from "lucide-react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@coss-app/ui/components/avatar";

function face(bg: string, text: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="${bg}"/><circle cx="40" cy="32" r="14" fill="#fff" opacity=".9"/><rect x="18" y="52" width="44" height="28" rx="14" fill="#fff" opacity=".9"/><text x="0" y="0" font-size="1">${text}</text></svg>`
    )
  );
}

const agents = [
  { name: "林雅婷", src: face("#00a756", "a") },
  { name: "黃建宏", src: face("#0066ff", "b") },
  { name: "陳怡君", src: face("#c65300", "c") },
  { name: "張志豪", src: face("#7041b2", "d") },
];

const sizes = ["sm", "default", "lg"] as const;

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  argTypes: {
    size: { control: "select", options: sizes },
  },
  args: { size: "default" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={agents[0].src} alt="林雅婷" />
      <AvatarFallback>雅</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-16 text-xs text-muted-foreground">{size}</span>
          <Avatar size={size}>
            <AvatarImage src={agents[1].src} alt="黃建宏" />
            <AvatarFallback>建</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarFallback>王</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarImage src={agents[0].src} alt="林雅婷" />
            <AvatarFallback>雅</AvatarFallback>
            <AvatarBadge>
              <CheckIcon />
            </AvatarBadge>
          </Avatar>
        </div>
      ))}
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/not-found.png" alt="王小明" />
        <AvatarFallback>王</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>客</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>CS</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={agents[2].src} alt="陳怡君" />
          <AvatarFallback>怡</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      ))}
      <Avatar size="lg">
        <AvatarFallback>張</AvatarFallback>
        <AvatarBadge className="bg-muted-foreground" />
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <AvatarGroup key={size}>
          {agents.map((a) => (
            <Avatar key={a.name} size={size}>
              <AvatarImage src={a.src} alt={a.name} />
              <AvatarFallback>{a.name[0]}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      ))}
      <AvatarGroup>
        {agents.slice(0, 2).map((a) => (
          <Avatar key={a.name}>
            <AvatarFallback>{a.name[0]}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>
          <PlusIcon />
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
};
