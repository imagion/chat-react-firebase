export type UseUpdatePhotoReturn = {
  update: (thumbnail: File, clientId: string) => Promise<void>;
};
