export type FirestoreState = {
  document: any | null; // You can replace `any` with a specific type based on your document structure
  isPending: boolean;
  error: string | null;
  success: boolean;
};

export type FirestoreAction =
  | { type: 'IS_PENDING' }
  | { type: 'ADDED_DOCUMENT'; payload: any } // Replace `any` with the appropriate document type
  | { type: 'DELETED_DOCUMENT' }
  | { type: 'ERROR'; payload: string };

export type UseFirestoreReturn = {
  addDocument: (doc: any) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  response: FirestoreState;
};
