import axios from "axios";

export const getAdminOrders = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}admin/orders`, {
    headers: {
      authToken,
    },
  });
};

export const updateOrderStatus = async (authToken, orderId, orderStatus) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}admin/order/status`,
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );
};
