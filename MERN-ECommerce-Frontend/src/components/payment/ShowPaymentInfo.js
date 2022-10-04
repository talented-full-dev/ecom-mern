const ShowPaymentInfo = ({ order }) => {
  const { paymentIntent } = order;
  return (
    <div>
      <div className="alert alert-info d-flex justify-content-around">
        <span>
          Order ID: <b>{paymentIntent && paymentIntent.id.toUpperCase()}</b>
        </span>
        <span>
          Amount:{" "}
          <b>
            {paymentIntent &&
              (paymentIntent.amount /= 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
          </b>
        </span>
        <span>
          Currency:{" "}
          <b>{paymentIntent && paymentIntent.currency.toUpperCase()}</b>
        </span>
        <span>
          Method:{" "}
          <b>{paymentIntent && paymentIntent.payment_method_types[0]}</b>
        </span>
        <span>
          Payment: <b>{paymentIntent && paymentIntent.status.toUpperCase()}</b>
        </span>
        <span>
          Order On:{" "}
          <b>
            {paymentIntent &&
              new Date(paymentIntent.created * 100).toLocaleString()}
          </b>
        </span>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <span className="badge bg-primary text-center text-white">
          Status: {order.orderStatus}
        </span>
      </div>
    </div>
  );
};

export default ShowPaymentInfo;
