import style from "./styles.module.scss";
import useCategories from "../../context/CategoriesContext";
import { ChangeEvent, useState } from "react";
import Image from "../../components/Image/Image";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateLisiting() {
  const { categories } = useCategories();
  const [imgThumnail, setImgThumbnail] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();

  function showImageThumbnail(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    let file: any = (target.files as FileList)[0];
    setImgThumbnail(URL.createObjectURL(file));
  }

  return (
    <section className={style.container}>
      <h2>Create Listing</h2>
      <div className={style.content}>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            queryClient.invalidateQueries({ queryKey: ["allListings", "myListings"] });
          }}
          className={style.form}
        >
          <div className={style.fileContainer}>
            <Image image={imgThumnail} alt="Upload Image" />
            <label htmlFor="file-upload" className={style.fileUpload}>
              Upload Image
            </label>
            <input required onChange={(e) => showImageThumbnail(e)} accept="image/*" id="file-upload" type="file" />
          </div>
          <div className={style.nameContainer}>
            <label htmlFor="listingform-name">Name</label>
            <input required type="text" placeholder="For example, MacBook Air 2018" id="listingform-name" />
          </div>
          <div className={style.infoContainer}>
            <div>
              <label htmlFor="listingform-category">Category</label>
              <select id="listingform-category">{categories ? categories.map((category) => <option key={category}>{category}</option>) : "No categories available :("}</select>
            </div>
            <div>
              <label htmlFor="listingform-price">Price</label>
              <input required placeholder="0" type="number" id="listingform-price" />
            </div>
            <div>
              <label htmlFor="listingform-location">Location</label>
              <input required placeholder="Kyiv, Ukraine" type="text" id="listingform-location" />
            </div>
          </div>
          <div className={style.textareaContainer}>
            <label htmlFor="listingform-textarea">Description</label>
            <textarea required id="listingform-textarea" placeholder="Enter description..."></textarea>
          </div>

          <button type="submit">Create a Listing</button>
        </form>
      </div>
    </section>
  );
}
