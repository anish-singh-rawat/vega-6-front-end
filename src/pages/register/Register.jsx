import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerSchema } from "../../validations";
import {register} from "../../redux/slices/registerSlice.js"
import Cookies from "js-cookie"

const inputElement = [
  {
    name: "name",
    placeHolder: "Name",
    type: "text",
  },
  {
    name: "phone",
    placeHolder: "Phone Number",
    type: "text",
  },
  {
    name: "email",
    placeHolder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeHolder: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeHolder: "Confirm Password",
    type: "password",
  },
];

const Register = () => {
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.register);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        const payload = {
          username: values.name,
          mobile: values.phone,
          email: values.email,
          password: values.password,
          isAdmin: false,
        };
        try {
          const res = await dispatch(register(payload));
          if(res.payload.success === true) {
            Cookies.set('token', res.payload.token)
            toast.success(res.payload.message)
          }
          else{
            toast.error(res.payload.message)
          }
        } catch (error) {
          console.log(error)
        }
      },
    });

  return (
    <>
      <div className="max-w-lg mx-auto shadow-xl px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          Create an account
        </h2>
        <div>
          <div className="space-y-2">
            {inputElement.map((input, i) => (
              <div key={i}>
                <label htmlFor="name" className="text-gray-600 mb-1 block">
                  {input.placeHolder}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder={input.placeHolder}
                  value={values[input.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors[input.name] && touched[input.name] && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors[input.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={handleSubmit}
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium mt-4"
          >
            {registerData.status == "loading" ? (
              <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
              </div>
            ) : (
              "create account"
            )}
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <Link to={'/login'} className="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
