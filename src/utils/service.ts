const BASE_URL = "https://newsapi.org/v2/top-headlines";

const ENDPOINTS = {
  articles: "?country=au&",
  sources: "/sources?",
};
const client = async (params: string) => {
  const URL = `${BASE_URL}${params}`;

  try {
    const res = await fetch(URL);
    const json = res.json();
    return json;
  } catch (err) {
    return err;
  }
};

export default client;
