import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyCart,
  saveAddress,
  applyCoupon,
  createCODOrder,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const { user, payment } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (user)
      getUserCart(user.token)
        .then((res) => {
          setProducts(res.data.products);
          setTotal(res.data.cartTotal);
        })
        .catch((err) => console.log(err));
  }, [user]);

  const handleSaveAddress = () => {
    saveAddress(user.token)
      .then((res) => {
        if (res && res.data.ok) {
          toast.success("Address Saved");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEmptyCart = () => {
    //
    if (typeof window != "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({ type: "ADD_TO_CART", payload: [] });

    emptyCart(user.token)
      .then((res) => {
        if (res) {
          setProducts([]);
          setTotal(0);
          setDiscountError("");
          setTotalAfterDiscount(0);
          setCoupon("");
          toast.success("Cart is empty, Continue shopping");
        }
      })
      .catch((err) => console.log(err));
  };

  const showAddress = () => {
    return (
      <>
        <div className="row p-4">
          <ReactQuill
            style={{ width: "100%" }}
            value={address}
            onChange={(e) => setAddress(e)}
          />
        </div>
        <button
          className="btn btn-primary ml-2 mt-5"
          onClick={handleSaveAddress}
        >
          Save
        </button>
      </>
    );
  };

  const showProducts = () => {
    return products.map((p) => (
      <div key={p._id}>
        <p>
          {p.product.title} {p.color} x {p.count} = ${p.product.price * p.count}
        </p>
      </div>
    ));
  };

  const showCoupon = () => {
    return (
      <>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="form-control"
        />
        <button
          onClick={applyDiscountCoupon}
          className="btn btn-outline-primary mt-3"
        >
          Apply
        </button>
      </>
    );
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
        setDiscountError(res.data.err);
        dispatch({
          type: "APPLY_COUPON",
          payload: false,
        });
      } else {
        setDiscountError("");
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        dispatch({
          type: "APPLY_COUPON",
          payload: true,
        });
      }
    });
  };

  const handleProceed = () => {
    if (payment === "online") {
      navigate("/payment");
    } else {
      createCODOrder(user.token).then((res) => {
        if (res.data.ok) {
          if (typeof window !== "undefined") {
            dispatch({
              type: "ADD_TO_CART",
              payload: [],
            });
            dispatch({
              type: "APPLY_COUPON",
              payload: false,
            });
            localStorage.removeItem("cart");
            emptyCart(user.token);
            setTimeout(() => {
              navigate("/user/history");
            }, 1000);
          }
        }
      });
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row p-4">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <br />
          {showAddress()}
          <hr />
          <h4>Got coupons</h4>
          {showCoupon()}
          <br />
          {discountError && <p className="text-danger p-2">{discountError}</p>}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          <hr />
          {showProducts()}
          <p>
            Cart Total: <b>${total}</b>{" "}
          </p>
          {totalAfterDiscount > 0 && (
            <p className="text-success">
              Total After Discount:
              <b> ${totalAfterDiscount}</b>
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-primary mt-2"
                disabled={!address || !products.length}
                onClick={handleProceed}
              >
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button
                onClick={handleEmptyCart}
                className="btn btn-primary mt-2"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
