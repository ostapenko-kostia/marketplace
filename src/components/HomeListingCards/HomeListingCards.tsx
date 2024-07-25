import { IListing } from '../../interfaces'
import HomeListingCard from '../HomeListingCard/HomeListingCard'
import style from './styles.module.scss'

interface Props {
    listings?: IListing[]
}

export default function HomeListingCards({listings}: Props) {
    return (
        <div className={style.container}>
            {listings && listings.map((listing) => <HomeListingCard key={listing.listing_id} listing={listing} />)}
        </div>
    )
}