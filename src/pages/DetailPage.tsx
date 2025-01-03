import { useParams } from "react-router-dom";
import { useGetRestaurant } from "../api/RestaurantApi";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";
import { MenuItem as MenuItemType } from "../../types";
import { useCreateCheckoutSession } from "../api/OrderApi";
import CheckoutButton from "../components/CheckoutButton";
import { UserFormData } from "../forms/user-profile-form/UserProfileForm";

export type CardItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { Restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createSessionCheckout, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();
  const [cardItems, setCardItems] = useState<CardItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cardItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  if (!Restaurant || isLoading) {
    return <span>Loding...</span>;
  }
  const addTocard = (menuItem: MenuItemType) => {
    setCardItems((preveItems) => {
      const existinCardItem = preveItems.find(
        (oldItem) => oldItem._id === menuItem._id
      );
      let updateCardItem;
      if (existinCardItem) {
        updateCardItem = preveItems.map((itemSelected) =>
          itemSelected._id === menuItem._id
            ? {
                ...itemSelected,
                quantity: itemSelected.quantity + 1,
              }
            : itemSelected
        );
      } else {
        updateCardItem = [
          ...preveItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cardItems-${restaurantId}`,
        JSON.stringify(updateCardItem)
      );

      return updateCardItem;
    });
  };
  const removeFromCard = (itemId: string) => {
    setCardItems((preveItems) => {
      const updateCardItem = preveItems.filter(
        (itemcard) => itemcard._id != itemId
      );
      sessionStorage.setItem(
        `cardItems-${restaurantId}`,
        JSON.stringify(updateCardItem)
      );
      return updateCardItem;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!Restaurant) {
      return;
    }
    const checkoutData = {
      CartItems: cardItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: Restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };
    const data = await createSessionCheckout(checkoutData);
    window.location.href = data.url;
  };
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
            <MenuItem
              menuItem={menuItem}
              addTocard={() => addTocard(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              cardItems={cardItems}
              restaurant={Restaurant}
              removeFromCard={removeFromCard}
            />
            <CardFooter>
              <CheckoutButton
                onCheckout={onCheckout}
                disabled={cardItems.length === 0}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
