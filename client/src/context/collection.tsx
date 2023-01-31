import { createContext } from "react";

export type URL_COLLECTIONS_TYPE = {
  id: number;
  name: string;
  details: string;
  img_url: string;
  original_url: string;
  short_url: string;
};

export type CollectionType = {
  id: number;
  user_id: number;
  url_collections: [URL_COLLECTIONS_TYPE];
  base_url: string;
  created_at: string | null;
  updated_at: string | null;
};

export type UserType = {
  username: string;
  img_path: string;
  base_url: string;
  email: string;
  status: number;
  is_google_auth: boolean;
};

export type ContextType = {
  collection: CollectionType;
};

export const CollectionContext = createContext<ContextType>({
  collection: {} as CollectionType,
});
