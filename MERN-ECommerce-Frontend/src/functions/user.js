import axios from "axios";

export const userCart = async (authToken, cart) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}user/cart`, cart, {
    headers: {
      authToken,
    },
  });
};

export const getUserCart = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}user/cart`, {
    headers: {
      authToken,
    },
  });
};

export const emptyCart = async (authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}user/cart`, {
    headers: {
      authToken,
    },
  });
};

export const saveAddress = async (authToken, address) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}user/address`,
    address,
    {
      headers: {
        authToken,
      },
    }
  );
};

export const applyCoupon = async (authToken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}user/coupon`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const createOrder = async (authToken, stripeResponse) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}user/order`,
    { stripeResponse },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const createCODOrder = async (authToken, stripeResponse) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}user/order/cod`,
    { stripeResponse },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getUserOrders = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}user/orders`, {
    headers: {
      authToken,
    },
  });
};

export const addToWishList = async (authToken, productId) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}user/wishlist`,
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getWishList = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}user/wishlist`, {
    headers: {
      authToken,
    },
  });
};

export const removeFromWishlist = async (authToken, productId) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}user/wishlist/${productId}`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
