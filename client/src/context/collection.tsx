import { createContext } from "react";

export type URL_COLLECTIONS_TYPE = {
  id: number;
  name: string;
  details: string;
  img_url: string;
  real_path: string;
  short_path: string;
};

export type ContextType = {
  id: number;
  user_id: number;
  url_collections: [URL_COLLECTIONS_TYPE];
  created_at: string | null;
  updated_at: string | null;
};

export const CollectionContext = createContext<ContextType | undefined>(
  undefined
);
