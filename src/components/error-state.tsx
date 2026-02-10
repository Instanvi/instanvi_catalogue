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
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 border-2 border-dashed border-red-100 space-y-4">
      <div className="bg-red-100 p-3 rounded-none">
        <Warning size={32} className="text-red-600" weight="bold" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-red-900">{title}</h3>
        <p className="text-sm text-red-600 max-w-xs mx-auto">{message}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="h-10 px-6 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold rounded-none"
        >
          <ArrowClockwise className="mr-2" size={16} weight="bold" />
          Retry Request
        </Button>
      )}
    </div>
  );
}
