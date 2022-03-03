import { join } from "path";
import fs from "fs-extra";

const { writeFile } = fs;
export const authorPublicPath = join(process.cwd(), "./public/authors/avatar");

export const saveAuthorAvatar = (filename, bufferContent) => {
  writeFile(join(authorPublicPath, filename), bufferContent);
};
