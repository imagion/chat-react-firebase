'use client';

import { useEffect, useReducer, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Define the shape of the Firestore state
type FirestoreState = {
  document: any | null; // You can replace `any` with a specific type based on your document structure
  isPending: boolean;
  error: string | null;
  success: boolean;
};

// Define the possible action types
type FirestoreAction =
  | { type: 'IS_PENDING' }
  | { type: 'ADDED_DOCUMENT'; payload: any } // Replace `any` with the appropriate document type
  | { type: 'DELETED_DOCUMENT' }
  | { type: 'ERROR'; payload: string };

// Initial state
const initialState: FirestoreState = {
  isPending: false,
  document: null,
  error: null,
  success: false,
};

// Reducer function
const firestoreReducer = (
  state: FirestoreState,
  action: FirestoreAction,
): FirestoreState => {
  switch (action.type) {
    case 'IS_PENDING':
      console.log('Reducer: IS_PENDING');
      return {
        ...state,
        isPending: true,
        document: null,
        error: null,
        success: false,
      };
    case 'ADDED_DOCUMENT':
      console.log('Reducer: ADDED_DOCUMENT', action.payload);
      return {
        ...state,
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case 'DELETED_DOCUMENT':
      console.log('Reducer: DELETED_DOCUMENT');
      return {
        ...state,
        isPending: false,
        document: null,
        error: null,
        success: true,
      };
    case 'ERROR':
      console.log('Reducer: ERROR');
      return {
        ...state,
        isPending: false,
        document: null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

// Define the return type for the hook
type UseFirestoreReturn = {
  addDocument: (doc: any) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  response: FirestoreState;
};

export const useFirestore = (collectionRef: string): UseFirestoreReturn => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState<boolean>(false); // Prevents unnecessary dispatches if the component unmounts

  // Add a document
  const addDocument = async (doc: any) => {
    dispatch({ type: 'IS_PENDING' });
    const createdAt = Timestamp.fromDate(new Date());

    try {
      const addedDocument = await addDoc(collection(db, collectionRef), {
        ...doc,
        createdAt,
      });

      console.log('Document added successfully:', addedDocument);

      if (!isCancelled) {
        console.log('Dispatching action:', addDocument);
        dispatch({ type: 'ADDED_DOCUMENT', payload: addDocument });
      }
    } catch (err: any) {
      const errorMessage = err.code
        ? `${err.code}: ${err.message}`
        : err.message;
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: errorMessage });
      }
    }
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const docRef = doc(db, collectionRef, id); // Reference to the document

      // NOTE: Improve UX with better error handling, but cause additionnal read operation from Firestore
      // Additional check if the document exists
      // const docSnap = await getDoc(docRef); // check if the document exists
      // if (!docSnap.exists()) {
      //   throw new Error("Document doesn't exist");
      // }

      await deleteDoc(docRef);
      if (!isCancelled) {
        dispatch({ type: 'DELETED_DOCUMENT' });
      }
    } catch (err: any) {
      const errorMessage = err.code
        ? `${err.code}: ${err.message}`
        : err.message;
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: errorMessage });
      }
    }
  };

  // Clean up effect for cancellation
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
