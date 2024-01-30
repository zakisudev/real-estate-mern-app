import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { getListing, updateListing } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateListing = () => {
  const listId = useParams().id;
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
    title: '',
    description: '',
    address: '',
    type: 'rent',
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 500,
    discountPrice: 0,
  });
  const reset = () => {
    setImages([]);
    setFormData({
      imageURLs: [],
      title: '',
      description: '',
      address: '',
      type: 'rent',
      parking: false,
      furnished: false,
      offer: false,
      bedrooms: 1,
      bathrooms: 1,
      regularPrice: 500,
      discountPrice: 0,
    });
  };
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);

  const handleUploadImages = () => {
    if (images.length > 0 && images.length + formData.imageURLs?.length < 7) {
      setImageUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImages(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(urls),
          });
          setImageUploadError(false);
          setImageUploading(false);
        })
        .catch((error) => {
          console.log(error);
          setImageUploadError('Image upload error, try again');
          setImageUploading(false);
        });
    } else {
      setImageUploadError('You can upload up to 6 images');
      setImageUploading(false);
    }
  };

  const storeImages = (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleUpdateListing = async (e) => {
    e.preventDefault();
    setListingLoading(true);
    try {
      if (formData.imageURLs.length < 1) {
        return setListingError('You must upload at least one image');
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setListingError(
          'Discount price must be lower than regular price'
        );
      }

      const res = await updateListing(formData, listId);
      if (res.status) {
        toast.success('Listing created successfully');
        setListingLoading(false);
        setListingError(null);
        reset();
        navigate(`/listing/${res?.updatedListing?._id}`);
      } else {
        setListingLoading(false);
        setListingError(res.message);
      }
    } catch (error) {
      console.log(error.message);
      setListingLoading(false);
      setListingError('Error creating listing, try again');
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await getListing(listId);
        if (res.status) {
          setFormData(res.listing);
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchListing();
  }, [listId]);

  return (
    <main className="mx-auto max-w-4xl p-3 h-full">
      <h1 className="text-3xl font-semibold text-center my-5">
        Update the Listing
      </h1>
      <form
        onSubmit={handleUpdateListing}
        className="flex flex-col justify-start items-center sm:flex-row sm:justify-start p-3 gap-3 w-full h-full mx-auto"
      >
        <div className="flex flex-col justify-center items-center w-1/2">
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
            type="text"
            id="title"
            value={formData.title}
            placeholder="Title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <textarea
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3 max-h-20 min-h-10"
            type="text"
            id="description"
            value={formData.description}
            placeholder="Description"
            required
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
            type="text"
            id="address"
            value={formData.address}
            placeholder="Address"
            required
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <div className="flex gap-3 w-fit">
            <div className="flex flex-col gap-2 justify-center items-center">
              <h2 className="flex">Type</h2>
              <div className="flex gap-2">
                <input
                  id="sale"
                  type="checkbox"
                  name="type"
                  className="p-1"
                  value="sale"
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  checked={formData.type === 'sale'}
                />
                <label htmlFor="sale">Sale</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  name="type"
                  className="p-1"
                  value="rent"
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  checked={formData.type === 'rent'}
                />
                <label htmlFor="rent">Rent</label>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="p-1"
                checked={formData.parking}
                onChange={(e) =>
                  setFormData({ ...formData, parking: e.target.checked })
                }
              />
              <label htmlFor="parking">Parking</label>
            </div>

            <div className="flex justify-center items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="p-1"
                checked={formData.furnished}
                onChange={(e) =>
                  setFormData({ ...formData, furnished: e.target.checked })
                }
              />
              <label htmlFor="furnished">Furnished</label>
            </div>

            <div className="flex justify-center items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                className="p-1"
                checked={formData.offer}
                onChange={(e) =>
                  setFormData({ ...formData, offer: e.target.checked })
                }
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex mt-2 w-80 gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-1 w-10"
                min={1}
                max={10}
                value={formData.bedrooms}
                inputMode="numeric"
                onChange={(e) =>
                  setFormData({ ...formData, bedrooms: e.target.value })
                }
              />
              <label htmlFor="bedrooms">Bedrooms</label>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-1 w-10"
                min={1}
                max={10}
                value={formData.bathrooms}
                inputMode="numeric"
                onChange={(e) =>
                  setFormData({ ...formData, bathrooms: e.target.value })
                }
              />
              <label htmlFor="bathrooms">Bathrooms</label>
            </div>
            <div className="flex gap-2">
              <input
                className="border-2 border-gray-300 rounded-md p-1 w-10"
                type="text"
                min={500}
                value={formData.regularPrice}
                inputMode="numeric"
                onChange={(e) =>
                  setFormData({ ...formData, regularPrice: e.target.value })
                }
              />
              <label htmlFor="regularPrice">
                <div className="flex flex-col">
                  <p>Regular price</p>
                  {formData.type !== 'sale' && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </label>
            </div>

            {formData.offer && (
              <div className="flex gap-2">
                <input
                  className="border-2 border-gray-300 rounded-md p-1 w-10"
                  type="text"
                  min={500}
                  value={formData.discountPrice}
                  inputMode="numeric"
                  onChange={(e) =>
                    setFormData({ ...formData, discountPrice: e.target.value })
                  }
                />
                <label htmlFor="discountPrice">
                  <div className="flex flex-col">
                    <p>Discount price</p>
                    {formData.type !== 'sale' && (
                      <span className="text-xs">($ / month)</span>
                    )}
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-start items-center w-1/2 h-fit mt-2">
          <div className="flex">
            <p className="font-semibold">
              Images:{' '}
              <span className="text-xs text-gray-600">
                First image will be the cover (max 6)
              </span>
            </p>
          </div>
          <div className="flex justify-center items-center w-full gap-2 mt-2">
            <input
              onChange={(e) => setImages(e.target.files)}
              className="border-2 border-gray-300 rounded-md p-1 w-full"
              type="file"
              id="images"
              accept="image/.*"
              placeholder="Title"
              multiple
            />
            <button
              type="button"
              disabled={imageUploading}
              onClick={handleUploadImages}
              className="bg-green-500 text-white uppercase px-2 py-1 rounded-md hover:shadow-md font-bold"
            >
              {imageUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-500 text-center">{imageUploadError}</p>
          )}

          {formData.imageURLs.length > 0 && (
            <div className="flex flex-col gap-2 w-full mt-2">
              <p className="font-semibold">Uploaded images:</p>
              <div className="flex flex-wrap gap-2">
                {formData.imageURLs.map((imageURL, index) => (
                  <div key={index} className="relative">
                    <img
                      className="w-20 h-20 object-cover rounded-md"
                      src={imageURL}
                      alt="uploaded"
                    />
                    <button
                      type="button"
                      disabled={imageUploading}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          imageURLs: formData.imageURLs.filter(
                            (_, i) => i !== index
                          ),
                        })
                      }
                      className="px-1 bg-red-700 text-white font-bold text-md rounded-full absolute top-0 right-0"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {listingError && (
            <p className="text-red-500 text-center mt-2">{listingError}</p>
          )}

          <div className="flex mt-5">
            <button
              type="submit"
              disabled={listingLoading || imageUploading}
              className="bg-blue-700 text-white px-4 py-2 rounded-md w-80 mb-3 hover:bg-blue-900 transition-all"
            >
              {listingLoading ? 'Updating...' : 'Update Listing'}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
