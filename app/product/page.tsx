"use client";
import React, { useEffect, useState } from "react";
import { Category } from "@/types/category";
import axios from "axios";
import { toast } from "sonner";
import { ProductTable } from "./product-table";
import CreateProduct from "@/components/product/create";
import { Product } from "@/types/productType";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const fetchedProducts = async () => {
    const fetchedProducts = await axios
      .get("/api/products")
      .then((res) => res.data.data);
    setProducts(fetchedProducts);
  };
  const fetchCategories = async () => {
    const fetchedCategories = await axios
      .get("/api/category")
      .then((res) => res.data.data);
    setCategories(fetchedCategories);
  };
  useEffect(() => {
    fetchedProducts();
    fetchCategories();
    setIsLoading(false);
    console.log(categories);
  }, []);

  const deleteProduct = async (categoryId: number) => {
    try {
      const response = await axios.delete("/api/category", {
        data: { categoryId },
      });
      await fetchedProducts();
      toast.success("Product deleted successfully.");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
  };
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <CreateProduct
              categories={categories}
              onSuccess={fetchedProducts}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          </div>
        </div>
        <ProductTable
          products={products}
          deleteProduct={deleteProduct}
          selectProduct={selectProduct}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Products;
