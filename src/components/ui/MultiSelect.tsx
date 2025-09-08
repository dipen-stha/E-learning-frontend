import Select, { Props as SelectProps } from "react-select";

interface CustomSelectProps<T>
  extends Omit<
    SelectProps<T, boolean>,
    "options" | "getOptionLabel" | "getOptionValue" | "onChange"
  > {
  options?: T[];
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string;
  onValueChange?: (value: T | T[] | null) => void;
  isMulti?: boolean; // support both modes
}

export function MultiSelect<T>({
  options,
  getOptionLabel,
  getOptionValue,
  onValueChange,
  value,
  isMulti = false,
  ...props
}: CustomSelectProps<T>) {
  const findOptionsFromValues = (values: any): T | T[] | null => {
    if (!values || !options || !getOptionValue) return isMulti ? [] : null;

    if (isMulti) {
      // Multiple select
      if (Array.isArray(values)) {
        return values
          .map((val) => {
            if (typeof val === "object" && val !== null) return val as T;
            return options.find((opt) => getOptionValue(opt) === String(val));
          })
          .filter(Boolean) as T[];
      }
      return [];
    } else {
      // Single select
      if (typeof values === "object" && values !== null) return values as T;
      return (
        options.find((opt) => getOptionValue(opt) === String(values)) || null
      );
    }
  };

  const selectValue = findOptionsFromValues(value);

  return (
    <Select
      {...props}
      isMulti={isMulti}
      value={selectValue as any}
      options={options as any}
      getOptionLabel={getOptionLabel as any}
      getOptionValue={getOptionValue as any}
      onChange={(selectedValue) => {
        if (isMulti) {
          onValueChange?.((selectedValue as T[]) || []);
        } else {
          onValueChange?.((selectedValue as T) || null);
        }
      }}
    />
  );
}
