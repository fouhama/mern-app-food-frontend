import { Dot } from "lucide-react";
import { Restaurant } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  restaurant: Restaurant;
};
const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-bold tracking-tighter'>
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex'>
        {restaurant.cuisines.map((item, index) => (
          <span className='flex'>
            <span>{item} </span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
