import { Link } from "react-router-dom";
import { Restaurant } from "../../types";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/details/${restaurant._id}`}
      className='grid grid-cols-[2fr_3fr] gap-5 group'>
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className='w-full h-full object-cover rounded-md'
        />
      </AspectRatio>
      <div
        id={`card-content-${restaurant._id}`}
        className='grid md:grid-cols-2 gap-2'>
        <div>
          <h3 className='text-2xl font-bold  group-hover:underline capitalize mb-2 tracking-tighter'>
            {restaurant.restaurantName}
          </h3>
          <div className='flex flex-row flex-wrap'>
            {restaurant.cuisines.map((cuisine, index) => (
              <span className='flex' key={index}>
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-1 items-center text-green-600'>
            <Clock className='text-green-600' />
            {restaurant.estimatedDeliveryTime} mins
          </div>
          <div className='flex gap-1 items-center'>
            <Banknote />
            Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
