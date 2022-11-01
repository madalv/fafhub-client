import React, {useEffect} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Label} from "semantic-ui-react";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import LoginForm from "../login/LoginForm";

// TODO add validation

const RegisterForm: React.FC = () => {

    const {userStore, modalStore} = useStore()

    const navigate = useNavigate()

    return(
        <Formik initialValues={{firstName: '', lastName: '', email: '', password: '', phone: '', error: null}}
                onSubmit={(values, {setErrors}) => {userStore.register(values)
                    .then(() => modalStore.openModal(<LoginForm />))
                    .catch(error => {setErrors({error: 'Invalid email or password!'})})
                    navigate("/login")
                }}>

            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <label htmlFor='firstName'>First Name</label>
                    <Field id="firstName" name="firstName" placeholder="John" type="text"/>

                    <label htmlFor='lastName'>Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Smith" type="text"/>

                    <label htmlFor='phone'>Phone</label>
                    <Field id="phone" name="phone" type="tel" />

                    <label htmlFor='email'>Email</label>
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