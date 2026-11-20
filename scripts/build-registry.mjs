import { mergeRegistry } from "./lib.mjs";

const r = mergeRegistry();
console.log(`registry: ${r.total} 条，新增 ${r.added} 条`);
