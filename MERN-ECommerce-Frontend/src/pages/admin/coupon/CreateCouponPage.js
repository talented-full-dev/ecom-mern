import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from "../../../functions/coupons";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";

const CreateCouponPage = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [form, setForm] = useState({ name: "", expiry: "", discount: "" });
  const [coupons, setCoupons] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCoupon(user.token, form).then((res) => {
      if (res) {
        loadCoupons();
        setForm({ name: "", expiry: "", discount: "" });
        toast.success("Coupon added");
      }
    });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const setStartDate = (date) => {
    setForm({ ...form, expiry: date });
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    getCoupons(user.token)
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (_id) => {
    if (window.confirm("Delete?")) {
      removeCoupon(user.token, _id).then((res) => {
        if (res) {
          loadCoupons();
          toast.success(`${res.data.name} coupon deleted`);
        }
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label>Expiry</label>
              <DatePicker
                className="form-control"
                selected={form.expiry}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="form-group">
              <label>Discount</label>
              <input
                type="text"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="form-control"
                autoFocus
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
          <div className="row">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Expiry</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.expiry}</td>
                    <td>{c.discount}</td>
                    <td>
                      <DeleteOutlined
                        selected={new Date()}
                        className="pointer text-danger"
                        onClick={() => handleRemove(c._id)}
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
