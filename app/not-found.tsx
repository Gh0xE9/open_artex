import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap">
      <div className="crumb">
        <Link href="/">首页</Link>
        <span className="sep">/</span>
        <span>404</span>
      </div>
      <div style={{ padding: "56px 0 96px", maxWidth: 560 }}>
        <div className="section-kicker">Not Found / 未登记</div>
        <h1 className="section-title" style={{ fontSize: 36, marginBottom: 12 }}>
          没有这个编号
        </h1>
        <p style={{ fontSize: 12.5, lineHeight: 1.9, color: "var(--ink-soft)" }}>
          这个认证编号不存在，或者对应的仓库已被下架。编号一旦发出就不会复用，所以它不会指向别的项目。
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/#registry">
            回到登记册
          </Link>
          <Link className="btn" href="/about#submit">
            提交一个项目
          </Link>
        </div>
      </div>
    </div>
  );
}
