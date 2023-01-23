import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup);


export const EmailOtpSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('Required field.'),
    recaptcha:
        Yup.string()
            .required('ReCAPTCHA required.')
})

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('Required field.'),
    password: Yup.string()
        .required("Required field.")
        .min(8, "Password too short.")
        .max(50, "Password too long."),
    otp: Yup.string()
        .length(6, "One-Time Password must have 6 digits.")
        .required("Required field.")
        .matches(/^\d+$/, "Only digits please.")
})

export const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, "First name too short.")
        .max(50, "First name too long.")
        .required("Required field."),
    lastName: Yup.string()
        .min(3, "Last name too short.")
        .max(50, "Last name too long.")
        .required("Required field."),
    email: Yup.string()
        .email('Invalid email.')
        .required('Required field.'),
    password: Yup.string()
        .required("Required field.")
        .min(8, "Password too short.")
        .max(50, "Password too long.")
        .minSymbols(1, "Password must contain at least 1 special character.")
        .minUppercase(1, "Password must contain at least 1 uppercase letter.")
        .minNumbers(2, "Password must contain at least 2 digits."),
    phone: Yup.string()
        .min(8, "Phone must have 8-10 digits.")
        .max(10, "Phone must have 8-10 digits.")
        .matches(/^\d+$/, "Only digits please.")
        .required("Required field."),
    otp: Yup.string()
        .length(6, "One-Time Password must have 6 digits.")
        .required("Required field.")
        .matches(/^\d+$/, "Only digits please.")
})

export const CreateRoomSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Room name must have 3+ characters.")
        .max(50, "Room name must not exceed 50 characters.")
        .required("Required field.")
})