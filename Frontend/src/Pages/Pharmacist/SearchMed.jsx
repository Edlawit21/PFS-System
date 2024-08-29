import { Input } from "antd";

const { Search } = Input;

const SearchMed = () => {
  return (
    <div>
      <h1 className="mb-4">Search</h1>
      <Search
        size="large"
        placeholder="Search medicine here...."
        allowClear
        style={{ width: "400px" }}
      />
    </div>
  );
};

export default SearchMed;
