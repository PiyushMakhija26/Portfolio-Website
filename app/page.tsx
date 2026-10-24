import { ArrowUpRight, Award, Cloud, Code2, Cpu, Download, GraduationCap, Github, Linkedin, Mail, Server, Sparkles, Trophy } from "lucide-react"
import { Avatar, ContactForm, Counter, Magnetic, PageChrome, ParticleField, Reveal, Tilt, Typing } from "./components/Effects"

const CONTACT_EMAIL = "piyushmakhija26@gmail.com"
const LINKS = {
  github: "https://github.com/PiyushMakhija26",
  linkedin: "https://linkedin.com/in/piyush-makhija",
  leetcode: "https://leetcode.com/u/piyushmakhija",
  resume: "/Piyush_Makhija_Resume.pdf",
}

const SECTIONS = ["about", "skills", "projects", "research", "education", "contact"]

const ROLES = ["Backend Engineer", "Distributed Systems Builder", "AI/ML Enthusiast", "Problem Solver"]

const SKILLS = [
  { title: "Languages", icon: Code2, items: ["C++", "C", "Python", "JavaScript", "SQL", "Go"] },
  { title: "Frontend, Backend & DBs", icon: Server, items: ["React", "FastAPI", "Node.js", "PostgreSQL", "Redis"] },
  { title: "AI & Machine Learning", icon: Sparkles, items: ["RAG", "Prompt Engineering"] },
  {
    title: "Infrastructure & Tools",
    icon: Cloud,
    items: ["Git", "Docker", "Prometheus", "Grafana", "GitHub Actions", "WebSockets", "REST APIs"],
  },
  {
    title: "CS Concepts",
    icon: Cpu,
    items: ["Distributed Systems (Raft, WAL)", "Concurrency", "Operational Transformation", "DSA", "OOP", "Operating Systems", "DBMS"],
  },
]

