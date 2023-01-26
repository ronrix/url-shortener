import { createContext } from "react";

export type URL_COLLECTIONS_TYPE = {
  id: number;
  name: string;
  details: string;
  img_url: string;
  original_url: string;
  short_url: string;
};

export type ContextType = {
  id: number;
  user_id: number;
  url_collections: [URL_COLLECTIONS_TYPE];
  base_url: string;
  created_at: string | null;
  updated_at: string | null;
};

export const CollectionContext = createContext<ContextType | undefined>(
  undefined
);
