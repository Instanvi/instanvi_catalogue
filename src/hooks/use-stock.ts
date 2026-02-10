import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stockService } from "@/services/stock.service";
import { toast } from "sonner";

export function useStock() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: stockService.getAll,
  });
}

export function useUpdateStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      quantity,
      reason,
    }: {
      id: string;
      quantity: number;
      reason?: string;
    }) => stockService.update(id, { quantity, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
      toast.success("Stock updated successfully");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error("Failed to update stock", {
        description: message,
      });
    },
  });
}
