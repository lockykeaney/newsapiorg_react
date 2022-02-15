const { VITE_API_KEY } = import.meta.env;

const BASE_URL = `https://newsapi.org/v2/top-headlines?apiKey=${VITE_API_KEY}`;

const getArticles = async ({
  pageOffset,
  pageNumber,
}: {
  pageOffset: number;
  pageNumber: number;
}) => {
  try {
    const url = `${BASE_URL}&pageSize=${pageOffset}&page=${pageNumber}&country=au`;
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    throw err;
  }
};

export default getArticles;
