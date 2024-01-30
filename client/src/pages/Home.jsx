import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllListings } from './../../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { MdLocationOn } from 'react-icons/md';

const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await getAllListings('offer=true&limit=3');
        setOfferListings(res?.listings);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await getAllListings('type=rent&limit=3');
        setRentListings(res?.listings);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await getAllListings('type=sale&limit=3');
        setSaleListings(res?.listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="flex flex-col p-1 md:p-10  gap-5 w-full">
      {/* Top */}
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-3xl sm:text-6xl font-semibold">
          Find your next <span className="text-gray-500">dream</span> <br />{' '}
          place with ease
        </h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          voluptates, voluptatibus,
        </p>
        <Link to="/search" className="max-w-fit">
          <button className="bg-blue-700 rounded text-white px-5 py-1 transition-all duration-200 font-semibold ">
            Let&apos;s Explore..
          </button>
        </Link>
      </div>

      {/* Swiper */}
      {offerListings && offerListings?.length > 0 && (
        <Swiper navigation spaceBetween={50} slidesPerView={1}>
          {rentListings?.map((listing, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-[400px]"
                style={{
                  background: `url(${listing?.imageURLs[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Listings */}
      <div className="flex flex-col gap-5 w-full">
        <div className="p-0 md:p-5 flex flex-col w-full">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-2">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Recent offers
                </h2>
                <Link
                  to="/search?offer=true"
                  className="text-blue-600 hover:underline text-sm text-semibold"
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex gap-3 flex-col sm:flex-row overflow-hidden">
                {offerListings.map((listing) => (
                  <Link
                    to={`/listing/${listing._id}`}
                    key={listing._id}
                    className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[360px]"
                  >
                    <img
                      src={listing.imageURLs[0]}
                      alt={listing.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                    />
                    <div className="flex flex-col gap-1 p-3">
                      <h1 className="text-lg font-semibold">{listing.title}</h1>
                      <p className="flex gap-1 items-center  text-green-700">
                        <MdLocationOn />
                        <span className="text-gray-700">
                          {listing?.address}
                        </span>
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
            </div>
          )}
        </div>

        <div className="max-w-6xl p-0 md:p-5 flex flex-col sm:flex-row w-full">
          {rentListings && rentListings.length > 0 && (
            <div className="flex flex-col">
              <div className="my-2">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Recent places for RENT
                </h2>
                <Link
                  to="/search?type=rent"
                  className="text-blue-600 hover:underline text-sm text-semibold"
                >
                  Show more places for RENT
                </Link>
              </div>
              <div className="flex gap-3 flex-col sm:flex-row overflow-hidden">
                {rentListings.map((listing) => (
                  <Link
                    to={`/listing/${listing._id}`}
                    key={listing._id}
                    className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[360px] mt-4"
                  >
                    <img
                      src={listing.imageURLs[0]}
                      alt={listing.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                    />
                    <div className="flex flex-col gap-1 p-3">
                      <h1 className="text-lg font-semibold">{listing.title}</h1>
                      <p className="flex gap-1 items-center  text-green-700">
                        <MdLocationOn />
                        <span className="text-gray-700">
                          {listing?.address}
                        </span>
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
            </div>
          )}
        </div>

        <div className="max-w-6xl p-0 md:p-5 flex flex-col w-full">
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-2">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Recent place for SALE
                </h2>
                <Link
                  to="/search?type=sale"
                  className="text-blue-600 hover:underline text-sm text-semibold"
                >
                  Show more places for SALE
                </Link>
              </div>
              <div className="flex gap-3 flex-col sm:flex-row overflow-hidden">
                {saleListings.map((listing) => (
                  <Link
                    to={`/listing/${listing._id}`}
                    key={listing._id}
                    className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[360px]"
                  >
                    <img
                      src={listing.imageURLs[0]}
                      alt={listing.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                    />
                    <div className="flex flex-col gap-1 p-3">
                      <h1 className="text-lg font-semibold">{listing.title}</h1>
                      <p className="flex gap-1 items-center  text-green-700">
                        <MdLocationOn />
                        <span className="text-gray-700">
                          {listing?.address}
                        </span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
