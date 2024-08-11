import { useNavigate, useSearchParams } from "react-router-dom";
import { useContactSeller, useGetAllListings } from "../hooks/useListings";
import { useForm } from "react-hook-form";

function SinglePage() {
  const id = useSearchParams()[0].get("id");
  const navigate = useNavigate();
  const { data: allListings } = useGetAllListings();
  const { register, handleSubmit } = useForm();
  const { mutate: contactSeller } = useContactSeller(() => {
    alert(`Message to ${listing!.sellerDetails.sellerEmail} sent successfully!`);
  });
  const listing = allListings?.find((listing) => listing.listing_id == Number(id));

  if (!listing) navigate({ pathname: "/404" });

  return (
    <section className="mx-auto w-full px-5 py-12 flex items-center flex-col h-full">
      <div className="flex w-full gap-4  max-960:flex-col max-960:items-center">
        <img className="aspect-square w-96 max-960:w-4/6 object-cover" src={listing?.photo_ref} alt="" />
        <div className="flex w-full flex-col items-center text-center gap-4 justify-between">
          <div>
            <h2 className="text-3xl">{listing?.name}</h2>
            <p className="text-aqua mt-[-10px] mb-4">{listing?.category}</p>
            <p className="text-xl">{listing?.location}</p>
            <p className="text-xl">${listing?.price}</p>
          </div>
          <div className="flex flex-col gap-4 w-full text-center items-center">
            <img src={listing?.sellerDetails.sellerProfilePicture} alt={listing?.sellerDetails.sellerFirstName} className="w-24 aspect-square rounded-full bg-gray" />
            <h3 className="text-xl">
              {listing?.sellerDetails.sellerLastName} {listing?.sellerDetails.sellerFirstName}
            </h3>
            <a className="text-aqua" href={`mailto:${listing?.sellerDetails.sellerEmail}`}>
              {listing?.sellerDetails.sellerEmail}
            </a>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 text-center h-full">
        <form
          autoComplete="off "
          className="h-full w-full flex flex-col gap-3 items-center justify-between max-960:pb-12"
          onSubmit={handleSubmit((data) => {
            contactSeller({ listingName: listing!.name, message: data.message, recipientEmail: listing!.sellerDetails.sellerEmail });
          })}
        >
          <h3 className="text-2xl">Send Email to Seller</h3>
          <textarea
            {...register("message")}
            required
            className="w-full h-full min-h-32 border-gray border-solid border-[1px] px-5 py-2 rounded-xl resize-y"
            placeholder="Hi, I am interested in your listing! Is it still available?"
          ></textarea>
          <button className="bg-aqua text-white px-8 py-2 rounded-xl" type="submit">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default SinglePage;
