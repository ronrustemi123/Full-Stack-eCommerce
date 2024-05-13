import logo from '../assets/newlogo2.png'
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useState, useEffect } from 'react';
import {useUserContext} from '../hooks/useUserContext'
import { useLogout } from '../hooks/useLogout';
import { Badge, Stack, SwipeableDrawer } from '@mui/material';
import CartItem from './CartItem';
import cartImg from '../assets/cart/empty-cart.png'
import {useCartContext} from '../hooks/useCartContext'

const Navbar = () => {

    const {user} = useUserContext()
    const {logout} = useLogout()

    const [totalPrice, setTotalPrice] = useState()

    const [open, setOpen] = useState(false)

    const {dispatch, items} = useCartContext()
    
    const toggleOpen = () => {
      setOpen(!open)
    }

    const handleLogout = () => {
      logout()
    }

    useEffect(() => {
      const fetchItems = async () => {
        const response = await fetch('http://localhost:8000/api/cart', {
          headers: {'Authorization': `Bearer ${user.token}`}
        })
        const data = await response.json()
        if(response.ok) {
          dispatch({type: 'GET_ITEMS', payload: data})
        }
      }

      if(user) {
        fetchItems()
      }
    }, [user])

    useEffect(() => {
      setTotalPrice(items?.reduce((acc, item) => acc + item.price, 0))

    }, [items, user])

    return (
      <>
        <div className="all-header">
          <nav className="nav-bar">
            <div className='logo-container'>
            <Link to={"/"}>
              <img className="header-logo" width={90} src={logo} alt="logo" />
            </Link>
            <p className='username'>{user?.email.split('@')[0]}</p>
            </div>

            <div>
              {user ? (
                <>
                  <Link className="nav-links" to={"/categories/all"}>
                    CATEGORIES
                  </Link>
                  <Link onClick={handleLogout} to={'/'} className="login-nav-btn">
                    LOG OUT
                  </Link>
                  <Badge badgeContent={items?.length} variant='number'  color='error' max={9} overlap='rectangular'>
                    <i onClick={toggleOpen} className="fa-solid fa-cart-shopping cart-link"></i>
                  </Badge>  
                </>
              ) : (
                <>
                  <Link className="nav-links" to={"/categories/all"}>
                    CATEGORIES
                  </Link>
                  <Link className="login-nav-btn" to={"/login"}>
                    LOG IN
                  </Link>
                  <Link className="login-nav-btn" to={"/signup"}>
                    SIGN UP
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <SwipeableDrawer
          anchor="right"
          onOpen={toggleOpen}
          onClose={toggleOpen}
          open={open}
        >
          <h1 className="cart-heading">
            Your Shopping Cart ({items?.length}) {" "}
            <i onClick={toggleOpen} className="fa-solid fa-xmark"></i>
          </h1>
          <Stack
            px={3}
            sx={{ height: "70%", overflow: "auto" }}
            direction={"column"}
            position={"relative"}
            width={{ lg: "35vw", sm: "50vw", xs: "100vw" }}
            spacing={2.5}
          >
            {items?.length !== 0 ? (
              items?.map((el) => (
                <CartItem
                  key={el.title}
                  title={el.title}
                  img={el.img}
                  quantity={el.quantity}
                  price={el.price}
                  _id={el._id}
                />
              ))
            ) : (
              <div className="cart-img-div">
                <img
                  width={220}
                  height={220}
                  className="cart-img"
                  src={cartImg}
                  alt="cartImage"
                />{" "}
                <p>Your cart is empty</p>
              </div>
            )}
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              height: "70px",
              borderTop: "3px dashed black"
            }}
            mt={3}
            mx={3}
            display={items?.length === 0 ? 'none' : 'flex'}
          >
            <h1 className="total-price">Total Price: {totalPrice}$</h1>
            <button className="checkout-btn">Checkout</button>
          </Stack>
        </SwipeableDrawer>
      </>
    );
}
 
export default Navbar;