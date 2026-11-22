import type { Kind } from "@/lib/taxonomy";

export type Lang = "en" | "zh";

/** 一段带 <strong> 的文本：pre + strong + post */
export type Seg = { pre: string; strong?: string; post?: string };

const en = {
  htmlLang: "en",
  langSwitch: { en: "EN", zh: "中文", label: "Language" },

  nav: {
    registry: "Registry",
    rules: "Rules",
    submit: "Submit",
    github: "GitHub",
    est: "EST. 2026 · AGPL-3.0",
  },

  brand: {
    mark: "2K",
    title: "ARTEX Derivative Registry",
    short: "ARTEX Registry",
    sub: "Certification Center",
  },

  notice: {
    tag: "Unofficial",
    text: "An independent, satirical fan project. Not affiliated with ARTEX, its author, or any listed repository. Kept for entertainment and archival purposes only.",
    more: "Details",
  },

  kinds: {
    upstream: "Upstream",
    distribution: "Distribution",
    fork: "Derivative",
    mirror: "Mirror",
    defense: "Defense",
    tool: "Tooling",
    index: "Index",
  } satisfies Record<Kind, string>,

  tiers: [
    { label: "Copy", desc: "Re-uploaded as-is, or with trivial edits. Upstream shape intact." },
    { label: "Reskin", desc: "Renamed, re-themed, re-translated. Same machinery underneath." },
    { label: "Extended", desc: "New modules, skill packs, or orchestration bolted on top." },
    { label: "Rebuilt", desc: "Architecture or stack replaced, or merged into a new product." },
    { label: "Commercial", desc: "Operated publicly: paid groups, hosting, commercial editions." },
  ],

  hero: {
    eyebrow: "ARTEX Derivative Registry · Public ledger · Vol. 01",
    titleA: "ARTEX",
    titleEm: "Derivative",
    titleB: " Registry",
    sub: (last: string) => `Secondary Development Certification · 2K-0001 — ${last}`,
    lead1: (n: number): Seg => ({
      pre: "In October 2026 the upstream repository ",
      strong: "Autumn-27/ARTEX",
      post: ` was deleted from GitHub. The source did not go with it — it scattered into ${n} repositories as v0.3.15, renamed, reskinned, weaponized, and relaunched as "autonomous AI pentest platforms".`,
    }),
    lead2: {
      pre: "Everything we could find is catalogued below and graded Ⅰ–Ⅴ by how far it drifted. ",
      strong: "A certificate is not an endorsement",
      post: " — only a note that we noticed you.",
    },
    note: "Scope: public GitHub repositories whose name, description, or topics mention ARTEX — derivatives, mirrors, defensive research, tooling. Every field is quoted from the repository itself. Nothing is independently verified, and no source code is hosted here.",
  },

  sealPanel: {
    topLeft: "Registry Office",
    topRight: "2K",
    catalogued: "Catalogued",
    repos: "repositories",
    derivatives: "Derivatives",
    stars: "Stars covered",
    sync: "Last sync",
  },

  stats: {
    registered: "Registered",
    registeredUnit: "repositories",
    derivative: "Derivative",
    derivativeUnit: "forks",
    attribution: "Attribution",
    attributionUnit: "credit upstream",
    lastSync: "Last sync",
  },

  statement: {
    kicker: "Statement / 00",
    title: "Why this site exists",
    lead: "You have seen this move. Clone the ARTEX source, walk an AI through it file by file — rename the package, swap the palette, rewrite the comments, delete the original author's name — then announce that you built a product from scratch.",
    p2: (forks: number, attributed: number, missing: number): Seg => ({
      pre: "It is not an isolated case. The same source, with a new skin, becomes \"our in-house platform\" in a slide deck, with no mention of ARTEX from start to finish. Of the ",
      strong: `${forks} derivatives`,
      post: ` catalogued here, ${attributed} credit their upstream in the repository description. The other ${missing} do not.`,
    }),
    p3: {
      pre: "That is not derivative work. Derivative work means building on someone else's foundation and saying whose foundation it is. A tier Ⅰ copy at least keeps the upstream link; most tier Ⅳ rebuilds name upstream in the README. Laundering AGPL-3.0 code into your own product does not change what it is — ",
      strong: "the licence still binds, most authors simply never get around to suing",
      post: ".",
    },
    sign: "Verification is cheap, enforcement is expensive, so it keeps happening. If it cannot be stopped, it can at least be recorded.",
  },

  registrySection: {
    kicker: "Registry / 01",
    title: "The registry",
    desc: "Sorted by stars. Tiers follow each repository's own description and visible shape: rename-and-reskin is Ⅱ, added features Ⅲ, a rebuilt architecture or productized fork Ⅳ, anything operated or sold publicly Ⅴ.",
  },

  registry: {
    filters: {
      all: "All",
      fork: "Derivatives",
      core: "Upstream / distro",
      mirror: "Mirrors",
      defense: "Defense",
      tool: "Tooling",
    },
    search: "Search repo or keyword",
    searchAria: "Search repositories",
    sortAria: "Sort order",
    sort: { stars: "Most starred", updated: "Recently updated", id: "By number" },
    colId: "Cert №",
    colProject: "Project / Repository",
    colKind: "Type",
    colTier: "Tier",
    colDesc: "Repo description",
    colStars: "Stars",
    colUpd: "Updated",
    noDesc: "(no description provided)",
    attrYes: "Description credits upstream",
    attrNo: "Description does not credit upstream",
    legendYes: "Description credits upstream / licence",
    legendNo: "No attribution in description (not proof there is none)",
    legendTier: "· Tier follows the repository's own description · Ⅰ lightest · Ⅴ publicly operated",
    more: (n: number) => `Show more · ${n} left`,
    emptyPre: "No repositories match. If you know one, ",
    emptyLink: "give it a number",
    emptyPost: ".",
  },

  cta: {
    kicker: "Submission / 02",
    title: "Missing one? Give it a number.",
    body: "Any derivative built on ARTEX source can be submitted — including your own. Add one JSON entry, open a pull request. Once merged it gets a number and an embeddable SVG badge.",
    btnGuide: "Read PR.md",
    btnPr: "Open a PR on GitHub",
    steps: [
      "Fork the repo, add `data/submissions/owner--repo.json`",
      "Fill in the URL, the repo's own description, the type and what changed, with a verifiable link",
      "Open a pull request titled `[2K] add: owner/repo`",
      "A maintainer verifies and merges; the number and badge land on the next build",
    ],
  },

  footer: {
    disclaimerTitle: "Disclaimer",
    disclaimer: {
      pre: "Unofficial fan project. A public index of public repositories, built from their own descriptions. Nothing here is legal advice, a security assessment, or an endorsement of any project. Certificate numbers are registry IDs with no professional standing. If you are a project owner and want a correction or removal, ",
      link: "open an issue",
      post: ".",
    },
    upstreamTitle: "About upstream",
    upstream:
      "ARTEX was released by Autumn-27 under AGPL-3.0; the upstream repository was deleted from GitHub in October 2026. This site hosts and distributes no source code — it only indexes public links.",
    indexTitle: "Index",
    guide: "PR.md · submission guide",
    rules: "Rules and tiers",
    mirror: "Upstream mirror BaaRai/ARTEX",
  },

  cert: {
    home: "Home",
    registry: "Registry",
    no: (id: string) => `CERTIFICATE № ${id}`,
    notRated: "Registered",
    emptyQuote: "This repository has no description. Only its URL and basic metadata are recorded.",
    noteLabel: "Note",
    type: "Type",
    tier: "Tier",
    license: "Licence",
    owner: "Owner",
    lang: "Language",
    attribution: "Credits upstream",
    attributionYes: "Yes",
    attributionNo: "No (not proof there is none)",
    stars: "Stars",
    forks: "Forks",
    dates: "Created / updated",
    tags: "Tags",
    basis: "Basis",
    basisValue: "Repository description",
    undeclared: "Not declared",
    notRatedFor: (kind: string) => `— (${kind} is not tiered)`,
    badgeHead: "Embedded Badge",
    badgeAlt: (id: string) => `${id} certificate badge`,
    badgeHint: "Paste the line above into a README to display the certificate. The badge means \"registered\", not \"endorsed\".",
    copyBtn: "Copy",
    copiedBtn: "Copied",
    prev: "Prev",
    next: "Next",
    fineprint:
      "This record is drawn from a public repository's own description and may lag behind or contain errors. If you represent the project and want a correction, an added credit, or removal, open an issue and we will handle it.",
  },

  about: {
    crumb: "Rules",
    kicker: "Charter / v1.0",
    title: "Rules",
    desc: "A public registration convention for ARTEX-derived projects: what counts, how it is tiered, how it is numbered, how it gets corrected.",
    s1: {
      title: "1. What this is",
      p1: "ARTEX won the 2026 Baidu \"agent+\" attack-and-defense challenge: an autonomous penetration-testing system driven by a multi-agent LLM stack, released under AGPL-3.0. In October 2026 the upstream repository `Autumn-27/ARTEX` was deleted from GitHub, leaving the public source frozen around v0.3.15.",
      p2: "The source did not vanish. It kept spreading through forks, dumps, mirrors, translations (Chinese, English, Korean, Japanese), reskins and weaponized builds, growing into hundreds of repositories within weeks. Some are backups. Some became somebody's product. Some are used for \"red-team exercises\" nobody authorized.",
      p3: {
        pre: "This site does three things: ",
        strong: "catalogue",
        post: " (list every public ARTEX-related repository we can find), tier (grade Ⅰ–Ⅴ by how far it drifted), and record (keep each repository's own description and attribution status for later reference). A certificate is a registration, not an honour and not a verdict.",
      },
    },
    s2: {
      title: "2. Five tiers",
      intro: "Only one question decides the tier: how much did you actually change? A higher tier does not mean better engineering — only that less of the original is left.",
      colTier: "Tier",
      colName: "Name",
      colCriteria: "Criteria",
      colNow: "Now",
      notRatedName: "Not tiered",
      notRatedDesc:
        "Upstream, distributions, source backups, defensive research and tooling. Not derivatives — registered only.",
      note: (total: number, forks: number) =>
        `Counts: ${total} repositories, ${forks} of them derivatives. Tiers are assigned by the maintainer from each repository's own description and visible shape; appeals are welcome.`,
    },
    s3: {
      title: "3. Scope",
      labelSep: ": ",
      items: [
        {
          label: "Derivatives",
          text: "Name, description or README indicates modification of ARTEX — renames, reskins, feature additions, rebuilds, productization.",
        },
        {
          label: "Mirrors",
          text: "Unmodified or re-uploaded copies, kept to trace where the source went after the takedown.",
        },
        {
          label: "Defense research",
          text: "Detection rules, hardening baselines, honeypots, mirror audits, exploit analysis, teaching material.",
        },
        {
          label: "Tooling",
          text: "MCP servers, plugins, mobile wrappers, multi-host consoles, skill packs.",
        },
        {
          label: "Upstream & distributions",
          text: "The original repository before deletion, the de facto mainline now, and localized distributions with dense downstream forking.",
        },
      ],
      excl: "Not included: unrelated projects that happen to share the name (a building-materials brand, a gallery, `ARText`, `ArtExt`), empty repositories, star farms. Anything uncertain is listed with a \u201Cpending review\u201D mark.",
    },
    s4: {
      title: "4. Numbering",
      p1: {
        pre: "Numbers look like `ARTEX-2K-0042`. `2K` is a pun on 二开 (èrkāi, \"secondary development\"); `0042` is the registration index. Indices were assigned once, in descending star order at intake, and never change afterwards. A number stays with its repository; if a repository is removed, the number is retired, not reused.",
      },
      p2: (date: string) =>
        `Stars, forks and timestamps come from the GitHub API, last synced ${date}. The snapshot lives in \`data/repos.json\` and can be refreshed with \`npm run sync\` (needs \`GITHUB_TOKEN\`).`,
    },
    s5: {
      title: "5. Submitting and correcting",
      p1: {
        pre: "Found a missing project, or you are the owner and want to add context, correct a tier, or request removal? One entry point: ",
        link: "PR.md",
        post: ".",
      },
      steps: [
        "Fork `Gh0xE9/open_artex`.",
        "Add `data/submissions/owner--repo.json`; fields are defined in the PR.md schema.",
        "Title the pull request `[2K] add: owner/repo`, or `[2K] fix: ARTEX-2K-0042` for corrections.",
        "A maintainer checks that the repository exists and relates to ARTEX, then merges; the number and badge appear on the next build.",
      ],
      p2: "Review checks exactly three things: the link resolves, the repository relates to ARTEX, and the quoted description is accurate. We do not rate quality, legality or safety, and we do not take \"write something nice about us\" requests.",
    },
    s6: {
      title: "6. Limits",
      items: [
        "Only public links and public descriptions are indexed. No ARTEX source code, or derivative of it, is hosted, mirrored, compiled or distributed here.",
        "A certificate number is a registration ID. It carries no certification, audit or security-endorsement value.",
        "Tiers rely on repository self-description and may lag, oversimplify or be wrong. Open an issue and we will correct it after checking.",
        "Any unauthorized testing carried out with ARTEX or its derivatives is unrelated to this registry. Legal consequences belong to whoever did it.",
      ],
    },
    s7: {
      title: "7. Not official",
      items: [
        "This registry is an independent fan project. It is not affiliated with, endorsed by, or operated by ARTEX, its original author, any downstream maintainer, or any repository listed here.",
        "The framing is deliberately satirical. Tier Ⅴ is not an award, and a certificate is not a mark of quality — it is a receipt saying we noticed.",
        "Nothing here is legal advice, a security assessment, or an invitation to test anything. For entertainment and archival purposes only.",
        "If you are a project owner and want a correction or removal, open an issue. Those requests are handled faster than anything else on this site.",
      ],
    },
    upstream: "Upstream:",
    upstreamMirror: "BaaRai/ARTEX (English distribution, AGPL-3.0)",
    upstreamMaintained: "RuoJi6/ARTEX (maintained branch)",
  },

  notFound: {
    kicker: "Not Found / 404",
    title: "No such number",
    body: "This certificate number does not exist, or its repository has been removed. Numbers are never reused, so it will not point at a different project.",
    back: "Back to the registry",
    submit: "Submit a project",
  },
};

