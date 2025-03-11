import { Sidebar } from "@/lib/types";
import {
  Airplane,
  Book,
  Camera,
  Code,
  Edit,
  EmojiHappy,
  Home2,
  Music,
  Video,
  Weight,
} from "iconsax-react";

export const sidebarList: Sidebar[] = [
  {
    id: 1,
    icon: Home2,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    icon: Book,
    label: "Book Categories",
    href: "/book-categories",
  },
  {
    id: 3,
    icon: EmojiHappy,
    label: "Old School Cartoons",
    href: "/old-school-cartoons",
  },
  {
    id: 4,
    icon: Video,
    label: "Movies & TV Shows",
  },
  {
    id: 5,
    icon: Music,
    label: "Music",
  },
  {
    id: 6,
    icon: Camera,
    label: "Photography",
  },
  {
    id: 7,
    icon: Weight,
    label: "Sports & Fitness",
  },
  {
    id: 8,
    icon: Code,
    label: "Technology & Gadgets",
  },
  {
    id: 9,
    icon: Airplane,
    label: "Travel & Exploration",
  },
  {
    id: 10,
    icon: Edit,
    label: "Writing & Journaling",
  },
];
