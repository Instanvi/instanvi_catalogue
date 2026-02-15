import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
        className={`${sizeClasses[size]} p-0 flex flex-col gap-0 h-full`}
      >
        <SheetHeader className="p-4 sm:p-5 md:p-6 pb-2 flex-shrink-0 space-y-1">
          <SheetTitle className="font-semibold text-lg sm:text-2xl tracking-tight text-[#1c1c1c] break-words">
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        <Separator className="bg-muted-foreground/5" />
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 md:p-6 pt-2">
          <div className="max-w-full">{children}</div>
        </div>
        {footer && (
          <>
            <Separator className="bg-muted-foreground/5" />
            <div className="bg-white p-4 sm:p-5 md:p-6 flex-shrink-0">
              {footer}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
