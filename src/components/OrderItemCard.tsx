import { useEffect, useState } from "react"
import { Order, OrderStatus } from "../../types"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Separator } from "./ui/separator"
import { ORDER_STATUS } from "../config/order-status"
import { useUpdateMyRestaurantOrder } from "../api/MyRestaurantApi"


type Props = {
    order : Order
}
const OrderItemCard = ({ order }: Props) => {
    const { isLoading, updateMyRestaurantOrder } = useUpdateMyRestaurantOrder();
    const handleStatusChange = async (newStatus: OrderStatus) => {
        await updateMyRestaurantOrder({
            orderId: order._id as string,   
            status: newStatus
        })
        setSetatus(newStatus)
        // return true 
    }
    const [status, setSetatus] =useState<OrderStatus>(order.status)
    useEffect(() => {
        setSetatus(order.status)
    },[order.status])
    const getTime =() =>{
        const date = new Date(order.createAt);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const  paddedMin = minutes < 10 ? `0${minutes}` : minutes;
       
        return `${hours}:${paddedMin}`
    }
  return (
      <Card>
          <CardHeader>
              <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                  <div>
                      Customer name: <span className="font-normal ml-2">{ order.deliveryDetails.name }</span>
                  </div>
                  <div>
                      Delivery Address: <span className="ml-2 font-normal">{order.deliveryDetails.addressLine1} {order.deliveryDetails.city }</span>
                  </div>
                  <div>
                      Time: <span className="ml-2 font-normal">{getTime()}</span>
                  </div>
                  <div>
                      Total Cost:<span className="ml-2 font-normal">{(order.totalAmount/100).toFixed(2)}</span>
                  </div>
              </CardTitle>
              <Separator />
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                  {order.cartItems.map(item => (
                      <span>
                          <Badge variant="outline" className="mr-2"> {item.quantity }</Badge>
                          {item.name} </span>
                  ))}
              </div>
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="status">What is the status of order? </Label>
                  <Select value={status} disabled={isLoading} onValueChange={(value) => {
                      handleStatusChange(value as OrderStatus);
                  }}>
                      <SelectTrigger>
                          <SelectValue placeholder='status' />
                      </SelectTrigger>
                      <SelectContent position="popper">
                          {ORDER_STATUS.map(status => (
                              <SelectItem value={status.value}>{status.label}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  
              </div>
          </CardContent>
      </Card>
  )
}

export default OrderItemCard