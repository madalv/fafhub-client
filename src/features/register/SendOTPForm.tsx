import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";


const SendOTPForm: React.FC<JSX.Element> = ({ props }) => {
  const { userStore, modalStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", error: null }}
      onSubmit={(values, { setErrors }) => {
        userStore
          .sendOtp(values)
          .then(() => modalStore.openModal(props))
          .catch((error) => {
            setErrors({ error: "Error: " + error.response.data.error });
          });
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@smith.com"
            type="email"
          />

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
            content="Send OTP"
            type="submit"
            fluid
          ></Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(SendOTPForm);
