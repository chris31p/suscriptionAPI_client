import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/Layout/NoData";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);

  console.log("orders", orders);
  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>HISTORIAL DE PEDIDOS</h1>
      </div>
      {!orders[0] && <NoData />}
      {orders.map((order, index) => {
        return (
          <div
            key={order._id + index + "order"}
            className="flex-auto rounded p-4 text-sm"
          >
            <p className="font-semibold border-2 max-w-screen-sm">Pedido No: {`${order?.orderId?.slice(0, 6)}`}</p>
            <div className="flex gap-5 bg-green-50 border-1 max-w-screen-sm">
              <img src={order.product_details.image[0]} className="w-28 h-24" />
              <p className="py-4 font-medium">{order.product_details.name}</p>
              <p className="py-4 font-medium">$ {order.totalAmt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
