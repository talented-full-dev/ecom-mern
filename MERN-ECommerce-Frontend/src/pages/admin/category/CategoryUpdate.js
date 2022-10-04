import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    loadCategories(slug);
  }, [slug]);

  const loadCategories = (slug) => {
    getCategory(slug).then((res) => setName(res.data.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        navigate("/admin/category");
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

export default CategoryUpdate;
