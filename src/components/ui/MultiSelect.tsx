import Select, { Props as SelectProps } from 'react-select';

interface CustomSelectProps<T> extends Omit<SelectProps, 'options' | 'getOptionLabel' | 'getOptionValue'> {
  options?: T[];
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string;
  onValueChange?: (value: T | T[] | null) => void;
}

export function MultiSelect<T>({ 
  options, 
  getOptionLabel, 
  getOptionValue, 
  onValueChange,
  ...props 
}: CustomSelectProps<T>) {
  return (
    <Select
      {...props}
      options={options as any}
      getOptionLabel={getOptionLabel as any}
      getOptionValue={getOptionValue as any}
      onChange={(value) => onValueChange?.(value as any)}
    />
  );
}