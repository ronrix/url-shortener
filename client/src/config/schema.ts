import * as yup from "yup";

export const registerSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
})

export const addCollectionSchema = yup.object().shape({
    name: yup.string().required(),    
    original_url: yup.string().required(),    
    details: yup.string().required(),    
});