import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const resetValue = () => setValues(initialValues);
  const setPreview = (value) => setValues(value);

  

  return [
    values,
    (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
    setPreview,
    resetValue,
  ];
};