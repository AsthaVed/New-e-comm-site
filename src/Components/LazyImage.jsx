import React from "react";
import { useInView } from "react-intersection-observer";

const LazyImage = ({ src, alt, height = "200px", style = {} }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} style={{ height, width: "100%", ...style }}>
      {inView ? (
        <img
          src={src}
          alt={alt}
          height={height}
          style={{ width: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height,
            background: "#f0f0f0",
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;