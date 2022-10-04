// import { useState, useEffect } from "react";
import defaultImage from "../../images/default.png";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SideDrawer = () => {
  const dispatch = useDispatch();

  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "80px",
    objectFit: "cover",
  };

  return (
    <Drawer
      visible={drawer}
      className="text-center"
      title={`Cart / ${cart.length}`}
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_DRAWER",
          payload: false,
        });
      }}
    >
      {cart.map((p) => (
        <div className="row" key={p._id}>
          <div className="col">
            {p.images.length ? (
              <img src={p.images[0].url} alt={p.title} style={imageStyle} />
            ) : (
              <img src={defaultImage} alt={p.title} style={imageStyle} />
            )}
            <p className="text-center bg-secondary text-light">
              {p.title} x {p.count}
            </p>
          </div>
        </div>
      ))}
      <Link to="/cart">
        <Button
          block
          type="primary"
          onClick={() => {
            dispatch({
              type: "SET_DRAWER",
              payload: false,
            });
          }}
        >
          Go to Cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
