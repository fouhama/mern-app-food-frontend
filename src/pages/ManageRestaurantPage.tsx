import { TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../api/MyRestaurantApi";
import { useGetMyOrders } from "../api/OrderApi";
import { Tabs } from "../components/ui/tabs";
import Managerestaurantform from "../forms/manage-restaurant-form/ManageRestaurantForm";
import OrderItemCard from "../components/OrderItemCard";

function ManageRestaurantPage() {
  const { Restaurant } = useGetMyRestaurant();
  const { createMyRestaurant, isLoading: isLoadingCreate } =
    useCreateMyRestaurant();
  const { updateMyRestaurant, isLoading: isLoadingUpdate } =
    useUpdateMyRestaurant();
  const { getOrders } = useGetMyOrders();

  const isEditing = !!Restaurant;
  return (
    <Tabs defaultValue="orders" >
      <TabsList>
        <TabsTrigger value="orders" >Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="bg-gray-50 rounded-lg p-10 space-y-5 flex-1 ">
        <h2 className="text-2xl font-bold">{getOrders?.length} active orders</h2>
        {getOrders?.map(order => (
          <OrderItemCard order={order} key={order._id} />
        ))}

      </TabsContent>
      <TabsContent value="manage-restaurant" className="bg-gray-50 rounded-lg p-10 space-y-5 flex-1 ">
        <Managerestaurantform
          restaurant={Restaurant}
          isLoading={isLoadingCreate || isLoadingUpdate}
          onSave={isEditing ? updateMyRestaurant : createMyRestaurant}
        />
      </TabsContent>

    </Tabs>
  );
}

export default ManageRestaurantPage;
