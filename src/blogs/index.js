import express from "express";
import fs, { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import unique from "uniqid";

const blogsRouter = express.Router();
const currentFilePath = fileURLToPath(import.meta.url);
const parentFolderPath = dirname(currentFilePath);
const blogsJSONPath = join(parentFolderPath, "blogs.json");
const fileContent = fs.readFileSync(blogsJSONPath);

const blogsArray = JSON.parse(fileContent);
blogsRouter.get("/", (req, res) => {
  console.log("FILE CONTENT: ", JSON.parse(fileContent));

  //   console.log(blogsArray);

  res.send(blogsArray);
});
blogsRouter.get("/:blogId", (req, res) => {
  const foundBlog = blogsArray.find((blog) => blog.id === req.params.blogId);

  console.log("this is get by id method");
  if (foundBlog) {
    {
      res.status(200).send(foundBlog);
    }
  } else {
    {
      res.status(200).send("blog not found!");
    }
  }
});
blogsRouter.post("/", (req, res) => {
  const newBlog = { ...req.body, createdAt: new Date(), id: unique() };
  console.log(newBlog);
  blogsArray.push(newBlog);
  fs.writeFileSync(blogsJSONPath, JSON.stringify(blogsArray));

  console.log("this is post method");
  res.status(201).send(newBlog);
});

blogsRouter.put("/:blogId", (req, res) => {
  const index = blogsArray.findIndex((blog) => blog === req.params.blogId);
  const updatedBlog = {
    ...blogsArray[index],
    ...req.body,
    updatedAt: new Date(),
  };
  blogsArray[index] = updatedBlog;
  fs.writeFileSync(blogsJSONPath, JSON.stringify(blogsArray));
  console.log("this is put method");
  res.send(updatedBlog);
});
blogsRouter.delete("/:blogId", (req, res) => {
  const remainingBlogs = blogsArray.filter(
    (blog) => blog.id !== req.params.blogId
  );
  fs.writeFileSync(blogsJSONPath, JSON.stringify(remainingBlogs));

  console.log("this is delete method");
  res.status(204).send("blog Deleted");
});

export default blogsRouter;
