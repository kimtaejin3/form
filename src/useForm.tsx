import { useState } from "react";

const useForm = ({
  initialValues,
  validate,
  onSubmit,
}: {
  initialValues: { [key: string]: string };
  validate: () => { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => void;
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
        touched[field] = true;
        return touched;
      }, {} as { [key: string]: boolean })
    );
    const errors = validate();
    setErrors(errors);
    if (Object.values(errors).some((error) => error !== "")) return;
    onSubmit(values);
  };

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
