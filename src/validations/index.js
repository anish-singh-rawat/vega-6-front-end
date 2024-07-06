import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be more than 50 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password cannot be more than 20 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password cannot be more than 20 characters"),
});

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required("product name is required")
    .min(4, "product name must be at least 4 characters")
    .max(30, "product name cannot be more than 20 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(100, "Description must be at least 100 characters")
    .max(600, "Description cannot be more than 600 characters"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .moreThan(0, "Price must be greater than 0"),
  uploadfile: Yup.string()
    .required("Upload file is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .moreThan(0, "Quantity must be greater than 0"),
  brand: Yup.string()
    .required("brand is required")
    .min(4, "brand must be at least 4 characters")
    .max(40, "brand cannot be more than 40 characters"),
  category: Yup.string()
    .required("category is required")
    .min(4, "category must be at least 4 characters")
    .max(40, "category cannot be more than 40 characters"),
});

export const placeOderSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("first Name is required")
    .min(4, "Name must be at least 4 characters")
    .max(20, "Name cannot be more than 20 characters"),
  lastName: Yup.string()
    .required("lastName is required")
    .min(4, "lastName must be at least 4 characters")
    .max(20, "lastName cannot be more than 20 characters"),
  StreetAddress: Yup.string()
    .required("StreetAddress is required")
    .min(3, "Street address must be at least 3 characters")
    .max(30, "Street address cannot be more than 30 characters"),
  City: Yup.string()
    .required("City is required")
    .min(5, "City must be at least 5 characters")
    .max(30, "City cannot be more than 30 characters"),
  CountryOrRegion: Yup.string()
    .required("City is required")
    .min(3, "Description must be at least 3 characters")
    .max(30, "Description cannot be more than 30 characters"),
  PhoneNumber: Yup.number()
    .required("Phone number is required"),
  EmailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});