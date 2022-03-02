import express from "express";
import authorsRouters from "./authors/index.js";
import blogsRouters from "./blogs/index.js";
import listEndpoints from "express-list-endpoints";
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./middlewares/errorHandlers.js";

const getMiddleware = (req, res, next) => {
  console.log(req);

  next();
};
const server = express();
server.use(getMiddleware);
const port = 3001;
server.use(express.json());
server.use("/authors", authorsRouters);
server.use("/blogs", blogsRouters);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
