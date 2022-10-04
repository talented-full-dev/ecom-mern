import { Link } from "react-router-dom";

const ProductItems = ({ product }) => {
  const {
    price,
    category,
    subCategories,
    quantity,
    sold,
    shipping,
    brand,
    color,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price
        <span className="label label-default label-pill pull-xs-right">
          {price}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category
          <Link
            to={`/categories/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category ? category.name : "NA"}
          </Link>
        </li>
      )}
      {subCategories && subCategories.length ? (
        <li className="list-group-item">
          Sub Categories
          {subCategories.map((sub) => (
            <Link
              key={sub._id}
              to={`/subcategories/${sub.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {sub ? sub.name : "NA"}
            </Link>
          ))}
        </li>
      ) : (
        ""
      )}
      <li className="list-group-item">
        Shipping
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Color
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Brand
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
      <li className="list-group-item">
        Quantity
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductItems;
