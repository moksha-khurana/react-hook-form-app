import React, {useEffect} from "react";
import { useForm } from "react-hook-form";

// Define the shape of our form data
export type FilterInputs = {
  search: string;
  genre: string;
  sortBy: "title" | "year";
};

// Props expected from parent component
type Props = {
  onFilterChange: (data: FilterInputs) => void;
};

// Dropdown options
const genres = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "Romance"];

export const BookFilterForm = ({ onFilterChange }: Props) => {
  const { register, watch, trigger, formState: { errors } } = useForm<FilterInputs>({
    defaultValues: {
      search: "",
      genre: "All",
      sortBy: "title",
    },
  });

  // Watch all form fields in real-time
  const watchedValues = watch();

  // Whenever form values change, notify the parent
//   useEffect(() => {
//     onFilterChange(watchedValues);
//   }, [watchedValues, onFilterChange]);

 // Debounce logic (300ms)
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const isValid = await trigger("search");
      if (isValid) {
        onFilterChange(watchedValues);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [watchedValues, onFilterChange, trigger]);

  return (
    <form className="space-x-4 p-4 bg-gray-100 rounded">
      {/* <input
        {...register("search")}
        placeholder="Search by title or author"
        className="border p-2"
      /> */}
      
       <input
        {...register("search", {
          minLength: { value: 2, message: "Min 2 characters required" },
          maxLength: { value: 50, message: "Too long" },
        })}
        placeholder="Search by title or author"
        className="border p-2"
      />
      {errors.search && (
        <span className="text-red-500 text-sm">{errors.search.message}</span>
      )}

      <select {...register("genre")} className="border p-2">
        {genres.map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>

      <select {...register("sortBy")} className="border p-2">
        <option value="title">Sort by Title</option>
        <option value="year">Sort by Year</option>
      </select>
    </form>
  );
};
