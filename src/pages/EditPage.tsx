import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEditListing, useGetAllListings } from "../hooks/useListings";

function EditPage() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const [urlParams] = useSearchParams();
  const id = Number(urlParams.get("id"));

  const { data: allListings } = useGetAllListings();
  const listing = allListings?.find((listing) => listing.listing_id == id);
  if (!listing) navigate("/404");

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && listing?.photo_ref) {
      imgRef.current.classList.remove("hidden");
      imgRef.current.src = listing!.photo_ref;
    }
  }, [imgRef, listing]);

  const showThumbnail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const fileInput: HTMLInputElement = e.target;
    imgRef.current!.src = URL.createObjectURL((fileInput!.files as FileList)[0]);
    imgRef.current?.classList.remove("hidden");
  }, []);

  const { mutate: editListing } = useEditListing(() => {
    alert("Listing edited successfully");
    navigate({ pathname: "/" });
  });

  return (
    <section className="mx-auto w-full px-5 py-12 flex items-center flex-col">
      <h2 className="text-3xl mb-4">Edit Listing</h2>
      <form
        className="flex w-128 max-xs:w-72 flex-col gap-5 max-md:w-full"
        onSubmit={handleSubmit((data) => {
          const body = {
            listing_id: id,
            name: data.title ? data.title : listing!.name,
            category: listing!.category,
            price: data.price ? data.price : listing!.price,
            location: data.location ? data.location : listing!.location,
            description: data.description ? data.description : listing!.description,
          };
          const formData = new FormData();
          formData.append("new_photo", data.file[0]);
          formData.append("new_listing", JSON.stringify(body));
          editListing(formData);
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
          <input {...register("title")} className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" type="text" name="title" id="create-title" placeholder={listing?.name} />
        </div>
        <div className="flex gap-5 items-center max-md:flex-col max-md:w-full max-md:[&>div]:w-full">
          <div className="flex flex-col items-center">
            <label className="text-lg" htmlFor="create-price">
              Price
            </label>
            <input
              {...register("price")}
              className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl"
              type="number"
              name="price"
              id="create-price"
              placeholder={String(listing?.price)}
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-lg" htmlFor="create-location">
              Location
            </label>
            <input
              {...register("location")}
              className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl"
              type="text"
              name="location"
              id="create-location"
              placeholder={listing?.location}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="create-description">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl"
            name="description"
            id="create-description"
            placeholder={listing?.description}
            style={{ resize: "vertical" }}
          ></textarea>
        </div>
        <button type="submit" className="bg-primary px-12 py-2 w-fit mx-auto text-lg rounded-xl">
          Apply
        </button>
      </form>
    </section>
  );
}

export default EditPage;
