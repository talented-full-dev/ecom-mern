import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategoriesList } from "../../../functions/category";
import {
  getSubCategoriesList,
  addSubCategory,
  removeSubCategory,
} from "../../../functions/subCategory";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => {
    getCategoriesList().then((res) => setCategories(res.data));
  };

  const loadSubCategories = () => {
    getSubCategoriesList().then((res) => setSubCategories(res.data));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addSubCategory({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        loadSubCategories();
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
        else toast.error("Error creating category");
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadSubCategories();
          toast.success(`${res.data.name} deleted`);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          {loading ? (
            <p className="text-danger">Loading</p>
          ) : (
            <p>Create category</p>
          )}
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Please select</option>
              {categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          ></CategoryForm>
          <br />

          <LocalSearch keyword={keyword} setKeyword={setKeyword}></LocalSearch>

          <br />
          {subCategories.filter(searched(keyword)).map((sub) => {
            return (
              <div className="alert alert-secondary" key={sub._id}>
                {sub.name}
                <span
                  onClick={() => {
                    handleRemove(sub.slug);
                  }}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/sub/${sub.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
