import { DropdownMenuItem } from "./ui/dropdown-menu";

export function Item({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
  
}) {
  return (
    <DropdownMenuItem
      className="flex cursor-pointer items-center gap-2"
      onClick={onClick}
    >
      {icon}
      {text}
    </DropdownMenuItem>
  );
}
