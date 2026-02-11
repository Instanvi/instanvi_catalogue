"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import {
  useNotificationsHistory,
  useSendNotification,
} from "@/hooks/use-notifications";
import { useCustomerCategories } from "@/hooks/use-customer-categories";
import { NotificationForm } from "@/components/forms/notification-form/NotificationForm";
import { NotificationValues } from "@/components/forms/notification-form/schema";
import { ErrorState } from "@/components/error-state";
import { FormSheet } from "@/components/form-sheet";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    data: history,
    isLoading: isLoadingHistory,
    error: historyError,
    refetch: refetchHistory,
  } = useNotificationsHistory();
  const { data: categoriesResponse } = useCustomerCategories();
  const sendNotification = useSendNotification();

  const categories = categoriesResponse?.data || [];
  const historyData = history || [];

  const handleSendBroadcast = (values: NotificationValues) => {
    sendNotification.mutate(values, {
      onSuccess: () => {
        setIsSheetOpen(false);
        toast.success("Broadcast Started", {
          description:
            "Your notification is being sent to the selected recipients.",
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to send broadcast", {
          description:
            "An unexpected error occurred while starting the notification broadcast.",
        });
      },
    });
  };

  if (historyError)
    return (
      <ErrorState
        title="Notifications Unavailable"
        message="We couldn't load your notification history. Please try again later."
        onRetry={() => refetchHistory()}
      />
    );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="bg-white border border-muted/10 rounded-sm shadow-sm">
        <DataTable
          columns={columns}
          data={historyData}
          searchKey="title"
          isLoading={isLoadingHistory}
          addLabel="Create Broadcast"
          onAdd={() => setIsSheetOpen(true)}
        />
      </div>

      <FormSheet
        title="Create Broadcast"
        description="Announce new arrivals to your customers via Email, SMS, or WhatsApp."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        size="xl"
      >
        <div className="mt-8">
          <NotificationForm
            categories={categories}
            isLoading={sendNotification.isPending}
            onSubmit={handleSendBroadcast}
          />
        </div>
      </FormSheet>
    </div>
  );
}
