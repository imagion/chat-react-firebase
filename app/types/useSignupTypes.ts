export type State = {
  error: string | null;
  isPending: boolean;
};

export type Action =
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PENDING'; payload: boolean };
