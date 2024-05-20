"use client";
import React, { useEffect, useState } from "react";
import { CategoryTable } from "./category-table";
import { Category } from "@/types/category";
import axios from "axios";
import { toast } from "sonner";
import CreateCategory from "@/components/category/create";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const fetchCategories = async () => {
    const fetchedCategories = await axios
      .get("/api/category")
      .then((res) => res.data.data);
    setCategories(fetchedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId: number) => {
    try {
      const response = await axios.delete("/api/category", {
        data: { categoryId },
      });
      await fetchCategories();
      toast.success("Category deleted successfully.");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <CreateCategory
              onSuccess={fetchCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
        <CategoryTable
          categories={categories}
          deleteCategory={deleteCategory}
          selectCategory={selectCategory}
        />
      </div>
    </>
  );
};

export default Categories;
