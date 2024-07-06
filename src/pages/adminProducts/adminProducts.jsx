import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { GetProduct } from '../../redux/slices/getProducts';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteCartItem } from '../../redux/slices/deleteProduct';
import NoITemFound from '../../components/NoITemFound';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
    const [productsElements, setProductsElements] = useState([])
    const [addItemId, setAddItemId] = useState(null)
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart)
    const productData = useSelector((state) => state.getProducts)
    const deleteProducts = useSelector((state) => state.deleteProducts)

    const getAllProduct = async () => {
        const res = await dispatch(GetProduct());
        setProductsElements(res?.payload?.products)
    }

    const removeItem = async (_id) => {
        setAddItemId(_id)
        const payload = {
            productId: _id,
        }
        try {
            const res = await dispatch(deleteCartItem(payload));
            if (res.payload?.success === true) {
                toast.success(res?.payload?.messsage)
            } else {
                toast.error(res?.payload?.messsage)
            }
        } catch (error) {
            toast.error(error?.messsage)
        }
    }

    useEffect(() => {
        getAllProduct();
    }, [deleteProducts?.data?.product?.quantity, deleteProducts?.data?.product?.price])

    return (
        <>
            <div className="container pb-10 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4  gap-6">
                {productData?.status === "loading" &&
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                {productsElements?.length > 0 && productsElements?.map((product) => (
                    <div key={product?._id}
                        className="bg-white shadow-2xl rounded overflow-hidden group">
                        <div className="relative">
                            <img
                                src={product?.imagePath}
                                alt={product?.name}
                                className='w-full h-48'
                            />
                        </div>
                        <div className="pt-4 pb-3 px-4">
                            <a href="#">
                                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                    {product?.name}
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
                        <div className='flex gap-4'>
                            <div onClick={() => removeItem(product?._id)}
                                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary cursor-pointer transition">
                                {
                                    addItemId == product?._id && deleteProducts?.status == "loading" ?
                                        <div className="flex justify-center items-center">
                                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                                        </div>
                                        : <div> delete item </div>
                                }
                            </div>

                            <Link to={`/update-product/${product?._id}`}
                                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                                update details 
                            </Link>
                        </div>

                    </div>
                ))}
            </div>

            {
                (cartData.status == "succeeded" && productsElements?.length < 1) &&
                <NoITemFound title="Admin pannel"/>
            }
        </>

    )
}

export default AdminProducts