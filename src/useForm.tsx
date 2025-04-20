import { useEffect, useState } from "react";

const useForm = <T extends { [key: string]: string }>({
  initialValues,
  validate,
  onSubmit,
}: {
  initialValues: T;
  validate: (values: T) => { [key in keyof T]: string };
  onSubmit: (values: T) => void;
}) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key in keyof T]: string }>(
    {} as { [key in keyof T]: string }
  );
  const [touched, setTouched] = useState<{ [key in keyof T]: boolean }>(
    {} as { [key in keyof T]: boolean }
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(
      Object.keys(values).reduce((touched, field) => {
        touched[field as keyof T] = true;
        return touched;
      }, {} as { [key in keyof T]: boolean })
    );
    const errors = validate(values);
    setErrors(errors);
    if (Object.values(errors).some((error) => error !== "")) return;
    onSubmit(values);
  };

  useEffect(() => {
    const errors = validate(values);
    setErrors(errors);
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
