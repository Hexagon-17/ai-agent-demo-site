"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  Clock3,
  Database,
  FileSearch2,
  FileSpreadsheet,
  Gauge,
  GitBranch,
  House,
  Layers3,
  Menu,
  MessageSquareText,
  Network,
  Play,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TicketCheck,
  UserCheck,
  Workflow,
  X,
} from "lucide-react";

type DemoKey =
  | "overview"
  | "rag"
  | "support"
  | "excel"
  | "wiki"
  | "mini";

type NavItem = {
  key: DemoKey;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
};

type RagResult = {
  answer: string;
  found: boolean;
  mode: string;
  source?: string;
  chunk?: string;
  score?: string;
  keywords?: string[];
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: "overview", label: "项目总览", shortLabel: "总览", icon: House },
  { key: "rag", label: "企业知识库 RAG", shortLabel: "RAG", icon: FileSearch2 },
  { key: "support", label: "客服与工单 Agent", shortLabel: "工单", icon: TicketCheck },
  { key: "excel", label: "Excel 分析 Agent", shortLabel: "Excel", icon: FileSpreadsheet },
  { key: "wiki", label: "自生长 Wiki", shortLabel: "Wiki", icon: BookOpenCheck },
  { key: "mini", label: "微信小程序客户端", shortLabel: "小程序", icon: Smartphone },
];

const PROJECTS = [
  {
    key: "rag" as DemoKey,
    number: "01",
    title: "企业知识库 RAG Agent",
    description: "混合检索、重排、安全拒答与来源追溯。",
    tags: ["Hybrid Search", "LangGraph", "Chroma"],
    metric: "74 项测试",
    image: "/assets/rag-console.png",
    icon: FileSearch2,
  },
  {
    key: "support" as DemoKey,
    number: "02",
    title: "SupportFlow 客服工单 Agent",
    description: "知识问答、人工确认、幂等建单与状态闭环。",
    tags: ["Tool Calling", "HITL", "SQLite"],
    metric: "48/48 测试",
    image: "/assets/supportflow-chat.png",
    icon: TicketCheck,
  },
  {
    key: "excel" as DemoKey,
    number: "03",
    title: "DataPilot Excel 分析 Agent",
    description: "表格清洗、指标分析、异常识别与报告导出。",
    tags: ["Pandas", "指标口径", "Evidence"],
    metric: "22 项测试",
    image: "/assets/excel-dashboard.png",
    icon: BarChart3,
  },
  {
    key: "wiki" as DemoKey,
    number: "04",
    title: "LLM 自生长 Wiki 知识库",
    description: "来源导入、草稿编译、人工审核与冲突治理。",
    tags: ["Provenance", "Obsidian", "Approval"],
    metric: "10/10 验收",
    image: "/assets/rag-console.png",
    icon: BookOpenCheck,
  },
  {
    key: "mini" as DemoKey,
    number: "05",
    title: "微信原生小程序客户端",
    description: "移动端问答、建单确认、工单查询与反馈。",
    tags: ["WXML", "wx.request", "REST API"],
    metric: "61/61 检查",
    image: "/assets/mini-preview.png",
    icon: Smartphone,
  },
];

const SAMPLE_SALES = [
  { month: "1月", region: "华东", product: "知识库版", sales: 286000, target: 250000 },
  { month: "2月", region: "华南", product: "客服版", sales: 238000, target: 230000 },
  { month: "3月", region: "华北", product: "分析版", sales: 194000, target: 220000 },
  { month: "4月", region: "华东", product: "客服版", sales: 322000, target: 270000 },
  { month: "5月", region: "华南", product: "知识库版", sales: 261000, target: 245000 },
  { month: "6月", region: "华北", product: "知识库版", sales: 217000, target: 225000 },
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(value);
}

function DemoBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "amber" | "blue";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="section-heading">
      <div className="heading-icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="section-description">{description}</p>
      </div>
    </div>
  );
}

