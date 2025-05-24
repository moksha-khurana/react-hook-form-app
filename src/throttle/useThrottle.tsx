import { useEffect, useMemo } from "react";
import { throttle } from "lodash";

export function useThrottle(callback, limit) {
  const throttled = useMemo(() => throttle(callback, limit), [callback, limit]);

  useEffect(() => {
    return () => {
      throttled.cancel(); // Cleanup
    };
  }, [throttled]);

  return throttled;
}
