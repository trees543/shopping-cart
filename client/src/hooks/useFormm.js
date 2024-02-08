import { useState, useRef } from 'react';

const useFormm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const inputsRef = useRef({});

  const control = inputsRef.current;

  const register = (name, options) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTouched({ ...touched, [e.target.name]: true });
      setValues({ ...values, [name]: value });
    };

    control[name] = {
      required: options?.required || false,
      pattern: options?.pattern || '',
      message: options?.message || '',
      length: options?.length,
    };

    const handleBlur = (e) => {
      const { name, value } = e.target;
      if (control[name].required && !value) {
        setErrors((errors) => {
          return { ...errors, [name]: 'This field is required' };
        });
      } else if (control[name].pattern && !value.match(control[name].pattern)) {
        setErrors((errors) => {
          return { ...errors, [name]: control[name].message };
        });
      } else if (control[name].length && value.length < control[name].length) {
        setErrors((errors) => {
          return { ...errors, [name]: 'This field is too short' };
        });
      } else {
        setErrors((errors) => {
          const { [name]: _, ...rest } = errors;
          return rest;
        });
      }
    };

    return {
      name,
      value: values[name] || '',
      onChange: handleInputChange,
      onBlur: handleBlur,
      type: 'text',
    };
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (cb) => {
    return (e) => {
      e.preventDefault();
      for (let key in control) {
        let fieldControl = control[key];

        console.log(key, values[key], 'HERE');

        if (fieldControl.required && !values[key]) {
          setErrors((errors) => {
            return { ...errors, [key]: 'This field is required' };
          });
        } else if (
          fieldControl.pattern &&
          typeof values[key] === 'string' &&
          !values[key].match(fieldControl.pattern)
        ) {
          setErrors((errors) => {
            return { ...errors, [key]: fieldControl.message };
          });
        } else if (
          fieldControl.length &&
          values[key].length < fieldControl.length
        ) {
          setErrors((errors) => {
            return { ...errors, [key]: 'This field is too short' };
          });
        } else {
          setErrors((errors) => {
            const { [key]: _, ...rest } = errors;
            return rest;
          });
        }
      }

      cb(e);
    };
  };

  return {
    register,
    handleSubmit,
    errors,
    values,
    reset,
  };
};

export default useFormm;
