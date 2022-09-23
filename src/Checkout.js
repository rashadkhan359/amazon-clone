import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';

function Checkout() {
  return (
    <div className="checkout">
        <div className="checkout__left">
            <img className="checkout__ad" src="https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-aws.jpg.webp" alt=""/>
            <div>
                <h2 className="checkout__title">Your Shopping Basket</h2>

                {/*Basket Item*/}
                {/*Basket Item*/}
                {/*Basket Item*/}
                {/*Basket Item*/}
                {/*Basket Item*/}
            </div>
        </div>
        <div className="checkout__right">
            <Subtotal/>
        </div>
    </div>
  )
}

export default Checkout