import { useState } from "react";
import { Menu, Badge } from "antd";
import {
  SettingOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const navigate = useNavigate();

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  const rightStyle = { position: "absolute", top: 0, right: 0 };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logOut = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item style={{ float: "left" }} key="home" icon={<HomeOutlined />}>
        <Link to="/"> Home </Link>
      </Item>
      <Item style={{ float: "left" }} key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop"> Shopping </Link>
      </Item>
      <Item
        style={{ float: "left" }}
        key="cart"
        icon={<ShoppingCartOutlined />}
      >
        <Link to="/cart">
          <Badge count={cart.length} offset={[10, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>
      <Item
        style={{
          marginLeft: "auto",
          marginTop: "10px",
          justifyContent: "flex-end",
        }}
        disabled
        key="search"
        type="text"
      >
        <Search></Search>
      </Item>

      {!user && (
        <Item
          key="register"
          style={{ justifyContent: "flex-end" }}
          icon={<UserAddOutlined />}
        >
          <Link to="/register"> Register </Link>
        </Item>
      )}

      {!user && (
        <Item style={{}} key="login" icon={<UserOutlined />}>
          <Link to="/login"> Login </Link>
        </Item>
      )}

      {user && (
        <SubMenu
          style={{ marginLeft: "auto" }}
          key="setting"
          icon={<SettingOutlined />}
          title={user.email ? user.email.split("@")[0] : "user"}
        >
          <Menu.ItemGroup title="Item 1">
            {user && user.role === "subscriber" && (
              <Item key="setting:1" icon={<DashboardOutlined />}>
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}
            {user && user.role === "admin" && (
              <Item key="setting:2" icon={<DashboardOutlined />}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}
            <Item key="setting:3" icon={<LogoutOutlined />} onClick={logOut}>
              Logout
            </Item>
          </Menu.ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
