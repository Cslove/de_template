import { path } from "../deps.ts";

const stats = new Map<string, string>();

export const getExt = (filePath: string) => {
  const extName = path.extname(filePath);
  return extName.slice(1);
};

const fetchTemplateFiles = (templatePath: string) => {
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
      fetchTemplateFiles(fileOrDir);
    }
  }

  return stats;
};

export default fetchTemplateFiles;
