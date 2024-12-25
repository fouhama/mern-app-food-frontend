import { useGetMyOrders } from "../api/OrderApi"
import OrderStatusDetails from "../components/OrderStatusDetails";
import OrderStatusHeader from "../components/OrderStatusHeader";
import { AspectRatio } from "../components/ui/aspect-ratio";
const OrderStatusPage = () => {
  const { getOrders, isLoading } = useGetMyOrders();
  if (isLoading) {
    return "Lodign...";
  }
  if (!getOrders || getOrders.length === 0) {
    return "Orders not Found!";
  }


  return (
    <div className='space-y-10 flex-1'>
      {getOrders.map((order) => (
        <div className='space-y-10 bg-gray-50 p-10 rounded-lg'>
          <OrderStatusHeader order={order} />
          <div className='grid gap-10 md:grid-cols-2'>
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className='w-full h-full object-cover rounded-md'
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;