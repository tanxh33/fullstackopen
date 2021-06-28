import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};
