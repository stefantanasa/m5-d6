import express from "express";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";
import unique from "uniqid";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { saveAuthorAvatar } from "../lib/fs-tools.js";
import { authorPublicPath } from "../lib/fs-tools.js";
import { get } from "https";

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: { folder: "m5-d6" },
  }),
}).single("avatar");
const authorRouter = express.Router();
const currentFilePath = fileURLToPath(import.meta.url);
const parentFolderPath = dirname(currentFilePath);
const authorsJSONPath = join(parentFolderPath, "authors.json");
const fileContent = fs.readFileSync(authorsJSONPath);

const writeAuthors = (content) =>
  fs.writeFileSync(authorsJSONPath, JSON.stringify(content));

const getAuthors = () => JSON.parse(fs.readFileSync(authorsJSONPath));
console.log(getAuthors());
authorRouter.post("/uploadFile", cloudinaryUploader, async (req, res, next) => {
  try {
    res.status(201).send(req.file.path);
  } catch (error) {
    console.log("There is an error: ", error);
    next(error);
  }
});
authorRouter.post(
  "/:authorId/uploadFile",
  cloudinaryUploader,
  async (req, res, next) => {
    try {
      saveAuthorAvatar(req.file.originalname, req.file.buffer);

      const authorsArray = await getAuthors();

      const index = authorsArray.findIndex(
        (author) => author.id === req.params.authorId
      );
      const updatedAuthor = {
        ...authorsArray[index],
        cover: url,
        updatedAt: new Date(),
      };
      authorsArray[index] = updatedAuthor;
      writeAuthors(authorsArray);
      console.log("The link was method");

      res.status(201).send("File Uploaded!");
    } catch (error) {
      console.log("There is an error: ", error);
      next(error);
    }
  }
);
authorRouter.post(
  "/uploadFiles",
  multer().array("avatars"),
  async (req, res, next) => {
    try {
      const arrayOfFilesPromises = req.files.map((file) =>
        saveAuthorAvatar(file.originalname, file.buffer)
      );
      await await Promise.all(arrayOfFilesPromises);

      res.status(201).send("Files Uploaded!");
    } catch (error) {
      console.log("There is an error: ", error);
      next(error);
    }
  }
);

authorRouter.get("/", (req, res) => {
  try {
    const authors = getAuthors();
    res.send(authors);
  } catch (error) {
    next(error);
  }
});
authorRouter.get("/:authorId", (req, res) => {
  const authorsArray = getAuthors();
  const foundAuthor = authorsArray.find(
    (author) => author.id === req.params.authorId
  );

  console.log("this is get by id method");
  if (foundAuthor) {
    {
      res.status(200).send(foundAuthor);
    }
  } else {
    {
      res.status(200).send("Author not found!");
    }
  }
});
authorRouter.post("/", (req, res) => {
  const authorsArray = getAuthors();
  console.log(authorsArray);
  const newAuthor = { ...req.body, createdAt: new Date(), id: unique() };
  console.log(newAuthor);
  authorsArray.push(newAuthor);
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray));

  console.log("this is post method");
  res.status(201).send(newAuthor);
});

authorRouter.put("/:authorId", (req, res) => {
  const authorsArray = getAuthors();
  const index = authorsArray.findIndex(
    (author) => author.id === req.params.authorId
  );
  console.log(index);
  const updatedUser = {
    ...authorsArray[index],
    ...req.body,
    updatedAt: new Date(),
  };
  authorsArray[index] = updatedUser;
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray));
  console.log("this is put method");
  res.send(updatedUser);
});
authorRouter.delete("/:authorId", (req, res) => {
  const remainingAuthors = authorsArray.filter(
    (user) => user.id !== req.params.authorId
  );
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors));

  console.log("this is delete method");
  res.status(204).send("Author Deleted");
});

export default authorRouter;
