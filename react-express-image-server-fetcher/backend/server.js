const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// Enable CORS
app.use(cors());

// Serve static images
app.use("/images", express.static(path.join(__dirname, "images")));

// API to get all image filenames
app.get("/api/images", (req, res) => {
  const imageDir = path.join(__dirname, "images");

  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load images" });
    }
    res.json(files); // Send all filenames as they are
  });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
