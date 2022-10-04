import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { getCategoriesList } from "../functions/category";
import { getSubCategoriesList } from "../functions/subCategory";
import ProductCard from "../components/cards/ProductCard";
import { Collapse, Slider, Checkbox, Radio } from "antd";
import ReactStars from "react-rating-stars-component";
import {
  DollarOutlined,
  CheckSquareOutlined,
  StarOutlined,
  BgColorsOutlined,
  BranchesOutlined,
  DeliveredProcedureOutlined,
  AppleOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const Shop = () => {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryCheck, setCategoryCheck] = useState([]);
  const [star, setStar] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const brands = ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"];

  const { search } = useSelector((state) => ({ ...state }));

  const { text } = search;

  //Load pages on default
  useEffect(() => {
    loadAllProducts();
    loadCategories();
    loadSubCategories();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const loadCategories = () => {
    getCategoriesList().then((res) => setCategories(res.data));
  };

  const loadSubCategories = () => {
    getSubCategoriesList().then((res) => setSubCategories(res.data));
  };

  const searchProducts = (form) => {
    setLoading(true);
    getProductsByFilter(form).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  //2. Load Products on user search
  useEffect(() => {
    const delayed = setTimeout(() => {
      if (text) searchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    if (price && price[0] != 0 && price[1] != 0) searchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setCategoryCheck([]);
    setSubCategory("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4. Categories based filter

  const showCategories = () => {
    return (
      <Checkbox.Group value={categoryCheck} onChange={handleCategoryChange}>
        {categories.map((c) => (
          <div className="row pl-3" key={c._id}>
            <Checkbox value={c._id} name="category">
              {c.name}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>
    );
  };

  const handleCategoryChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar(null);
    setSubCategory("");
    setBrand("");
    setColor("");
    setShipping("");
    setCategoryCheck(e);
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (categoryCheck.length) searchProducts({ category: categoryCheck });
    }, 300);
    return () => clearTimeout(delayed);
  }, [categoryCheck]);

  //4. Rating

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (star) searchProducts({ star: star });
    }, 300);
    return () => clearTimeout(delayed);
  }, [star]);

  const handleRating = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryCheck([]);
    setSubCategory("");
    setBrand("");
    setColor("");
    setShipping("");
    setStar(e);
  };

  //5.Sub Category

  const showSubCategories = () => {
    return subCategories.map((c) => (
      <div
        className={`p-1 m-1 badge badge-${
          c._id === subCategory ? "primary" : "secondary"
        }`}
        onClick={() => handleSubCategory(c)}
        style={{ cursor: "pointer" }}
        key={c._id}
      >
        {c.name}
      </div>
    ));
  };

  const handleSubCategory = (c) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryCheck([]);
    setStar(null);
    setBrand("");
    setColor("");
    setShipping("");
    setSubCategory(c._id);
  };
  useEffect(() => {
    const delayed = setTimeout(() => {
      if (subCategory.length) searchProducts({ subCategory });
    }, 300);
    return () => clearTimeout(delayed);
  }, [subCategory]);

  // Brand
  const handleBrandChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryCheck([]);
    setStar(null);
    setColor("");
    setShipping("");
    setBrand(e.target.value);
  };

  const showBrands = () => {
    return (
      <Radio.Group value={brand} onChange={handleBrandChange}>
        {brands.map((b) => (
          <div className="row pl-3 mb-2" key={b}>
            <Radio value={b} name="brand">
              {b}
            </Radio>
          </div>
        ))}
      </Radio.Group>
    );
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (brand) searchProducts({ brand });
    }, 300);
    return () => clearTimeout(delayed);
  }, [brand]);

  // 8. Brand
  const handleColorChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryCheck([]);
    setStar(null);
    setBrand("");
    setShipping("");
    setColor(e.target.value);
  };

  const showColors = () => {
    return (
      <Radio.Group value={color} onChange={handleColorChange}>
        {colors.map((c) => (
          <div className="row pl-3 mb-2" key={c}>
            <Radio value={c} name="brand">
              {c}
            </Radio>
          </div>
        ))}
      </Radio.Group>
    );
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (color) searchProducts({ color });
    }, 300);
    return () => clearTimeout(delayed);
  }, [color]);

  // Shipping
  // Brand
  const handleShippingChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryCheck([]);
    setStar(null);
    setBrand("");
    setColor("");
    setShipping(e.target.value);
  };

  const showShipping = () => {
    return (
      <Radio.Group value={shipping} onChange={handleShippingChange}>
        <Radio value="Yes" name="brand">
          Yes
        </Radio>
        <Radio value="No" name="brand">
          No
        </Radio>
      </Radio.Group>
    );
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (shipping) searchProducts({ shipping });
    }, 300);
    return () => clearTimeout(delayed);
  }, [shipping]);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h4>Search / Filter</h4>
          <Collapse defaultActiveKey={["1", "2"]}>
            <Panel
              key="1"
              header={
                <>
                  <DollarOutlined className="mt-1 mr-2" /> Price
                </>
              }
            >
              <>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={(v) => handleSlider(v)}
                  max="4999"
                />
              </>
            </Panel>
            <Panel
              key="2"
              header={
                <>
                  <CheckSquareOutlined className="mt-1 mr-2" /> Category
                </>
              }
            >
              <>{showCategories()}</>
            </Panel>
            <Panel
              key="3"
              header={
                <>
                  <StarOutlined className="mt-1 mr-2" /> Rating
                </>
              }
            >
              <>
                <div className="d-flex justify-content-center align-items-center">
                  <span>
                    <ReactStars
                      count={5}
                      size={40}
                      onChange={handleRating}
                      isHalf={true}
                      value={star}
                      activeColor="#ffd700"
                    />
                  </span>
                  <p className="pt-3 ml-3">({star})</p>
                </div>
              </>
            </Panel>
            <Panel
              key="4"
              header={
                <>
                  <BranchesOutlined className="mt-1 mr-2" /> Subcategory
                </>
              }
            >
              <>{showSubCategories()}</>
            </Panel>
            <Panel
              key="5"
              header={
                <>
                  <AppleOutlined className="mt-1 mr-2" /> Brands
                </>
              }
            >
              <>{showBrands()}</>
            </Panel>
            <Panel
              key="6"
              header={
                <>
                  <BgColorsOutlined className="mt-1 mr-2" /> Color
                </>
              }
            >
              <>{showColors()}</>
            </Panel>
            <Panel
              key="7"
              header={
                <>
                  <DeliveredProcedureOutlined className="mt-1 mr-2" /> Shipping
                </>
              }
            >
              <>{showShipping()}</>
            </Panel>
          </Collapse>
        </div>
        <div className="col-md-9 pt-3">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length === 0 && <h3>No Products found</h3>}
          <div className="row pb-5">
            {products.map((p) => (
              <div className="col-md-4 mt-3" key={p._id}>
                <ProductCard product={p}></ProductCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
