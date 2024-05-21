import { db } from "@/lib/firebase";
import { Product } from "@/types/productType";
import { sendResponse } from "@/utils/common";
import { findCategoryByName } from "@/utils/getCollectionByName";
import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { getDoc } from "firebase/firestore/lite";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const snapshot = await getDocs(collection(db, "Product"));
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sendResponse(200, { data: products });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const {
      name,
      description,
      categoryName,
      imageUrl,
      price,
      cost,
      stock,
      weight,
    } = reqBody;

    const categoryId = findCategoryByName(categoryName);
    const snapshot = addDoc(collection(db, "Product"), {
      name,
      description,
      categoryId: categoryId,
      imageUrl,
      price,
      cost,
      stock,
      weight,
    });
    return sendResponse(200, { message: "Product has been created" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const {
      id,
      name,
      description,
      categoryName,
      imageUrl,
      price,
      cost,
      stock,
      weight,
    } = reqBody;
    const docRef = doc(db, "Product", id);

    const categoryId = findCategoryByName(categoryName);
    const res = await updateDoc(docRef, {
      name,
      description,
      categoryId,
      imageUrl,
      price,
      cost,
      stock,
      weight,
    });
    return sendResponse(200, { message: "Product has been updated" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;
    const docRef = doc(db, "Product", id);
    deleteDoc(docRef);
    return sendResponse(200, { message: "Product has been deleted" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};
