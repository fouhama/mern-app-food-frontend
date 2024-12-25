import { Order } from "../../types"

type Props = {
    order : Order
}

const OrderStatusDetails = ({order}:Props) => {
  return (
      <div>{ order.status}</div>
  )
}

export default OrderStatusDetails