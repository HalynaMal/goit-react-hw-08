import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const initialValues = {
    name: "",
    number: "",
  };

  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (e, actions) => {
    dispatch(addContact(e));
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
          <label className={css.labelText} htmlFor={nameFieldId}>
            Username
          </label>
          <Field type="text" name="name" id={nameFieldId} />
          <ErrorMessage name="name" as="span" />
        </div>
        <div className={css.inputForm}>
          <label className={css.labelText} htmlFor={numberFieldId}>
            Number
          </label>
          <Field type="text" name="number" id={numberFieldId} />
          <ErrorMessage name="number" as="span" />
        </div>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
