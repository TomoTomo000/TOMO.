import { createContext, useContext } from "react";

export type PageLoaderState = "entering" | "leaving" | "loading" | "done";

type PageLoaderContextValue = {
  state: PageLoaderState;
};

export const PageLoaderContext = createContext<PageLoaderContextValue | null>(
  null,
);

export function usePageLoader() {
  const context = useContext(PageLoaderContext);

  if (!context) {
    throw new Error("usePageLoader must be used within PageLoaderProvider");
  }

  return context;
}
