import { toast } from "sonner";

export function errorToast(message: string) {
  toast.error(message, {
    position: "bottom-right",
  });
}
