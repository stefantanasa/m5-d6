import { join } from "path";
import fs from "fs-extra";

const { writeFile } = fs;
export const authorPublicPath = join(process.cwd(), "./public/authors/avatar");

export const saveAuthorAvatar = (filename, bufferContent) => {
  writeFile(join(authorPublicPath, filename), bufferContent);
};

const blogsJSONPath = join(process.cwd(), "./src/blogs/blogs.json");
export const getBlogs = () => JSON.parse(fs.readFileSync(blogsJSONPath));
export const writeBlogs = (content) =>
  fs.writeFileSync(blogsJSONPath, JSON.stringify(content));
