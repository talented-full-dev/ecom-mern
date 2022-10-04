import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../components/nav/AdminNav";
import { getAdminOrders, updateOrderStatus } from "../../functions/admin";
import OrderList from "../../components/order/OrderList";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    getAdminOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  const handleOrderStatus = (id, status) => {
    updateOrderStatus(user.token, id, status).then((res) => {
      if (res) {
        toast.success("Order status updated");
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <div>
            <OrderList
              orders={orders}
              handleOrderStatus={handleOrderStatus}
            ></OrderList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
