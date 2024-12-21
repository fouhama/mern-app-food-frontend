import { Trash } from "lucide-react";
import { Restaurant } from "../../types";
import { CardItem } from "../pages/DetailPage";
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
  restaurant: Restaurant;
  cardItems: CardItem[];
  removeFromCard: (cardItemsId: string) => void;
};

const OrderSummary = ({ cardItems, restaurant, removeFromCard }: Props) => {
  const getTotalCost = () => {
    const totalInPence = cardItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalWidthDeliveryPrice = totalInPence + restaurant.deliveryPrice;
    return (totalWidthDeliveryPrice / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className='font-bold tracking-tighter text-2xl flex justify-between '>
          <span>Your order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-5'>
        {cardItems.map((item) => (
          <div className='flex justify-between'>
            <span>
              <Badge variant='outline' className='mr-2'>
                {item.name}
              </Badge>
              {item.quantity}
            </span>
            <span className='flex items-center gap-1'>
              <Trash
                onClick={() => removeFromCard(item._id)}
                className='cursor-pointer'
                color='red'
                size={20}
              />
              $ ${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className='flex justify-between'>
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
