import Link from "next/link";
import type { Metadata } from "next";
import { TIERS, meta, repos, stats } from "@/lib/data";

const REPO = "https://github.com/Gh0xE9/open_artex";

export const metadata: Metadata = {
  title: "认证规则",
  description: "ARTEX 二开认证的分级标准、收录范围、编号规则与提交方式。",
};

export default function About() {
  const n = (t: number) => repos.filter((r) => r.tier === t).length;

  return (
    <div className="wrap">
      <div className="crumb">
        <Link href="/">首页</Link>
        <span className="sep">/</span>
        <span>认证规则</span>
      </div>

      <div className="section-head" style={{ borderBottom: "1px solid var(--line-2)", paddingBottom: 16 }}>
        <div>
          <div className="section-kicker">Charter / v1.0</div>
          <h1 className="section-title" style={{ fontSize: 32 }}>
            认证规则
          </h1>
        </div>
        <p className="section-desc">
          一份关于“ARTEX 衍生项目”的公开登记约定：怎么算、怎么分级、怎么编号、怎么更正。
        </p>
      </div>

      <div className="prose">
        <h2>一、这是什么</h2>
        <p>
          ARTEX 是 2026 年百度“agent+”攻防挑战赛的冠军项目，一套由 LLM 多智能体驱动的自主渗透测试系统，以
          AGPL-3.0 开源。2026 年 10 月，上游仓库 <code>Autumn-27/ARTEX</code> 从 GitHub 删除，公开源码停在
          v0.3.15 前后。
        </p>
        <p>
          源码没有消失。它以 fork、转存、镜像、汉化、英化、韩化、换肤、加装武器库的方式继续扩散，在几周内长出上百个仓库。其中一部分只是备份，一部分被改成了自己的产品，还有一部分被拿去做了没有授权前提的“攻防演练”。
        </p>
        <p>
          本站做三件事：<strong>收录</strong>（把公开能找到的 ARTEX 相关仓库列全）、
          <strong>分级</strong>（按改动深度给出 Ⅰ—Ⅴ 级）、<strong>留痕</strong>
          （记录仓库自述与署名状态，供后续追溯）。认证是一个登记行为，不是荣誉，也不是判决。
        </p>

        <h2>二、五级认证</h2>
        <p>等级只看一件事：相对上游，你到底改了多少。等级高不代表技术强，只代表离原版更远。</p>
        <table className="tier-table">
          <thead>
            <tr>
              <th>等级</th>
              <th>名称</th>
              <th>判定标准</th>
              <th style={{ textAlign: "right" }}>当前</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t) => (
              <tr key={t.n}>
                <td>{t.roman}</td>
                <td style={{ whiteSpace: "nowrap" }}>{t.label}</td>
                <td>{t.desc}</td>
                <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: 11 }}>{n(t.n)}</td>
              </tr>
            ))}
            <tr>
              <td style={{ color: "var(--muted)" }}>—</td>
              <td style={{ whiteSpace: "nowrap", color: "var(--muted)" }}>不评级</td>
              <td style={{ color: "var(--muted)" }}>
                上游主干、主要发行版、源码备份、防御检测与周边工具。它们不是“二开”，只做登记。
              </td>
              <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>
                {stats.total - stats.forks}
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 11, color: "var(--muted)" }}>
          统计口径：{stats.total} 个仓库，其中二开 {stats.forks} 个。等级由维护者依据仓库自述与可见形态判定，允许申诉。
        </p>

        <h2>三、收录范围</h2>
        <ul>
          <li>
            <strong>二开</strong>：仓库名、简介或 README 表明基于 ARTEX 修改，包括改名换皮、加功能、重构、产品化。
          </li>
          <li>
            <strong>备份镜像</strong>：未改动或仅转存的源码副本，用于确认上游删除后的源码流向。
          </li>
          <li>
            <strong>防御研究</strong>：检测规则、加固基线、蜜罐、镜像审计、漏洞分析、教学案例。
          </li>
          <li>
            <strong>周边工具</strong>：MCP、插件、移动端封装、多机控制台、技能包。
          </li>
          <li>
            <strong>上游主干与主要发行</strong>：删除前的官方仓库、当前事实主干、以及下游分叉密集的本地化发行版。
          </li>
        </ul>
        <p>
          不收录：与 ARTEX 同名的无关项目（建材品牌、画廊、<code>ARText</code>、<code>ArtExt</code> 等）、空仓库、纯 star
          农场。判定存疑的会先放进列表并标注“待复核”。
        </p>

        <h2>四、编号规则</h2>
        <p>
          编号形如 <code>ARTEX-2K-0042</code>。<code>2K</code> 取“二开”的谐音，<code>0042</code> 是登记序号。序号按收录时的
          Stars 降序一次性分配，之后不因排名变化而改号——编号一旦发出，就跟着这个仓库。
        </p>
        <p>
          Stars、Forks、更新时间等字段来自 GitHub API，同步于 {meta.syncedAt}。数据快照存放在
          <code>data/repos.json</code>，可通过 <code>npm run sync</code> 重新抓取（需 <code>GITHUB_TOKEN</code>）。
        </p>

        <h2 id="submit">五、提交与更正</h2>
        <p>
          发现漏网项目，或者你就是项目方想补充说明、更正等级、要求下架，都走同一个入口：
          <a href={`${REPO}/blob/main/PR.md`} target="_blank" rel="noreferrer">
            PR.md
          </a>
          。
        </p>
        <ol>
          <li>
            Fork <a href={REPO} target="_blank" rel="noreferrer">{REPO.replace("https://", "")}</a>。
          </li>
          <li>
            在 <code>data/submissions/</code> 新建 <code>owner--repo.json</code>，字段见 PR.md 的 schema。
          </li>
          <li>
            PR 标题：<code>[2K] 新增：owner/repo</code>；更正类用 <code>[2K] 更正：ARTEX-2K-0042</code>。
          </li>
          <li>维护者核对仓库确实存在、确实与 ARTEX 相关后合并；编号与徽章在下次构建生效。</li>
        </ol>
        <p>
          审核只做三件事：链接可访问、与 ARTEX 有关、自述引用无误。本站不对项目质量、合法性、安全性做任何评价，也不接受“帮我夸一夸”的提交。
        </p>

        <h2>六、免责与边界</h2>
        <ul>
          <li>本站只索引公开仓库链接与公开自述，不托管、不分发、不编译任何 ARTEX 源码或其衍生品。</li>
          <li>认证编号是登记序号，不具备资质、认证、审计或安全背书效力。</li>
          <li>等级判定基于仓库自述，可能滞后、片面或出错；发现问题请提 Issue，我们核对后更正。</li>
          <li>
            任何使用 ARTEX 或其衍生版本进行未授权测试的行为，与本登记册无关。相关法律后果由行为人自行承担。
          </li>
        </ul>
        <p style={{ marginTop: 24, color: "var(--muted)", fontSize: 11.5 }}>
          上游项目：<a href="https://github.com/BaaRai/ARTEX" target="_blank" rel="noreferrer">BaaRai/ARTEX</a>（英文发行，AGPL-3.0）·
          <a href="https://github.com/RuoJi6/ARTEX" target="_blank" rel="noreferrer">RuoJi6/ARTEX</a>（持续维护分支）
        </p>
      </div>
    </div>
  );
}
