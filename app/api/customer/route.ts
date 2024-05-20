import { db } from "@/lib/firebase";
import { sendResponse } from "@/utils/common";
import { v4 as uuidv4 } from "uuid";
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
    console.log(reqBody);
    const {
      values: { name, email, password, address },
    } = reqBody;
    const id = uuidv4();
    const snapshot = addDoc(collection(db, "Customer"), {
      id,
      name,
      email,
      password,
      address,
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
