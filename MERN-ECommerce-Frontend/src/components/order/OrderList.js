import ShowPaymentInfo from "../payment/ShowPaymentInfo";
import OrderTable from "./OrderTable";

const OrderList = ({ orders, handleOrderStatus }) => {
  const status = [
    "Not Processed",
    "Cash on Delivery",
    "Processing",
    "Dispatched",
    "Cancelled",
    "Completed",
  ];
  return (
    <div>
      {orders.map((order) => (
        <div className="card pl-3 pr-3 pt-5 pb-5 m-4" key={order._id}>
          <div className="row">
            <div className="col">
              <ShowPaymentInfo order={order}></ShowPaymentInfo>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <OrderTable order={order} />
            </div>
            <div className="col-md-4">
              <label>Update Order Status</label>
              <select
                name=""
                onChange={(e) => handleOrderStatus(order._id, e.target.value)}
                className="form-control"
                defaultValue={order.orderStatus}
              >
                {status.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
