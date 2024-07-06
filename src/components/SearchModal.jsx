import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaSearch, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { handleCartAction } from "../redux/slices/CartSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 450, md: 600 },
  maxHeight: "85%",
  borderRadius: "20px 20px",
  bgcolor: "background.paper",
  border: "1px solid #FD3D57",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
};

export default function SearchModal({ openModal, handleCloseModal }) {
  const [addItemId, setAddItemId] = React.useState(null);
  const [filterItems, setFilterItems] = React.useState([]);
  const { posts } = useSelector((state) => state.getProducts);
  const cartData = useSelector((state) => state.cart);
  const loginData = useSelector((state) => state.login.status);
  const registerData = useSelector((state) => state.register.status);
  const dispatch = useDispatch();

  let token = Cookies.get("token");
  let userData;
  if (token) {
    userData = jwtDecode(token);
  }
  const AddToCart = async (_id, price, imagePath, name) => {
    setAddItemId(_id);
    const payload = {
      productId: _id,
      price: price,
      userId: userData.id,
      itemName: name,
      productImage: imagePath,
    };
    try {
      const res = await dispatch(
        handleCartAction({ actionType: "add", payload })
      );
      if (res.payload.success === true) {
        toast.success(res?.payload?.message);
      } else {
        toast.error(res?.payload?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
    finally{
        handleCloseModal();
    }
  };

  const handleSearch = (searchTerm) => {
    const filterdata = posts?.products?.filter(
      (data) =>
        data.name && data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterItems(filterdata);
  };

  React.useEffect(() => {
    token = Cookies.get("token");
  }, [loginData, registerData]);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" flex justify-center text-2xl font-bold text-red-500">
            serach item though there name
          </div>
          <div className="flex justify-center mt-5">
            <input
              type="text"
              name="search"
              id="search"
              autoFocus={true}
              className="w-full  md:w-96 border border-primary border-r-0  py-3 pr-3 rounded-l-md focus:ring-0 focus:border-primary"
              placeholder="Search products by name.."
              onChange={(e) => {
                const value = e.target.value;
                handleSearch(value);
              }}
            />
            <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
              <FaSearch onClick={handleSearch} />
            </button>
          </div>
          <div className="overflow-scroll  overflow-x-hidden h-[350px] mt-5 rounded-xl">
            {filterItems?.length > 0 &&
              filterItems?.map((product) => (
                <div
                  key={product?._id}
                  className="bg-white px-2 py-2 shadow-2xl rounded overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={product?.imagePath}
                      alt={product?.name}
                      className="w-full h-48"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Link
                        onClick={handleCloseModal}
                        to={`/product/${product?._id}`}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product"
                      >
                        <FaSearch onClick={handleCloseModal} />
                      </Link>
                    </div>
                  </div>
                  <div className="pt-4 pb-3 px-4">
                    <Link onClick={handleCloseModal}
                      to={`/product/${product?._id}`}
                      className="cursor-pointer"
                    >
                      <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {product?.name}
                      </h4>
                    </Link>
                    <div className="flex items-baseline mb-1 space-x-2">
                      <p className="text-xl text-primary font-semibold">
                        ${product?.price}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        $55.90
                      </p>
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
                  <div className="flex gap-4">
                    <div
                      onClick={() =>{ AddToCart( product?._id, product?.price, product?.imagePath, product?.name)}}
                      className="cursor-pointer block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                    >
                      {addItemId == product?._id &&
                      cartData?.status == "loading" ? (
                        <div className="flex justify-center items-center">
                          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                        </div>
                      ) : (
                        <div> Add to cart</div>
                      )}
                    </div>

                    <Link onClick={handleCloseModal}
                      to={`/buy-product/${product?._id}`}
                      className="cursor-pointer block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                    >
                      shop now
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </Box>
      </Modal>
    </>
  );
}
