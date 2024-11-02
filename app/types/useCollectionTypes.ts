export type QueryParams = [string, any, any?];
export type OrderByParams = [string, 'asc' | 'desc'];

export interface FirestoreDocument {
  id: string;
  [key: string]: any; // This allows the document to have any additional fields
}

export interface UseCollectionReturn {
  documents: FirestoreDocument[] | null;
  error: string | null;
}
