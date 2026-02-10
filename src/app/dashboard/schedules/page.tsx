"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { schedulesService } from "@/services/schedules.service";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { ErrorState } from "@/components/error-state";

export default function SchedulesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    data: schedules,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: schedulesService.getAll,
  });

  if (error)
    return (
      <ErrorState
        title="Campaigns Offline"
        message="Your scheduled campaigns could not be retrieved at this moment."
        onRetry={() => refetch()}
      />
    );

  const data = schedules || [];

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={data}
          searchKey="title"
          addLabel="New Campaign"
          onAdd={() => setIsSheetOpen(true)}
          isLoading={isLoading}
        />
      </div>

      <FormSheet
        title="Create New Campaign"
        description="Schedule a new email, SMS, or push notification campaign."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div className="mt-8">
          <p className="text-muted-foreground italic">
            Campaign Form Coming Soon...
          </p>
        </div>
      </FormSheet>
    </div>
  );
}
