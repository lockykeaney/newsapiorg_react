/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

import type { Source, FilterOption } from "../types";
import Select from "react-select";

const SourceFilter = ({
  sources,
  isLoading,
  error,
  onChange,
}: {
  sources: FilterOption[];
  isLoading: boolean;
  error: string | undefined;
  onChange: (event: any) => void;
}) => {
  if (error) {
    return <div>There has been an error</div>;
  }

  return (
    <Select
      options={sources}
      isDisabled={isLoading || sources.length === 0}
      placeholder={
        isLoading || sources.length === 0
          ? "Loading Sources..."
          : "Select a source"
      }
      onChange={(e) => onChange(e)}
    />
  );
};

export default SourceFilter;
