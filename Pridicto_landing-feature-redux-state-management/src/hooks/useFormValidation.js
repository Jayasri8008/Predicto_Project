import { useState, useCallback } from 'react';

export const useFormValidation = (initialState, onSubmit, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (touched[name]) {
      const fieldError = validate({ ...values, [name]: value }, name);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError || undefined,
      }));
    }
  }, [touched, validate, values]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validate(values, name);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError || undefined,
    }));
  }, [validate, values]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = {};
    Object.keys(initialState).forEach(field => {
      const error = validate(values, field);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(values);
      } catch (err) {
        console.error('Form submission error:', err);
      }
    }
    setIsSubmitting(false);
  }, [initialState, onSubmit, validate, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  };
};

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  return '';
};

export const validateRequired = (value, label = 'This field') => {
  if (!value || value.trim() === '') return `${label} is required`;
  return '';
};
