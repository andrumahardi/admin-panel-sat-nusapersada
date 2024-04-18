import { GenericObject } from "@/types";

export function generateQueryParams(query: GenericObject) {
  const q = new URLSearchParams(query as unknown as URLSearchParams);
  const queryString = q.toString();

  return queryString ? `?${queryString}` : "";
}