function Overview({ onOpen }: { onOpen: (key: DemoKey) => void }) {
  return (
    <div className="view view-overview" data-testid="overview-view">
      <section className="profile-band">
        <div className="profile-copy">
          <div className="availability">
            <span className="status-dot" />
            2026 届 · Agent / LLM 应用方向
          </div>
          <p className="eyebrow">AI AGENT · APPLICATION LAB</p>
          <h1>AI Agent 应用项目工作台</h1>
          <p className="profile-summary">
            五个可运行项目，从知识检索、工具调用到人工确认和移动端交付。
            这里是面向招聘方的脱敏在线演示，所有操作均使用示例数据。
          </p>
          <div className="profile-actions">
            <button className="primary-button" onClick={() => onOpen("rag")}>
              <Play size={17} fill="currentColor" />
              开始体验
            </button>
            <button className="secondary-button" onClick={() => onOpen("support")}>
              <Workflow size={17} />
              查看 Agent 流程
            </button>
          </div>
        </div>
        <div className="profile-proof" aria-label="项目能力概览">
          <Layers3 size={54} strokeWidth={1.4} />
          <div>
            <strong>从需求到可运行演示</strong>
            <span>Agent 流程 · 工具调用 · RAG</span>
            <span>接口联调 · 测试验收 · 基础排错</span>
          </div>
        </div>
      </section>

      <section className="metrics-strip" aria-label="项目验收概览">
        <div>
          <span>项目数量</span>
          <strong>5</strong>
          <small>完整业务场景</small>
        </div>
        <div>
          <span>自动化测试</span>
          <strong>179+</strong>
          <small>跨项目累计</small>
        </div>
        <div>
          <span>工程重点</span>
          <strong>可追溯</strong>
          <small>来源、日志、证据</small>
        </div>
        <div>
          <span>公开模式</span>
          <strong>安全演示</strong>
          <small>无密钥、无隐私数据</small>
        </div>
      </section>

      <section className="project-section">
        <div className="list-heading">
          <div>
            <p className="eyebrow">INTERACTIVE PROJECTS</p>
            <h2>选择一个项目直接试用</h2>
          </div>
          <p>每个演示均保留核心业务流程，并标注演示环境边界。</p>
        </div>
        <div className="project-grid">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <article className="project-card" key={project.key}>
                <div className="project-image">
                  <img src={project.image} alt={`${project.title}项目界面`} />
                  <span className="project-number">{project.number}</span>
                </div>
                <div className="project-card-body">
                  <div className="project-title-row">
                    <div className="project-card-icon">
                      <Icon size={19} />
                    </div>
                    <span>{project.metric}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button
                    className="text-button"
                    onClick={() => onOpen(project.key)}
                    data-testid={`open-${project.key}`}
                  >
                    进入演示
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="boundary-band">
        <ShieldCheck size={24} />
        <div>
          <h2>公开演示边界</h2>
          <p>
            本站不调用付费模型、不保存访客身份信息，也不连接真实企业系统。
            页面展示的是已完成项目的安全演示版本，完整 Python 项目可在面试中现场运行。
          </p>
        </div>
      </section>
    </div>
  );
}

function getRagResult(query: string, mode: string): RagResult {
  const text = query.trim();
  if (!text) {
    return {
      answer: "请先输入一个问题。",
      found: false,
      mode,
    };
  }

  if (/冲突|矛盾|版本|哪一版|规定/.test(text)) {
    return {
      answer:
        "如果文档内容存在冲突，应以最新发布日期的文档为准，并联系负责人确认。",
      found: true,
      mode,
      source: "documents/company_policy.txt",
      chunk: "doc-1-chunk-2",
      score: mode === "hybrid" ? "0.643018" : mode === "vector" ? "0.538463" : "8",
      keywords: ["文档", "冲突", "最新", "负责人"],
    };
  }

  if (/报销|发票|差旅/.test(text)) {
    return {
      answer:
        "差旅报销应在行程结束后 7 个工作日内提交，需附有效发票和审批记录；超期需补充说明。",
      found: true,
      mode,
      source: "documents/expense_policy.txt",
      chunk: "doc-3-chunk-1",
      score: mode === "hybrid" ? "0.701245" : mode === "vector" ? "0.421903" : "10",
      keywords: ["差旅", "报销", "发票", "审批"],
    };
  }

  if (/工单|客服|升级|人工/.test(text)) {
    return {
      answer:
        "当知识库无法解决问题，或问题涉及设备故障、账户风险和业务中断时，应转入人工确认并创建工单。",
      found: true,
      mode,
      source: "documents/support_process.md",
      chunk: "doc-4-chunk-3",
      score: mode === "hybrid" ? "0.672188" : mode === "vector" ? "0.463201" : "9",
      keywords: ["知识库", "人工", "故障", "工单"],
    };
  }

  return {
    answer: "未在当前知识库中找到足够资料，无法确认这个问题。",
    found: false,
    mode,
  };
}

