/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

import type { Article } from "../types";

const NewsItem = ({ article }: { article: Article }) => {
  return (
    <div
      css={{
        marginBottom: 20,
        paddingBottom: 10,
        borderBottom: "1px solid lightGrey",
      }}
    >
      <div>
        <a
          href={article.url}
          target="_blank"
          css={(theme) => ({
            ...theme.fonts.heading,
            textDecoration: "none",
            fontWeight: "600",
            color: "black",
            ["hover"]: {
              textDecoration: "underline",
            },
          })}
        >
          {article.title}
        </a>
        <p
          css={{
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          By {article.author}
        </p>
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {article.urlToImage && (
          <img src={article.urlToImage} css={{ height: 80, marginRight: 20 }} />
        )}
        {article.description && <p>{article.description}</p>}
      </div>
    </div>
  );
};

export default NewsItem;
