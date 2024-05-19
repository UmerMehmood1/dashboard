import { db } from "@/lib/firebase";
import { Product } from "@/types/productType";
import { sendResponse } from "@/utils/common";
import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    if (reqBody) {
      const { id } = reqBody;
      const docRef = doc(db, "Category", id);
      const category = await getDoc(docRef);
      return sendResponse(200, { data: category });
    }
    const snapshot = await getDocs(collection(db, "Category"));
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sendResponse(200, { data: categories });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { title, imageUrl, description, position } = reqBody;
    const snapshot = addDoc(collection(db, "Product"), {
      title,
      imageUrl,
      description,
      position,
    });

    return sendResponse(200, { message: "Category has been created" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { id, title, imageUrl, description, position } = reqBody;
    const docRef = await doc(db, "Category", id);
    await updateDoc(docRef, {
      title,
      imageUrl,
      description,
      position,
    });
    return sendResponse(200, { message: "Category has been updated" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;
    const docRef = doc(db, "Category", id);
    deleteDoc(docRef);
    return sendResponse(200, { message: "Category has been deleted" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};
