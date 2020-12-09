import { path } from '../deps.ts'

export const getExt = (filePath: string) => {
  const extName = path.extname(filePath);
  return extName.slice(1);
}

const fetchTemplateFiles = (templatePath: string) => {
  const info = Deno.statSync(templatePath);
  const state = new Map<string, string>();

  if (info.isFile) {
    const extName = getExt(templatePath);
    const content = Deno.readTextFileSync(templatePath);
    state.set(extName, content);

    return state
  }

  return state
}

export default fetchTemplateFiles
