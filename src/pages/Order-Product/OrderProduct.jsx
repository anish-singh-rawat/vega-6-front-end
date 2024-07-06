import { useEffect } from "react";
import { singleProduct } from "../../redux/slices/SignleProduct";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import { placeOderProduct } from "../../redux/slices/PlaceOrder";
import { placeOderSchema } from "../../validations";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const OrderProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    let token = Cookies.get('token')
    const navigate = useNavigate();
    let userData;
    if (token) {
        userData = jwtDecode(token);
    }
    const singleProductData = useSelector((state) => state.singleProduct)
    const loginData = useSelector((state) => state.login.status)
    const registerData = useSelector((state) => state.register.status)
    const oderProduct = useSelector((state) => state.placeOderProduct.status)

    
    const { errors, values, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                firstName: "",
                lastName: "",
                StreetAddress: "",
                City: "",
                CountryOrRegion: "",
                PhoneNumber: "",
                EmailAddress: ""
            },
            validationSchema: placeOderSchema,
            onSubmit: async (values) => {
                const payload = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    StreetAddress: values.StreetAddress,
                    City: values.City,
                    CountryOrRegion: values.CountryOrRegion,
                    PhoneNumber: values.PhoneNumber,
                    EmailAddress: values.EmailAddress   ,
                    ProductId: id,
                    userId: userData?.id,
                };
                try {
                    const res = await dispatch(placeOderProduct(payload));
                    if (res.payload.success === true) {
                        toast.success(res.payload.message)
                    }
                    else {
                        toast.error(res.payload.message)
                    }
                } catch (error) {
                    console.log(error)
                    toast.error("some error occured while processing!!")
                }
                finally {
                    navigate('/')
                }
            },
        });

    const getsingleProductData = async () => {
        dispatch(singleProduct(id))
    }

    useEffect(() => {
        if (id) {
            getsingleProductData();
        }
    }, [id])

    useEffect(() => {
        token = Cookies.get('token')
    }, [loginData, registerData]);


    return (
        <>
            <div>
                <div className="container grid md:grid-cols-12 pb-16 pt-6 gap-6">
                    <div className="shadow-slate-900 shadow-2xl w-full md:col-span-8 border border-gray-200 p-4 rounded">
                        <h3 className="text-lg text-red-600 font-bold capitalize mb-4">Checkout</h3>
                        <div className={`space-y-4`}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first-name" className="text-gray-600">First Name <span
                                        className="text-primary">*</span></label>
                                    <input type="text" onChange={handleChange}
                                        onBlur={handleBlur} value={values.firstName}
                                        name="firstName" id="first-name" className="input-box" />
                                    {errors.firstName && touched.firstName && (
                                        <div className="text-red-500 text-[12px] italic">
                                            {errors.firstName}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="text-gray-600">Last Name <span
                                        className="text-primary">*</span></label>
                                    <input type="text" id="last-name" className="input-box" onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={"lastName"} />
                                    {errors.lastName && touched.lastName && (
                                        <div className="text-red-500 text-[12px] italic">
                                            {errors.lastName}</div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="region" className="text-gray-600">Country/Region</label>
                                    <input type="text" onChange={handleChange}
                                        onBlur={handleBlur} value={values.CountryOrRegion}
                                        name={"CountryOrRegion"} id="region" className="input-box" />
                                    {errors.CountryOrRegion && touched.CountryOrRegion && (
                                        <div className="text-red-500 text-[12px] italic">
                                            {errors.CountryOrRegion}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="address" className="text-gray-600">Street address</label>
                                    <input type="text" onChange={handleChange}
                                        onBlur={handleBlur} value={values.StreetAddress}
                                        name={"StreetAddress"} id="address" className="input-box" />
                                    {errors.StreetAddress && touched.StreetAddress && (
                                        <div className="text-red-500 text-[12px] italic">
                                            {errors.StreetAddress}</div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="city" className="text-gray-600">City</label>
                                <input type="text" onChange={handleChange}
                                    onBlur={handleBlur} value={values.City}
                                    name={"City"} id="city" className="input-box" />
                                {errors.City && touched.City && (
                                    <div className="text-red-500 text-[12px] italic">
                                        {errors.City}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-gray-600">Phone number</label>
                                <input type="text" onChange={handleChange}
                                    onBlur={handleBlur} value={values.PhoneNumber}
                                    name={"PhoneNumber"} id="phone" className="input-box" />
                                {errors.PhoneNumber && touched.PhoneNumber && (
                                    <div className="text-red-500 text-[12px] italic">
                                        {errors.PhoneNumber}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="text-gray-600">Email address</label>
                                <input type="email" onChange={handleChange}
                                    onBlur={handleBlur} value={values.EmailAddress}
                                    name={"EmailAddress"} id="email" className="input-box" />
                                {errors.EmailAddress && touched.EmailAddress && (
                                    <div className="text-red-500 text-[12px] italic">
                                        {errors.EmailAddress}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full shadow-slate-900 shadow-2xl md:col-span-4 border border-gray-200 p-4 rounded ">
                        <h4 className=" text-red-600 font-bold text-lg mb-4 uppercase">
                            order summary</h4>
                        <div>
                            <img src={singleProductData?.data?.product?.imagePath} alt="product" />
                        </div>
                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between text-lg">
                                <div>
                                    <h5 className="text-gray-800 font-medium">product name</h5>
                                </div>
                                <p className="text-gray-800 font-medium">{singleProductData?.data?.product?.name}</p>
                            </div>
                            <div className="flex justify-between text-lg">
                                <div>
                                    <h5 className="text-gray-800 font-medium">product quantity</h5>
                                </div>
                                <p className="text-gray-800 font-medium">{singleProductData?.data?.product?.quantity}</p>
                            </div>
                            <div className="flex justify-between text-lg">
                                <div>
                                    <h5 className="text-gray-800 font-medium">product price</h5>
                                </div>
                                <p className="text-gray-800 font-medium">
                                    {singleProductData?.data?.product?.price}$
                                </p>
                            </div>
                        </div>



                        <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                            <p className="font-semibold">Total</p>
                            <p>{singleProductData?.data?.product?.price}$</p>
                        </div>

                        <div>
                        {
                            oderProduct == "loading" ? 
                            <div className="flex justify-center items-center">
                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                            </div>
                            : 
                            <button type="submit" onClick={handleSubmit}
                            className={`${Object.keys(errors).length > 0 && "mt-7"} block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary cursor-pointer transition font-medium`}>Place
                            order
                        </button>
                        }
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default OrderProduct