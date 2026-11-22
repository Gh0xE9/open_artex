import { mergeRegistry } from "./lib.mjs";

const r = mergeRegistry();
console.log(`registry: ${r.total} entries, ${r.added} new`);
