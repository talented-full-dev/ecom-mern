import { Card, Tooltip } from "antd";
import defaultImage from "../../images/default.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  const { title, description, images, slug, price, quantity } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  let dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const handelAddToCart = () => {
    setTooltip("Product added");
    if (quantity == 0) {
      toast.error(`${title} is out of stock`);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_DRAWER",
        payload: true,
      });
    }
  };
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <p className="text-center p-2">No rating yet</p>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            alt={title}
            style={{ height: "250px", objectFit: "contain" }}
            className="p-2"
          />
        }
        actions={[
          <Link to={`/products/${slug}`}>
            <EyeOutlined className="text-warning" />
            <br />
            View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a href="#" onClick={handelAddToCart} disabled={quantity == 0}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {quantity > 0 ? "Add to Cart" : "Out of stock"}
            </a>
          </Tooltip>,
        ]}
      >
        EditOul
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}..`}
        ></Meta>
      </Card>
    </>
  );
};

export default ProductCard;
