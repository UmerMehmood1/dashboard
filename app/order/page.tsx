"use client";
import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import { toast } from "sonner";
import {OrderTable } from "@/app/order/order-table";
import { OrderType } from "@/types/orderType";

const Orders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching orders.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <OrderTable orders={orders} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Orders;
