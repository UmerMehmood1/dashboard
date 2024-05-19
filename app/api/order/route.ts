import { db } from "@/lib/firebase";
import { sendResponse } from "@/utils/common";
import {
  findCustomerByName,
  findProductByName,
} from "@/utils/getCollectionByName";
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
      const docRef = doc(db, "Order", id);
      const order = await getDoc(docRef);
      return sendResponse(200, { data: order });
    }
    const snapshot = await getDocs(collection(db, "Order"));
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sendResponse(200, { data: orders });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const {
      customerName,
      productName,
      quantity,
      totalPrice,
      orderDate,
      status,
    } = reqBody;

    const customerId = findCustomerByName(customerName);
    const productId = findProductByName(productName);

    await addDoc(collection(db, "Order"), {
      customerId,
      productId,
      quantity,
      totalPrice,
      orderDate,
      status,
    });
    return sendResponse(200, { message: "Order has been created" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const {
      id,
      customerName,
      productName,
      quantity,
      totalPrice,
      orderDate,
      status,
    } = reqBody;
    const customerId = findCustomerByName(customerName);
    const productId = findProductByName(productName);
    const docRef = doc(db, "Order", id);
    const res = await updateDoc(docRef, {
      customerId,
      productId,
      quantity,
      totalPrice,
      orderDate,
      status,
    });
    return sendResponse(200, { message: "Order has been updated" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;
    const docRef = doc(db, "Order", id);
    deleteDoc(docRef);
    return sendResponse(200, { message: "Order has been deleted" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};
