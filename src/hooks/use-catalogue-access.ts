import { useMutation } from "@tanstack/react-query";
import { cataloguesService } from "@/services/catalogues.service";
import {
  RequestCatalogueAccessPayload,
  UnlockCataloguePayload,
} from "@/types/api";

export function useRequestCatalogueAccess() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: RequestCatalogueAccessPayload;
    }) => cataloguesService.requestAccess(id, data),
  });
}

export function useVerifyCatalogueAccess() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UnlockCataloguePayload }) =>
      cataloguesService.verifyAccess(id, data),
  });
}
