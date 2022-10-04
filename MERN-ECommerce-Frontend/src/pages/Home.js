import Jumbrotron from "../components/cards/Jumbrotron";
import NewArrivals from "../components/home/NewArrival";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubCategoryList from "../components/category/SubCategoryList";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Home = () => {
  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <img
      src="https://somstack.com/wp-content/uploads/2022/02/en_dk_uae-hero-01.gif"
      alt="image-1"
      className="sliderimg"
      onDragStart={handleDragStart}
    />,
    <img
      alt="image-2"
      className="sliderimg"
      src="https://somstack.com/wp-content/uploads/2022/02/1645436100006-ckzwi64di16m78mrh3qm5cv1w.png"
      onDragStart={handleDragStart}
    />,
    <img
      alt="image-3"
      className="sliderimg"
      src="https://somstack.com/wp-content/uploads/2022/02/en_dk_uae-hero-01-4DAYS.png"
      onDragStart={handleDragStart}
    />,
  ];
  return (
    <div className="">
      <AliceCarousel
        autoPlay
        autoPlayInterval="3000"
        disableButtonsControls={true}
        disableDotsControls={true}
        items={items}
      />
      <div className="jumbotron">
        <h1 className="text-danger text-center font-weight-bold">
          <Jumbrotron text={["New Arrivals", "Best Settlers"]} />
        </h1>
      </div>
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">New Arrivals</h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">Best Sellers</h4>
      <BestSellers />
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">Categories</h4>
      <CategoryList />
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubCategoryList />
      <br />
    </div>
  );
};

export default Home;
