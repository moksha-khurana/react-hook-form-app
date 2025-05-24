import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

export function useDebounce(callback, delay) {
  const debounced = useMemo(() => debounce(callback, delay), [callback, delay]);

  useEffect(() => {
    return () => {
      debounced.cancel(); // Cleanup on unmount
    };
  }, [debounced]);

  return debounced;
}