export type Copy = typeof en;

const zh: Copy = {
  htmlLang: "zh-CN",
  langSwitch: { en: "EN", zh: "中文", label: "语言" },

  nav: {
    registry: "登记册",
    rules: "认证规则",
    submit: "提交项目",
    github: "GitHub",
    est: "EST. 2026 · AGPL-3.0",
  },

  brand: {
    mark: "证",
    title: "ARTEX 二开认证中心",
    short: "ARTEX 二开认证",
    sub: "Derivative Registry",
  },

  notice: {
    tag: "非官方",
    text: "本站是独立的戏谑性副项目，与 ARTEX、其原作者及名录中的任何仓库均无隶属关系。仅供娱乐与存档。",
    more: "说明",
  },

  kinds: {
    upstream: "上游主干",
    distribution: "主要发行",
    fork: "二开",
    mirror: "备份镜像",
    defense: "防御研究",
    tool: "周边工具",
    index: "收录站",
  },

  tiers: [
    { label: "搬运", desc: "原样转存或仅做极少量改动，几乎保留上游原貌。" },
    { label: "换皮", desc: "改名、换界面、换主题、换语言，功能主体不变。" },
    { label: "增筑", desc: "在原有框架上增加功能模块、技能包或流程编排。" },
    { label: "重构", desc: "改造架构或技术栈，或与其它框架融合成新产品。" },
    { label: "产业", desc: "对外运营、建群收费、提供托管服务或商业发行。" },
  ],

  hero: {
    eyebrow: "ARTEX 二开认证中心 · 公开登记 · 第 01 版",
    titleA: "ARTEX",
    titleEm: "二开",
    titleB: "认证中心",
    sub: (last: string) => `二开认证 · 2K-0001 — ${last}`,
    lead1: (n: number): Seg => ({
      pre: "2026 年 10 月，上游 ",
      strong: "Autumn-27/ARTEX",
      post: ` 从 GitHub 删除。源码没有随之消失——它以 v0.3.15 的形式散落在 ${n} 个仓库里，改名、换皮、加装武器库，再以“AI 自主渗透平台”的名义重新上线。`,
    }),
    lead2: {
      pre: "这里把能查到的全部登记在册，按改动深度授予 Ⅰ—Ⅴ 级。",
      strong: "认证不代表认可",
      post: "，只代表我们看见你。",
    },
    note: "收录口径：仓库名、简介或话题涉及 ARTEX 的公开 GitHub 仓库，含二开、镜像备份、防御检测与周边工具。全部字段取自仓库自述，本站不做二次核验，也不托管任何源码。",
  },

  sealPanel: {
    topLeft: "登记处",
    topRight: "2K",
    catalogued: "收录",
    repos: "个仓库",
    derivatives: "二开",
    stars: "覆盖 Stars",
    sync: "最近同步",
  },

  stats: {
    registered: "Registered",
    registeredUnit: "个仓库",
    derivative: "Derivative",
    derivativeUnit: "个二开",
    attribution: "Attribution",
    attributionUnit: "简介标注来源",
    lastSync: "Last Sync",
  },

  statement: {
    kicker: "Statement / 00",
    title: "为什么会有这个站",
    lead: "见过太多这样的场面：把 ARTEX 的源码拉下来，让 AI 逐文件改一遍——改包名、换配色、重写注释、抹掉原作者的名字——然后对外说，这是自己从零做的产品。",
    p2: (forks: number, attributed: number, missing: number): Seg => ({
      pre: "这不是个案。同一份源码，只换了一层皮，就在汇报里成了「我们的自研平台」，从头到尾一个字没提 ARTEX。名录里 ",
      strong: `${forks} 个二开项目`,
      post: `，其中 ${attributed} 个写了来源，${missing} 个没写。`,
    }),
    p3: {
      pre: "这不叫二开。二开是在别人的地基上继续盖，并且说清楚地基是谁打的。Ⅰ 级搬运好歹留着上游链接，Ⅳ 级重构大多也在 README 里注明了上游。而把一份 AGPL-3.0 的代码洗成自己的东西，抹掉署名不会改变它仍是衍生作品——",
      strong: "许可协议该约束的照样约束，只是原作者大多没精力去打官司",
      post: "。",
    },
    sign: "核实成本太低，维权成本太高，所以这种事一直在发生。既然挡不住，那就先登记下来。",
  },

  registrySection: {
    kicker: "Registry / 01",
    title: "认证名录",
    desc: "按星级排序。等级依据仓库自述与形态判定：只改名换皮的记为 Ⅱ 级，加装功能的记为 Ⅲ 级，改造架构或做成产品的记为 Ⅳ 级，已经对外运营收费的记为 Ⅴ 级。",
  },

  registry: {
    filters: {
      all: "全部",
      fork: "二开",
      core: "上游 / 发行",
      mirror: "备份镜像",
      defense: "防御研究",
      tool: "周边工具",
    },
    search: "搜索仓库 / 关键词",
    searchAria: "搜索仓库",
    sortAria: "排序方式",
    sort: { stars: "按星级", updated: "按更新", id: "按编号" },
    colId: "认证编号",
    colProject: "项目 / 仓库",
    colKind: "类型",
    colTier: "认证等级",
    colDesc: "仓库自述",
    colStars: "Stars",
    colUpd: "更新",
    noDesc: "（仓库未填写简介）",
    attrYes: "简介已标注来源",
    attrNo: "简介未标注来源",
    legendYes: "简介已标注上游 / 许可证",
    legendNo: "简介未标注来源（不代表仓库未署名）",
    legendTier: "· 等级仅按仓库自述判定，Ⅰ 级最轻，Ⅴ 级已对外运营",
    more: (n: number) => `展开更多 · 剩余 ${n}`,
    emptyPre: "没有匹配的仓库。如果你知道一个，",
    emptyLink: "提交给它一个编号",
    emptyPost: "。",
  },

  cta: {
    kicker: "Submission / 02",
    title: "漏了一个？给它一个编号。",
    body: "任何基于 ARTEX 源码的二次开发项目都可以提交——包括你自己的。只需在仓库里新增一个 JSON 条目，提一个 PR。合并后自动分配认证编号，并生成一枚可嵌入的 SVG 徽章。",
    btnGuide: "阅读 PR.md",
    btnPr: "去 GitHub 提 PR",
    steps: [
      "Fork 仓库，在 `data/submissions/` 下新建以 `owner--repo.json` 命名的文件",
      "按模板填写仓库地址、自述、类型与改动说明，附上可核验的链接",
      "提 PR，标题格式 `[2K] 新增：owner/repo`",
      "维护者核对后合并，编号与徽章随下一次构建生效",
    ],
  },

  footer: {
    disclaimerTitle: "免责声明",
    disclaimer: {
      pre: "本站为社区公开信息登记，只收录公开仓库及其自述文本，不构成法律意见、安全评估或对任何项目的背书。认证编号是登记序号，不具备任何资质效力。若你是项目方并要求更正或下架，请",
      link: "提交 Issue",
      post: "。",
    },
    upstreamTitle: "关于上游",
    upstream:
      "ARTEX 由 Autumn-27 以 AGPL-3.0 发布，上游仓库已于 2026 年 10 月从 GitHub 删除。本站不托管、不分发任何源码，仅索引公开链接。",
    indexTitle: "目录",
    guide: "PR.md · 提交规范",
    rules: "认证规则与分级",
    mirror: "上游镜像 BaaRai/ARTEX",
  },

  cert: {
    home: "首页",
    registry: "登记册",
    no: (id: string) => `CERTIFICATE № ${id}`,
    notRated: "登记",
    emptyQuote: "该仓库未填写简介，仅登记仓库地址与基础元数据。",
    noteLabel: "备案备注",
    type: "类型",
    tier: "认证等级",
    license: "许可证",
    owner: "所有者",
    lang: "主要语言",
    attribution: "简介标注来源",
    attributionYes: "是",
    attributionNo: "否（不代表仓库未署名）",
    stars: "Stars",
    forks: "Forks",
    dates: "创建 / 更新",
    tags: "标签",
    basis: "登记依据",
    basisValue: "仓库公开自述",
    undeclared: "未声明",
    notRatedFor: (kind: string) => `—（${kind}不评级）`,
    badgeHead: "认证徽章",
    badgeAlt: (id: string) => `${id} 认证徽章`,
    badgeHint: "把上面这行贴进 README，即可在仓库首页展示你的认证。徽章只表示“已登记”，不表示本站认可该项目。",
    copyBtn: "复制",
    copiedBtn: "已复制",
    prev: "Prev",
    next: "Next",
    fineprint:
      "本条记录来自公开仓库自述，可能滞后或存在误差。若你代表该项目并要求更正、补充署名或下架，请在本仓库提交 Issue，我们会核对后处理。",
  },

  about: {
    crumb: "认证规则",
    kicker: "Charter / v1.0",
    title: "认证规则",
    desc: "一份关于“ARTEX 衍生项目”的公开登记约定：怎么算、怎么分级、怎么编号、怎么更正。",
    s1: {
      title: "一、这是什么",
      p1: "ARTEX 是 2026 年百度“agent+”攻防挑战赛的冠军项目，一套由 LLM 多智能体驱动的自主渗透测试系统，以 AGPL-3.0 开源。2026 年 10 月，上游仓库 `Autumn-27/ARTEX` 从 GitHub 删除，公开源码停在 v0.3.15 前后。",
      p2: "源码没有消失。它以 fork、转存、镜像、汉化、英化、韩化、换肤、加装武器库的方式继续扩散，在几周内长出上百个仓库。其中一部分只是备份，一部分被改成了自己的产品，还有一部分被拿去做了没有授权前提的“攻防演练”。",
      p3: {
        pre: "本站做三件事：",
        strong: "收录",
        post: "（把公开能找到的 ARTEX 相关仓库列全）、分级（按改动深度给出 Ⅰ—Ⅴ 级）、留痕（记录仓库自述与署名状态，供后续追溯）。认证是一个登记行为，不是荣誉，也不是判决。",
      },
    },
    s2: {
      title: "二、五级认证",
      intro: "等级只看一件事：相对上游，你到底改了多少。等级高不代表技术强，只代表离原版更远。",
      colTier: "等级",
      colName: "名称",
      colCriteria: "判定标准",
      colNow: "当前",
      notRatedName: "不评级",
      notRatedDesc: "上游主干、主要发行版、源码备份、防御检测与周边工具。它们不是“二开”，只做登记。",
      note: (total: number, forks: number) =>
        `统计口径：${total} 个仓库，其中二开 ${forks} 个。等级由维护者依据仓库自述与可见形态判定，允许申诉。`,
    },
    s3: {
      title: "三、收录范围",
      labelSep: "：",
      items: [
        { label: "二开", text: "仓库名、简介或 README 表明基于 ARTEX 修改，包括改名换皮、加功能、重构、产品化。" },
        { label: "备份镜像", text: "未改动或仅转存的源码副本，用于确认上游删除后的源码流向。" },
        { label: "防御研究", text: "检测规则、加固基线、蜜罐、镜像审计、漏洞分析、教学案例。" },
        { label: "周边工具", text: "MCP、插件、移动端封装、多机控制台、技能包。" },
        { label: "上游主干与主要发行", text: "删除前的官方仓库、当前事实主干、以及下游分叉密集的本地化发行版。" },
      ],
      excl: "不收录：与 ARTEX 同名的无关项目（建材品牌、画廊、`ARText`、`ArtExt` 等）、空仓库、纯 star 农场。判定存疑的会先放进列表并标注“待复核”。",
    },
    s4: {
      title: "四、编号规则",
      p1: {
        pre: "编号形如 `ARTEX-2K-0042`。`2K` 取“二开”的谐音，`0042` 是登记序号。序号按收录时的 Stars 降序一次性分配，之后不因排名变化而改号——编号一旦发出，就跟着这个仓库；仓库下架则编号作废，不复用。",
      },
      p2: (date: string) =>
        `Stars、Forks、更新时间等字段来自 GitHub API，同步于 ${date}。数据快照存放在 \`data/repos.json\`，可通过 \`npm run sync\` 重新抓取（需 \`GITHUB_TOKEN\`）。`,
    },
    s5: {
      title: "五、提交与更正",
      p1: {
        pre: "发现漏网项目，或者你就是项目方想补充说明、更正等级、要求下架，都走同一个入口：",
        link: "PR.md",
        post: "。",
      },
      steps: [
        "Fork `Gh0xE9/open_artex`。",
        "在 `data/submissions/` 新建 `owner--repo.json`，字段见 PR.md 的 schema。",
        "PR 标题：`[2K] 新增：owner/repo`；更正类用 `[2K] 更正：ARTEX-2K-0042`。",
        "维护者核对仓库确实存在、确实与 ARTEX 相关后合并；编号与徽章在下次构建生效。",
      ],
      p2: "审核只做三件事：链接可访问、与 ARTEX 有关、自述引用无误。本站不对项目质量、合法性、安全性做任何评价，也不接受“帮我夸一夸”的提交。",
    },
    s6: {
      title: "六、免责与边界",
      items: [
        "本站只索引公开仓库链接与公开自述，不托管、不分发、不编译任何 ARTEX 源码或其衍生品。",
        "认证编号是登记序号，不具备资质、认证、审计或安全背书效力。",
        "等级判定基于仓库自述，可能滞后、片面或出错；发现问题请提 Issue，我们核对后更正。",
        "任何使用 ARTEX 或其衍生版本进行未授权测试的行为，与本登记册无关。相关法律后果由行为人自行承担。",
      ],
    },
    s7: {
      title: "七、非官方声明",
      items: [
        "本站是独立的个人副项目，与 ARTEX、其原作者、任何下游维护者及本站收录的任何仓库均无隶属、授权或运营关系。",
        "本站的措辞刻意带有戏谑成分。Ⅴ 级不是奖项，认证也不是质量证明——它只说明“我们注意到了你”。",
        "本站内容不构成法律意见、安全评估，也不构成任何测试授权。仅供娱乐与存档。",
        "若你是项目方并要求更正或下架，请提 Issue；这类请求在站内优先级最高。",
      ],
    },
    upstream: "上游项目：",
    upstreamMirror: "BaaRai/ARTEX（英文发行，AGPL-3.0）",
    upstreamMaintained: "RuoJi6/ARTEX（持续维护分支）",
  },

  notFound: {
    kicker: "Not Found / 未登记",
    title: "没有这个编号",
    body: "这个认证编号不存在，或者对应的仓库已被下架。编号一旦发出就不会复用，所以它不会指向别的项目。",
    back: "回到登记册",
    submit: "提交一个项目",
  },
};

