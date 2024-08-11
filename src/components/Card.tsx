import { FC } from "react";
import { IListing } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteFromFavorite, useDeleteListing, usePutToFavorite } from "../hooks/useListings";
import { useAppSelector } from "../store/store";

interface CardProps {
  listing: IListing;
  isFavorite?: boolean;
  isMine?: boolean;
}

const Card: FC<CardProps> = ({ listing, isFavorite, isMine = false }) => {
  const { mutate: deleteListing } = useDeleteListing(listing.listing_id);
  const { mutate: putToFavorite } = usePutToFavorite(listing.listing_id);
  const { mutate: deleteFromFavorite } = useDeleteFromFavorite(listing.listing_id);
  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate()
  if (listing)
    return (
      <div className="p-2 flex flex-col gap-3 relative h-fit bg-bg-color rounded-xl">
        <Link to={`/listing?id=${listing.listing_id}`}>
          <img className="w-full aspect-square object-cover rounded-2xl" src={listing.photo_ref} alt={listing.name} />
          <div className="w-full mt-3 text-left flex flex-col">
            <h3 className="text-lg lh">{listing.name}</h3>
            <p className="text-aqua">{listing.category}</p>
            <span className="mt-2 font-bold text-xl">${listing.price}</span>
            <span className="mt-[-5px]">{listing.location}</span>
          </div>
        </Link>
        <div className="flex flex-col justify-start absolute right-2 bottom-2 text-xl">
          <button
            onClick={() => {
              if (isAuth) {
                if (isFavorite) deleteFromFavorite();
                else putToFavorite();
              } else {
                navigate({pathname: '/log-in'})
              }
            }}
          >
            <i className={`${isFavorite ? "fa-solid text-primary" : "fa-regular text-black"} fa-heart`}></i>
          </button>

          {isMine ? (
            <div>
              <Link to={`/edit?id=${listing.listing_id}`}>
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
              <div>
                <button
                  onClick={() => {
                    if (confirm("Are you sure want to delete this listing?")) deleteListing();
                  }}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  else return;
};

export default Card;
