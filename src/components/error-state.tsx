"use client";

import { Button } from "@/components/ui/button";
import { Warning, ArrowClockwise } from "@phosphor-icons/react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while loading the data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-red-50/50 border-2 border-dashed border-red-100 space-y-3 sm:space-y-4 rounded-sm">
      <div className="bg-red-100 p-2 sm:p-3 rounded-none">
        <Warning size={24} className="text-red-600 sm:!w-8 sm:!h-8" weight="bold" />
      </div>
      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-red-900 break-words">{title}</h3>
        <p className="text-xs sm:text-sm text-red-600 max-w-xs mx-auto leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="h-8 sm:h-10 px-4 sm:px-6 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold rounded-none text-xs sm:text-sm"
        >
          <ArrowClockwise className="mr-2 sm:mr-2" size={16} weight="bold" />
          Retry
        </Button>
      )}
    </div>
  );
}
