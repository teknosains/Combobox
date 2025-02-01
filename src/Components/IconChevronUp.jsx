import * as React from "react";
const SVGComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    xmlSpace="preserve"
    width={64}
    height={64}
    {...props}
  >
    <path
      style={{
        fill: "#444",
      }}
      d="M62.836 40.582 33.745 18.764a2.91 2.91 0 0 0-3.491 0L1.164 40.582a2.91 2.91 0 0 0 3.491 4.655L32 24.728l27.345 20.508a2.91 2.91 0 0 0 3.491-4.655"
    />
  </svg>
);
export default SVGComponent;
