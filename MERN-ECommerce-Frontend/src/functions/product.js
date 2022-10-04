import axios from "axios";

export const addProduct = async (form, authToken) => {
  return await axios.post(process.env.REACT_APP_API_URL + "product", form, {
    headers: {
      authToken,
    },
  });
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}products/${count}`);
};

export const removeProduct = async (slug, authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}product/${slug}`, {
    headers: {
      authToken,
    },
  });
};

export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}product/${slug}`);
};

export const updateProduct = async (slug, form, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}product/${slug}`,
    form,
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getProducts = async (sort, order, page) => {
  const params = {
    sort: sort,
    order: order,
    page: page,
  };

  return await axios.get(`${process.env.REACT_APP_API_URL}products`, {
    params,
  });
};

export const productsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}products/total`);
};

export const productRating = async (_id, star, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}product/rating/${_id}`,
    { star },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const relatedProducts = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}product/related/${_id}`
  );
};

export const getProductsByFilter = async (form) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}products/filter`,
    form
  );
};
