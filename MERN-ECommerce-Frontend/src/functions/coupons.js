import axios from "axios";

export const createCoupon = async (authToken, coupon) => {
  return await axios.post(process.env.REACT_APP_API_URL + "coupon", coupon, {
    headers: {
      authToken,
    },
  });
};

export const getCoupons = async (authToken) => {
  return await axios.get(process.env.REACT_APP_API_URL + "coupons", {
    headers: {
      authToken,
    },
  });
};

export const removeCoupon = async (authToken, _id) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}coupon/${_id}`, {
    headers: {
      authToken,
    },
  });
};