const PROJECTS = [
  {
    name: "Collaborative Document Editor",
    sub: "Real-time editing with Operational Transformation",
    bullets: [
      "Implemented Operational Transformation with property-based testing, ensuring 100% convergence across 1,000 concurrent edits.",
      "Built a Jupiter-style sync protocol achieving 6.4ms avg latency for 100 concurrent editors with a 99.98% success rate.",
      "Scaled horizontally via Redis Pub/Sub sharding with 8.19ms overhead, with zero data loss during offline reconnections.",
    ],
    tags: ["React", "Node.js", "WebSockets", "PostgreSQL", "Redis"],
    hue: 175,
  },
  {
    name: "API Gateway",
    sub: "High-throughput reverse proxy",
    bullets: [
      "Architected a FastAPI reverse proxy gateway sustaining 300+ req/sec at sub-600ms p99 latency, with CI/CD and monitoring.",
      "Developed an atomic Redis rate limiter via Lua (shedding 89% of burst traffic) and a circuit breaker with <150ms failover.",
    ],
    tags: ["FastAPI", "Redis", "Docker", "Prometheus", "GitHub Actions"],
    hue: 265,
  },
  {
    name: "OmniChat",
    sub: "Multi-LLM routing chatbot",
    bullets: [
      "Engineered a multi-LLM routing engine with auto-failovers, cutting API costs by 96.7% and ensuring 100% uptime at 1.05s latency.",
      "Built a hybrid RAG pipeline backed by a dual-layer memory system for context retention, secured via refresh tokens.",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    hue: 330,
  },
  {
    name: "Distributed Key-Value Store",
    sub: "Raft consensus in Go",
    bullets: [
      "Built Raft consensus in Go (leader election, replication) across a 3-node cluster, achieving 288ms failovers and 184 writes/sec.",
      "Enforced quorum consistency to prevent split-brain and implemented a CRC32-checksummed WAL for rapid crash recovery.",
    ],
    tags: ["Go", "Raft Consensus", "WAL"],
    hue: 30,
  },
  {
    name: "Focus Lock",
    sub: "Privacy-first Chrome extension",
    bullets: [
      "Published a privacy-first Chrome extension featuring distraction blocking, YouTube filtering, and IndexedDB local analytics.",
    ],
    tags: ["JavaScript", "Chrome Extension API", "IndexedDB"],
    hue: 210,
  },
]

const CERTS = ["Applied Machine Learning (Michigan)", "Google IT Support", "Google Data Analytics", "Microsoft SC-900"]

const allSkills = SKILLS.flatMap((s) => s.items)
const marquee = [...allSkills, ...allSkills]

export default function ResumePage() {
  return (
    <div id="top" className="page">
      <div className="aurora" aria-hidden>
        <span className="blob blob--a" />
        <span className="blob blob--b" />
        <span className="blob blob--c" />
      </div>
      <div className="grid-bg" aria-hidden />
      <ParticleField />
      <PageChrome sections={SECTIONS} />

      {/* Hero */}
      <header className="hero">
        <div className="hero__text">
          <Reveal>
            <span className="pill">
              <i className="pill__ping" /> Open to opportunities
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="hero__title">
              Hi, I&apos;m <span className="gradient-text">Piyush Makhija</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="hero__role">
              <Typing phrases={ROLES} />
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="hero__lead">
              Computer Science undergraduate building high-concurrency gateways, Raft-based distributed systems, real-time collaborative apps and AI/ML tooling in Go, Python and JavaScript.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="hero__cta">
              <Magnetic>
                <a href={LINKS.resume} download className="btn btn--glow">
                  <Download size={18} /> Download Resume
                </a>
              </Magnetic>
              <a href="#projects" className="btn btn--ghost">
                View work <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="socials">
              <a href={LINKS.github} aria-label="GitHub" target="_blank" rel="noreferrer">
                <Github size={20} />
              </a>
              <a href={LINKS.linkedin} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal from="zoom" delay={250} className="hero__art">
          <div className="avatar">
            <div className="avatar__ring" />
            <div className="avatar__ring avatar__ring--2" />
            <Avatar src="/itachi.jpg" alt="Piyush Makhija" initials="PM" />
            <span className="chip chip--1">React</span>
            <span className="chip chip--2">Python</span>
            <span className="chip chip--3">AWS</span>
            <span className="chip chip--4">AI</span>
          </div>
        </Reveal>

        <a href="#about" className="scroll-cue" aria-label="Scroll down">
          <span />
        </a>
      </header>

      {/* Marquee */}
      <div className="marquee" aria-hidden>
        <div className="marquee__track">
          {marquee.map((s, i) => (
            <span key={i}>
              {s} <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="section">
        <div className="wrap about">
          <Reveal from="left">
            <p className="eyebrow">About</p>
            <h2 className="h2">
              Turning ideas into <span className="gradient-text">reality</span>
            </h2>
            <p className="muted">
              I&apos;m a Computer Science undergraduate (AI &amp; Machine Learning) specializing in backend engineering, distributed systems and AI/ML. I like building things that hold up under load — consensus algorithms, rate limiters, real-time sync — and measuring that they do.
            </p>
            <p className="muted">
              Beyond projects, I solve DSA problems on LeetCode and co-authored two published research papers.
            </p>
            <div className="tags">
              {["Backend Engineering", "Distributed Systems", "AI / ML", "Problem Solving"].map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal from="right" delay={150}>
            <div className="stats">
              <Tilt className="stat">
                <b>
                  <Counter to={allSkills.length} suffix="+" />
                </b>
                <span>Technologies</span>
              </Tilt>
              <Tilt className="stat">
                <b>
                  <Counter to={PROJECTS.length} />
                </b>
                <span>Featured projects</span>
              </Tilt>
              <Tilt className="stat">
                <b>
                  <Counter to={2} />
                </b>
                <span>Published papers</span>
              </Tilt>
              <Tilt className="stat">
                <b>
                  8.83</b>
                <span>CGPA · B.Tech</span>
              </Tilt>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow center">Toolbox</p>
            <h2 className="h2 center">
              Technical <span className="gradient-text">skills</span>
            </h2>
          </Reveal>
          <div className="skills">
            {SKILLS.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <Tilt className="card skill">
                  <div className="skill__icon">
                    <s.icon size={26} />
                  </div>
                  <h3>{s.title}</h3>
                  <ul>
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow center">Portfolio</p>
            <h2 className="h2 center">
              Featured <span className="gradient-text">projects</span>
            </h2>
          </Reveal>
          <div className="projects">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 120} from="zoom">
                <Tilt className="card project" max={10}>
                  <div className="project__glow" style={{ ["--hue" as string]: p.hue }} />
                  <div className="project__top">
                    <span className="project__num">0{i + 1}</span>
                    <ArrowUpRight className="project__arrow" size={22} />
                  </div>
                  <h3>{p.name}</h3>
                  <p className="small accent">{p.sub}</p>
                  <ul className="bullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag tag--sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn btn--ghost btn--block">
                    <Github size={16} /> View on GitHub
                  </a>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="section">
        <div className="wrap wrap--narrow">
          <Reveal>
            <p className="eyebrow center">Publication</p>
            <h2 className="h2 center">
              Published <span className="gradient-text">research</span>
            </h2>
          </Reveal>
          <Reveal from="zoom" delay={100}>
            <Tilt className="card research" max={5}>
              <span className="tag tag--solid">Entropy (MDPI) · 2026 · 28(10), 1151</span>
              <h3>Quantum Fisher Information-Guided Diffusion Refinement for Fuzzy and Uncertain Surveillance Regions</h3>
              <p className="muted small">
                Sultan Alam, <b className="me">Piyush Makhija</b>, Abdul Khader Jilani Saudagar, Mubarak Albathan
              </p>
              <p className="muted">
                Proposes QFI-Diff, a hybrid framework that uses quantum Fisher information as a local reliability measure to
                guide latent diffusion-based restoration of surveillance images — preserving trustworthy regions while
                allowing adaptive refinement in uncertain ones. Includes convergence and Cramér–Rao-based guarantees, with
                competitive SSIM, LPIPS and FID results on DarkFace and RESIDE.
              </p>
              <div className="tags">
                {["Quantum Fisher Information", "Latent Diffusion", "Image Restoration", "Uncertainty Quantification"].map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="research__actions">
                <a href="https://www.mdpi.com/1099-4300/28/10/1151" target="_blank" rel="noreferrer" className="btn btn--glow btn--sm">
                  Read paper <ArrowUpRight size={16} />
                </a>
                <a href="https://doi.org/10.3390/e28101151" target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                  DOI
                </a>
                <a href="/certificate.pdf" target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                  <Award size={16} /> View certificate
                </a>
              </div>
            </Tilt>
          </Reveal>
          <Reveal from="zoom" delay={200}>
            <Tilt className="card research" max={5}>
              <span className="tag tag--solid">Research Paper · 2024</span>
              <h3>Network Coding for Efficient Molecular Data Transmission in Cancer Research</h3>
              <p className="muted">
                Investigated novel network coding techniques to optimize molecular data transmission protocols in cancer
                research applications, improving data throughput and reliability in distributed research environments.
              </p>
              <div className="tags">
                {["Network Coding", "Molecular Data", "Cancer Research", "Data Transmission"].map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <a href="#" className="btn btn--glow btn--sm">
                Read paper <ArrowUpRight size={16} />
              </a>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <div className="wrap wrap--narrow">
          <Reveal>
            <p className="eyebrow center">Background</p>
            <h2 className="h2 center">
              Education &amp; <span className="gradient-text">achievements</span>
            </h2>
          </Reveal>
          <div className="edu">
            <Reveal delay={0}>
              <Tilt className="card edu__card" max={5}>
                <div className="skill__icon">
                  <GraduationCap size={26} />
                </div>
                <h3>VIT Bhopal University</h3>
                <p className="small accent">B.Tech in Computer Science (AI &amp; Machine Learning)</p>
                <p className="muted small">Bhopal, MP · 2023 – 2027</p>
                <p className="edu__cgpa">CGPA 8.83</p>
              </Tilt>
            </Reveal>
            <Reveal delay={120}>
              <Tilt className="card edu__card" max={5}>
                <div className="skill__icon">
                  <Trophy size={26} />
                </div>
                <h3>Achievements</h3>
                <ul className="bullets">
                  <li>ET-AI Hackathon 2026 — selected as a Semi-Finalist.</li>
                  <li>
                    LeetCode — 100+ problems solved.{" "}
                    <a href={LINKS.leetcode} target="_blank" rel="noreferrer" className="accent">
                      Profile ↗
                    </a>
                  </li>
                </ul>
              </Tilt>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="certs">
              <Award size={18} /> <b>Certifications</b>
              <div className="tags">
                {CERTS.map((c) => (
                  <span key={c} className="tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="wrap wrap--narrow">
          <Reveal>
            <p className="eyebrow center">Contact</p>
            <h2 className="h2 center">
              Let&apos;s build something <span className="gradient-text">great</span>
            </h2>
            <p className="muted center">
              I&apos;m always interested in new opportunities and exciting projects. Reach out and let&apos;s talk.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="card card--static contact">
              <ContactForm to={CONTACT_EMAIL} />
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Piyush Makhija · Built with Next.js</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}
