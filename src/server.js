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

const getByIdMiddleware = (req, res, next) => {
  console.log("get middleware");

  next();
};
const server = express();
server.use(getByIdMiddleware);
const port = 3001;
server.use(express.json());
server.use("/authors", authorsRouters);
server.use("/blogs", blogsRouters);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
