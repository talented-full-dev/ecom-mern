import Redirection from "../components/redirect/Redirection";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterComplete from "../pages/auth/RegisterComplete";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Home from "../pages/Home";
import Product from "../pages/Product";
import CategoryHome from "../pages/category/CategoryHome";
import SubCategoryHome from "../pages/category/SubCategoryHome";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";

import History from "../pages/user/History";
import Password from "../pages/user/Password";
import Wishlist from "../pages/user/Wishlist";

import AdminDashboard from "../pages/admin/AdminDashboard";
import CategoryCreate from "../pages/admin/category/CategoryCreate";
import CategoryUpdate from "../pages/admin/category/CategoryUpdate";
import SubCategoryCreate from "../pages/admin/sub/SubCategoryCreate";
import SubCategoryUpdate from "../pages/admin/sub/SubCategoryUpdate";
import ProductCreate from "../pages/admin/product/ProductCreate";
import AllProducts from "../pages/admin/product/AllProducts";
import ProductUpdate from "../pages/admin/product/ProductUpdate";
import CreateCouponPage from "../pages/admin/coupon/CreateCouponPage";

const routes = (isLoggedIn, isAdmin) => [
  //Auth
  { path: "/", element: <Home /> },
  { path: "/shop", element: <Shop /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/payment", element: <Payment /> },
  { path: "/products/:slug", element: <Product /> },
  { path: "/categories/:slug", element: <CategoryHome /> },
  { path: "/subcategories/:slug", element: <SubCategoryHome /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forget/password", element: <ForgetPassword /> },
  { path: "/register/complete", element: <RegisterComplete /> },

  //User
  {
    path: "/user/history",
    element: isLoggedIn ? <History /> : <Redirection />,
  },
  {
    path: "/user/password",
    element: isLoggedIn ? <Password /> : <Redirection />,
  },
  {
    path: "/user/wishlist",
    element: isLoggedIn ? <Wishlist /> : <Redirection />,
  },

  //admin
  {
    path: "/admin/dashboard",
    element: isLoggedIn && isAdmin ? <AdminDashboard /> : <Redirection />,
  },
  {
    path: "/admin/category",
    element: isLoggedIn && isAdmin ? <CategoryCreate /> : <Redirection />,
  },
  {
    path: "/admin/category/:slug",
    element: isLoggedIn && isAdmin ? <CategoryUpdate /> : <Redirection />,
  },
  {
    path: "/admin/sub",
    element: isLoggedIn && isAdmin ? <SubCategoryCreate /> : <Redirection />,
  },
  {
    path: "/admin/sub/:slug",
    element: isLoggedIn && isAdmin ? <SubCategoryUpdate /> : <Redirection />,
  },
  {
    path: "/admin/product",
    element: isLoggedIn && isAdmin ? <ProductCreate /> : <Redirection />,
  },
  {
    path: "/admin/products",
    element: isLoggedIn && isAdmin ? <AllProducts /> : <Redirection />,
  },
  {
    path: "/admin/product/:slug",
    element: isLoggedIn && isAdmin ? <ProductUpdate /> : <Redirection />,
  },
  {
    path: "/admin/coupon",
    element: isLoggedIn && isAdmin ? <CreateCouponPage /> : <Redirection />,
  },
];

export default routes;
