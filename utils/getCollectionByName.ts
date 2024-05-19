import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const findCategoryByName = async (categoryName: string) => {
  const categoryQuery = query(
    collection(db, "Category"),
    where("title", "==", categoryName)
  );
  const categorySnapshot = await getDocs(categoryQuery);
  if (categorySnapshot.empty) {
    throw new Error("Category not found");
  }
  return categorySnapshot.docs[0].id;
};

export const findProductByName = async (productName: string) => {
  const productQuery = query(
    collection(db, "Product"),
    where("name", "==", productName)
  );
  const productSnapshot = await getDocs(productQuery);
  if (productSnapshot.empty) {
    throw new Error("Product not found");
  }
  return productSnapshot.docs[0].id;
};

export const findCustomerByName = async (customerName: string) => {
  const customerQuery = query(
    collection(db, "Customer"),
    where("name", "==", customerName)
  );
  const customerSnapshot = await getDocs(customerQuery);
  if (customerSnapshot.empty) {
    throw new Error("Product not found");
  }
  return customerSnapshot.docs[0].id;
};
