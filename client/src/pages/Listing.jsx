import { useEffect, useState } from 'react';
import { getListing } from '../../services/api';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const Listing = () => {
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const res = await getListing(id);
        if (res.status) {
          setListing(res?.listing);
          setLoading(false);
        } else {
          setErrorMsg(res.message);
          setLoading(false);
          console.log(res.message);
        }
      } catch (error) {
        setLoading(false);
        setErrorMsg(error.message);
        console.log(error.message);
      }
    };
    fetchListing();
  }, [id]);
  return (
    <main className="z-0">
      {loading && (
        <div className="text-center text-2xl my-7">Populating...</div>
      )}

      {errorMsg && (
        <div className="text-red-700 text-2xl px-3 py-2 rounded-md bg-red-900">
          {errorMsg}
        </div>
      )}

      {listing && !loading && !errorMsg && (
        <>
          <Swiper navigation spaceBetween={50} slidesPerView={1}>
            {listing?.imageURLs?.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[400px]"
                  style={{
                    background: `url(${image}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col p-5">
            <div className="text-3xl font-semibold">
              {listing?.title} - $
              {listing?.regularPrice.toLocaleString('en-US')} / month
            </div>
            <p className="flex items-center my-3 gap-2 text-slate-600">
              <FaMapMarkerAlt className="text-green-700" />
              {listing?.address}, {listing?.state}
            </p>
            <div className="flex items-center gap-2">
              <p className="bg-red-700 w-full max-w-[150px] text-white text-center rounded-md font-semibold">
                {listing?.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing?.offer && (
                <p className="bg-green-700 w-full max-w-[150px] text-white text-center rounded-md font-semibold">
                  ${+listing?.regularPrice - +listing?.discountPrice} OFF
                </p>
              )}
            </div>

            <ul className="flex gap-2 sm:gap-6 mt-3 justify-around text-green-900 font-semibold text-sm max-w-[400px]">
              <li className="flex gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing?.bedrooms} {listing?.bedrooms > 1 ? 'beds' : 'bed'}
              </li>
              <li className="flex gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing?.bathrooms} {listing?.bathrooms > 1 ? 'baths' : 'bath'}
              </li>
              <li className="flex gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing?.parking} {listing?.parking ? 'Parking' : 'no parking'}
              </li>
              <li className="flex gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing?.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            <p className="mt-5 text-gray-600">
              <span className="text-xl font-semibold text-black">
                Description:{' '}
              </span>
              {listing?.description}
            </p>

            {currentUser &&
              listing?.userRef !== currentUser?._id &&
              !contact && (
                <div className="flex flex-col gap-2 mt-5">
                  <button
                    onClick={() => setContact(true)}
                    className="uppercase text-white rounded-md bg-gray-700 max-w-[360px] font-semibold"
                  >
                    Contact Landlord
                  </button>
                </div>
              )}
            {contact && <ContactForm listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
