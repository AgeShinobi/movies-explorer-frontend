/* eslint-disable prefer-destructuring */
import { useState, useCallback } from 'react';

export default function useFormWithValidation() {
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;
    let error = input.validationMessage;
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Введите почту в формате: user@google.com';
      }
    }
    const newErrors = { ...errors, [name]: error };
    setValues({ ...values, [name]: value });
    setErrors(newErrors);
    if ((newErrors.name === '' || !newErrors.name) && newErrors.email === '' && newErrors.password === '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const resetForm = useCallback(
    (newValues = [], newErrors = [], newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values, errors, isValid, handleChange, resetForm,
  };
}
