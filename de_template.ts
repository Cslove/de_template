import { color, parse } from "./deps.ts";
import watcher from "./lib/watcher.ts";

export interface DeTemplateArgs {
  _: string[];
  template?: string;
  cwd?: string;
  h?: boolean;
  help?: boolean;
}
const { red, bold } = color;
const args = parse(Deno.args) as DeTemplateArgs;
const main = () => {
  if (args._.includes("template")) {
    console.log(red(bold("please assign template a file or diractory")));
    args.h = true;
  }

  if (args.h ?? args.help) {
    console.log(`
    
  de_template: Automatically generates template content when you create a new file.
  
    INSTALL:
        deno install --allow-read --allow-write https://deno.land/std/http/file_server.ts

    USAGE:
        de_template [options]

    OPTIONS:
        -h, --help                  Prints help information
        --template<FILE or DIR>     setting template file or directory path
        --cwd<DIR>                  watching directory, default current working directory
    `);
    Deno.exit();
  }
  const deTemplateArg = {} as DeTemplateArgs;
  deTemplateArg.template = args.template ?? ".de_template";
  deTemplateArg.cwd = args.cwd ?? Deno.cwd();
  watcher(deTemplateArg);
};

if (import.meta.main) {
  main();
}
