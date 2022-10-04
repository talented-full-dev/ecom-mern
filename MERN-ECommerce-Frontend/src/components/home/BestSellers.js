import { useEffect, useState } from "react";
import { getProducts, productsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("sold", "desc", page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductsTotal();
  }, []);

  const getProductsTotal = () => {
    productsCount()
      .then((res) => setTotalCount(parseInt((res.data / 3) * 10)))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="container">
        {!loading ? (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product}></ProductCard>
              </div>
            ))}
          </div>
        ) : (
          <LoadingCard count={3} />
        )}
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
            <Pagination
              current={page}
              total={totalCount}
              onChange={(v) => setPage(v)}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
