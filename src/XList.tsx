import React from "react";
import { type FilterInputs } from "./XForm";

export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
};

type Props = {
  books: Book[];
  filters: FilterInputs;
};

export const XList = ({ books, filters }: Props) => {
  const filteredBooks = React.useMemo(() => {
    let result = [...books];

    // 1. Filter by search
    if (filters.search.length >= 2) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          b.author.toLowerCase().includes(term)
      );
    }

    // 2. Filter by genre
    if (filters.genre !== "All") {
      result = result.filter((b) => b.genre === filters.genre);
    }

    // 3. Sort
    result.sort((a, b) => {
      if (filters.sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else {
        return a.year - b.year;
      }
    });

    return result;
  }, [filters, books]);

  if (filteredBooks.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">No books match the filter.</div>
    );
  }

  return (
    <ul className="p-4 space-y-2">
      {filteredBooks.map((book) => (
        <li
          key={book.id}
          className="border rounded p-3 shadow-sm bg-white hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-600">
            by {book.author} • {book.genre} • {book.year}
          </p>
        </li>
      ))}
    </ul>
  );
};
