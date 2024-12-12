import { useParams } from "react-router-dom";
import { useGetRestaurant } from "../api/RestaurantApi";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import { Card } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";

export type CardItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { Restaurant, isLoading } = useGetRestaurant(restaurantId);
  const [cardItems, setCardItems] = useState<CardItem[]>([]);
  if (!Restaurant || isLoading) {
    return <span>Loding...</span>;
  }

  return (
    <div className='flex flex-1 flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img
          src={Restaurant.imageUrl}
          className='w-full h-full object-cover rounded-md'
          alt={Restaurant?.restaurantName}
        />
      </AspectRatio>
      <div className='grid grid-cols-[4fr_2fr] gap-5 md:px-32'>
        <div className='flex flex-col gap-4'>
          <RestaurantInfo restaurant={Restaurant} />
          <span className=' font-bold text-2xl tracking-tighter'>Menu</span>
          {Restaurant.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem} />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary cardItems={cardItems} restaurant={Restaurant} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
