import { path, color } from "../deps.ts";
import { DeTemplateArgs } from "../de_template.ts";
import fetchTemplateFiles, { getExt } from './fetch_template_files.ts'

const watcher = async(args: DeTemplateArgs) => {
  const { template, cwd } = args;
  const templatePath = path.resolve(template as string);
  const workingDir = path.resolve(cwd as string);
  const fileStat = fetchTemplateFiles(templatePath);
  const createdFiles = new Set();
  
  const watchers = Deno.watchFs(workingDir);
  console.log(color.yellow(`

  🔍 de_template is watching your created file action

  `))

  for await (const watch of watchers) {
    const watchPath = watch.paths[0];
    if (watch.kind === 'create' && !createdFiles.has(watchPath)) {
      const watchStat = Deno.statSync(watchPath);

      if (watchStat.isFile) {
        const watchExt = getExt(watchPath);
        if (!fileStat.has(watchExt)) return

        createdFiles.add(watchPath);
        const content = fileStat.get(watchExt);

        Deno.writeTextFileSync(watchPath, content ?? '', { create: false });
        const relPath = path.relative(workingDir, watchPath);
        console.log(color.green(`  🚀 successful created .${watchExt} template content to ${relPath}`))
      }
    }
  }
};

export default watcher;
