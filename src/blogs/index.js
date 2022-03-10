import express from "express";
import fs, { readFileSync } from "fs";

import unique from "uniqid";
import { blogValidator } from "../middlewares/validator.js";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { getBlogs, writeBlogs } from "../lib/fs-tools.js";

const blogsRouter = express.Router();

blogsRouter.get("/", (req, res, next) => {
  const blogsFound = getBlogs();
  try {
    if (blogsFound.length === 0) {
      next(createHttpError(404, "Blogs not found"));
      res.send("blogs not found");
    } else {
      res.send(blogsFound);
    }
  } catch (error) {
    next(createHttpError(404, "Blogs not founded"));
  }
});
blogsRouter.get("/:blogId", (req, res, next) => {
  const blogsArray = getBlogs();
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

blogsRouter.post("/", blogValidator, (req, res, next) => {
  const errorsList = validationResult(req);
  try {
    if (errorsList.isEmpty()) {
      const newBlog = { ...req.body, createdAt: new Date(), id: unique() };
      const blogsArray = getBlogs();
      blogsArray.push(newBlog);
      writeBlogs(blogsArray);
      res.status(201).send(newBlog);
    } else {
      next(
        createHttpError(400, `Some errors in the req body`, { errorsList })
        //it does not show the error list in the postman response without res.send
      );
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:blogId", async (req, res, next) => {
  const blogId = req.params.blogId;
  const blogsArray = getBlogs();

  const index = blogsArray.findIndex((blog) => blog.id === blogId);

  if (index !== -1) {
    const oldBlog = blogsArray[index];

    const updatedBlog = { ...oldBlog, ...req.body, updatedAt: new Date() };

    blogsArray[index] = updatedBlog;

    await writeBlogs(blogsArray);

    res.send(updatedBlog);
  }
});

blogsRouter.delete("/:blogId", (req, res, next) => {
  const blogsArray = getBlogs();
  const remainingBlogs = blogsArray.filter(
    (blog) => blog.id !== req.params.blogId
  );
  fs.writeFileSync(blogsJSONPath, JSON.stringify(remainingBlogs));

  console.log("this is delete method");
  res.status(204).send("blog Deleted");
});

export default blogsRouter;
