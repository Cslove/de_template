const args = Deno.args;

Deno.writeTextFileSync(args[0], "你好");

export {};
