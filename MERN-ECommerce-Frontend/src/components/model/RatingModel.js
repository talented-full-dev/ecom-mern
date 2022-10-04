import { Modal, Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const RatingModel = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  let navigate = useNavigate();
  const { slug } = useParams();

  const handleModel = () => {
    if (user) {
      setModalVisible(true);
    } else {
      navigate("/login", { state: { from: `/products/${slug}` } });
    }
  };

  return (
    <>
      <div onClick={handleModel}>
        <StarOutlined className="text-danger"></StarOutlined>
        <br />
        {user ? "Leave Rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. It will appear soon");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModel;
