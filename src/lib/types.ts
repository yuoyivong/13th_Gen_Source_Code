import { Icon } from "iconsax-react";

// define an interface for sidebar
export interface Sidebar {
  id: number;
  icon: Icon;
  label: string;
  href?: string;
}
