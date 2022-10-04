import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import {
  getCategoriesList,
  getCategorySubs,
} from "../../../functions/category";
import ProductForm from "../../../components/forms/ProductForm";
import ImageUpload from "../../../components/forms/ImageUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subCategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = (props) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  const { slug } = useParams();

  const loadProduct = () => {
    setLoading(true);
    getProduct(slug)
      .then((res) => {
        setLoading(false);
        let data = res.data;
        if (data.category) {
          data.originalCategory = data.category._id;
          data.category = data.category._id;
          loadSubCategories(data.category);
        }
        if (data.subCategories.length) {
          setShowSub(true);
          let subCategories = data.subCategories.map((item) => item._id);
          data.originalSubCategories = subCategories;
          data.subCategories = subCategories;
        }
        setValue({ ...value, ...data });
        loadCategories();
      })
      .catch((err) => console.log(err));
  };

  const loadCategories = () => {
    getCategoriesList().then((res) => {
      setCategories(res.data);
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const loadSubCategories = (_id) => {
    setShowSub(false);
    getCategorySubs(_id).then(
      (res) => setSubOptions(res.data),
      setShowSub(true)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProduct(slug, value, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} updated successfully`);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data.err);
        else toast.error("Error updating product");
      });
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    let newValue = e.target.value;
    setValue({ ...value, subCategories: [], [e.target.name]: newValue });
    if (newValue === value.originalCategory) {
      setValue({ ...value, subCategories: value.originalSubCategories });
    }
    loadSubCategories(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          {loading ? <h1>Updating</h1> : <h1>Product Create</h1>}
          <br />
          <div className="pa-2">
            <ImageUpload
              value={value}
              setValue={setValue}
              setLoading={setLoading}
            ></ImageUpload>
          </div>
          <ProductForm
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            handleSubmit={handleSubmit}
            setValue={setValue}
            value={value}
            showSub={showSub}
            subOptions={subOptions}
            categories={categories}
          ></ProductForm>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
