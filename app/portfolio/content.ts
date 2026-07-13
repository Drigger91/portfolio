// Single source of truth for the portfolio — a superset of Piyush's latest
// resume (Razorpay current) and the original design handoff (Bajaj history).

export const RESUME_URL = "/resume.pdf";

export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
};

export type Project = {
  name: string;
  kind: string;
  url: string;
  desc: string;
  stack: string;
};

export type Post = {
  title: string;
  status: "drafting" | "outline" | "idea";
  blurb: string;
};

export type StackGroup = {
  label: string;
  items: string[];
};

export type Link = {
  label: string;
  handle: string;
  url: string;
};

export const HERO = {
  eyebrow: "// senior software development engineer · bangalore, india",
  name: "Piyush Tiwari",
  intro:
    "Backend engineer who makes payments and issuance journeys go brrr. I build region-agnostic systems in Golang, orchestrate AI workflows you can drive from Slack, and occasionally lose to my own chess engine.",
};

export const SUMMARY =
  "I turn messy, high-stakes backend problems into systems that don’t page you at 3am. At Razorpay I build region-agnostic payment infrastructure and AI orchestration tooling; before that, at Bajaj Finserv Health, I scaled the event-driven layer powering health-tech issuance — the kind of work where a 60% speedup or a killed memory leak is a very good day. B.Tech in ECE (RGPV), competitive-programming brain, chess habit.";

