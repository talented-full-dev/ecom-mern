import { Select } from "antd";

const { Option } = Select;

const ProductForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  subOptions,
  setValue,
  showSub,
  categories,
  value,
}) => {
  const {
    title,
    description,
    price,
    category,
    subCategories,
    shipping,
    quantity,
    colors,
    brands,
    color,
    brand,
  } = value;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            value={shipping}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Color</label>
          <select
            name="color"
            className="form-control"
            value={color}
            onChange={handleChange}
          >
            <option value="">Please Select</option>
            {colors.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Brand</label>
          <select
            name="brand"
            className="form-control"
            value={brand}
            onChange={handleChange}
          >
            <option value="">Please Select</option>
            {brands.map((b) => (
              <option value={b} key={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Please Select</option>
            {categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {showSub && (
          <div className="form-group">
            <label>Sub Category</label>
            <Select
              name="subCategory"
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select sub-categories"
              value={subCategories}
              onChange={(v) => {
                setValue({ ...value, subCategories: v });
              }}
            >
              <Option value="">Please Select</Option>
              {subOptions.map((c) => (
                <Option value={c._id} key={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>
        )}

        <button className="btn btn-outline-info">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
