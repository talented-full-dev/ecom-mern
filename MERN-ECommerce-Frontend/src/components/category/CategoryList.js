import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoriesList } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = () => {
    setLoading(true);
    getCategoriesList().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const showCategories = () => {
    return categories.map((c) => (
      <div
        className="col btn btn-outlined-primary btn-lg btn-raised m-3"
        key={c._id}
      >
        <Link to={`/categories/${c.slug}`}>{c.name}</Link>
      </div>
    ));
  };
  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading..</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
