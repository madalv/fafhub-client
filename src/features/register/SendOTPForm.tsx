import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import {EmailOtpSchema} from "../../app/validation/validation";
import ReCAPTCHA from "react-google-recaptcha"

const recaptchaKey: string = process.env.REACT_APP_RECAPTCHA_KEY!

const SendOTPForm: React.FC<JSX.Element> = ({ props }) => {
  const { userStore, modalStore } = useStore();

    return (
    <Formik
      initialValues={{ email: "", recaptcha: "", error: null }}
      onSubmit={(values, { setErrors }) => {
        userStore
          .sendOtp(values)
          .then(() => modalStore.openModal(props))
          .catch((error) => {
            setErrors({ error: "Error: " + error.response.data.error });
          });
      }}
      validationSchema={EmailOtpSchema}
    >
      {({ handleSubmit, isSubmitting, errors, touched, setFieldValue }) => (
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


            <ReCAPTCHA
                sitekey={recaptchaKey}
                onChange={() => setFieldValue("recaptcha", "solved")}
            />
            {errors.recaptcha && touched.recaptcha ? (
                <Label
                    style={{ margin: 10 }}
                    basic
                    color="red"
                    content={errors.recaptcha}
                />
            ) : null}

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
