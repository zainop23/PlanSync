"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import IssueDetailsDialog from "./issue-details-dialog";
import UserAvatar from "./user-avatar";
import { useRouter } from "next/navigation";

const priorityColor: Record<string, string> = {
  LOW: "border-green-600",
  MEDIUM: "border-yellow-300",
  HIGH: "border-orange-400",
  URGENT: "border-red-400",
};

type IssueCardProps = {
  issue: {
    id: string;
    title: string;
    status: string;
    priority: string;
    createdAt: Date;
    description?: string | null;
    projectId: string;
    sprintId: string;
    assignee?: any;
    reporter: {
      clerkUserId: string;
      name: string;
      imageUrl?: string;
    };
  };
  showStatus?: boolean;
  onDelete?: (...args: any[]) => void;
  onUpdate?: (...args: any[]) => void;
};

export default function IssueCard({
  issue,
  showStatus = false,
  onDelete = () => {},
  onUpdate = () => {},
}: IssueCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const onDeleteHandler = (...params: any[]) => {
    router.refresh();
    onDelete(...params);
  };

  const onUpdateHandler = (...params: any[]) => {
    router.refresh();
    onUpdate(...params);
  };

  const created = formatDistanceToNow(new Date(issue.createdAt), {
    addSuffix: true,
  });

  return (
    <>
      <div className={`rounded-xl border-t-4 ${priorityColor[issue.priority]} overflow-hidden`}>
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-0 rounded-t-none"
          onClick={() => setIsDialogOpen(true)}
        >
          <CardHeader>
            <CardTitle>{issue.title}</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-2 -mt-3">
            {showStatus && <Badge>{issue.status}</Badge>}
            <Badge variant="outline" className="-ml-1">
              {issue.priority}
            </Badge>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-3">
            <UserAvatar user={issue.assignee} />

            <div className="text-xs text-gray-400 w-full">Created {created}</div>
          </CardFooter>
        </Card>
      </div>

      {isDialogOpen && (
        <IssueDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          issue={issue}
          onDelete={onDeleteHandler}
          onUpdate={onUpdateHandler}
          borderCol={priorityColor[issue.priority]}
        />
      )}
    </>
  );
}