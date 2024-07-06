import { useEffect, useState, useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { handleCartAction } from '../redux/slices/CartSlice';
import { useDispatch } from "react-redux"
import SearchModal from './SearchModal';

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const registerData = useSelector((state) => state.register)
  const cartData = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    Cookies.remove('token')
    navigate('/login')
    toast.success("logout successfully")
  }

  const getCartItem = async () => {
    dispatch(handleCartAction({ actionType: "get", payload: { id: userData?.id } }));
  }

  let token = Cookies.get('token')
  let userData;
  if (token) {
    userData = jwtDecode(token);
  }
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setInputValue('');
  };
  useEffect(() => {
    token = Cookies.get('token')
    if (token !== undefined && token !== null) {
      getCartItem();
    }
  }, [cartData.data?.cart?.cartItems?.length, cartData.data?.cart?.cartItems?.__v, token, registerData?.data?.success == true, cartData?.data?.success == true])

  useEffect(() => {
    if (!openModal && inputRef.current) {
      inputRef.current.blur();
    }
  }, [openModal]);
  return (
    <>
      <header className="py-4 bg-gray-100 shadow-xl sticky top-0 z-50">
        <div className="flex flex-wrap items-center justify-between px-4 ">
          <div className='flex gap-5 flex-wrap break-words sm:gap-10 rounded-3xl'>
            {
              userData?.id &&
              <Link to={'/'} className="flex-shrink-0 text-[20px] sm:text-xl md:text-2xl font-bold ">
                <span className='text-red-500'>Quadb </span> Tech
              </Link>
            }
            {
              !userData?.id &&
              <Link className="flex sm:text-xl md:text-2xl text-[20px] font-bold break-words flex-wrap">
                <span className='text-red-500'>welcom to QuadB </span> Tech group
              </Link>
            }
            {
              userData?.admin === true &&
              <Link to={'/sell-product'} className="flex-shrink-0 text-[20px] sm:text-xl md:text-2xl font-bold ">
                <span className='text-red-500'>Sell</span> Product
              </Link>
            }
            {
              userData?.admin === true &&
              <Link to={'/admin-product'} className="flex-shrink-0 text-[20px] sm:text-xl md:text-2xl font-bold ">
                <span className='text-red-500'>admin</span> pannel
              </Link>
            }
          </div>

          {/* header Searchbox  */}
          {
            userData?.id &&
            <div className="relative flex mt-4 w-96 md:w-96 md:mt-0 md:ml-4 order-last md:order-none">
              <input type="text" name="search" id="search"
                className="w-full  md:w-96 border border-primary border-r-0  py-3 pr-3 rounded-l-md focus:ring-0 focus:border-primary"
                placeholder="Search products by name.." onChange={(e) => {
                  setInputValue(e.target.value);
                  handleOpenModal();
                }}
                onClick={handleOpenModal}
                onKeyPress={handleOpenModal}
                ref={inputRef}
                value={inputValue}
              />
              <button onClick={handleOpenModal} className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
                <FaSearch />
              </button>
              <SearchModal openModal={openModal} handleCloseModal={handleCloseModal} />
            </div>
          }

          {/* header icons  */}
          {
            userData?.id &&
            <div className="flex items-center space-x-6">
              <Link
                to={'/cart'}
                href="#"
                className="text-center text-gray-700 hover:text-primary transition relative"
              >
                <div className="text-2xl">
                  <FaCartShopping />
                </div>
                <div className="text-xs leading-3">Cart</div>
                <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                  {cartData.data?.cart?.cartItems?.length ? cartData.data?.cart?.cartItems?.length : 0}
                </div>
              </Link>
              <div>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="user profile">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar />
                    <span className='text-red-500 font-bold'> name : </span>
                    <span className='text-gray-600 font-bold px-2'> {userData?.username}
                    </span>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar />
                    <span className='text-red-500 font-bold'>email :  </span>
                    <span className='text-gray-600 font-bold px-2'>  {userData?.email}
                    </span>

                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          }
          {
            !userData?.id &&
            <div>
              <ul className="flex flex-wrap items-center mb-6 text-lg font-medium text-gray-500 sm:mb-0 dark:text-gray-800">
                <li>
                  <Link to={'/'} className="hover:underline me-4 md:me-6">
                    About
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className="hover:underline me-4 md:me-6">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className="hover:underline me-4 md:me-6">
                    Licensing
                  </Link>
                </li>
                <li>
                  <Link to={'/'} className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          }
        </div>
      </header>
    </>
  );
};

export default Header;
