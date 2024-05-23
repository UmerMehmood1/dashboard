"use client";
import React, { useEffect, useState } from "react";
import { CustomerType } from "@/types/customerType";
import { CustomerTable } from "@/app/customer/CustomerTable"; // Adjust the path based on your project structure
import { fetchCustomers } from "@/app/api/customer/route"; // Adjust the path based on your project structure

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCustomers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCustomers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <CustomerTable customers={customers} isLoading={isLoading} />
    </div>
  );
};

export default CustomersPage;
