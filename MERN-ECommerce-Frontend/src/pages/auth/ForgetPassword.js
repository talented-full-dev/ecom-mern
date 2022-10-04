import { useState, useEffect } from "react";
import { Button } from "antd";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

const ForgetPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then((result) => {
        toast.success("Check your email for password reset link");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>Loading</h4> : <h4>Forget Password</h4>}
      <form>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            autoFocus
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="mb-3"
          block
          shape="round"
          icon={<MailOutlined />}
          disabled={!email}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgetPassword;
