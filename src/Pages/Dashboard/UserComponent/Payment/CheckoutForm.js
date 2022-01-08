import React, { useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams } from "react-router";

const CheckoutForm = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };
  useEffect(() => {});
  return (
    <div>
      <h1>Card payment</h1>
      <form onSubmit={handleSubmit} className="container ">
        <CardElement />
        <button
          className="btn btn-primary btn-lg py-1 px-5 mt-2"
          type="submit"
          disabled={!stripe || !elements}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
