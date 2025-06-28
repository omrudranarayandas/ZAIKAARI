import React from "react";
import "./orders.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useState } from "react";
import { DOMAIN } from "../../config";
import { useEffect } from "react";
function Orders() {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(`${DOMAIN}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(`${DOMAIN}/api/order/update`, {
      orderId,
      status: e.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <>
      <div className="order add">
        <h3>Order page</h3>
        <div className="order-list">
          {orders.reverse().map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x" + item.quantity;
                    } else {
                      return item.name + " x" + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.name}
                </p>
                <div className="order-item-address">
                  <p>{order.address.apartmentNo + ", "+
                    order.address.street +
                      ", " +
                      order.address.area +
                      ", " +
                      order.address.city +
                      " - " +
                      order.address.landmark}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>
                ₹{order.amount} {" "}
                {!order.payment && order.cod ? (
                  <b>(COD)</b>
                ) : (
                  <b className="">(Paid)</b>
                )}
              </p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
