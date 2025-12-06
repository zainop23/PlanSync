"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, addDays } from "date-fns";

import useFetch from "@/hooks/use-fetch";
import { createSprint } from "@/actions/sprints";
import { toast } from "sonner";

type SprintCreationFormProps = {
  projectTitle: string;
  projectKey: string;
  projectId: string;
  sprintKey: number;
};

export default function SprintCreationForm({
  projectTitle,
  projectKey,
  projectId,
  sprintKey,
}: SprintCreationFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });
  const [sprintName, setSprintName] = useState(`${projectKey}-Sprint-${sprintKey}`);
  const router = useRouter();

  const { loading: createSprintLoading, fn: createSprintFn } =
    useFetch(createSprint);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });

  const onSubmit = async () => {
    if (!sprintName.trim()) {
      toast.error("Sprint name is required");
      return;
    }
    
    await createSprintFn(projectId, {
      name: sprintName,
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    
    setShowForm(false);
    setSprintName(`${projectKey}-Sprint-${sprintKey + 1}`);
    toast.success("Sprint created successfully!");
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold mb-8 gradient-title">
          {projectTitle}
        </h1>
        <Button
          className="mt-2"
          onClick={() => setShowForm(!showForm)}
          variant={!showForm ? "default" : "destructive"}
        >
          {!showForm ? "Create New Sprint" : "Cancel"}
        </Button>
      </div>
      {showForm && (
        <Card className="pt-4 mb-4">
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-4 items-end"
            >
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Sprint Name
                </label>
                <Input
                  value={sprintName}
                  onChange={(e) => setSprintName(e.target.value)}
                  placeholder="Enter sprint name"
                  className="bg-slate-950"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Sprint Duration
                </label>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal bg-slate-950 ${
                            !dateRange && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from && dateRange.to ? (
                            format(dateRange.from, "LLL dd, y") +
                            " - " +
                            format(dateRange.to, "LLL dd, y")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto bg-slate-900 p-4"
                        align="start"
                      >
                        <DayPicker
                          classNames={{
                            chevron: "fill-blue-500",
                            range_start: "bg-blue-700",
                            range_end: "bg-blue-700",
                            range_middle: "bg-blue-400",
                            day_button: "border-none",
                            today: "border-2 border-blue-700",
                            month: "space-y-4",
                            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                            day: "h-9 w-9 text-center text-sm p-0 relative",
                            caption: "flex justify-center pt-1 relative items-center",
                            caption_label: "text-sm font-medium",
                            nav: "space-x-1 flex items-center",
                          }}
                          mode="range"
                          disabled={[{ before: new Date() }]}
                          selected={dateRange}
                          onSelect={(range) => {
                            if (range?.from && range?.to) {
                              setDateRange({ from: range.from, to: range.to });
                              field.onChange(range);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <Button type="submit" disabled={createSprintLoading}>
                {createSprintLoading ? "Creating..." : "Create Sprint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}