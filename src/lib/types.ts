import { Icon } from "iconsax-react";

// define an interface for sidebar
export interface Sidebar {
  id: number;
  icon: Icon;
  label: string;
  href?: string;
}

// book type
export interface Book {
  id: number;
  created_at?: Date;
  book_title: string;
  book_author: string;
  description: string;
  image: string;
  book_cate_id: number;
}

// api response
export interface APIResponse<T> {
  status: number;
  message: string;
  payload: T;
}
