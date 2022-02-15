const { VITE_API_KEY } = import.meta.env;

const BASE_URL = `https://newsapi.org/v2/top-headlines?apiKey=${VITE_API_KEY}`;

const getArticlesBySource = async ({
  pageSize,
  pageNumber,
  source,
}: {
  pageSize: number;
  pageNumber: number;
  source: string;
}) => {
  try {
    const url = `${BASE_URL}&sources=${source}&pageSize=${pageSize}&page=${pageNumber}`;
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    throw err;
  }
};

export default getArticlesBySource;
