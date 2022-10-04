const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className="container pt-4 pb-4">
      <input
        type="search"
        placeholder="Search"
        value={keyword}
        onChange={handleSearch}
        className="form-control"
      />
    </div>
  );
};

export default LocalSearch;
