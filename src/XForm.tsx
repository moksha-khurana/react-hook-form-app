import React from "react";
import { useForm } from "react-hook-form";

export type FilterInputs = {
  search: string;
  genre: string;
  sortBy: "title" | "year";
};

type Props = {
  onFilterChange: (data: FilterInputs) => void;
};

const genres = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "Romance"];

export const XForm = ({ onFilterChange }: Props) => {
  const {
    register,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FilterInputs>({
    defaultValues: {
      search: "",
      genre: "All",
      sortBy: "title",
    },
  });

  const [toast, setToast] = React.useState<string | null>(null);
  const watchedValues = watch();

  // ✅ Debounced, Validated, Toast-supported filter logic
  React.useEffect(() => {
    const handler = setTimeout(async () => {
      const isValid = await trigger("search");
      if (isValid) {
        setToast(null); // clear any existing toast
        onFilterChange(getValues());
      } else {
        const errorMsg = errors.search?.message;
        if (errorMsg) {
          setToast(errorMsg);
        }
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [watchedValues, trigger, getValues, onFilterChange, errors.search]);

  return (
    <div className="space-y-2">
      {/* Toast */}
      {toast && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <form className="space-x-4 p-4 bg-gray-100 rounded">
        <input
          {...register("search", {
            minLength: { value: 2, message: "Min 2 characters required" },
            maxLength: { value: 50, message: "Max 50 characters" },
          })}
          placeholder="Search by title or author"
          className={`border p-2 ${
            errors.search ? "border-red-500" : "border-gray-300"
          }`}
        />

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
    </div>
  );
};
