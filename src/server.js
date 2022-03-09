import express from "express";
import authorsRouters from "./authors/index.js";
import fileUploadRouters from "./files/index.js";
import blogsRouters from "./blogs/index.js";
import listEndpoints from "express-list-endpoints";
import { join } from "path";
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./middlewares/errorHandlers.js";
import cors from "cors";
import { Console } from "console";

const publicPath = join(process.cwd(), "./public");
const getByIdMiddleware = (req, res, next) => {
  console.log("get middleware");

  next();
};
const server = express();
const port = process.env.PORT;
server.use(getByIdMiddleware);
server.use(express.static(publicPath));
server.use(express.json());
server.use("/authors", authorsRouters);
server.use("/blogs", blogsRouters);
server.use("/authors", fileUploadRouters);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);
server.use(cors());
console.table(listEndpoints(server));
server.listen(port, () => {
  console.log(port);
  console.log(`server is running on port ${port} ${process.env.SOMETHING}`);
});
