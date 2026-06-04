import { Status } from "@/types/support.types";
import { useCallback, useState } from "react";

export function useFormStatus() {
  const [status, setStatus] = useState<Status>(Status.PENDING);

  const resetStatus = useCallback(() => setStatus(Status.PENDING), []);

  return { status, setStatus, resetStatus };
}
