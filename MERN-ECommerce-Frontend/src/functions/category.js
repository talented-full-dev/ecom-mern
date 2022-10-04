import axios from "axios";

export const getCategoriesList = async () => {
  return await axios.get(process.env.REACT_APP_API_URL + "categories");
};

export const getCategory = async (slug) => {
  return await axios.get(process.env.REACT_APP_API_URL + `category/${slug}`);
};

export const addCategory = async (form, authToken) => {
  return await axios.post(process.env.REACT_APP_API_URL + "category", form, {
    headers: {
      authToken,
    },
  });
};

export const updateCategory = async (slug, form, authToken) => {
  return await axios.put(
    process.env.REACT_APP_API_URL + `category/${slug}`,
    form,
    {
      headers: {
        authToken,
      },
    }
  );
};

export const removeCategory = async (slug, authToken) => {
  return await axios.delete(
    process.env.REACT_APP_API_URL + `category/${slug}`,
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getCategorySubs = async (_id) => {
  return await axios.get(
    process.env.REACT_APP_API_URL + `category/subs/${_id}`
  );
};

export const getCategoryProducts = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}category/products/${slug}`
  );
};
