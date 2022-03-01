import express from "express";
import fs, { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import unique from "uniqid";

const authorRouter = express.Router();
const currentFilePath = fileURLToPath(import.meta.url);
const parentFolderPath = dirname(currentFilePath);
const authorsJSONPath = join(parentFolderPath, "authors.json");
const fileContent = fs.readFileSync(authorsJSONPath);

const authorsArray = JSON.parse(fileContent);
authorRouter.get("/", (req, res) => {
  console.log("FILE CONTENT: ", JSON.parse(fileContent));

  //   console.log(authorsArray);

  res.send(authorsArray);
});
authorRouter.get("/:authorId", (req, res) => {
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
  const newAuthor = { ...req.body, createdAt: new Date(), id: unique() };
  console.log(newAuthor);
  authorsArray.push(newAuthor);
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray));

  console.log("this is post method");
  res.status(201).send(newAuthor);
});

authorRouter.put("/:authorId", (req, res) => {
  const index = authorsArray.findIndex(
    (author) => author.id === req.params.authorId
  );
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
