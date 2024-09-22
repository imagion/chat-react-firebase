'use client';

import { useEffect, useReducer, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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
      return { isPending: true, document: null, error: null, success: false };
    case 'ADDED_DOCUMENT':
      console.log('Reducer: ADDED_DOCUMENT', action.payload);
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case 'DELETED_DOCUMENT':
      console.log('Reducer: DELETED_DOCUMENT');
      return { isPending: false, document: null, error: null, success: true };
    case 'ERROR':
      console.log('Reducer: ERROR');
      return {
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
  addDocument: (doc: any) => Promise<void>; // Replace `any` with the type of your document
  deleteDocument: (id: string) => Promise<void>;
  response: FirestoreState;
};

export const useFirestore = (collectionRef: string): UseFirestoreReturn => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  console.log('isCancelled state:', isCancelled);

  // Only dispatch if not cancelled
  const dispatchIfNotCancelled = (action: FirestoreAction) => {
    if (!isCancelled) {
      console.log('Dispatching action:', action);
      dispatch(action);
    } else {
      console.log('Action canceled:', action); // Add this line
    }
  };

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

      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (err: any) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const docRef = doc(db, collectionRef, id); // Reference to the document
      await deleteDoc(docRef);

      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    } catch (err: any) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // Clean up effect for cancellation
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
