"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { schedulesService } from "@/services/schedules.service";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";

export default function SchedulesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    data: schedules,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: schedulesService.getAll,
  });

  if (isLoading) return <div>Loading schedules...</div>;
  if (error) return <div>Error loading schedules</div>;

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
