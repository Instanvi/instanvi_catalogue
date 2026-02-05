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
  size?: "md" | "lg" | "xl" | "2xl";
}

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
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        className={`${sizeClasses[size]} overflow-y-auto border-l border-border`}
      >
        <SheetHeader>
          <SheetTitle className="font-semibold text-xl">{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="py-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
