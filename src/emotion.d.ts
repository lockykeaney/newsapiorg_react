import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    fonts: {
      heading: {
        fontFamily: string;
        fontWeight: number;
      };
    };
  }
}
