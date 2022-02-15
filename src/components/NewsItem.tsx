/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

import type { Article } from "../types";

const NewsItem = ({ article }: { article: Article }) => {
  return (
    <div
      css={{
        border: "1px solid black",
      }}
    >
      <div>
        <a
          href={article.url}
          target="_blank"
          css={(theme) => ({
            ...theme.fonts.heading,
            textDecoration: "none",
          })}
        >
          {article.title}
        </a>
        <p>{article.author}</p>
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <img src={article.urlToImage} css={{ height: 80, marginRight: 20 }} />
        <p>{article.description}</p>
      </div>
    </div>
  );
};

export default NewsItem;
