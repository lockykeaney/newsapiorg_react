export type Response = {
  status: "ok" | "error";
  code?: string;
  message?: string;
  totalResults: number;
};
export type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
export type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};
export type FilterOption = {
  label: string;
  value: string;
};
