import { useState, useMemo } from "react";
import { type FilterInputs, BookFilterForm } from "./BookFilterForm";

const books = [
  { title: "1984", author: "George Orwell", genre: "Fiction", year: 1949 },
  { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", year: 1965 },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction", year: 2011 },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", year: 1813 },
];

export const BookList = () => {
  const [filters, setFilters] = useState<FilterInputs>({
    search: "",
    genre: "All",
    sortBy: "title",
  });

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(searchLower) ||
          b.author.toLowerCase().includes(searchLower)
      );
    }

    if (filters.genre !== "All") {
      result = result.filter((b) => b.genre === filters.genre);
    }

    result.sort((a, b) => {
      return filters.sortBy === "title"
        ? a.title.localeCompare(b.title)
        : a.year - b.year;
    });

    return result;
  }, [filters]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <BookFilterForm onFilterChange={setFilters} />

      <ul className="mt-4">
        {filteredBooks.map((book, i) => (
          <li key={i} className="p-2 border-b">
            <strong>{book.title}</strong> by {book.author} ({book.year}) - {book.genre}
          </li>
        ))}
      </ul>
    </div>
  );
};
