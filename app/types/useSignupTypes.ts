export type State = {
  error: string | null;
  isPending: boolean;
};

export type Action =
  | { type: 'ERROR'; payload: string | null }
  | { type: 'IS_PENDING'; payload: boolean };
