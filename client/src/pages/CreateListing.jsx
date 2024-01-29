import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

const CreateListing = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

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

  return (
    <main className="mx-auto max-w-4xl p-3">
      <h1 className="text-3xl font-semibold text-center my-5">
        Create Listing
      </h1>
      <form className="flex flex-col justify-start items-center sm:flex-row p-3 gap-3 w-full mx-auto">
        <div className="flex flex-col justify-center items-center w-1/2 h-full flex-1">
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
            type="text"
            placeholder="Title"
            // required
          />
          <textarea
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3 max-h-20 min-h-10"
            type="text"
            placeholder="Description"
            // required
          />
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
            type="text"
            placeholder="Address"
            // required
          />
          <div className="flex gap-3 w-fit">
            <div className="flex flex-col gap-2 justify-center items-center">
              <h2 className="flex">Type</h2>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="type"
                  className="p-1"
                  value="sale"
                />
                <label htmlFor="sale">Sale</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="type"
                  className="p-1"
                  required
                  value="rent"
                />
                <label htmlFor="rent">Rent</label>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <input type="checkbox" id="parking" className="p-1" />
              <label htmlFor="parking">Parking</label>
            </div>

            <div className="flex justify-center items-center gap-2">
              <input type="checkbox" id="furnished" className="p-1" />
              <label htmlFor="furnished">Furnished</label>
            </div>

            <div className="flex justify-center items-center gap-2">
              <input type="checkbox" id="offer" className="p-1" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex mt-2 w-80 gap-6 flex-wrap">
            {/* <div className="flex flex-col gap-2 justify-center items-center"> */}
            <div className="flex gap-2">
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-1 w-10"
                min={1}
                max={10}
                // required
                inputMode="numeric"
              />
              <label htmlFor="bedrooms">Bedrooms</label>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-1 w-10"
                min={1}
                max={10}
                // required
                inputMode="numeric"
              />
              <label htmlFor="bathrooms">Bathrooms</label>
            </div>
            <div className="flex gap-2">
              <input
                className="border-2 border-gray-300 rounded-md p-1 w-10"
                type="text"
                min={1}
                max={100000}
                // required
                inputMode="numeric"
              />
              <label htmlFor="regularPrice">
                <div className="flex flex-col">
                  <p>Regular price</p>
                  <span className="text-xs">$/month</span>
                </div>
              </label>
            </div>
            <div className="flex gap-2">
              <input
                className="border-2 border-gray-300 rounded-md p-1 w-10"
                type="text"
                min={1}
                max={100000}
                // required
                inputMode="numeric"
              />
              <label htmlFor="discountPrice">
                <div className="flex flex-col">
                  <p>Discount price</p>
                  <span className="text-xs">$/month</span>
                </div>
              </label>
            </div>
            {/* </div> */}
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center h-full w-full mt-2">
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
              // required
            />
            <button
              disabled={imageUploading}
              type="button"
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

          <div className="flex mt-5">
            <button className="bg-blue-700 text-white px-4 py-2 rounded-md w-80 mb-3 hover:bg-blue-900 transition-all">
              Create Listing
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
