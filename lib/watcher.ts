import { path } from "../deps.ts";
import { DeTemplateArgs } from "../de_template.ts";

const watcher = (args: DeTemplateArgs) => {
  const { template, cwd } = args;
  const templatePath = path.resolve(template as string);
  const workingDir = path.resolve(cwd as string);
  console.log(templatePath, workingDir);
};

export default watcher;
