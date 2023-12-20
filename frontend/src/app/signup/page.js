import React from "react";
import styles from "./signup.module.css";
// import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";

const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter your name")
    .test(
      "no-leading-space",
      "Name cannot start with a space",
      (value) => value && !value.startsWith(" ")
    ),
  email: Yup.string()
    .email()
    .required("Please enter email")
    .test(
      "no-leading-space",
      "Email cannot start with a space",
      (value) => value && !value.startsWith(" ")
    ),
  mobile: Yup.string()
    .required("Please enter mobile")
    .matches(/^[0-9]+$/, "Mobile number must be a valid number")
    .test(
      "min-digits",
      "Mobile number must be at least 10 digits",
      (value) => value && value.length >= 10
    ),
  password: Yup.string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character"
    ),
});
const page = () => {
  const handleSubmit = async (values) => {
    console.log(values);
  };
  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.formContainer} bg-light p-4 rounded`}>
        <h3 className="text-center">Signup</h3>
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobile: "",
            password: "",
          }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-12 pb-4">
                    <Field
                      label="Full Name"
                      name="name"
                      as={TextField}
                      fullWidth
                      value={values.name}
                    />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="error"
                    />
                  </div>
                  <div className="col-md-6 col-12 pb-4">
                    <Field
                      as={TextField}
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                      value={values.email}
                    />
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="error"
                    />
                  </div>

                  <div className="col-md-6 col-12 pb-4">
                    <Field
                      as={TextField}
                      label="Mobile Number"
                      name="mobile"
                      type="tel"
                      fullWidth
                      value={values.mobile}
                    />
                    <ErrorMessage
                      name="mobile"
                      component="small"
                      className="error"
                    />
                  </div>
                  <div className="col-md-6 col-12 pb-4">
                    <Field
                      label="Password"
                      variant="standard"
                      name="password"
                      type="password"
                      as={TextField}
                      fullWidth
                    />
                    <ErrorMessage
                      name="password"
                      component="small"
                      className="error"
                    />
                  </div>

                  <div>
                    <div className="col-4">
                      <button className={` ${style.cartButton}`} type="submit">
                        SAVE PROFILE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default page;
