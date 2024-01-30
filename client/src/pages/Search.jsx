import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllListings } from '../../services/api';
import { MdLocationOn } from 'react-icons/md';

const Search = () => {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const term = urlParams.get('searchTerm');
    const type = urlParams.get('type');
    const parking = urlParams.get('parking');
    const furnished = urlParams.get('furnished');
    const offer = urlParams.get('offer');
    const sort = urlParams.get('sort');
    const order = urlParams.get('order');

    if (term || type || parking || furnished || offer || sort || order) {
      setSidebarData({
        searchTerm: term || '',
        type: type || 'all',
        parking: parking === 'true' ? true : false,
        furnished: furnished === 'true' ? true : false,
        offer: offer === 'true' ? true : false,
        sort: sort || 'createdAt',
        order: order || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await getAllListings(searchQuery);

      if (res.status) {
        setListings(res?.listings);
      } else {
        console.log(res);
      }
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row gap-3 p-2">
      <div className="w-full md:w-1/3 my-2 border-b-2 sm:border-none">
        <form onSubmit={handleSearch} className="flex flex-col gap-2">
          <div className="flex items-center w-full justify-between gap-2 border-b-2 pb-2">
            <label
              htmlFor="searchTerm"
              className="font-semibold whitespace-nowrap"
            >
              Search for:
            </label>
            <input
              type="text"
              value={sidebarData.searchTerm}
              onChange={(e) =>
                setSidebarData({ ...sidebarData, searchTerm: e.target.value })
              }
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
                value={sidebarData.type}
                checked={sidebarData.type === 'all'}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSidebarData({ ...sidebarData, type: 'all' });
                  } else {
                    setSidebarData({ ...sidebarData, type: '' });
                  }
                }}
                id="all"
                className="w-5 mr-1"
              />
              <label htmlFor="all">All</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                id="rent"
                value={sidebarData.type}
                checked={sidebarData.type === 'rent'}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSidebarData({ ...sidebarData, type: 'rent' });
                  } else {
                    setSidebarData({ ...sidebarData, type: '' });
                  }
                }}
                className="w-5 mr-1"
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                id="sale"
                value={sidebarData.type}
                checked={sidebarData.type === 'sale'}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSidebarData({ ...sidebarData, type: 'sale' });
                  } else {
                    setSidebarData({ ...sidebarData, type: '' });
                  }
                }}
                className="w-5 mr-1"
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                id="offer"
                value={sidebarData.offer}
                checked={sidebarData.offer}
                onChange={(e) =>
                  setSidebarData({ ...sidebarData, offer: e.target.checked })
                }
                className="w-5 mr-1"
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex items-center gap-3 pb-2">
            <label className="font-semibold w-full">Amenities:</label>
            <div className="flex">
              <input
                type="checkbox"
                id="parking"
                value={sidebarData.parking}
                checked={sidebarData.parking}
                onChange={(e) =>
                  setSidebarData({ ...sidebarData, parking: e.target.checked })
                }
                className="w-5 mr-1"
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                id="furnished"
                value={sidebarData.furnished}
                checked={sidebarData.furnished}
                onChange={(e) =>
                  setSidebarData({
                    ...sidebarData,
                    furnished: e.target.checked,
                  })
                }
                className="w-5 mr-1"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex items-center gap-3 pb-2">
            <label className="font-semibold w-full">Sort:</label>
            <select
              name="sort_order"
              id="sort"
              defaultValue={'createdAt_desc'}
              onChange={(e) =>
                setSidebarData({
                  ...sidebarData,
                  sort: e.target.value.split('_')[0],
                  order: e.target.value.split('_')[1],
                })
              }
              className="border border-gray-400 rounded-md px-2 py-1"
            >
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="regularPrice_desc">Price High to Low</option>
            </select>
          </div>
          <button className="bg-slate-700 rounded-lg px-2 py-1 w-full sm:max-w-[400px] sm:w-64 justify-center items-center text-white font-semibold hover:bg-slate-900 transition-all duration-200 my-2 mx-auto uppercase">
            Search
          </button>
        </form>
      </div>
      <div className="w-full sm:max-w-2/3">
        <h1 className="text-xl font-semibold my-2">Searched results:</h1>
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {listings.map((listing) => (
              <Link
                to={`/listing/${listing._id}`}
                key={listing._id}
                className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={listing.imageURLs[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                />
                <div className="flex flex-col gap-1 p-2">
                  <h1 className="text-lg font-semibold">{listing.title}</h1>
                  <p className="flex gap-1 items-center  text-green-700">
                    <MdLocationOn />
                    <span className="text-gray-700">{listing?.address}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {listing.description.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">
                      ${listing.regularPrice.toLocaleString('en-US')}
                      {listing?.type === 'rent' ? ' / mo' : ''}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-semibold mt-2">No results found</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
