import { useState } from "react";
import styled from "styled-components";

const LoginForm1 = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const errors = {
      email: "",
      password: "",
    };

    if (!values.email) {
      errors.email = "이메일을 입력해주세요";
    }

    if (!values.password) {
      errors.password = "비밀번호를 입력해주세요";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.values(errors).some((error) => error !== "")) return;
    alert(JSON.stringify(values, null, 2));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="email">이메일</Label>
        <Input
          type="text"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && <Error>{errors.email}</Error>}
      </Field>
      <Field>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
        {errors.password && <Error>{errors.password}</Error>}
      </Field>
      <Button type="submit">로그인</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 30px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Input = styled.input`
  font-size: 15px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #aaa;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid #aaa;
  background-color: #000;
  color: #fff;
`;

const Error = styled.span`
  color: red;
`;

export default LoginForm1;
