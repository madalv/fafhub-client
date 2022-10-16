import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Label} from "semantic-ui-react";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";


const LoginForm: React.FC = () => {

    const {userStore} = useStore()

    return(
        <Formik initialValues={{email: '', password: '', error: null}}
                onSubmit={(values, {setErrors}) => userStore.login(values)
                    .catch(error => setErrors({error: 'Invalid email or password!'}))}>

            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" placeholder="john@smith.com" type="email"/>
                    <label htmlFor='password'>Password</label>
                    <Field id="password" name="password" type="password"/>

                    <ErrorMessage name='error' render={(() => <Label style={{margin: 10}} basic color='red' content={errors.error}/>)} />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid></Button>
                </Form>
            )}
        </Formik>
    )
}

export default observer(LoginForm)