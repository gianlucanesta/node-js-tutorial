require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const http = require("http");
const cors = require("cors");

const { createHandler } = require("graphql-http/lib/use/express");
const expressPlayground =
  require("graphql-playground-middleware-express").default;

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");

const auth = require("./middleware/auth");

const { clearImage } = require("./util/file");

const app = express();

const imageUploadDir = path.join(__dirname, "images");

if (!fs.existsSync(imageUploadDir)) {
  fs.mkdirSync(imageUploadDir, { recursive: true });
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageUploadDir);
  },
  filename: (req, file, cb) => {
    const sanitizedFilename =
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
    cb(null, sanitizedFilename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(imageUploadDir));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

app.put("/post-image", auth, (req, res, next) => {
  if (!req.isAuth) {
    const error = new Error("Not authenticated!");
    error.statusCode = 401;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No file provided!");
    error.statusCode = 422;
    throw error;
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  const filePath = req.file.filename;
  // const filePath = req.file.path.replace("\\", "/");
  return res.status(201).json({
    message: "File stored.",
    filePath: filePath,
  });
});

app.all(
  "/graphql",
  createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    context: (req, res) => {
      return {
        isAuth: req.raw.isAuth,
        userId: req.raw.userId,
      };
    },
    formatError(err) {
      if (!err.originalError) return err;
      const data = err.originalError.data;
      const message = err.message || "Something went wrong.";
      const statusCode = err.originalError.statusCode || 500;

      return { message, statusCode, data };
    },
  })
);

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const port = 8080;
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection successful");
    app.listen(port);
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

// function clearImage(filePath) {
//   filePath = path.join(__dirname, filePath);
//   fs.unlink(filePath, (err) => console.log(err));
// }
