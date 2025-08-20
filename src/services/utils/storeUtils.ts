import { useState, useCallback } from "react";

export function useUpdater<T>(initial: T) {
  const [payload, setPayload] = useState<T>(initial);

  const updateField = useCallback(
    <K extends keyof T>(
      field: K,
      value: T[K] | { id: T[K] } | { id: T[K] }[]
    ) => {
      let normalized: T[K];

      if (Array.isArray(value)) {
        normalized = value.map(v => (v as { id: T[K] }).id) as T[K];
      } else if (typeof value === "object" && value !== null && "id" in value) {
        normalized = (value as { id: T[K] }).id as T[K];
      } else {
        normalized = value as T[K];
      }

      setPayload(prev => ({
        ...prev,
        [field]: normalized,
      }));
    },
    []
  );

  return { payload, updateField, setPayload };
}
