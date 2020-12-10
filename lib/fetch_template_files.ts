import { color, path } from "../deps.ts";

const stats = new Map<string, string>();

export const getExt = (filePath: string) => {
  const extName = path.extname(filePath);
  return extName.slice(1);
};

export const existsPath = (path: string) => {
  try {
    Deno.lstatSync(path);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
};

const fetchTemplateFiles = (templatePath: string, cwd: string) => {
  if (!existsPath(templatePath)) {
    const relPath = path.relative(cwd, templatePath);
    console.log(color.red(`
    
  🏠 please insure your current working directory has ${relPath} exists.

    `));
    Deno.exit();
  }

  const info = Deno.statSync(templatePath);

  if (info.isFile) {
    const extName = getExt(templatePath);
    const content = Deno.readTextFileSync(templatePath);
    stats.set(extName, content);

    return stats;
  }

  if (info.isDirectory) {
    for (const dirEntry of Deno.readDirSync(templatePath)) {
      const fileOrDir = path.join(templatePath, dirEntry.name);
      fetchTemplateFiles(fileOrDir, cwd);
    }
  }

  return stats;
};

export default fetchTemplateFiles;
