const path = require("path");
const fs = require("fs");

function clearImage(filePath) {
  const fullPath = path.join(__dirname, "..", "images", filePath);
  console.log("Full image path:", fullPath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error("Error deleting the file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
}

module.exports = { clearImage };
