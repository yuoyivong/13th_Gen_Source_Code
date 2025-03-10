import { Sidebar } from "@/lib/types";
import {
  Airplane,
  Book,
  Camera,
  Code,
  Cup,
  Edit,
  Game,
  Happyemoji,
  Music,
  Video,
  Weight,
} from "iconsax-react";

export const sidebarList: Sidebar[] = [
  {
    id: 1,
    icon: Book,
    label: "Book Categories",
    href: "/book-categories",
  },
  {
    id: 2,
    icon: Happyemoji,
    label: "Old-School Cartoons",
    href: "/old-school-cartoons",
  },
  {
    id: 3,
    icon: Video,
    label: "Movies & TV Shows",
  },
  {
    id: 4,
    icon: Music,
    label: "Music",
  },
  {
    id: 5,
    icon: Game,
    label: "Video Games",
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
    icon: Cup,
    label: "Collectibles & Figures",
  },
  {
    id: 11,
    icon: Edit,
    label: "Writing & Journaling",
  },
];
