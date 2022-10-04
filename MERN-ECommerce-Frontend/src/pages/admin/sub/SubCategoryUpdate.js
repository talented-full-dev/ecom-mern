import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategoriesList } from "../../../functions/category";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../functions/subCategory";
import CategoryForm from "../../../components/forms/CategoryForm";
import { useNavigate, useParams } from "react-router-dom";

const SubCategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadSubCategory(slug);
  }, [slug]);

  const loadCategories = () => {
    getCategoriesList().then((res) => setCategories(res.data));
  };

  const loadSubCategory = (slug) => {
    getSubCategory(slug).then((res) => {
      setName(res.data.name);
      setCategory(res.data.parent);
    });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubCategory(slug, { name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        navigate("/admin/sub");
        toast.success(`${res.data.name} is updated`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
        else toast.error("Error updating category");
      });
  };

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
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
