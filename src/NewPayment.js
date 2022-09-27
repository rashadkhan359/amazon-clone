import React, { useEffect, useState } from "react";
//import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState();

  console.log("The total is>>>>>", Math.trunc(getBasketTotal(basket) * 100));
  //Stripe HOOKS
  const stripe = useStripe();
  let elements;
  /////
  const navigate = useNavigate();
  //Whenever basket changes, it will make this request and it will update the special stripe secret which allows us to charge the customer the correct amount.
  useEffect(() => {
    let moneyForStripe = Math.trunc(getBasketTotal(basket) * 100);
    initialize();
    // Fetches a payment intent and captures the client secret
    async function initialize() {
      console.log("Initial Client Secret is >>>> ", clientSecret);
      //generate the special stripe client secret that allows us to charge the customer
      const response = await axios({
        method: "post",
        //Stripe expects the total in a currencies subunits, hence * 100
        url: `/payments/create?total=${moneyForStripe}`,
      });
      setClientSecret(response.data.clientSecret /*response.json()*/);
      console.log("The Client Secret is >>>> ", clientSecret);
      const appearance = {
        theme: "stripe",
      };
      elements = stripe.elements({ appearance, clientSecret });

      const paymentElement = elements.create("payment");
      paymentElement.mount("#payment-element");
    }
  }, basket);
  ////////

  const handleSubmit = async (event) => {
    //do all fancy stripe stuff...
    event.preventDefault(); //stops from refreshing
    setProcessing(true); //helps in stopping user to click Buy button multiple time while processing. basically disbales the button after one use.
    const { error } = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/orders",
        },
      })
      .then(async ({ paymentIntent }) => {
        //paymentIntent = payment confirmation

        //NoSQL Type retrieval of data
        try {
          const paymentRef = doc(
            db,
            "users",
            user?.uid,
            "orders",
            paymentIntent.id
          );

          await setDoc(paymentRef, {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        } catch (e) {
          console.error("Error adding orders to database: ", e);
        }
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        //Move to orders page, not at the payment page again. Duh...
        //navigate("/orders");
      });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      console.log("Card/Validation Error Occured:", error.message);
    } else {
      console.log("An unexpected error occurred.");
    }
  };

  const handleChange = (event) => {
    //Listen for changes in Card Element
    //and display any error as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>
        {/* Payment Section - Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123, Chaurangi Lane</p>
            <p>New Delhi, India</p>
          </div>
        </div>

        {/* Payment Section - Reviewing Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe Magic Happens here */}
            <form onSubmit={handleSubmit}>
              <div id="payment-element" onChange={handleChange}>
                {/* Stripe.js injects the Payment Element */}
              </div>
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: ${value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefic={"$"}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* ERRORS */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
