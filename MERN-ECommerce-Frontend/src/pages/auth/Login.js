import { useState, useEffect } from "react";
import { Button } from "antd";
import { auth, googleAuthProvider } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { createOrUpdateUser } from "../../functions/auth";

const Login = () => {
  const [email, setEmail] = useState("shafeequeom7@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      if (state && state.from) {
        navigate(state.from);
      } else {
        navigate("/");
      }
    }
  }, [user, navigate, state]);

  const roleBasedRedirect = (res) => {
    if (state && state.from) {
      navigate(state.from);
    }
    if (res.data.data === "admin") {
      navigate("admin/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: user.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          toast.success("Login success");
          setLoading(false);
          setTimeout(() => {
            roleBasedRedirect(res);
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            toast.success("Login success");
            setLoading(false);
            // navigate("/");
            roleBasedRedirect();
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
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

      <br />
      <div className="form-group">
        <input
          type="password"
          name="password"
          value={password}
          className="form-control"
          autoFocus
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />
      <Button
        type="submit"
        onClick={handleSubmit}
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? (
            <h4>Login </h4>
          ) : (
            <h4 className="text-danger">Loading.. </h4>
          )}

          {loginForm()}

          <Button
            type="danger"
            onClick={googleLogin}
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            disabled={!email || password.length < 6}
          >
            Login with Google
          </Button>
          <Link to="/forget/password" className="text-danger float-right">
            Forget Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
