const CreateListing = () => {
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
            required
          />
          <textarea
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3 max-h-20 min-h-10"
            type="text"
            placeholder="Description"
            required
          />
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-80 mb-3"
            type="text"
            placeholder="Address"
            required
          />
          <div className="flex gap-3 w-fit">
            <div className="flex flex-col gap-2 justify-center items-center">
              <h2 className="flex">Type</h2>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="type"
                  className="p-1"
                  required
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
              <input type="checkbox" id="parking" className="p-1" required />
              <label htmlFor="parking">Parking</label>
            </div>

            <div className="flex justify-center items-center gap-2">
              <input type="checkbox" id="furnished" className="p-1" required />
              <label htmlFor="furnished">Furnished</label>
            </div>

            <div className="flex justify-center items-center gap-2">
              <input type="checkbox" id="offer" className="p-1" required />
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
                required
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
                required
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
                required
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
                required
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
              className="border-2 border-gray-300 rounded-md p-1 w-full"
              type="file"
              id="images"
              accept="image/.*"
              placeholder="Title"
              multiple
              required
            />
            <button className="bg-green-500 text-white uppercase px-2 py-1 rounded-md hover:shadow-md font-bold">
              Upload
            </button>
          </div>
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
