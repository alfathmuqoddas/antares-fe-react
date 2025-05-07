// hooks/useFormInput.js
import { useState } from "react";

export const useFormInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return {
    value,
    isFocused,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    setValue, // Optionally expose setValue if direct manipulation is needed
    setIsFocused, // Optionally expose setIsFocused
  };
};
