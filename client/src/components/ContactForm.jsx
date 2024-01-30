import { useEffect, useState } from 'react';
import { getUser } from '../../services/api';
import { Link } from 'react-router-dom';

const ContactForm = ({ listing }) => {
  const [landlord, setLandlord] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await getUser(listing?.userRef);
        if (res.status) {
          setLandlord(res);
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLandlord();
  }, [listing, landlord]);

  return (
    <div className="flex flex-col gap-2 w-full my-5 max-w-[400px]">
      <p>
        Contact for <strong>{listing?.title}</strong> listing
      </p>
      <textarea
        type="text"
        name="message"
        id="message"
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-1 max-h-20 h-20 rounded-md outline-none border-2 border-gray-400"
        placeholder="Enter your message here..."
      />
      <Link
        to={`mailto:${landlord?.email}?subject=Regarding ${listing?.title}&body=${message}`}
        className="text-lg uppercase bg-gray-700 text-white rounded-md font-semibold text-center"
      >
        Send Message
      </Link>
    </div>
  );
};

export default ContactForm;
