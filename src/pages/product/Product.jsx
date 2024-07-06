import { Link, useParams } from "react-router-dom"
import { useEffect } from "react";
import { singleProduct } from "../../redux/slices/SignleProduct";
import { useDispatch, useSelector } from "react-redux"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {toast} from "react-toastify"
const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const singleProductData = useSelector((state) => state.singleProduct)
    const getsingleProductData = async () => {
       const res =  await dispatch(singleProduct(id))
        if(res?.error?.message == "Rejected"){
            toast?.error(res?.payload?.message)
        }
    }
    useEffect(() => {
        getsingleProductData();
    }, [id])

    return (
        <div className="container grid grid-cols-1 mt-7 mb-7 md:grid-cols-2 gap-6 py-4">
            {
                singleProductData?.status === "loading" &&
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }

            <div>
                <img src={singleProductData?.data?.product?.imagePath} alt="product" className="w-full" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-red-500 uppercase mb-2">{singleProductData?.data?.product?.name}</h2>
                <div className="space-y-2">
                    <p className="space-x-2">
                        <span className="text-gray-800 font-semibold">Brand : </span>
                        <span className="text-gray-600">{singleProductData?.data?.product?.brand}</span>
                    </p>
                    <p className="space-x-2">
                        <span className="text-gray-800 font-semibold">quantity : {singleProductData?.data?.product?.quantity} </span>
                    </p>
                    <p className="space-x-2">
                        <span className="text-gray-800 font-semibold">Category : </span>
                        <span className="text-gray-600">
                            {singleProductData?.data?.product?.category}
                        </span>
                    </p>
                </div>
                
                <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-2">
                    <p className="space-x-2">
                        <span className="text-gray-800 font-semibold">product price : </span>
                        <span className="text-gray-600">
                            {singleProductData?.data?.product?.price}
                        </span>
                    </p>
                </div>
                <hr className="mt-2" />
                <p className="items-baseline mb-1 space-x-2 font-roboto mt-2">
                    <span className="text-gray-800 font-semibold">
                         discription : 
                    </span>
                    <span className="text-gray-600">
                        {singleProductData?.data?.product?.description}
                    </span>
                </p>

                <div className="mt-4 block md:flex gap-3 border-b border-gray-200 pb-5 pt-5">
                    <Link to={'/'}
                        className="bg-primary justify-center border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                        back to home
                    </Link>
                    <Link to={`/buy-product/${id}`}
                        className="border justify-center  border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition mt-4 md:mt-0"> order now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product