import { Status } from "@/enum/status";
import { Tag } from "@/enum/tag";
import { UUID } from "crypto";

export interface TaskType {
  taskId: UUID;
  taskTitle: string;
  taskDetails?: string;
  tag: Tag;
  status: Status;
  startDate?: Date;
  endDate?: Date;
}

export interface TaskRequst {
  taskTitle: string;
  taskDetails?: string;
  tag: Tag;
  endDate: Date;
}
