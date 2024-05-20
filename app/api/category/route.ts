import { db } from "@/lib/firebase";
import { Product } from "@/types/productType";
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
    console.log(reqBody);
    const { title, description, position } = reqBody;
    const id = uuidv4();
    const snapshot = addDoc(collection(db, "Category"), {
      id,
      title,
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
    const {
      payload: { id, title, description, position },
    } = reqBody;

    // Query Firestore to find the document with matching id
    const q = query(collection(db, "Category"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    // Check if the document with matching id exists
    if (querySnapshot.size === 0) {
      return sendResponse(404, { message: "Category not found" });
    }

    // Update the document
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        title,
        description,
        position,
      });
    });

    return sendResponse(200, { message: "Category has been updated" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const { categoryId } = reqBody;

    // Query Firestore to find the document with matching id
    const q = query(collection(db, "Category"), where("id", "==", categoryId));
    const querySnapshot = await getDocs(q);

    // Check if the document with matching id exists
    if (querySnapshot.size === 0) {
      return sendResponse(404, { message: "Category not found" });
    }

    // Delete the document
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    return sendResponse(200, { message: "Category has been deleted" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};