function RagDemo() {
  const [query, setQuery] = useState("文档内容冲突时应以哪个版本为准？");
  const [mode, setMode] = useState("hybrid");
  const [topK, setTopK] = useState(3);
  const [result, setResult] = useState<RagResult>(() =>
    getRagResult("文档内容冲突时应以哪个版本为准？", "hybrid"),
  );

  function submit(event?: FormEvent) {
    event?.preventDefault();
    setResult(getRagResult(query, mode));
  }

  const trace = result.found
    ? ["receive_question", "rewrite_query", `${mode}_search`, "rrf_and_rerank", "generate_answer"]
    : ["receive_question", "rewrite_query", `${mode}_search`, "safe_rejection"];

  return (
    <div className="view" data-testid="rag-view">
      <SectionHeading
        eyebrow="PROJECT 01 · RETRIEVAL AUGMENTED GENERATION"
        title="企业知识库 RAG Agent"
        description="体验问题重写、混合检索、重排、安全拒答和来源追溯。"
        icon={FileSearch2}
      />

      <div className="demo-status">
        <DemoBadge tone="green">公开演示可用</DemoBadge>
        <span>内置脱敏制度文档</span>
        <span>生成模式：local_rules</span>
      </div>

      <section className="workbench workbench-rag">
        <div className="control-pane">
          <div className="pane-heading">
            <div>
              <p className="eyebrow">QUERY</p>
              <h2>向企业知识库提问</h2>
            </div>
            <Database size={20} />
          </div>

          <form onSubmit={submit}>
            <label htmlFor="rag-query">用户问题</label>
            <textarea
              id="rag-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              data-testid="rag-query"
            />

            <div className="sample-prompts">
              {[
                "文档内容冲突时应以哪个版本为准？",
                "差旅报销需要准备什么？",
                "什么时候需要转人工创建工单？",
                "公司食堂今天吃什么？",
              ].map((sample) => (
                <button type="button" key={sample} onClick={() => setQuery(sample)}>
                  {sample}
                </button>
              ))}
            </div>

            <div className="field-group">
              <div>
                <label>检索模式</label>
                <div className="segmented" aria-label="检索模式">
                  {["keyword", "vector", "hybrid"].map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={mode === item ? "active" : ""}
                      onClick={() => setMode(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="top-k">Top K</label>
                <select
                  id="top-k"
                  value={topK}
                  onChange={(event) => setTopK(Number(event.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </div>

            <button className="primary-button full-width" type="submit" data-testid="rag-submit">
              <Search size={17} />
              检索并回答
            </button>
          </form>
        </div>

        <div className="result-pane">
          <div className="pane-heading">
            <div>
              <p className="eyebrow">ANSWER + SOURCES</p>
              <h2>检索结果</h2>
            </div>
            {result.found ? (
              <CheckCircle2 className="success-icon" size={22} />
            ) : (
              <AlertTriangle className="warning-icon" size={22} />
            )}
          </div>

          <div className={`answer-block ${result.found ? "" : "answer-empty"}`}>
            <span>Answer</span>
            <p data-testid="rag-answer">{result.answer}</p>
          </div>

          {result.found ? (
            <div className="source-block" data-testid="rag-source">
              <div className="source-header">
                <span>命中来源</span>
                <DemoBadge tone="blue">{result.mode}</DemoBadge>
              </div>
              <strong>{result.source}</strong>
              <dl>
                <div>
                  <dt>Chunk</dt>
                  <dd>{result.chunk}</dd>
                </div>
                <div>
                  <dt>Score</dt>
                  <dd>{result.score}</dd>
                </div>
                <div>
                  <dt>Top K</dt>
                  <dd>{topK}</dd>
                </div>
              </dl>
              <div className="matched-keywords">
                {result.keywords?.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>
          ) : (
            <div className="safe-rejection">
              <ShieldCheck size={20} />
              <div>
                <strong>安全拒答已触发</strong>
                <span>result_count = 0 · generation_mode = not_called</span>
              </div>
            </div>
          )}

          <div className="trace-block">
            <span>Execution trace</span>
            <ol>
              {trace.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <code>{step}</code>
                  {index < trace.length - 1 && <ChevronRight size={14} />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="explain-strip">
        <GitBranch size={20} />
        <p>
          <strong>完整项目：</strong>
          FastAPI 接收请求，Pydantic 校验参数，Retriever 执行关键词与向量检索，
          RRF 融合并重排，再将原文 Context 交给回答节点。公开演示版使用同一业务规则，
          但不连接付费模型。
        </p>
      </section>
    </div>
  );
}

function SupportDemo() {
  const [input, setInput] = useState("生产设备无法启动，已经影响订单处理");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "您好，我会先检索知识库；如果问题需要线下处理，会在您确认后创建工单。",
    },
  ]);
  const [pendingTicket, setPendingTicket] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [rating, setRating] = useState<"up" | "down" | null>(null);

  function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const value = input.trim();
    if (!value) return;

    const requiresTicket = /故障|无法|中断|报修|影响/.test(value);
    const assistant = requiresTicket
      ? "知识库没有可直接恢复设备的操作步骤。该问题可能影响生产，建议转人工并创建 P1 工单。创建前需要您的明确确认。"
      : "根据知识库，普通账号问题可先执行重置并重新登录；若仍未恢复，再转人工处理。";

    setMessages((current) => [
      ...current,
      { role: "user", content: value },
      { role: "assistant", content: assistant },
    ]);
    setPendingTicket(requiresTicket);
    setTicketCreated(false);
    setInput("");
  }

  function createTicket() {
    setPendingTicket(false);
    setTicketCreated(true);
    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        content:
          "工单 SF-20260723-001 已创建，优先级 P1，状态 open。重复确认不会创建第二张工单。",
      },
    ]);
  }

  return (
    <div className="view" data-testid="support-view">
      <SectionHeading
        eyebrow="PROJECT 02 · CUSTOMER SUPPORT WORKFLOW"
        title="SupportFlow 智能客服与工单 Agent"
        description="从知识问答到人工确认建单，完整体验安全写操作和工单闭环。"
        icon={TicketCheck}
      />

      <div className="demo-status">
        <DemoBadge tone="green">公开演示可用</DemoBadge>
        <span>浏览器本地会话</span>
        <span>幂等键：demo-session-001</span>
      </div>

      <section className="support-layout">
        <div className="chat-workspace">
          <div className="pane-heading">
            <div>
              <p className="eyebrow">CONVERSATION</p>
              <h2>客服对话</h2>
            </div>
            <Bot size={21} />
          </div>

          <div className="messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`message message-${message.role}`} key={`${message.role}-${index}`}>
                <span>{message.role === "assistant" ? "Agent" : "访客"}</span>
                <p>{message.content}</p>
                {message.role === "assistant" && index > 0 && (
                  <small>来源：support_process.md · request_id: demo-{index + 100}</small>
                )}
              </div>
            ))}
          </div>

          {pendingTicket && (
            <div className="confirmation-bar" data-testid="ticket-confirmation">
              <AlertTriangle size={20} />
              <div>
                <strong>即将创建 P1 工单</strong>
                <span>这是写操作，需要用户确认后才能执行。</span>
              </div>
              <button onClick={createTicket} data-testid="ticket-confirm">
                <Check size={16} />
                确认创建
              </button>
            </div>
          )}

          <form className="composer" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="描述您遇到的问题"
              data-testid="support-input"
            />
            <button type="submit" aria-label="发送消息" title="发送消息" data-testid="support-send">
              <Send size={18} />
            </button>
          </form>
        </div>

        <aside className="ticket-rail">
          <div className="pane-heading compact">
            <div>
              <p className="eyebrow">TICKET STATE</p>
              <h2>工单状态</h2>
            </div>
            <ClipboardCheck size={20} />
          </div>

          {ticketCreated ? (
            <div className="ticket-detail" data-testid="created-ticket">
              <div className="ticket-title">
                <strong>SF-20260723-001</strong>
                <DemoBadge tone="amber">P1 · open</DemoBadge>
              </div>
              <dl>
                <div>
                  <dt>主题</dt>
                  <dd>生产设备无法启动</dd>
                </div>
                <div>
                  <dt>来源</dt>
                  <dd>Agent 对话</dd>
                </div>
                <div>
                  <dt>负责人</dt>
                  <dd>待分配</dd>
                </div>
                <div>
                  <dt>去重键</dt>
                  <dd>demo-session-001</dd>
                </div>
              </dl>
              <div className="state-flow">
                <span className="done">open</span>
                <ChevronRight size={14} />
                <span>processing</span>
                <ChevronRight size={14} />
                <span>resolved</span>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <TicketCheck size={28} />
              <strong>尚未创建工单</strong>
              <span>发送故障问题并确认后，这里会显示工单。</span>
            </div>
          )}

          <div className="tool-log">
            <span>Tool allowlist</span>
            <code>search_knowledge_base</code>
            <code>create_ticket</code>
            <code>get_ticket</code>
          </div>

          <div className="feedback-block">
            <span>这次回答有帮助吗？</span>
            <div>
              <button
                className={rating === "up" ? "selected" : ""}
                onClick={() => setRating("up")}
                aria-label="回答有帮助"
                title="有帮助"
              >
                <ThumbsUp size={16} />
              </button>
              <button
                className={rating === "down" ? "selected" : ""}
                onClick={() => setRating("down")}
                aria-label="回答无帮助"
                title="无帮助"
              >
                <ThumbsDown size={16} />
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function ExcelDemo() {
  const totalSales = useMemo(
    () => SAMPLE_SALES.reduce((sum, row) => sum + row.sales, 0),
    [],
  );
  const totalTarget = useMemo(
    () => SAMPLE_SALES.reduce((sum, row) => sum + row.target, 0),
    [],
  );
  const maxSales = Math.max(...SAMPLE_SALES.map((row) => row.sales));
  const [question, setQuestion] = useState("哪个区域的销售额最高？");
  const [answer, setAnswer] = useState(
    "华东区域销售额最高，共 608,000 元，占总销售额的 40.0%。",
  );

  function analyze(event?: FormEvent) {
    event?.preventDefault();
    const text = question.trim();
    if (/区域|地区/.test(text)) {
      setAnswer("华东区域销售额最高，共 608,000 元，占总销售额的 40.0%。");
    } else if (/月份|月度|最高/.test(text)) {
      setAnswer("4 月销售额最高，为 322,000 元，比当月目标高 19.3%。");
    } else if (/目标|达成率/.test(text)) {
      setAnswer(
        `整体目标达成率为 ${((totalSales / totalTarget) * 100).toFixed(1)}%，华北区域需要重点关注。`,
      );
    } else if (/异常|风险/.test(text)) {
      setAnswer(
        "当前样本未发现 IQR 统计异常；但华北 3 月和 6 月均低于目标，应作为业务风险进一步核查。",
      );
    } else {
      setAnswer("当前分析工具未识别该指标，请从销售额、区域、月份、目标或异常角度提问。");
    }
  }

  return (
    <div className="view" data-testid="excel-view">
      <SectionHeading
        eyebrow="PROJECT 03 · DATA ANALYSIS AGENT"
        title="DataPilot Excel 数据分析 Agent"
        description="基于脱敏销售样本，体验指标计算、自然语言分析和证据回传。"
        icon={FileSpreadsheet}
      />

      <div className="demo-status">
        <DemoBadge tone="green">示例数据已加载</DemoBadge>
        <span>6 行 · 5 个字段</span>
        <span>原文件不覆盖</span>
      </div>

      <section className="excel-kpis">
        <div>
          <span>总销售额</span>
          <strong>{formatMoney(totalSales)}</strong>
          <small>6 个月累计</small>
        </div>
        <div>
          <span>目标达成率</span>
          <strong>{((totalSales / totalTarget) * 100).toFixed(1)}%</strong>
          <small>销售额 / 目标额</small>
        </div>
        <div>
          <span>最佳区域</span>
          <strong>华东</strong>
          <small>占比 40.0%</small>
        </div>
        <div>
          <span>质量检查</span>
          <strong>通过</strong>
          <small>缺失值 0 · 重复 0</small>
        </div>
      </section>

      <section className="excel-layout">
        <div className="analysis-panel">
          <div className="pane-heading">
            <div>
              <p className="eyebrow">MONTHLY PERFORMANCE</p>
              <h2>月度销售与目标</h2>
            </div>
            <BarChart3 size={20} />
          </div>
          <div className="bar-chart" aria-label="月度销售额柱状图">
            {SAMPLE_SALES.map((row) => (
              <div className="bar-column" key={row.month}>
                <div className="bar-value">{Math.round(row.sales / 1000)}k</div>
                <div className="bar-track">
                  <div
                    className={`bar-fill ${row.sales < row.target ? "below" : ""}`}
                    style={{ height: `${Math.max(24, (row.sales / maxSales) * 100)}%` }}
                  />
                  <span
                    className="target-mark"
                    style={{ bottom: `${Math.min(96, (row.target / maxSales) * 100)}%` }}
                  />
                </div>
                <span>{row.month}</span>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span><i className="legend-sales" />销售额</span>
            <span><i className="legend-below" />低于目标</span>
            <span><i className="legend-target" />目标线</span>
          </div>
        </div>

        <div className="agent-analysis">
          <div className="pane-heading">
            <div>
              <p className="eyebrow">ASK THE DATA</p>
              <h2>向数据提问</h2>
            </div>
            <Sparkles size={20} />
          </div>

          <form onSubmit={analyze}>
            <label htmlFor="excel-question">分析问题</label>
            <textarea
              id="excel-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              data-testid="excel-question"
            />
            <div className="sample-prompts">
              {["哪个区域的销售额最高？", "哪个月份表现最好？", "整体目标达成率是多少？", "有哪些异常或风险？"].map(
                (item) => (
                  <button type="button" key={item} onClick={() => setQuestion(item)}>
                    {item}
                  </button>
                ),
              )}
            </div>
            <button className="primary-button full-width" type="submit" data-testid="excel-submit">
              <Gauge size={17} />
              运行分析工具
            </button>
          </form>

          <div className="analysis-answer">
            <span>Agent answer</span>
            <p data-testid="excel-answer">{answer}</p>
            <small>evidence: sample_sales[0:6] · request_id: excel-demo-001</small>
          </div>
        </div>
      </section>

      <section className="data-table-wrap">
        <div className="list-heading compact-heading">
          <div>
            <p className="eyebrow">EVIDENCE TABLE</p>
            <h2>脱敏样本数据</h2>
          </div>
          <button className="icon-text-button" onClick={() => setQuestion("哪个区域的销售额最高？")}>
            <RefreshCw size={15} />
            重置问题
          </button>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>月份</th>
                <th>区域</th>
                <th>产品</th>
                <th>销售额</th>
                <th>目标额</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_SALES.map((row) => (
                <tr key={`${row.month}-${row.region}`}>
                  <td>{row.month}</td>
                  <td>{row.region}</td>
                  <td>{row.product}</td>
                  <td>{formatMoney(row.sales)}</td>
                  <td>{formatMoney(row.target)}</td>
                  <td>
                    <DemoBadge tone={row.sales >= row.target ? "green" : "amber"}>
                      {row.sales >= row.target ? "达成" : "待提升"}
                    </DemoBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function WikiDemo() {
  const [source, setSource] = useState(
    "制度更新：自 2026 年 7 月 1 日起，文档内容发生冲突时，以最新发布日期的版本为准，并联系制度负责人确认。",
  );
  const [stage, setStage] = useState<"source" | "draft" | "approved">("source");

  const hash = useMemo(() => {
    let value = 0;
    for (let index = 0; index < source.length; index += 1) {
      value = (value * 31 + source.charCodeAt(index)) >>> 0;
    }
    return value.toString(16).padStart(8, "0");
  }, [source]);

  function compileDraft() {
    if (source.trim()) setStage("draft");
  }

  function approve() {
    setStage("approved");
  }

  return (
    <div className="view" data-testid="wiki-view">
      <SectionHeading
        eyebrow="PROJECT 04 · KNOWLEDGE GOVERNANCE"
        title="LLM 驱动的自生长 Wiki"
        description="把资料变成可追溯草稿，经人工审核后发布，再同步到 RAG。"
        icon={BookOpenCheck}
      />

      <div className="demo-status">
        <DemoBadge tone="green">离线演示模式</DemoBadge>
        <span>来源与知识分离</span>
        <span>人工审核必需</span>
      </div>

      <section className="wiki-flow" aria-label="知识成长流程">
        {[
          ["01", "导入来源", stage !== "source"],
          ["02", "编译草稿", stage === "draft" || stage === "approved"],
          ["03", "人工审核", stage === "approved"],
          ["04", "发布同步", stage === "approved"],
        ].map(([number, label, done], index) => (
          <div className={`wiki-step ${done ? "done" : ""}`} key={String(label)}>
            <span>{number}</span>
            <strong>{label}</strong>
            {done ? <Check size={15} /> : <Clock3 size={15} />}
            {index < 3 && <ChevronRight className="flow-arrow" size={16} />}
          </div>
        ))}
      </section>

      <section className="wiki-layout">
        <div className="source-editor">
          <div className="pane-heading">
            <div>
              <p className="eyebrow">IMMUTABLE SOURCE</p>
              <h2>来源资料</h2>
            </div>
            <Database size={20} />
          </div>
          <label htmlFor="wiki-source">粘贴一段需要沉淀的资料</label>
          <textarea
            id="wiki-source"
            value={source}
            onChange={(event) => {
              setSource(event.target.value);
              setStage("source");
            }}
            data-testid="wiki-source"
          />
          <dl className="source-meta">
            <div>
              <dt>source_id</dt>
              <dd>src-{hash}</dd>
            </div>
            <div>
              <dt>sha256</dt>
              <dd>{hash}...demo</dd>
            </div>
            <div>
              <dt>status</dt>
              <dd>immutable</dd>
            </div>
          </dl>
          <button className="primary-button full-width" onClick={compileDraft} data-testid="wiki-compile">
            <Sparkles size={17} />
            生成结构化草稿
          </button>
        </div>

        <div className="draft-preview">
          <div className="pane-heading">
            <div>
              <p className="eyebrow">STRUCTURED DRAFT</p>
              <h2>知识草稿</h2>
            </div>
            <BookOpenCheck size={20} />
          </div>

          {stage === "source" ? (
            <div className="empty-state wiki-empty">
              <Layers3 size={28} />
              <strong>等待编译</strong>
              <span>原始来源不会被模型直接改写或覆盖。</span>
            </div>
          ) : (
            <div className="note-preview" data-testid="wiki-draft">
              <div className="note-header">
                <div>
                  <DemoBadge tone={stage === "approved" ? "green" : "amber"}>
                    {stage === "approved" ? "approved" : "pending_review"}
                  </DemoBadge>
                  <h3>文档冲突处理规则</h3>
                </div>
                <span>note-{hash.slice(0, 6)}-01</span>
              </div>
              <p>
                当制度或文档内容发生冲突时，使用最新发布日期的版本作为处理依据，
                同时联系对应负责人完成确认。
              </p>
              <div className="note-fields">
                <div>
                  <span>tags</span>
                  <strong>制度 · 文档治理 · 冲突</strong>
                </div>
                <div>
                  <span>effective_date</span>
                  <strong>2026-07-01</strong>
                </div>
                <div>
                  <span>provenance</span>
                  <strong>src-{hash}</strong>
                </div>
              </div>

              <div className="conflict-check">
                <ShieldCheck size={18} />
                <div>
                  <strong>冲突检查通过</strong>
                  <span>未发现未解决的互斥规则，可进入人工审核。</span>
                </div>
              </div>

              {stage === "draft" ? (
                <button className="approve-button" onClick={approve} data-testid="wiki-approve">
                  <UserCheck size={17} />
                  人工审核并发布
                </button>
              ) : (
                <div className="approved-message">
                  <CheckCircle2 size={19} />
                  已发布到 approved，并具备同步到 RAG 的条件
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="audit-strip">
        <Network size={20} />
        <div>
          <span>Audit trail</span>
          <code>source_imported</code>
          <ChevronRight size={13} />
          <code>{stage === "source" ? "waiting" : "draft_compiled"}</code>
          <ChevronRight size={13} />
          <code>{stage === "approved" ? "approved_and_synced" : "review_required"}</code>
        </div>
      </section>
    </div>
  );
}

function MiniDemo() {
  const [tab, setTab] = useState<"chat" | "knowledge" | "tickets" | "profile">("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "您好，我是 SupportFlow 助手。请描述您遇到的问题。" },
  ]);

  function send(event?: FormEvent) {
    event?.preventDefault();
    const value = input.trim();
    if (!value) return;
    setMessages((current) => [
      ...current,
      { role: "user", content: value },
      {
        role: "assistant",
        content: /故障|无法/.test(value)
          ? "该问题需要人工处理。我已准备工单信息，请在客服 Agent 页面完成确认。"
          : "根据知识库，您可以先尝试重新登录；若问题仍存在，请继续告诉我。",
      },
    ]);
    setInput("");
  }

  const miniTabs = [
    { key: "chat" as const, label: "客服", icon: MessageSquareText },
    { key: "knowledge" as const, label: "知识", icon: BookOpenCheck },
    { key: "tickets" as const, label: "工单", icon: TicketCheck },
    { key: "profile" as const, label: "我的", icon: CircleUserRound },
  ];

  return (
    <div className="view" data-testid="mini-view">
      <SectionHeading
        eyebrow="PROJECT 05 · WECHAT MINI PROGRAM"
        title="SupportFlow 微信原生小程序客户端"
        description="在浏览器中体验小程序的核心交互；正式交付物为 WXML、WXSS 与 JavaScript。"
        icon={Smartphone}
      />

      <div className="demo-status">
        <DemoBadge tone="green">网页仿真可用</DemoBadge>
        <span>移动端响应式</span>
        <span>正式小程序尚未发布</span>
      </div>

      <section className="mini-layout">
        <div className="phone-shell">
          <div className="phone-status">
            <span>09:41</span>
            <strong>SupportFlow</strong>
            <span>5G ▪ 100%</span>
          </div>

          <div className="mini-screen">
            {tab === "chat" && (
              <div className="mini-chat">
                <div className="mini-page-title">
                  <div>
                    <span className="status-dot" />
                    Agent 在线
                  </div>
                  <DemoBadge tone="blue">demo</DemoBadge>
                </div>
                <div className="mini-messages">
                  {messages.map((message, index) => (
                    <div className={`mini-message ${message.role}`} key={`${message.role}-${index}`}>
                      {message.content}
                    </div>
                  ))}
                </div>
                <form className="mini-composer" onSubmit={send}>
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="输入问题"
                    data-testid="mini-input"
                  />
                  <button aria-label="发送" title="发送" data-testid="mini-send">
                    <Send size={17} />
                  </button>
                </form>
              </div>
            )}

            {tab === "knowledge" && (
              <div className="mini-list-page">
                <h3>知识库</h3>
                {[
                  ["文档冲突处理", "以最新发布日期的版本为准"],
                  ["差旅报销流程", "行程结束后 7 个工作日内提交"],
                  ["转人工规则", "故障、风险和业务中断需升级"],
                ].map(([title, content]) => (
                  <button key={title}>
                    <BookOpenCheck size={18} />
                    <span>
                      <strong>{title}</strong>
                      <small>{content}</small>
                    </span>
                    <ChevronRight size={15} />
                  </button>
                ))}
              </div>
            )}

            {tab === "tickets" && (
              <div className="mini-list-page">
                <h3>我的工单</h3>
                <div className="mini-ticket">
                  <div>
                    <strong>SF-20260723-001</strong>
                    <DemoBadge tone="amber">处理中</DemoBadge>
                  </div>
                  <p>生产设备无法启动</p>
                  <span>优先级 P1 · 更新于 10 分钟前</span>
                </div>
                <div className="mini-ticket">
                  <div>
                    <strong>SF-20260718-004</strong>
                    <DemoBadge tone="green">已解决</DemoBadge>
                  </div>
                  <p>账号权限申请</p>
                  <span>优先级 P3 · 更新于 5 天前</span>
                </div>
              </div>
            )}

            {tab === "profile" && (
              <div className="mini-profile">
                <div className="mini-avatar">访</div>
                <h3>演示访客</h3>
                <p>当前数据仅保存在浏览器会话中</p>
                <div>
                  <span>历史对话</span>
                  <strong>{messages.filter((item) => item.role === "user").length}</strong>
                </div>
                <div>
                  <span>我的工单</span>
                  <strong>2</strong>
                </div>
                <div>
                  <span>隐私设置</span>
                  <ShieldCheck size={18} />
                </div>
              </div>
            )}
          </div>

          <nav className="mini-tabbar" aria-label="小程序导航">
            {miniTabs.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  className={tab === item.key ? "active" : ""}
                  onClick={() => setTab(item.key)}
                  data-testid={`mini-tab-${item.key}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mini-explanation">
          <p className="eyebrow">MOBILE DELIVERY</p>
          <h2>同一个客服 Agent，不同的交付界面</h2>
          <p>
            小程序负责移动端交互，业务规则仍由 SupportFlow 后端统一执行。
            客户端通过 <code>wx.request</code> 调用问答、反馈、工单确认和查询接口，
            不在前端保存模型密钥。
          </p>
          <div className="architecture-list">
            <div>
              <span>01</span>
              <div>
                <strong>请求层</strong>
                <small>统一 base URL、超时和错误处理</small>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <strong>交互层</strong>
                <small>问答、来源、反馈与确认建单</small>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <strong>状态层</strong>
                <small>会话历史和工单列表</small>
              </div>
            </div>
          </div>
          <div className="acceptance-box">
            <CheckCircle2 size={20} />
            <div>
              <strong>9/9 单元测试 · 61/61 静态检查 · 11/11 HTTP 验收</strong>
              <span>公开页面为网页仿真，不宣称已经通过微信正式发布。</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CurrentView({
  active,
  onOpen,
}: {
  active: DemoKey;
  onOpen: (key: DemoKey) => void;
}) {
  if (active === "rag") return <RagDemo />;
  if (active === "support") return <SupportDemo />;
  if (active === "excel") return <ExcelDemo />;
  if (active === "wiki") return <WikiDemo />;
  if (active === "mini") return <MiniDemo />;
  return <Overview onOpen={onOpen} />;
}

export default function Home() {
  const [active, setActive] = useState<DemoKey>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const demo = new URLSearchParams(window.location.search).get("demo");
    if (NAV_ITEMS.some((item) => item.key === demo)) {
      setActive(demo as DemoKey);
    }
  }, []);

  function openDemo(key: DemoKey) {
    setActive(key);
    setMobileMenuOpen(false);
    const url = key === "overview" ? window.location.pathname : `?demo=${key}`;
    window.history.replaceState({}, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <div className="brand-block">
          <div className="brand-mark">AL</div>
          <div>
            <strong>Agent Lab</strong>
            <span>应用项目作品集</span>
          </div>
          <button
            className="mobile-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="关闭导航"
            title="关闭导航"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="primary-nav" aria-label="项目导航">
          <span className="nav-label">在线演示</span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={active === item.key ? "active" : ""}
                onClick={() => openDemo(item.key)}
                data-testid={`nav-${item.key}`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
                {active === item.key && <ChevronRight size={15} />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-proof">
          <ShieldCheck size={18} />
          <div>
            <strong>安全演示环境</strong>
            <span>无密钥 · 无隐私数据</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-footer-mark">AL</div>
          <div>
            <strong>Agent Application Lab</strong>
            <span>求职项目公开演示</span>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <button
          className="menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="关闭导航"
        />
      )}

      <section className="main-area">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="打开导航"
            title="打开导航"
          >
            <Menu size={20} />
          </button>
          <div className="topbar-context">
            <span>AI Agent 项目作品集</span>
            <ChevronRight size={14} />
            <strong>{NAV_ITEMS.find((item) => item.key === active)?.label}</strong>
          </div>
          <div className="topbar-status">
            <span className="status-dot" />
            在线演示
          </div>
        </header>

        <div className="content-area">
          <CurrentView active={active} onOpen={openDemo} />
        </div>

        <footer className="site-footer">
          <span>AI Agent / LLM 应用求职作品集</span>
          <span>公开演示使用脱敏数据，完整项目可面试现场展示</span>
        </footer>
      </section>
    </main>
  );
}
