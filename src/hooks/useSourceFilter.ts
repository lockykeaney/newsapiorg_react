import { useEffect, useState } from "react";
import { Response, Source, FilterOption } from "../types";
import service from "../utils/service";

const { VITE_API_KEY } = import.meta.env;

type SourceResponse = Response & { sources: Source[] };
const useSourceFilter = () => {
  const [isSourcesLoading, setIsSourcesLoading] = useState<boolean>(true);
  const [sources, setSources] = useState<FilterOption[]>([]);
  const [sourcesError, setSourcesError] = useState<string | undefined>(
    undefined
  );

  const mapSourceToOptions = (sources: Source[]) => {
    return sources.map((source: Source) => {
      return {
        value: source.id,
        label: source.name,
      };
    });
  };

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${VITE_API_KEY}`)
      .then((res) => res.json())
      .then((res: SourceResponse) => {
        res.status === "error"
          ? setSourcesError(res.message)
          : setSources(mapSourceToOptions(res.sources));

        setIsSourcesLoading(false);
      })
      .catch((err) => {
        setSourcesError(err.toString());
        setIsSourcesLoading(false);
      });
  }, []);

  return {
    sources,
    sourcesError,
    isSourcesLoading,
  };
};

export default useSourceFilter;
