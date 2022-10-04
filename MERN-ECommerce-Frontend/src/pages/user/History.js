import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import ShowPaymentInfo from "../../components/payment/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/payment/Invoice";
import OrderTable from "../../components/order/OrderTable";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) loadOrders();
  }, []);

  const loadOrders = () => {
    getUserOrders(user.token).then((res) => setOrders(res.data));
  };

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showOrders = () =>
    orders.map((o) => (
      <div className="m-5 p-3 card" key={o._id}>
        <ShowPaymentInfo order={o} />
        <OrderTable order={o} />
        <div className="row">
          <div className="col">{showDownloadLink(o)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav></UserNav>
        </div>
        <div className="col-md-10 pt-3">
          <h4 className="text-center">
            {orders.length ? "User History" : "No Purchase History"}
          </h4>
          <div>{showOrders()}</div>
        </div>
      </div>
    </div>
  );
};

export default History;
