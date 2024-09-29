'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Define the type for the collection's documents
interface FirestoreDocument {
  id: string;
  [key: string]: any; // This allows the document to have any additional fields
}

// Type for the return value of the hook
interface UseCollectionReturn {
  documents: FirestoreDocument[] | null;
  error: string | null;
}

// Define the type for _query and _orderBy
type QueryParams = [string, any, any?];
type OrderByParams = [string, 'asc' | 'desc'];

export const useCollection = (
  collectionRef: string,
  _query?: QueryParams,
  _orderBy?: OrderByParams,
): UseCollectionReturn => {
  const [documents, setDocuments] = useState<FirestoreDocument[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Memoizing query and orderBy conditions for better performance
  // NOTE: JSON.stringify is a common workaround to handle deep object comparison issues, especially for objects that can change by reference but not by value.
  const queryConditions = useMemo(
    () => (_query ? where(..._query) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_query ? JSON.stringify(_query) : null],
  );

  const orderByConditions = useMemo(
    () => (_orderBy ? orderBy(..._orderBy) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_orderBy ? JSON.stringify(_orderBy) : null],
  );

  useEffect(() => {
    const conditions: QueryConstraint[] = [];
    if (queryConditions) conditions.push(queryConditions);
    if (orderByConditions) conditions.push(orderByConditions);

    // Safeguard for when both conditions are null
    if (conditions.length === 0) return;

    try {
      // Build the Firestore reference with query and orderBy conditions
      const ref = query(collection(db, collectionRef), ...conditions);

      const unsubscribe = onSnapshot(
        ref,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const results: FirestoreDocument[] = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setDocuments(results);
          setError(null);
        },
        (err) => {
          console.error('Error fetching collection:', err);
          setError('Could not fetch the data');
        },
      );

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    } catch (err) {
      console.error('Error building query:', err);
      setError('Could not build the query');
    }
  }, [collectionRef, queryConditions, orderByConditions]);

  return { documents, error };
};
