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
}

import { Separator } from "@/components/ui/separator";

export function FormSheet({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
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
        className={`${sizeClasses[size]} overflow-y-auto p-0 flex flex-col`}
      >
        <SheetHeader className="p-8 pb-4">
          <SheetTitle className="font-semibold text-2xl tracking-tight text-[#1c1c1c]">
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription className="text-muted-foreground/80">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        <Separator className="bg-muted-foreground/5" />
        <div className="flex-1 p-8 pt-6 overflow-y-auto">
          <div className="max-w-full">{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
