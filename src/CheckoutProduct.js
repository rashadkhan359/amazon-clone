import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, title, image, price, rating, hideButton }) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = ()=> {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
  return (
    <div className="checkoutProduct">
        <img className="chekcoutProduct__image" src={image} alt={title} />
        <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">
                {title}
            </p>
            <p className="checkoutProduct__price">
                <small className="rupee">₹</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
                {Array(rating).fill().map((_,i)=>(<p>⭐</p>))}
            </div>
            {/* Only render this button if it's not hidden. helps to reuse this component in orders page. */}
            {!hideButton && (
                <button onClick={removeFromBasket}>Remove from Basket</button>
            )}
            
        </div>
    </div>
  )
}

export default CheckoutProduct