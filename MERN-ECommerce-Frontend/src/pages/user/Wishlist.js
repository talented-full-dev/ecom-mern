import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getWishList, removeFromWishlist } from "../../functions/user";
import { Link } from "react-router-dom";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { Tooltip } from "antd";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    loadWishList();
  }, []);

  const loadWishList = () => {
    getWishList(user.token).then((res) => {
      setWishlist(res.data);
    });
  };

  const handleRemoveWishList = (productId) => {
    removeFromWishlist(user.token, productId).then((res) => {
      loadWishList();
    });
  };

  const handelMoveToCart = (product) => {
    removeFromWishlist(user.token, product._id).then((res) => {
      if (product.quantity == 0) {
        toast.error(`${product.title} is out of stock`);
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
      loadWishList();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav></UserNav>
        </div>
        <div className="col">
          <h4>Wishlist</h4>
          {wishlist.map((w) => (
            <div key={w._id} className="alert alert-secondary">
              <Link to={`product/${w.slug}`}>{w.title}</Link>
              <Tooltip title="Remove from wishlist"></Tooltip>
              <DeleteOutlined
                className="text-danger float-right"
                onClick={() => handleRemoveWishList(w._id)}
              />
              <Tooltip title="Move to cart"></Tooltip>
              <Tooltip title="Move to cart">
                <ShoppingCartOutlined
                  className="text-danger mr-4 float-right"
                  onClick={() => handelMoveToCart(w)}
                />
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
