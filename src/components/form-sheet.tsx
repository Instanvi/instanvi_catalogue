import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface FormSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "full";
  footer?: React.ReactNode;
}

import { Separator } from "@/components/ui/separator";

export function FormSheet({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
  footer,
}: FormSheetProps) {
  const sizeClasses = {
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    full: "sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[1200px]",
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        className={cn(
          sizeClasses[size],
          "p-0 flex flex-col gap-0 h-full max-h-[100dvh] overflow-hidden",
        )}
      >
        <div className="flex-shrink-0 z-20 bg-white">
          <SheetHeader className="p-4 sm:p-5 md:p-6 pb-4 space-y-1">
            <SheetTitle className="font-bold text-xl sm:text-2xl tracking-tight text-[#1c1c1c] text-left">
              {title}
            </SheetTitle>
            {description && (
              <SheetDescription className="text-xs sm:text-sm text-left text-muted-foreground/80 leading-relaxed">
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
          <Separator className="bg-muted-foreground/10" />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-5 md:p-6">
          <div className="max-w-full pb-8">{children}</div>
        </div>

        {footer && (
          <div className="flex-shrink-0 bg-slate-50/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 border-t border-slate-200 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-20">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