export const copy: Record<Lang, Copy> = { en, zh };

/** 备注的英文版。键为 data/registry.json 里的中文原文，未命中则回落原文。 */
export const noteEn: Record<string, string> = {
  "上游删除后的事实主干，AGPL-3.0。": "De facto mainline after the upstream takedown. AGPL-3.0.",
  "下游分叉最密集的国际化发行版。": "The localized distribution with the densest downstream forking.",
  "Autumn-27 开源版的持续维护分支。": "Continuously maintained branch of the Autumn-27 release.",
  "上游删除后最早的高星备份之一。": "One of the earliest high-star backups made after the takedown.",
  "改名 ScopeWeaver，保留 AGPL 署名。": "Renamed ScopeWeaver; keeps the AGPL attribution.",
  "改名 FailSafe 的本地构建发行。": "Local build distribution renamed FailSafe.",
  "改名 AntiFox，自述“二次开发自 ARTEX”。": "Renamed AntiFox; description says it is derived from ARTEX.",
  "整站改造为代码审计平台，并加了多账号体系。": "Rebuilt into a code-audit platform, with multi-tenant accounts added.",
  "加装一键 getshell、内网横向与 IoT 协议适配。":
    "One-click getshell, lateral movement and IoT protocol adapters bolted on.",
  "改名“谛听”，换栈重写前端。": "Renamed DITING; frontend rewritten on a different stack.",
  "改造成 CTF Agent。": "Turned into a CTF agent.",
  "拆出镜像后门与授权校验后门。": "Mirror backdoor and licence-check backdoor pulled out for analysis.",
  "改名 ARTIFEX，英文 / 繁体双版本。": "Renamed ARTIFEX; English and Traditional Chinese builds.",
  "改名 focus-agent，重做 planner/worker 与前端。":
    "Renamed focus-agent; planner/worker and frontend rebuilt.",
  "闭源前原版源码，未二次开发。": "Original source from before the project closed; not modified.",
  "改名“月落 YUELuo”，带打点绕防与域攻击流程。":
    "Renamed YUELuo; adds foothold setup with defence evasion and AD attack chains.",
  "带交流群与付费站点，认证等级 Ⅴ。": "Ships a chat group and a paid site; tier Ⅴ.",
  "七组侧边栏 + WebShell 管理 + 武器库。": "Seven sidebar groups, WebShell manager and an arsenal.",
  "改名 NiuDao，接 Yaklang。": "Renamed NiuDao; wired into Yaklang.",
  "被用于对韩攻击的工具镜像。": "Mirror of a tool used in attacks against South Korean targets.",
  "整套换成《明日方舟：终末地》皮肤。": "Whole UI reskinned as Arknights: Endfield.",
  "公开 ARTEX 预认证 RCE。": "Publishes a pre-auth RCE for ARTEX.",
  "唯一一版主动删掉攻击能力的二开。": "The only fork that deliberately removed the offensive capability.",
  "本站仓库。": "This site's repository.",
  "自述“黑板架构的自动化渗透 Agent”。": "Description: a blackboard-architecture automated pentest agent.",
  "自述“刻意与上游分叉，不复跟上游”。":
    "Description: deliberately forked away from upstream and will not re-merge.",
  "改名 Vestrail，强调“长链路后渗透”。": "Renamed Vestrail; markets \"long-chain post-exploitation\".",
};

