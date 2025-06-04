import { PlanStatus } from "@/enum/status";

interface RomanticDate {
  id?: number;
  location: string;
  date: Date;
  gallery: File | string;
  details: string;
  status?: PlanStatus;
}

// expose type
export type { RomanticDate };
