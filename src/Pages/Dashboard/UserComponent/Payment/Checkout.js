import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51K8MFKErngJIG2bWCLbz4vV6laO66Ayo9JQGxZhJZjyw1U12o3Wp6XBONJUXCc4ivbGmg8A1ug8TtesV8aOfTMyo00KPrUHA2Y"
);

const Checkout = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
