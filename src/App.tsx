/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Theme, ThemeProvider } from "@emotion/react";
import {} from "@emotion/react";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import type { Article, FilterOption } from "./types";
import theme from "./theme";
import useSourceFilter from "./hooks/useSourceFilter";

import NewsItem from "./components/NewsItem";
import SourceFilter from "./components/SourceFilter";

import getArticles from "./services/getArticles";
import getArticlesBySource from "./services/getArticlesBySource";

type ArticleResponse = Response & { articles: Article[] };

const { VITE_API_KEY } = import.meta.env;
const PAGE_SIZE = 10;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<Article[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isShowMoreVisible, setIsShowMoreVisible] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { sources, isSourcesLoading, sourcesError } = useSourceFilter();

  const [selectedSource, setSelectedSource] = useState<
    FilterOption | undefined
  >();

  useEffect(() => {
    setIsLoading(true);
    getArticles({ pageNumber, pageOffset: PAGE_SIZE })
      .then((res: any) => {
        res.status === "error"
          ? setError(res.message)
          : setArticles(res.articles);
        setIsLoading(false);
        setPageNumber(pageNumber + 1);
      })
      .catch((err) => {
        setError(err.toString());
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedSource) {
      setIsLoading(true);
      getArticlesBySource({
        source: selectedSource.value,
        pageSize: 20,
        pageNumber,
      })
        .then((res) => {
          setArticles(res.articles);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedSource]);

  return (
    <ThemeProvider theme={theme}>
      <div
        css={{
          padding: 40,
        }}
      >
        <SourceFilter
          sources={sources}
          error={sourcesError}
          isLoading={isSourcesLoading}
          onChange={setSelectedSource}
        />
        {isLoading ? (
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              height: 350,
            }}
          >
            <ClipLoader loading={isLoading} size={90} />
            <h2>Loading Articles from NewsAPI.org</h2>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            {articles.map((article: Article, index: number) => (
              <NewsItem article={article} key={`article_${index}`} />
            ))}

            {isShowMoreVisible && !selectedSource && (
              <button
                onClick={() => {
                  getArticles({ pageNumber, pageOffset: PAGE_SIZE })
                    .then((res) => {
                      setArticles([...articles, ...res.articles]);
                      setPageNumber(pageNumber + 1);
                      if (pageNumber > res.totalResults) {
                        setIsShowMoreVisible(false);
                      }
                    })
                    .catch((err) => setError(err.toString()));
                }}
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
