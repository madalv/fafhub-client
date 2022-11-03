import { ErrorMessage, Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
export default observer(function CreateRoom() {
  const { roomStore, modalStore } = useStore();
  return (
    <Formik
      initialValues={{ name: "", error: null }}
      onSubmit={(values, { setErrors }) => {
        roomStore.create(values.name).catch((error) => {
          setErrors({ error: "Invalid name" });
        });
        modalStore.closeModal();
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="name">Name</label>
          <Field
            id="name"
            name="name"
            placeholder="Cool Room name"
            type="text"
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
            positive
            content="Create"
            type="submit"
            fluid
          ></Button>
        </Form>
      )}
    </Formik>
  );
});
