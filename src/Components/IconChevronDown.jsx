import * as React from "react";
const SVGComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 54 54"
    xmlSpace="preserve"
    width={54}
    height={54}
    {...props}
  >
    <path
      style={{
        fill: "#444",
      }}
      d="M53.281 12.992a2.454 2.454 0 0 0-3.471 0l-22.809 22.81L4.19 12.992a2.454 2.454 0 1 0-3.471 3.471l24.546 24.545a2.454 2.454 0 0 0 3.471 0l24.545-24.545a2.453 2.453 0 0 0 0-3.471"
    />
  </svg>
);
export default SVGComponent;
