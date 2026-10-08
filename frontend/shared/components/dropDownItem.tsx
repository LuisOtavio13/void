import { DropdownMenuItem } from "./ui/dropdown-menu";

export function Item({
  text,
  icon,
  onClick,
  disabled = false,
}: {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <DropdownMenuItem
      className="flex cursor-pointer items-center gap-2"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </DropdownMenuItem>
  );
}