/** 标签的英文版。未命中则回落原文（IoT、CTF、MCP 等无需翻译）。 */
export const tagEn: Record<string, string> = {
  改名: "Renamed",
  原样: "As-is",
  备份: "Backup",
  镜像: "Mirror",
  源码备份: "Source backup",
  英文: "English",
  品牌化: "Rebranded",
  增强: "Enhanced",
  功能扩展: "New features",
  韩文: "Korean",
  英文UI: "English UI",
  逆向: "Reverse engineering",
  懒猫微服: "Lazycat NAS",
  归档: "Archived",
  狩猎: "Hunting",
  英文版: "English edition",
  当前主干: "Current mainline",
  国际化: "Localized",
  下游分叉密集: "Heavily forked",
  中文: "Chinese",
  持续维护: "Maintained",
  英韩本地化: "EN/KR localization",
  本地构建: "Local build",
  代码审计: "Code audit",
  本地面板: "Local panel",
  后渗透: "Post-exploitation",
  武器化: "Weaponized",
  附恢复指引: "Recovery notes",
  流程编排: "Orchestration",
  内网: "Internal network",
  框架融合: "Framework merge",
  外网打点: "External foothold",
  内网纵深: "Internal pivot",
  取证: "Forensics",
  镜像投毒分析: "Mirror poisoning",
  繁体: "Traditional Chinese",
  自用衍生: "Personal fork",
  蜜罐: "Honeypot",
  紫队: "Purple team",
  编排: "Orchestration",
  原版备份: "Original backup",
  冠军项目存档: "Winner archive",
  社群运营: "Community ops",
  商业化: "Commercial",
  "非 fork 镜像": "Non-fork mirror",
  存档: "Archive",
  武器库: "Arsenal",
  蜜罐识别: "Honeypot detection",
  工具集成: "Tool integration",
  海外镜像: "Overseas mirror",
  主题: "Theme",
  游戏皮肤: "Game skin",
  漏洞利用: "Exploit",
  "Fail-Open 认证": "Fail-open auth",
  能力削减: "Capability removed",
  资产监控: "Asset monitoring",
  版本研究: "Version research",
  预编译产物: "Prebuilt artifact",
  技能库: "Skill library",
  离线备份: "Offline backup",
  桌面端: "Desktop",
  本站: "This site",
  架构改造: "Re-architected",
  魔改: "Heavily modded",
  漏洞赏金: "Bug bounty",
  开放副本: "Public copy",
  机密计算: "Confidential computing",
  修复验证: "Fix verification",
  蓝队: "Blue team",
  主动分叉: "Deliberate fork",
  加固: "Hardened",
  中文还原: "Chinese restored",
  构建流水线: "Build pipeline",
  流程优化: "Flow tuning",
  私有副本: "Private copy",
  二开: "Derivative",
  威胁狩猎: "Threat hunting",
  技能包: "Skill pack",
  防御化改造: "Defense fork",
  教学案例: "Teaching case",
  加固构建: "Hardened build",
  镜像审计: "Mirror audit",
  防御侦察: "Defensive recon",
  暴露面日报: "Exposure digest",
  冻结存档: "Frozen archive",
  纯净版: "Clean build",
  案例研究: "Case study",
  "版本号 +V2": "Version +V2",
  沙箱: "Sandbox",
  遏制基线: "Containment baseline",
  移动端: "Mobile",
  日文: "Japanese",
  合并特性: "Merged features",
  攻击复盘: "Attack retrospective",
  测试: "Test",
};

export function noteIn(lang: Lang, note: string | null): string | null {
  if (!note) return null;
  return lang === "en" ? (noteEn[note] ?? note) : note;
}

export function tagIn(lang: Lang, tag: string): string {
  return lang === "en" ? (tagEn[tag] ?? tag) : tag;
}
