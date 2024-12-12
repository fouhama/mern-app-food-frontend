import { Restaurant } from "../../types";
import { CardItem } from "../pages/DetailPage";
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  restaurant: Restaurant;
  cardItems: CardItem[];
};

const OrderSummary = ({ cardItems, restaurant }: Props) => {
  const getTotalCost = () => {
    return 1;
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
              <Badge>{item.name}</Badge>
              {item.quantity}
            </span>
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default OrderSummary;
