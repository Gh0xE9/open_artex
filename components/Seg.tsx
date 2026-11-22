import { Fragment } from "react";
import type { Seg } from "@/lib/copy";

/** pre + <strong> + post */
export function Seg({ s }: { s: Seg }) {
  return (
    <>
      {s.pre}
      {s.strong ? <strong>{s.strong}</strong> : null}
      {s.post ?? ""}
    </>
  );
}

/** 把 `反引号` 包住的部分渲染成 <code> */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 ? <code key={i}>{part}</code> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
