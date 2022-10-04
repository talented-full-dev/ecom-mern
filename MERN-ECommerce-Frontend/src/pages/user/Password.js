import { useState } from "react";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import UserNav from "../../components/nav/UserNav";
import { Button } from "antd";
import { LockOutlined } from "@ant-design/icons";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password updated");
        setPassword("");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Password update error");
      });
  };

  const passwordUpdateForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="password">Your Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          type="danger"
          onClick={handleSubmit}
          className="mb-3"
          block
          shape="round"
          icon={<LockOutlined />}
          disabled={!password || password.length < 6 || loading}
        >
          Update Password
        </Button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav></UserNav>
        </div>

        <div className="col">
          {loading ? (
            <h1 className="text-danger">Loading</h1>
          ) : (
            <h1>Password Update</h1>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
