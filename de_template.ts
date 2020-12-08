import { parse, path } from './deps.ts'

export interface DeTemplateArgs {
  _: string[]
  template: string
}

const args = parse(Deno.args) as DeTemplateArgs
const main = () => {
  if (args._.includes('template')) {
    throw new Error('please assign template a file or diractory')
  }
  const templateArg = args.template ?? '.de_template'
  const templatePath = path.resolve(templateArg)
  console.log(templatePath)
}

if (import.meta.main) {
  main()
}
