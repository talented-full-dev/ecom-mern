import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripePayment } from "../components/payment/StripePayment";
import "../stripe.css";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container p-4 text-center">
      <div className="text-center h4">Complete payment</div>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          {/* <p>Complete payment</p> */}
          <StripePayment></StripePayment>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
