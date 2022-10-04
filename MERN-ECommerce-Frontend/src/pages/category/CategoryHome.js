import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import { getCategoryProducts, getCategory } from "../../functions/category";

const CategoryHome = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  let { slug } = useParams();

  const loadCategoryProducts = (slug) => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data);
      getCategoryProducts(slug).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    });
  };
  useEffect(() => {
    loadCategoryProducts(slug);
  }, [slug]);

  return (
    <div className="container-fluid">
      {loading ? (
        <h1 className="text-center danger-text">Loading..</h1>
      ) : (
        <h1 className="text-center p-3 mt-5 display-4 jumbotron">
          {products && products.length} products in {category && category.name}{" "}
          category
        </h1>
      )}
      <div className="row">
        {products &&
          products.length &&
          products.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard product={p}></ProductCard>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryHome;
