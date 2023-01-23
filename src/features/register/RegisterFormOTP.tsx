import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {Button, Label, Message} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginFormOTP from "../login/LoginFormOTP";
import { RegisterSchema } from "../../app/validation/validation";

const RegisterFormOTP: React.FC = () => {
  const { userStore, modalStore } = useStore();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        otp: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) => {
        userStore
          .register(values)
          .then(() => modalStore.openModal(<LoginFormOTP />))
          .catch((error) => {
            setErrors({
              error: "Registration failed: " + error.response.data.error,
            });
          });
      }}
      validationSchema={RegisterSchema}
    >
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="firstName">First Name</label>
          {errors.firstName && touched.firstName ? (
            <Label
              style={{ margin: 10 }}
              basic
              color="red"
              content={errors.firstName}
            />
          ) : null}
          <Field
            id="firstName"
            name="firstName"
            placeholder="John"
            type="text"
          />

          <label htmlFor="lastName">Last Name</label>
          {errors.lastName && touched.lastName ? (
            <Label
              style={{ margin: 10 }}
              basic
              color="red"
              content={errors.lastName}
            />
          ) : null}
          <Field
            id="lastName"
            name="lastName"
            placeholder="Smith"
            type="text"
          />

          <label htmlFor="phone">Phone</label>
          {errors.phone && touched.phone ? (
            <Label
              style={{ margin: 10 }}
              basic
              color="red"
              content={errors.phone}
            />
          ) : null}
          <Field id="phone" name="phone" type="tel" />

          <label htmlFor="email">Email</label>
            <Message info size="small">
                <Message.Header style={{"backgroundColor": "inherit"}}>
                    Please, introduce your university email.
                </Message.Header>
            </Message>
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
            placeholder="john@smith.com"
            type="email"
          />

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
            content="Register"
            type="submit"
            fluid
          ></Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterFormOTP);
