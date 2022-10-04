import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPaymentIntent } from "../../functions/stripe";
import { Card } from "antd";
import {
  DollarOutlined,
  CheckOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import cardImage from "../../images/cards.jpg";
import { createOrder } from "../../functions/user";
import { emptyCart } from "../../functions/user";

export const StripePayment = () => {
  let dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  useEffect(() => {
    if (user)
      createPaymentIntent(user.token, coupon).then((res) => {
        const data = res.data;
        setClientSecret(data.clientSecret);
        setCartTotal(data.cartTotal);
        setTotalAfterDiscount(data.totalAfterDiscount);
        setPayable(data.payable);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(user.token, payload).then((res) => {
        if (res.data.ok) {
          if (typeof window !== "undefined") {
            dispatch({
              type: "ADD_TO_CART",
              payload: [],
            });
            dispatch({
              type: "APPLY_COUPON",
              payload: false,
            });
            localStorage.removeItem("cart");
            emptyCart(user.token);
          }
        }
      });
      setError(null);
      setSucceeded(true);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  const getActions = () => {
    let actions = [
      <>
        <DollarOutlined className="text-info" /> <br />
        Total: $ {cartTotal}
      </>,

      <>
        <CheckOutlined className="text-info" /> <br />
        Total Payable: $ {(payable / 100).toFixed(2)}
      </>,
    ];
    if (totalAfterDiscount > 0 && coupon) {
      actions.push(
        <>
          <MoneyCollectOutlined className="text-info" /> Discount Amount: ${" "}
          {(cartTotal - totalAfterDiscount).toFixed()}
        </>
      );
    }
    return actions;
  };

  return (
    <>
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        {" "}
        Payment Successful{" "}
        <Link to="/user/history">See it in your purchase history</Link>
      </p>

      <div className="text-center pb">
        <Card
          cover={
            <img
              src={cardImage}
              alt="card"
              style={{
                height: "50px",
                objectFit: "contain",
                marginTop: "30px",
              }}
            />
          }
          actions={getActions()}
        ></Card>
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        ></CardElement>
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span className="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </>
  );
};
