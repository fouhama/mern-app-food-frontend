import { Order } from "../../types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"

type Props = {
    order : Order
}
const OrderItemCard = ({ order }: Props) => {
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
              
          </CardContent>
      </Card>
  )
}

export default OrderItemCard