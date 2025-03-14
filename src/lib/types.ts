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
  payload: T | null;
}

// book category type
export interface BookCategory {
  id: number;
  created_at: Date;
  book_cate_name: string;
}

// cartoon type
export interface Cartoon {
  id: number;
  created_at: Date;
  ct_title: string;
  ct_creator: string;
  image: string;
  view_count: number;
  published_year: Date;
  ct_description: string;
  ct_genre_id: number;
}

// cartoon genre
export interface Genre {
  id: number;
  created_at: Date;
  cartoon_genre: string;
}
