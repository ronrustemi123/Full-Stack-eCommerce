import Trending from "../components/Trending";
import "../components/Product.css";
import { Button, ButtonGroup } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useCartContext } from "../hooks/useCartContext";
import { useUserContext } from "../hooks/useUserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [trendProducts, setTrendProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const [truePrice, setTruePrice] = useState(0);

  const { dispatch } = useCartContext();

  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/api/store/product/${id}`
      );
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
      setQuantity(1);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setTruePrice(products?.price * quantity);
  }, [products, quantity]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/store");
      const data = await response.json();
      setTrendProducts(data);
    };

    fetchData();
  }, []);

  const notify = (mssg) => {
    toast.warn(mssg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    });
  };

  const addToCart = async () => {
    
    if (!user) {
      notify('You must be logged in!');
      return;
    }

    const newItem = {
      title: products.description,
      price: truePrice,
      quantity: quantity,
      img: products?.img,
    };

    const response = await fetch("http://localhost:8000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "ADD_ITEM", payload: data });
      setQuantity(1);
    }else {
      notify('Product already in cart!')
    }
  };

  return (
    <>
      <main className="product-page">
        {!isLoading ? (
          <>
            <h1 className="product-page-heading">{products?.description}</h1>
            <div className="product-page-header">
              <div className="product-images">
                <img
                  width={340}
                  height={400}
                  src={products?.img}
                  alt="product-image"
                />
              </div>

              <div className="product-info">
                <p className="product-info-specs">{products?.specs}</p>
                <div className="buy-thingy">
                  <h2>Quantity</h2>
                  <div>
                    <ButtonGroup size="large" color="inherit">
                      <Button
                        onClick={() =>
                          quantity > 1 ? setQuantity((prev) => prev - 1) : null
                        }
                        sx={{ backgroundColor: "white" }}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </Button>
                      <Button disabled color="secondary">
                        {quantity}
                      </Button>
                      <Button
                        onClick={() =>
                          quantity < 10 ? setQuantity((prev) => prev + 1) : null
                        }
                        sx={{ backgroundColor: "white" }}
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </Button>
                    </ButtonGroup>
                  </div>
                  <h2>${truePrice}</h2>
                </div>
                <div>
                  <button onClick={addToCart} className="add-to-cart-btn">
                    ADD TO CART
                  </button>
                  <button className="buy-now-btn">BUY NOW</button>
                </div>
              </div>
            </div>
            <div className="product-specs">
              <div>
                <h2>Texture:</h2>
                <p>{products?.texture}</p>
              </div>
              <div>
                <h2>Weight:</h2>
                <p>{products?.weight}</p>
              </div>
              <div>
                <h2>Size:</h2>
                <p>{products?.size}</p>
              </div>
            </div>
          </>
        ) : (
          <CircularProgress
            size={120}
            variant="indeterminate"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <Trending items={trendProducts} />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};

export default ProductPage;
