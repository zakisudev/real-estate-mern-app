import { useEffect, useState } from 'react';
import { getListing } from '../../services/api';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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
          <Swiper
            navigation
            // spaceBetween={50}
            // slidesPerView={1}
          >
            {listing?.imageURLs?.map((image) => (
              <SwiperSlide key={image}>
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
          <div>{listing?.title}</div>
          <div>{listing?.description}</div>
          <div>{listing?.address}</div>
          <div>{listing?.regularPrice}</div>
        </>
      )}
    </main>
  );
};

export default Listing;
