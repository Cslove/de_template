/**
 * watcher.ts
 */
const initFiles = new Set();
const watcher = Deno.watchFs(".");
for await (const event of watcher) {
  console.log(">>>> event", event);
  const file = event.paths[0];
  if (event.kind === "create" && !initFiles.has(file)) {
    initFiles.add(file);
    // console.log(Deno.statSync(event.paths[0]).isFile)
    // const file = await Deno.open(event.paths[0])
    // const encoder = new TextEncoder();
    // const data = encoder.encode('China');
    // file.writeSync(data)
    // Deno.close(file.rid)
    // Deno.run({
    //   cmd: [
    //     'deno',
    //     'run',
    //     '-A',
    //     './write.ts',
    //     event.paths[0]
    //   ],
    // })
    Deno.writeTextFileSync(event.paths[0], "你好", { create: false });
  }
  // if (event.kind === 'create') {

  // }
  // Example event: { kind: "create", paths: [ "/home/alice/deno/foo.txt" ] }
}

export {};
