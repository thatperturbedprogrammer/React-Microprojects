import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images")
      .then((response) => {
        // Ensure correct extension when fetching
        const imageUrls = response.data.map(
          (filename) => `http://localhost:5000/images/${filename}`
        );
        setImages(imageUrls);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div>
      <h2>Images from Backend</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`img-${index}`}
            width={300}
            height={200}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
