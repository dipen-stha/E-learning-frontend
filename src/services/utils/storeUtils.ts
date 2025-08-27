import { useState, useCallback, useRef } from "react";
import { produce } from "immer";

export function useUpdater<T>(initial: T) {
  const [payload, setPayload] = useState<T>(initial);
  const initialRef = useRef(initial);

  const updateField = useCallback(
    (path: string, value: any) => {
      setPayload(prev =>
        produce(prev, draft => {
          const keys = path.split(".");
          let current: any = draft;

          // Walk down the object until the last key
          keys.slice(0, -1).forEach(k => {
            if (!(k in current)) {
              current[k] = {}; // create if missing
            }
            current = current[k];
          });

          // Set the final value
          current[keys[keys.length - 1]] = value;
        })
      );
    },
    []
  );

  const reset = useCallback(() => {
    setPayload(initialRef.current);
  }, []);

  return { payload, updateField, setPayload, reset };
}
