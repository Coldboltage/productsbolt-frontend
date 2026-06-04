import { Status } from "@/types/support.types";
import { useState } from "react";

export function useFormStatus() {
  const [status, setStatus] = useState<Status>(Status.PENDING);

  const resetStatus = () => setStatus(Status.PENDING);

  return { status, setStatus, resetStatus };
}
