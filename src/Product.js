import React, { useEffect, useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Product({ product }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [isDesktop, setDesktop] = useState(window.innerWidth > 700);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 700);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  //dispatch is how we are going to manipulate data
  const addToBasket = () => {
    //dispatch the item into the data layer
    if(user){
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: product.data.id,
          title: product.data.title,
          image: product.data.url,
          price: parseInt(product.data.price),
          rating: product.data.rating,
        },
      });
    }else{
      alert("I mean, there is no user logged in??")
    }
    
  };
  return (
    <div className="product">
      {isDesktop && (
        <div className="product__info">
          <p>
            {product.data.title.length > 50
              ? product.data.title.slice(0, 50) + "..."
              : product.data.title}
          </p>
          <p className="product__price">
            <small className="rupee">₹</small>
            <strong>{product.data.price}</strong>
          </p>
          <div className="product__rating">
            {Array(product.data.rating)
              .fill()
              .map((_, i) => (
                <p>⭐</p>
              ))}
          </div>
        </div>
      )}
      <img src={product.data.url} alt={product.data.title} />
      {!isDesktop && (
        <p className="product__price">
          <small className="rupee">₹</small>
          <strong>{product.data.price}</strong>
        </p>
      )}
      <button onClick={addToBasket}>{isDesktop ? "Add to Basket" : (<ShoppingCartIcon className="product__cart"/>)}</button>
    </div>
  );
}

export default Product;
