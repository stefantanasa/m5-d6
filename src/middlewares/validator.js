import { body } from "express-validator";

export const blogValidator = [
  body("category").exists().withMessage("Category is mandatory"),
  body("title").exists().withMessage("title is mandatory"),
  body("cover").exists().withMessage("cover is mandatory"),
  body("readTime").exists().withMessage("readTime is mandatory"),
  body("author").exists().withMessage("author is mandatory"),
  body("content").exists().withMessage("content is mandatory"),
];
