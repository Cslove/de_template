# 🐘 de_template

> Automatically generates template content when you create a new file.

## Usage

Insure you have been installed [Deno](https://deno.land).

```bash
# install script via deno
deno install --allow-read --allow-write https://deno.land/x/de_template@v1.0.4/de_template.ts

# create template file in your working dir
mkdir .de_template
cd .de_template && touch template.txt
echo 'hello world' > template.txt
cd ..

# start watching via de_template
de_template
```

now when you created a new file that extensions is .txt, its content will automatically generate by .de_template/template.txt

you can also check `de_template -h` to get how to setting cwd and template.
