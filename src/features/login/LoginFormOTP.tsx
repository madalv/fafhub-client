import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../../app/validation/validation";

const LoginFormOTP: React.FC = () => {
  const { userStore } = useStore();
  let navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: "", password: "", otp: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .then(() => {
            navigate("/community");
          })
          .catch((error) => {
            console.log(error);
            setErrors({ error: "Login failed: " + error.response.data.error });
          })
      }
      validationSchema={LoginSchema}
    >
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="email">Email</label>
          {errors.email && touched.email ? (
            <Label
              style={{ margin: 10 }}
              basic
              color="red"
              content={errors.email}
            />
          ) : null}
          <Field
            id="email"
            name="email"
            placeholder="mr.bostan@isa.utm.md"
            type="email"
          />

          <label htmlFor="password">Password</label>
          {errors.password && touched.password ? (
            <Label
              style={{ margin: 10 }}
              basic
              color="red"
              content={errors.password}
            />
          ) : null}
          <Field id="password" name="password" type="password" />

          <label htmlFor="otp">OTP</label>
          {errors.otp && touched.otp ? (
            <Label
              style={{ margin: 10 }}
              basic
              color="red"
              content={errors.otp}
            />
          ) : null}
          <Field id="otp" name="otp" type="text" />

          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ margin: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            color="purple"
            content="Login"
            type="submit"
            fluid
          ></Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginFormOTP);
