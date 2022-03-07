import express from "express";
import authorsRouters from "./authors/index.js";
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

const publicPath = join(process.cwd(), "./public");
const getByIdMiddleware = (req, res, next) => {
  console.log("get middleware");

  next();
};
const server = express();
server.use(getByIdMiddleware);
server.use(express.static(publicPath));
const port = 3001;
server.use(express.json());
server.use("/authors", authorsRouters);
server.use("/blogs", blogsRouters);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);
server.use(
  cors({
    origin: function (origin, next) {
      console.log("ORIGIN: ", origin);
      if (!origin || whitelist.indexOf(origin) !== -1) {
        console.log("Origin allowed!");
      } else {
        console.log("Origin NOT allowed!");
      }
    },
  })
);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
