import axios from "axios";

export const getSubCategoriesList = async () => {
  return await axios.get(process.env.REACT_APP_API_URL + "sub-categories");
};

export const getSubCategory = async (slug) => {
  return await axios.get(
    process.env.REACT_APP_API_URL + `sub-category/${slug}`
  );
};

export const addSubCategory = async (form, authToken) => {
  return await axios.post(
    process.env.REACT_APP_API_URL + "sub-category",
    form,
    {
      headers: {
        authToken,
      },
    }
  );
};

export const updateSubCategory = async (slug, form, authToken) => {
  return await axios.put(
    process.env.REACT_APP_API_URL + `sub-category/${slug}`,
    form,
    {
      headers: {
        authToken,
      },
    }
  );
};

export const removeSubCategory = async (slug, authToken) => {
  return await axios.delete(
    process.env.REACT_APP_API_URL + `sub-category/${slug}`,
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getSubCategoryProducts = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}sub-category/products/${slug}`
  );
};
