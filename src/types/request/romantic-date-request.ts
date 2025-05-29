import { PlanStatus } from "@/lib/status-enum";

interface RomanticDateRequest {
  location: string;
  date: Date;
  gallery: File;
  details: string;
  status?: PlanStatus;
}

// expose type
export type { RomanticDateRequest };
