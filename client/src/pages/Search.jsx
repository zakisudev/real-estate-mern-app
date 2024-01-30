const Search = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 p-2">
      <div className="w-full md:w-1/3 my-2 border-b-2 sm:border-none">
        <form className="flex flex-col gap-2">
          <div className="flex items-center w-full justify-between gap-2 border-b-2 pb-2">
            <label
              htmlFor="searchTerm"
              className="font-semibold whitespace-nowrap"
            >
              Search for:
            </label>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Search..."
              className="border border-gray-400 rounded-lg px-2 py-1 flex"
            />
          </div>
          <div className="flex items-center gap-3 pb-2">
            <label htmlFor="category" className="font-semibold w-full">
              Type:
            </label>
            <div className="flex">
              <input
                type="checkbox"
                name="type"
                id="all"
                value="all"
                className="w-5 mr-1"
              />
              <label htmlFor="category">All</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                name="type"
                id="rent"
                value="rent"
                className="w-5 mr-1"
              />
              <label htmlFor="category">Rent</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                name="type"
                id="sale"
                value="sale"
                className="w-5 mr-1"
              />
              <label htmlFor="category">Sale</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                name="type"
                id="offer"
                value="offer"
                className="w-5 mr-1"
              />
              <label htmlFor="category">Offer</label>
            </div>
          </div>
          <div className="flex items-center gap-3 pb-2">
            <label htmlFor="category" className="font-semibold w-full">
              Amenities:
            </label>
            <div className="flex">
              <input
                type="checkbox"
                id="parking"
                value="parking"
                className="w-5 mr-1"
              />
              <label htmlFor="category">Parking</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                id="furnished"
                value="furnished"
                className="w-5 mr-1"
              />
              <label htmlFor="category">Furnished</label>
            </div>
          </div>
          <div className="flex items-center gap-3 pb-2">
            <label htmlFor="category" className="font-semibold w-full">
              Sort:
            </label>
            <select
              name="sort_order"
              id="sort"
              className="border border-gray-400 rounded-md px-2 py-1"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-lowest">Price Low to High</option>
              <option value="price-highest">Price High to Low</option>
            </select>
          </div>
          <button className="bg-slate-700 rounded-lg px-2 py-1 w-full sm:max-w-[400px] sm:w-64 justify-center items-center text-white font-semibold hover:bg-slate-900 transition-all duration-200 my-2 mx-auto uppercase">
            Search
          </button>
        </form>
      </div>
      <div className="w-full sm:max-w-2/3">
        <h1 className="text-xl font-semibold mt-2">Searched results:</h1>
      </div>
    </div>
  );
};

export default Search;
