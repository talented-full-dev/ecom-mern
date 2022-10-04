import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { addProduct } from "../../../functions/product";
import {
  getCategoriesList,
  getCategorySubs,
} from "../../../functions/category";
import ProductForm from "../../../components/forms/ProductForm";
import ImageUpload from "../../../components/forms/ImageUpload";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  categories: [],
  subCategories: [],
  shipping: "Yes",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  const loadCategories = () => {
    getCategoriesList().then((res) => setCategories(res.data));
  };

  useEffect(() => {
    loadCategories();
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
    addProduct(value, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} created successfully`);
        setValue(initialState);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data.err);
        else toast.error("Error creating product");
      });
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValue({ ...value, subs: [], [e.target.name]: e.target.value });
    loadSubCategories(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          {loading ? <h1>Saving</h1> : <h1>Product Create</h1>}
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

export default ProductCreate;
