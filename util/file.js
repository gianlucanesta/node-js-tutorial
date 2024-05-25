const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Errore durante la cancellazione del file:", err);
    }
  });
};

module.exports = deleteFile;
