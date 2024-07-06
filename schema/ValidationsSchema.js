import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().trim().email("Please enter a valid email").required("Please enter your email"),
    password: Yup.string().trim().min(4).required('Please enter your password'),
});