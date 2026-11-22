import Link from "next/link";
import { Registry } from "@/components/Registry";
import { Seal } from "@/components/Seal";
import { TIERS, meta, repos, stats } from "@/lib/data";

const REPO = "https://github.com/Gh0xE9/open_artex";

export default function Home() {
  const tierCount = (n: number) => repos.filter((r) => r.tier === n).length;

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">ARTEX Derivative Registry · 公开登记 · 第 01 版</div>
              <h1 className="hero-title">
                ARTEX <em>二开</em>认证中心
              </h1>
              <p className="hero-sub">
                Certified Secondary Development · 2K-0001 — {String(stats.total).padStart(4, "0")}
              </p>
              <p className="hero-lead">
                2026 年 10 月，上游 <strong>Autumn-27/ARTEX</strong> 从 GitHub 删除。源码没有随之消失——它以
                v0.3.15 的形式散落在 <strong>{stats.total}</strong> 个仓库里，改名、换皮、加装武器库，再以“AI
                自主渗透平台”的名义重新上线。
              </p>
              <p className="hero-lead">
                这里把能查到的全部登记在册，按改动深度授予 Ⅰ—Ⅴ 级认证。
                <strong>认证不代表认可</strong>，只代表我们看见你。
              </p>
              <p className="hero-note">
                收录口径：仓库名、简介或话题涉及 ARTEX 的公开 GitHub 仓库，含二开、镜像备份、防御检测与周边工具。全部字段取自仓库自述，本站不做二次核验，也不托管任何源码。
              </p>
            </div>

            <aside className="seal-panel">
              <div className="seal-panel-top">
                <span>Certificate Authority</span>
                <span>2K</span>
              </div>
              <Seal size={104} />
              <div className="seal-meta">
                <div>
                  <span>收录</span>
                  {stats.total} 个仓库
                </div>
                <div>
                  <span>二开</span>
                  {stats.forks} 个
                </div>
                <div>
                  <span>覆盖 Stars</span>
                  {stats.stars.toLocaleString("en-US")}
                </div>
                <div>
                  <span>最近同步</span>
                  {meta.syncedAt}
                </div>
              </div>
            </aside>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-label">Registered</div>
              <div className="stat-value">
                {stats.total}
                <small>个仓库</small>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">Derivative</div>
              <div className="stat-value">
                {stats.forks}
                <small>个二开</small>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">Attribution</div>
              <div className="stat-value">
                {Math.round((stats.attributed / stats.total) * 100)}%<small>简介标注来源</small>
              </div>
            </div>
            <div className="stat">
              <div className="stat-label">Last Sync</div>
              <div className="stat-value" style={{ fontSize: 20, paddingTop: 5 }}>
                {meta.syncedAt}
              </div>
            </div>
          </div>

          <div className="tiers-strip">
            {TIERS.map((t) => (
              <div className="tier-cell" key={t.n}>
                <span className="tier-roman">{t.roman}</span>
                <span className="tier-name">{t.label}</span>
                <span className="tier-cnt">{tierCount(t.n)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="statement" id="why">
          <div className="statement-head">
            <div className="statement-kicker">Statement / 00</div>
            <h2 className="statement-title">为什么会有这个站</h2>
          </div>
          <div className="statement-body">
            <p className="statement-lead">
              见过太多这样的场面：把 ARTEX 的源码拉下来，让 AI 逐文件改一遍——改包名、换配色、重写注释、抹掉原作者的名字——然后对外说，这是自己从零做的产品。
            </p>
            <p>
              这不是个案。同一份源码，只换了一层皮，就在汇报里成了「我们的自研平台」，从头到尾一个字没提
              ARTEX。名录里 {stats.forks} 个二开项目，{stats.attributedForks} 个写了来源，
              {stats.forks - stats.attributedForks} 个没写。
            </p>
            <p>
              这不叫二开。二开是在别人的地基上继续盖，并且说清楚地基是谁打的。Ⅰ
              级搬运好歹留着上游链接，Ⅳ 级重构大多也在 README 里注明了上游。而把一份 AGPL-3.0
              的代码洗成自己的东西，抹掉署名不会改变它仍是衍生作品——
              <strong>许可协议该约束的照样约束，只是原作者大多没精力去打官司</strong>。
            </p>
            <p className="statement-sign">
              核实成本太低，维权成本太高，所以这种事一直在发生。既然挡不住，那就先登记下来。
            </p>
          </div>
        </section>
      </div>

      <section className="section" id="registry">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-kicker">Registry / 01</div>
              <h2 className="section-title">认证名录</h2>
            </div>
            <p className="section-desc">
              按星级排序。等级依据仓库自述与形态判定：只改名换皮的记为 Ⅱ 级，加装功能的记为 Ⅲ 级，改造架构或做成产品的记为 Ⅳ 级，已经对外运营收费的记为 Ⅴ 级。
            </p>
          </div>
          <Registry repos={repos} />
        </div>
      </section>

      <div className="wrap">
        <section className="cta" id="submit">
          <div>
            <div className="section-kicker">Submission / 02</div>
            <h3>漏了一个？给它一个编号。</h3>
            <p>
              任何基于 ARTEX 源码的二次开发项目都可以提交——包括你自己的。只需在仓库里新增一个 JSON
              条目，提一个 PR。合并后自动分配认证编号，并生成一枚可嵌入的 SVG 徽章。
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={`${REPO}/blob/main/PR.md`} target="_blank" rel="noreferrer">
                阅读 PR.md
              </a>
              <a className="btn" href={`${REPO}/pulls`} target="_blank" rel="noreferrer">
                去 GitHub 提 PR
              </a>
            </div>
          </div>
          <ol className="steps">
            <li>
              <b>01</b>Fork 仓库，在 data/submissions/ 下新建一个以 owner--repo.json 命名的文件
            </li>
            <li>
              <b>02</b>按模板填写仓库地址、自述、类型与改动说明，附上可核验的链接
            </li>
            <li>
              <b>03</b>提 PR，标题格式 [2K] 新增：owner/repo
            </li>
            <li>
              <b>04</b>维护者核对后合并，编号与徽章随下一次同步生效
            </li>
          </ol>
        </section>
      </div>
    </>
  );
}
