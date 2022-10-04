import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubCategoriesList } from "../../functions/subCategory";

const CategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = () => {
    setLoading(true);
    getSubCategoriesList().then((res) => {
      setSubCategories(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const showSubCategories = () => {
    return subCategories.map((s) => (
      <div
        className="col btn btn-outlined-primary btn-lg btn-raised m-3"
        key={s._id}
      >
        <Link to={`/subcategories/${s.slug}`}>{s.name}</Link>
      </div>
    ));
  };
  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading..</h4>
        ) : (
          showSubCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
