import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { handleCartAction } from '../../redux/slices/CartSlice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FaSearch, FaStar } from "react-icons/fa";
import NoITemFound from '../../components/NoITemFound';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [productsElements, setProductsElements] = useState([])
    const [removeItemId, setRemovedItemId] = useState(null)

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart)
    let token = Cookies.get('token')
    let userData;
    if (token) {
        userData = jwtDecode(token);
    }

    const removeToCart = async (productId) => {
        const payload = {
            productId: productId,
            userId: userData.id
        }
        setRemovedItemId(productId)
        const res = await dispatch(handleCartAction({ actionType: "remove", payload }));
        if (res?.error?.message === "Rejected") {
            toast.error(res.payload.message)
        }
    }
    useEffect(() => {
        token = Cookies.get('token')
        setProductsElements(cartData?.data?.cart?.cartItems)
    }, [cartData.data?.cart?.cartItems.length]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4  gap-6">
                {cartData.status === "loading" &&
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                {productsElements?.length > 0 && productsElements?.map((product) => (
                    <div
                        key={product?.productId}
                        className="bg-white shadow rounded overflow-hidden group py-5 px-5"
                    >
                        <div className="relative">
                            <img
                                src={product?.productImage}
                                alt={product?.itemName}
                                className='w-full h-48'
                            />
                            <div
                                className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                            >
                                <Link
                                    to={`/product/${product.productId}`}
                                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                    title="view product"
                                >
                                    <FaSearch />
                                </Link>
                            </div>
                        </div>
                        <div className="pt-4 pb-3 px-4">
                            <a href="#">
                                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                    {product?.itemName}
                                </h4>
                            </a>
                            <div className="flex items-baseline mb-1 space-x-2">
                                <p className="text-xl text-primary font-semibold">
                                    ${product?.price}
                                </p>
                                <p className="text-sm text-gray-400 line-through">$55.90</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex gap-1 text-sm text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <span key={index}>
                                            <FaStar />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div onClick={() => removeToCart(product?.productId)}
                            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary cursor-pointer transition">
                            {
                                removeItemId == product?.productId && cartData?.status == "loading" ?
                                    <div className="flex justify-center items-center">
                                        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                                    </div> :
                                    <div> remove to cart</div>
                            }
                        </div>
                    </div>
                ))}
            </div>
            {
                ((cartData.status == "succeeded" || cartData.status == "failed"  )&& (productsElements?.length < 1 || productsElements?.length == undefined )) &&
                <NoITemFound title="Cart"/>
            }   
        </>

    )
}
export default Cart;