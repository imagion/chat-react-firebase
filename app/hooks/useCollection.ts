'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

export const useCollection = (
  collectionRef: string,
  _query?,
  _orderBy?,
): UseCollectionReturn => {
  const [documents, setDocuments] = useState<FirestoreDocument[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Memoizing query and orderBy conditions for better performance
  const queryConditions = useMemo(
    () => (_query ? where(..._query) : null),
    [_query],
  );
  const orderByConditions = useMemo(
    () => (_orderBy ? orderBy(..._orderBy) : null),
    [_orderBy],
  );

  useEffect(() => {
    const conditions: QueryConstraint[] = [];
    if (queryConditions) conditions.push(queryConditions);
    if (orderByConditions) conditions.push(orderByConditions);

    // Build the Firestore reference with query and orderBy conditions
    const ref = query(collection(db, collectionRef), ...conditions);

    const unsub = onSnapshot(
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
    return () => unsub();
  }, [collectionRef, queryConditions, orderByConditions]);

  return { documents, error };
};
