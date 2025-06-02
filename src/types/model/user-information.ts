import { Gender } from "@/enum/gender";

interface UserInformation {
  id?: number;
  fullName: string;
  gender: Gender;
  bio?: string;
  profileUrl?: string;
  email?: string;
}

// expose interface
export type { UserInformation };
