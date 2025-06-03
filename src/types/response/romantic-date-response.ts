import { PlanStatus } from "@/enum/status";

interface RomanticDateResponse {
  id: number;
  location: string;
  date: Date;
  gallery: string;
  details: string;
  status?: PlanStatus;
}

// expose type
export type { RomanticDateResponse };
