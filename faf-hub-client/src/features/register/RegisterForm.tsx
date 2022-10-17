import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Label} from "semantic-ui-react";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";

// TODO add validation

const RegisterForm: React.FC = () => {

    const {userStore} = useStore()

    return(
        <Formik initialValues={{firstName: '', lastName: '', email: '', password: '', error: null}}
                onSubmit={(values, {setErrors}) => userStore.register(values)
                    .catch(error => setErrors({error: 'Invalid email or password!'}))}>

            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <label htmlFor='firstName'>First Name</label>
                    <Field id="firstName" name="firstName" type="text"/>
                    <label htmlFor='lastName'>Last Name</label>
                    <Field id="lastName" name="lastName" type="text"/>

                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" placeholder="john@smith.com" type="email"/>
                    <label htmlFor='password'>Password</label>
                    <Field id="password" name="password" type="password"/>

                    <ErrorMessage name='error' render={(() => <Label style={{margin: 10}} basic color='red' content={errors.error}/>)} />
                    <Button loading={isSubmitting} positive content='Register' type='submit' fluid></Button>
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterForm)