import * as yup from "yup";

export const authSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})