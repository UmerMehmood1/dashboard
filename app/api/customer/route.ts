import { db } from "@/lib/firebase";
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
      const docRef = doc(db, "Customer", id);
      const customer = await getDoc(docRef);
      return sendResponse(200, { data: customer });
    }
    const snapshot = await getDocs(collection(db, "Customer"));
    const customers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sendResponse(200, { data: customers });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;
    const snapshot = addDoc(collection(db, "Customer"), {
      name,
      email,
      password,
    });

    return sendResponse(200, { message: "Customer has been created" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { id, name, email, password } = reqBody;
    const docRef = await doc(db, "Customer", id);
    await updateDoc(docRef, {
      name,
      email,
      password,
    });
    return sendResponse(200, { message: "Customer has been updated" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;
    const docRef = doc(db, "Customer", id);
    deleteDoc(docRef);
    return sendResponse(200, { message: "Customer has been deleted" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};
