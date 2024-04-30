import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (e, actions) => {
    // const form = e.currentTarget;

    dispatch(register(e));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FormValidationSchema}
    >
      <Form className={css.formBox}>
        <div className={css.inputForm}>
          <label htmlFor={nameFieldId}>Username </label>
          <Field type="name" name="name" id={emailFieldId} />
          <ErrorMessage name="name" as="span" />

          <label htmlFor={emailFieldId}>Email </label>
          <Field type="email" name="email" id={emailFieldId} />
          <ErrorMessage name="email" as="span" />

          <label htmlFor={passwordFieldId}>Password </label>
          <Field type="password" name="password" id={passwordFieldId} />
          <ErrorMessage name="password" as="span" />
        </div>
        <button className={css.btn} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