export const JOBS: Job[] = [
  {
    role: "Senior Software Development Engineer",
    company: "Razorpay",
    location: "Bangalore",
    period: "Mar 2026 — Present",
    points: [
      "Architected an AI orchestration framework letting engineers invoke reusable skills & plugins straight from Slack (Python, AWS SQS) — automating test generation, PR reviews, and eng ops.",
      "Built an end-to-end testing harness covering the full validation lifecycle: generation, execution orchestration, utility abstraction, and live reporting.",
      "Owned observability & operational excellence via Prometheus, Grafana, and proactive alerting for regional and localization issues.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "Razorpay",
    location: "Bangalore",
    period: "Sep 2024 — Mar 2026",
    points: [
      "Built and scaled region-agnostic payment infrastructure (Golang, PostgreSQL, AWS) supporting global workflows across geographies.",
      "Shipped core payment products — Payment Links and Subscriptions — with reliable multi-region currency, time-zone, and localization support.",
      "Launched a centralized test orchestration platform + live reporting portal spanning 7+ microservices.",
      "Led region-aware utilities (zip, date/time, currency) via i18nify — killing 90% of hardcoded localization logic across 9+ services.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "Bajaj Finserv Health",
    location: "Pune",
    period: "Jul 2023 — Sep 2024",
    points: [
      "Built the event-driven Integration Layer orchestration (Java/Spring Boot) powering sub-7s health-tech issuance journeys for 12+ clients.",
      "Shipped a partner SSO microservice (NestJS, TS, MongoDB, Redis) at 99.99% uptime.",
      "Streamlined partner claim exchange with Kafka + DLQ (MongoDB, Azure Service Bus) — -95% DB queries, -40% cost.",
      "Took policy issuance from ~1.2k to 5000+ policies/hour at 99%+ uptime.",
      "pub-sub + gRPC service for Salesforce platform events: +60% throughput, -90% downtime.",
    ],
  },
  {
    role: "SDE Intern",
    company: "Bajaj Finserv Health",
    location: "Pune",
    period: "Aug 2022 — Jun 2023",
    points: [
      "Migrated to Apache HttpClient: +90% APM visibility, fixed ~50% of module memory leaks.",
      "Drove TDD with JUnit + Mockito — coverage 6% → 83%.",
      "Added KEDA autoscaling to the Kubernetes deployment.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "TheChessWebsite",
    kind: "full-stack",
    url: "https://github.com/Drigger91/TheChessWebsiteReact",
    desc: "A ready-to-use chess platform for players of all skill levels — play online, because of course.",
    stack: "React · NestJS · MongoDB · JWT",
  },
  {
    name: "CyberCrypto",
    kind: "web app",
    url: "https://github.com/Drigger91/CryptoAppwReduxtoolkit",
    desc: "Real-time crypto info exchange with global state and optimized API calls.",
    stack: "React · Redux Toolkit · JS",
  },
  {
    name: "NoteSync",
    kind: "browser extension",
    url: "https://github.com/Drigger91/vite-note-extension",
    desc: "A synced note-taking extension that stores notes per web page.",
    stack: "Vite · Browser API · Manifest v3",
  },
];

export const POSTS: Post[] = [
  {
    title: "Killing 90% of hardcoded localization logic with i18nify",
    status: "drafting",
    blurb:
      "How region-aware utilities for zip, date/time, and currency untangled 9+ services.",
  },
  {
    title: "An AI orchestration framework you drive from Slack",
    status: "outline",
    blurb:
      "Reusable skills, plugins, and a queue — turning chat messages into engineering ops.",
  },
  {
    title: "pub-sub vs gRPC for Salesforce platform events",
    status: "idea",
    blurb: "A system-design walk-through of the trade-offs I hit in production.",
  },
];

export const STACK: StackGroup[] = [
  {
    label: "languages",
    items: ["Golang", "Java", "C++", "TypeScript", "JavaScript"],
  },
  {
    label: "backend",
    items: [
      "Spring Boot",
      "Node.js",
      "NestJS",
      "gRPC",
      "REST",
      "Microservices",
      "Kafka / pub-sub",
    ],
  },
  {
    label: "data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
  },
  {
    label: "cloud & infra",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "KEDA"],
  },
  {
    label: "tooling",
    items: ["Git", "GitHub Actions", "Argo Workflows", "Prometheus", "Grafana"],
  },
];

export const LINKS: Link[] = [
  { label: "LinkedIn", handle: "in/piyusht29", url: "https://www.linkedin.com/in/piyusht29/" },
  { label: "GitHub", handle: "@Drigger91", url: "https://github.com/Drigger91" },
  { label: "LeetCode", handle: "Piyush077", url: "https://leetcode.com/u/Piyush077/" },
  { label: "Instagram", handle: "@piyush_t29", url: "https://www.instagram.com/piyush_t29" },
  { label: "Email", handle: "piyushtiwari2903@gmail.com", url: "mailto:piyushtiwari2903@gmail.com" },
];

// Fed to the LLM as grounding context (see /api/ask).
export const FACTS =
  "FACTS ABOUT PIYUSH: Senior Software Development Engineer at Razorpay, Bangalore, India (since March 2026; joined Razorpay as SDE in September 2024). Previously Software Development Engineer at Bajaj Finserv Health, Pune (July 2023 – September 2024; interned there Aug 2022 – June 2023). Core stack: Golang, Java, C++, TypeScript, JavaScript, Spring Boot, NestJS, Node.js, gRPC, REST, microservices, event-driven architecture, Kafka/pub-sub, PostgreSQL, MongoDB, Redis, Firebase, AWS, Azure, Docker, Kubernetes, KEDA, Prometheus, Grafana. Piyush is a backend engineer focused on backend and distributed systems — he has no professional full-stack experience, so never describe him as a full-stack developer (side projects with a frontend are the only exception, and only if asked about those projects). Highlights at Razorpay: architected an AI orchestration framework letting engineers invoke reusable skills/plugins from Slack (Python, AWS SQS) to automate test generation, PR reviews, and eng ops; built an end-to-end testing harness with live reporting; owned observability with Prometheus/Grafana; built region-agnostic payment infrastructure in Golang/PostgreSQL/AWS; shipped Payment Links and Subscriptions with multi-region support; built a centralized test orchestration platform across 7+ microservices; led i18nify region-aware utilities that killed 90% of hardcoded localization logic across 9+ services. Highlights at Bajaj Finserv Health: built the event-driven Integration Layer orchestration in Java/Spring Boot for sub-7s health-tech issuance for 12+ clients; independently built a partner SSO microservice (NestJS/TS/MongoDB/Redis) at 99.99% uptime; streamlined claim exchange with Kafka + DLQ (MongoDB, Azure Service Bus) cutting DB queries 95% and cost 40%; optimized policy issuance from ~1200 to 5000+ policies/hour at 99%+ uptime; built a pub-sub + gRPC microservice for Salesforce platform events (+60% throughput, -90% downtime); as intern migrated to Apache HttpClient (+90% APM visibility, fixed ~50% of memory leaks), pushed test coverage from 6% to 83% with JUnit/Mockito, added KEDA autoscaling to Kubernetes. Education: B.Tech in Electronics & Communications Engineering, University Institute of Technology, RGPV Bhopal (8.4/10 CGPA). Personal: avid chess player, competitive programmer (LeetCode: Piyush077), currently in Bangalore. Projects: TheChessWebsite (React/NestJS/MongoDB/JWT), CyberCrypto (React/Redux Toolkit), NoteSync (browser extension, Vite). Links: LinkedIn piyusht29, GitHub Drigger91, Instagram piyush_t29, email piyushtiwari2903@gmail.com.";

export const WHACKY = [
  "nope — this box runs a single process, and it's called piyush.exe. ask me about my backend work instead.",
  "error 418: i'm a portfolio, not a search engine. i will, however, happily brag about scaling policy issuance to 5000/hour.",
  "that's above my pay grade (and off my resume). ask me about golang, spring boot, or why redis is basically wizardry.",
  "sudo answer that → permission denied. this terminal is piyush-only. wanna hear about the AI orchestration framework?",
  "my knowledge base is exactly one resume deep. try a question about my time at razorpay or bajaj finserv health.",
  "nice try. i only cough up facts about piyush — career, stack, projects, chess. pick one.",
  "404: topic not found in /piyush. reroute to my tech stack or that 6%→83% test-coverage glow-up.",
  "i'd tell you, but then i'd have to context-switch, and i'm fully booked on piyush trivia. ask away about my projects.",
];
