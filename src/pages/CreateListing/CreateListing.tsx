import style from "./styles.module.scss";
import useCategories from "../../context/CategoriesContext";
import { ChangeEvent, useState } from "react";
import Image from "../../components/Image/Image";
import { Controller, useForm } from "react-hook-form";
import { TypeCategories } from "../../interfaces";
import { useCreateListing } from "../../hooks/useListings";
import { useNavigate } from "react-router-dom";

interface formEntries {
  category: TypeCategories;
  description: string;
  file: FileList;
  location: string;
  name: string;
  price: number;
}

export default function CreateLisiting() {
  const { categories } = useCategories();
  const [imgThumnail, setImgThumbnail] = useState<string | undefined>(undefined);
  const { register, handleSubmit, control } = useForm();
  const { mutate: createListing } = useCreateListing({
    callback: () => {
      navigate({ pathname: "/" });
    },
  });
  const navigate = useNavigate();

  function showImageThumbnail(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    let file: any = (target.files as FileList)[0];
    setImgThumbnail(URL.createObjectURL(file));
  }

  function formSubmitHandler(data: formEntries) {
    const formData = new FormData();
    const json = {
      name: data.name,
      category: data.category,
      price: data.price,
      location: data.location,
      description: data.description,
    };
    formData.append("file", data.file[0]);
    formData.append("listing_data", JSON.stringify(json));

    createListing(formData);
  }

  return (
    <section className={style.container}>
      <h2>Create Listing</h2>
      <div className={style.content}>
        <form autoComplete="off" onSubmit={handleSubmit((data) => formSubmitHandler(data as formEntries))} className={style.form}>
          <div className={style.fileContainer}>
            <Image image={imgThumnail} alt="Upload Image" />
            <label htmlFor="file-upload" className={style.fileUpload}>
              Upload Image
            </label>
            <Controller
              name="file"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  required
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    showImageThumbnail(e);
                  }}
                />
              )}
            />
          </div>
          <div className={style.nameContainer}>
            <label htmlFor="listingform-name">Name</label>
            <input {...register("name")} required type="text" placeholder="For example, MacBook Air 2018" id="listingform-name" />
          </div>
          <div className={style.infoContainer}>
            <div>
              <label htmlFor="listingform-category">Category</label>
              <select {...register("category")} id="listingform-category">
                {categories ? categories.map((category) => <option key={category}>{category}</option>) : "No categories available :("}
              </select>
            </div>
            <div>
              <label htmlFor="listingform-price">Price</label>
              <input {...register("price")} required placeholder="0" type="number" id="listingform-price" />
            </div>
            <div>
              <label htmlFor="listingform-location">Location</label>
              <input {...register("location")} required placeholder="Kyiv, Ukraine" type="text" id="listingform-location" />
            </div>
          </div>
          <div className={style.textareaContainer}>
            <label htmlFor="listingform-textarea">Description</label>
            <textarea {...register("description")} required id="listingform-textarea" placeholder="Enter description..."></textarea>
          </div>

          <button type="submit">Create a Listing</button>
        </form>
      </div>
    </section>
  );
}
