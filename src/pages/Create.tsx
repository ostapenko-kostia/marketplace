import { useForm } from "react-hook-form";
import useCategories from "../context/CategoriesContext";
import { ChangeEvent, useCallback, useRef } from "react";
import { useCreateListing } from "../hooks/useListings";
import { useNavigate } from "react-router-dom";

function Create() {
  const { categories } = useCategories();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const { mutate: createListing } = useCreateListing({ callback: () => navigate({ pathname: "/" }) });
  const imgRef = useRef<HTMLImageElement>(null);

  const showThumbnail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const fileInput: HTMLInputElement = e.target;
    imgRef.current!.src = URL.createObjectURL((fileInput!.files as FileList)[0]);
    imgRef.current?.classList.remove("hidden");
  }, []);

  return (
    <section className="mx-auto w-full px-5 py-12 flex items-center flex-col">
      <h2 className="text-3xl mb-4">Create a Listing</h2>
      <form
        className="flex w-128 max-xs:w-72 flex-col gap-5 max-md:w-full"
        onSubmit={handleSubmit((data) => {
          const formData = new FormData();
          formData.append("file", data.file[0]);
          formData.append("listing_data", JSON.stringify({ name: data.title, category: data.category, price: data.price, location: data.location, description: data.description }));
          createListing(formData);
        })}
      >
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex relative flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <img className="w-auto hidden absolute h-full aspect-square object-cover" src="" ref={imgRef} />
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
            </div>
            <input {...register("file", { onChange: (e) => showThumbnail(e) })} id="dropzone-file" type="file" className="hidden" accept="image/*" />
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label className="mb-[-5px] text-lg" htmlFor="create-title">
            Name
          </label>
          <input required {...register("title")} className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" type="text" name="title" id="create-title" placeholder="Listing" />
        </div>
        <div className="flex gap-5 items-center max-md:flex-col max-md:w-full max-md:[&>div]:w-full">
          <div className="flex flex-col items-center">
            <label className="text-lg" htmlFor="create-category">
              Category
            </label>
            <select required {...register("category")} id="create-category" name="category" className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl">
              {categories &&
                categories.map((c) => (
                  <option key={c} value={c as string}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col items-center">
            <label className="text-lg" htmlFor="create-price">
              Price
            </label>
            <input required {...register("price")} className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" type="number" name="price" id="create-price" placeholder="1000" />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-lg" htmlFor="create-location">
              Location
            </label>
            <input
              required
              {...register("location")}
              className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl"
              type="text"
              name="location"
              id="create-location"
              placeholder="London, UK"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="create-description">
            Description
          </label>
          <textarea
            required
            {...register("description")}
            className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl"
            name="description"
            id="create-description"
            placeholder="Lorem Ipsum"
            style={{ resize: "vertical" }}
          ></textarea>
        </div>
        <button type="submit" className="bg-primary px-12 py-2 w-fit mx-auto text-lg rounded-xl">
          Create a Listing
        </button>
      </form>
    </section>
  );
}

export default Create;
