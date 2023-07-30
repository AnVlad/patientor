import { useState } from 'react';

const useField = (name: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  onChange.reset = () => {
    setValue('');
  };

  onChange.setValue = (value: string) => {
    setValue(value);
  };

  return {
    name,
    value,
    onChange,
  };
};

export default useField;
