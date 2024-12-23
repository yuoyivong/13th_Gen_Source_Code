import { getBooks } from "@/actions/bookAction";
import { create } from "zustand";

// Create a global store to manage and share book data
export const useStore = create((set) => ({
  books: [], // Default value as an empty array
  fetchBooks: async () => {
    try {
      const res = await getBooks(); // Fetch books data
      //   const books = await res.json(); // Parse response (if needed)

      console.log("Books:", res);

      set({ books: res }); // Update the state with fetched books
    } catch (error) {
      console.error("Error fetching books:", error);
      set({ books: [] }); // Set to empty array in case of an error
    }
  },
}));
