import { Select } from "antd";
import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import defaultImage from "../../images/default.png";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const ProductCardInCart = ({ product }) => {
  const { _id, title, price, brand, color, count, shipping, images } = product;
  let dispatch = useDispatch();

  const colors = ["Black", "Brown", "Silver", "White", "Blue"];

  const handleColorChange = (newColor) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      let index = _.findIndex(cart, { _id: _id });
      cart[index].color = newColor;
      updateCart(cart);
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      let index = _.findIndex(cart, { _id: _id });
      cart.splice(index, 1);
      updateCart(cart);
    }
  };

  const handleCountChange = (e) => {
    let cart = [];
    let count = e.target.value > 1 ? e.target.value : 1;
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      let index = _.findIndex(cart, { _id: _id });
      if (cart[index].quantity > count) {
        cart[index].count = count;
      } else {
        toast.error(`Max available quantity is ${cart[index].quantity}`);
      }
      updateCart(cart);
    }
  };

  const updateCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  return (
    <tr>
      <td>
        <div className="d-flex justify-content-center">
          {images.length ? (
            <ModalImage
              className="cart-image"
              small={images[0].url}
              large={images[0].url}
              alt={title}
            />
          ) : (
            <ModalImage
              className="cart-image"
              small={defaultImage}
              large={defaultImage}
              alt={title}
            />
          )}
        </div>
      </td>
      <td>{title}</td>
      <td>{price}</td>
      <td>{brand}</td>
      <td>
        <Select value={color} onChange={handleColorChange}>
          {colors.map((c) => (
            <Option key={c}>{c}</Option>
          ))}
        </Select>
      </td>
      <td>
        <input
          type="number"
          name="count"
          style={{ width: "80px" }}
          value={count}
          onChange={handleCountChange}
        />
      </td>
      <td>
        {shipping === "Yes" ? (
          <CheckCircleOutlined className="text-success text-center"></CheckCircleOutlined>
        ) : (
          <CloseCircleOutlined className="text-danger"></CloseCircleOutlined>
        )}
      </td>
      <td>
        <CloseOutlined
          onClick={handleRemove}
          className="text-danger pointer"
        ></CloseOutlined>
      </td>
    </tr>
  );
};

export default ProductCardInCart;
