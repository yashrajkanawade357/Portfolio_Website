// Everything the site says about Yashraj lives here, so pages stay layout-only.

export const person = {
  name: "Yashraj Kanawade",
  first: "Yashraj",
  last: "Kanawade",
  role: "CSE student · VIT Vellore",
  roleLong: "CSE student at VIT Vellore — Class of 2029",
  tagline: "I enjoy building things that solve real problems, one project at a time.",
  email: "yashrajkanawade357@gmail.com",
  github: "https://github.com/yashrajkanawade357",
  linkedin: "https://www.linkedin.com/in/yashraj-kanawade-289039223/",
  basedIn: "Vellore · India",
}

export type Category = "AI / ML" | "Web app" | "Civic tech" | "Web3"

export type Project = {
  slug: string
  number: string
  title: string
  category: Category
  client: string
  year: string
  role: string
  summary: string
  body: string[]
  stack: string[]
  live?: string
  status?: "In progress"
  accent: string
  cover: string
  still: string
}

const P = "/media/projects/"

export const projects: Project[] = [
  {
    slug: "vyora", number: "01", title: "Vyora", category: "Web app", client: "Personal product", year: "2026",
    role: "Full-stack · Product design", accent: "#7c3aed", live: "https://vyora-3d282.web.app/",
    cover: P + "01-vyora.webp", still: P + "01-vyora-still.webp",
    summary: "An AI-powered study platform that tracks your habits, plans your week and turns studying into a streak worth keeping.",
    body: [
      "Vyora is an AI-powered study platform that tracks your habits, optimises your schedule and gamifies the road to academic excellence.",
      "One account, two apps. The Study Tracker logs Pomodoro sessions and builds streaks and subject analytics, with an AI study coach. The Smart Calendar plans events and tasks across month, week and day views with reminders. Everything syncs across devices, fronted by a cinematic 3D landing page.",
    ],
    stack: ["JavaScript", "Supabase", "Three.js", "Firebase Hosting"],
  },
  {
    slug: "terra-flow", number: "02", title: "Terra-Flow", category: "Web app", client: "Personal project", year: "2026",
    role: "Frontend · Data visualisation", accent: "#3458dc", live: "https://terraflow-six.vercel.app/",
    cover: P + "02-terraflow.webp", still: P + "02-terraflow-still.webp",
    summary: "An urban-intelligence dashboard for Bengaluru: congestion, property, livability and investment signals in one view.",
    body: [
      "Terra-Flow is a smart-city analytics platform for the Bangalore metro region. One live overview brings the city's signals together: a congestion index, average property prices, a livability score, an investment grade and the daily economic cost of traffic.",
      "An urban-intelligence map compares neighbourhoods by traffic density, property price, livability and investment score, and trend analytics show how each area moves over time.",
    ],
    stack: ["TypeScript", "Web app", "Data visualisation"],
  },
  {
    slug: "project-sindhu", number: "03", title: "Project Sindhu", category: "Civic tech", client: "Smart India Hackathon 2026", year: "2026",
    role: "Full-stack · GIS", status: "In progress", accent: "#16803d", live: "https://sindhu-qp4o.onrender.com/",
    cover: P + "03-sindhu.webp", still: P + "03-sindhu-still.webp",
    summary: "Satellite-verified watershed intelligence: evidence of whether a water structure actually worked.",
    body: [
      "Built for Smart India Hackathon 2026 (PS SIH26015). Sindhu combines AI, GIS, satellite imagery and field data to monitor watershed interventions, detect change and deliver evidence you can trust, structure by structure.",
      "A map can show where a check dam was built. Sindhu explains whether it worked: field officers capture verified photos in an offline-first app, Sentinel-2 imagery supplies the history, and an evidence-fusion engine turns both into a watershed health score.",
      "Still in progress. The pilot is set in Jamgaon, Beed, and the current build tracks 15 structures across 91 months of satellite record (1,246 valid observations).",
    ],
    stack: ["JavaScript", "GIS", "Sentinel-2", "Offline-first PWA"],
  },
  {
    slug: "ai-gym-unlox", number: "04", title: "AI Gym — Unlox", category: "AI / ML", client: "Unlox · 5-month AI/ML training", year: "2026",
    role: "AI · Full-stack", accent: "#ff5a1f",
    cover: P + "04-ai-gym-unlox.webp", still: P + "04-ai-gym-unlox-still.webp",
    summary: "An AI gym companion: workout modules and a coach that adapts to your routine.",
    body: [
      "An AI gym and fitness companion, built during my five-month AI/ML training with the Unlox team (AI Job Bridge Program).",
      "Workout modules cover planning and tracking, and an AI Gym Buddy guides each session and adapts to the user's routine. Built in Python with generative AI at its core.",
    ],
    stack: ["Python", "Generative AI", "Full-stack"],
  },
  {
    slug: "cipher-cli", number: "05", title: "Cipher.cli", category: "Web3", client: "Yantra'26 · ISTE VIT", year: "2026",
    role: "Developer", accent: "#f5c518",
    cover: P + "05-cipher-cli.webp", still: P + "05-cipher-cli-still.webp",
    summary: "A command-line tool for transparent, decentralized systems: verifiability you can run from a terminal.",
    body: [
      "Cipher.cli brings Web3 transparency to the command line, for building and checking decentralized systems where every record can be verified instead of trusted.",
      "Presented at Yantra'26, organised by ISTE at VIT, in February 2026. Built with JavaScript.",
    ],
    stack: ["JavaScript", "Web3", "CLI"],
  },
  {
    slug: "ai-ml-lab", number: "06", title: "AI / ML Lab", category: "AI / ML", client: "Self-directed", year: "2026",
    role: "Research · Engineering", accent: "#2fcb68",
    cover: P + "06-ai-ml-lab.webp", still: P + "06-ai-ml-lab-still.webp",
    summary: "A hands-on run through the modern AI stack, from regression to RAG and LoRA fine-tuning.",
    body: [
      "A collection of working projects that take the AI stack apart piece by piece: retrieval-augmented generation, LoRA, QLoRA and PEFT fine-tuning, Transformer and GPT internals, LangChain and LangGraph agents, Hugging Face pipelines and a chatbot.",
      "The foundations are here too: regression, decision trees, random forests and boosting, with exploratory data analysis in NumPy and Pandas.",
    ],
    stack: ["Python", "RAG", "LoRA / PEFT", "Transformers", "LangChain"],
  },
  {
    slug: "ledgersentinel", number: "07", title: "LedgerSentinel", category: "AI / ML", client: "24-hour hackathon · team of three", year: "2026",
    role: "Backend · Supabase · UX", status: "In progress", accent: "#2563eb", live: "https://ledgersentinel-hq.web.app/",
    cover: P + "07-ledgersentinel.webp", still: P + "07-ledgersentinel-still.webp",
    summary: "Fraud detection with bounded autonomy: the model raises signals, a policy gate makes the call.",
    body: [
      "LedgerSentinel catches social-engineering fraud by reading a transaction together with the conversation around it, because the transaction is not always the whole story.",
      "Its rule is bounded autonomy. The models only emit signals; a deterministic policy gate chooses the action (approve, verify, cool off, hold or escalate), so a person stays in the loop when it matters. Calibrated confidence reached 92.2% on held-out cases.",
      "I built the backend and data layer (Python, FastAPI, Supabase Postgres with pgvector) and shaped the analyst experience. Still in progress: the hackathon build is live and we are taking it further.",
    ],
    stack: ["Python", "FastAPI", "Supabase", "pgvector", "React"],
  },
  {
    slug: "portfolio", number: "08", title: "This Portfolio", category: "Web app", client: "Personal project", year: "2026",
    role: "Design · Frontend · Motion", accent: "#e48a6f", live: "https://yashrajkanawadeportfolio.netlify.app/",
    cover: P + "08-portfolio.webp", still: P + "08-portfolio-still.webp",
    summary: "The site you're on: a folding phone that opens as you scroll, built from scratch in React and Motion.",
    body: [
      "I wanted a portfolio that felt like an object, not a template. The site is a foldable phone: its cover is a lock screen, and scrolling swings the left half open on its hinge until the inner screen wakes up. From there, the page scroll moves the content inside the phone's screen.",
      "Everything is my own code: React 19 and TypeScript on Vite, Motion for the fold, springs and shared-layout transitions, and React Router for the pages. Visitors can switch the background scene and the phone's finish. On phones the device fills the screen instead of folding.",
      "It respects reduced-motion settings, works with a keyboard, serves WebP images and deploys from GitHub to Netlify on every push.",
    ],
    stack: ["React", "TypeScript", "Motion", "Vite", "Netlify"],
  },
]

export const categories: Category[] = ["AI / ML", "Web app", "Civic tech", "Web3"]

export const numbers = [
  { value: 30, suffix: "+", label: "Repositories on GitHub" },
  { value: 16, suffix: "", label: "Certificates earned" },
  { value: projects.filter((p) => !p.status).length, suffix: "", label: "Projects shipped" },
  { value: 5, suffix: "", label: "Clubs and chapters" },
]

export const focus = [
  { title: "Software Engineering",
    text: "Moving past code that only works, toward systems that are well-structured, reliable and scalable.",
    topics: ["Data structures & algorithms", "Object-oriented design", "Backend & REST APIs", "Databases", "Application architecture", "Clean, testable code"] },
  { title: "AI & Machine Learning",
    text: "The whole pipeline: framing the problem, cleaning and exploring data, features, training, evaluation and interpretation.",
    topics: ["EDA & data cleaning", "Feature engineering", "Supervised learning", "Model evaluation", "Transformers", "RAG", "Prompt engineering", "Fine-tuning (PEFT, LoRA)"] },
  { title: "Where they meet",
    text: "I'm working toward the middle point between software engineering and AI: AI architecture, NLP and deep learning, built into software that holds up in real use.",
    topics: ["AI system architecture", "NLP", "Deep learning", "Tokenization & embeddings", "LLM apps & agents", "Voice agents"] },
  { title: "Cloud & Systems",
    text: "The tools and infrastructure that keep software running beyond a local machine.",
    topics: ["Containers", "Deployment", "Version control", "Operating systems"] },
]

export const skills = [
  { group: "Languages", items: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript"] },
  { group: "AI / ML", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "PyTorch", "Hugging Face", "LangChain", "LangGraph", "RAG", "PEFT · LoRA · QLoRA"] },
  { group: "Backend & data", items: ["Spring Boot", "FastAPI", "Flask", "REST APIs", "PostgreSQL", "Supabase"] },
  { group: "Web", items: ["React", "HTML", "CSS", "Tailwind CSS", "Three.js"] },
  { group: "DevOps & tools", items: ["Docker", "Kubernetes", "Git", "GitHub", "VS Code", "Cursor", "Jupyter", "Google Colab", "Kaggle", "Vercel", "Netlify"] },
  { group: "Design", items: ["Canva", "DaVinci Resolve", "Filmora"] },
  { group: "Currently learning", items: ["DSA", "Deep learning", "NLP", "Software engineering principles"] },
]

export const experience = [
  { title: "Executive Core Member — Technical Domain", org: "AWS Student Builder Group · VIT", when: "Oct 2026 — now",
    detail: "Web development and AI/ML applications: automated systems and voice agents." },
  { title: "Executive Core Member — Outreach Domain", org: "AWS Student Builder Group · VIT", when: "Oct 2026 — now",
    detail: "Outreach and industry connects for the chapter." },
  { title: "Executive Core Member — Technical Domain", org: "E-Cell VIT", when: "Sep 2026 — now",
    detail: "Web development for E-Cell's sites and event platforms." },
  { title: "Executive Core Member — Outreach & Design", org: "Bulls & Bears · VIT", when: "Dec 2025 — Sep 2026",
    detail: "Outreach and promotional design for the club." },
]

// in the order he lists them; year only where we know it
export const hackathons: { title: string; org: string; when?: string }[] = [
  { title: "Google Solution Challenge", org: "Build with AI · Google × Hack2skill", when: "2026" },
  { title: "Vibe to Code", org: "Coding Ninjas × Google Developer Groups" },
  { title: "Code2Create", org: "ACM · VIT" },
  { title: "Odoo Hackathon", org: "Odoo" },
  { title: "TCS Challenge", org: "TCS" },
  { title: "Adobe Hackathon", org: "Adobe" },
  { title: "ForgeAI", org: "graVITas'26 · VIT × HCLTech", when: "2026" },
  { title: "Smart India Hackathon", org: "Project Sindhu · PS SIH26015", when: "2026" },
]

export const communities = ["The AI & ML Club (TAM)", "Bulls & Bears", "AWS Student Builders", "E-Cell VIT", "SIAM"]

const C = "/media/certificates/"
export const certificates = [
  { title: "Google AI Essentials", issuer: "Google · Coursera", kind: "AI", img: C + "google-ai-essentials.webp" },
  { title: "ForgeAI — graVITas'26", issuer: "VIT × HCLTech", kind: "Hackathon", img: C + "forgeai-gravitas-26.webp" },
  { title: "Solution Challenge 2026", issuer: "Build with AI · Hack2skill", kind: "Hackathon", img: C + "h2s-solution-challenge-2026.webp" },
  { title: "Yantra'26 — Cipher.cli", issuer: "ISTE · VIT", kind: "Hackathon", img: C + "iste-yantra-26-cipher-cli.webp" },
  { title: "Digital Dreamscapes", issuer: "International Seminar · VIT", kind: "Event", img: C + "vit-digital-dreamscapes.webp" },
  { title: "AI Job Bridge Program", issuer: "Unlox", kind: "AI", img: C + "unlox-ai-job-bridge.webp" },
  { title: "Spring Boot 4, Spring 7 & Hibernate", issuer: "Udemy", kind: "Development", img: C + "udemy-spring-boot-hibernate.webp" },
  { title: "The Complete SQL Bootcamp", issuer: "Udemy", kind: "Data", img: C + "udemy-sql-bootcamp.webp" },
  { title: "Java App Development: OOP & File I/O", issuer: "SkillUp · Coursera", kind: "Development", img: C + "skillup-java-app-development.webp" },
  { title: "C Programming for Beginners", issuer: "Udemy", kind: "Development", img: C + "udemy-c-programming.webp" },
  { title: "Introduction to Generative AI", issuer: "Google Cloud · Coursera", kind: "AI", img: C + "google-cloud-generative-ai.webp" },
  { title: "Discover the Art of Prompting", issuer: "Google · Coursera", kind: "AI", img: C + "google-art-of-prompting.webp" },
  { title: "Maximize Productivity with AI Tools", issuer: "Google · Coursera", kind: "AI", img: C + "google-productivity-ai-tools.webp" },
  { title: "Stay Ahead of the AI Curve", issuer: "Google · Coursera", kind: "AI", img: C + "google-stay-ahead-ai-curve.webp" },
  { title: "Use AI Responsibly", issuer: "Google · Coursera", kind: "AI", img: C + "google-use-ai-responsibly.webp" },
  { title: "Build & Beyond", issuer: "Whitehats Club · VIT", kind: "Event", img: C + "whitehats-build-and-beyond.webp" },
]

// Yashraj's own words (About page), lightly trimmed to fit the screen
export const about = [
  { h: "Who I am", p: "I'm a Computer Science and Engineering student at VIT Vellore, graduating in 2029. I enjoy understanding how technology works, exploring new ideas, and building things that solve real problems. For me, computer science is a field where creativity meets logic, and every new concept opens the door to something bigger." },
  { h: "Software engineering", p: "I want to move beyond code that simply works and learn to build systems that are well-structured, reliable and scalable: backend development, APIs, databases and application architecture. Good engineering isn't about the most complicated technology; it's about thoughtful decisions and building something that genuinely serves its purpose." },
  { h: "AI & machine learning", p: "Building a model is much more than calling a training function. It starts with the problem and the data, and runs through cleaning, feature selection, training, evaluation and interpretation. I want to combine machine learning with well-designed software so the result is both intelligent and useful." },
  { h: "Where the two meet", p: "What I'm really after is the middle point between software engineering and AI: AI architecture, NLP and deep learning, designed and built into software that holds up in real use. A model is only as useful as the system around it, so I'm learning both sides together." },
  { h: "Beyond the classroom", p: "Through TAM, SIAM, Bulls & Bears, E-Cell and the AWS Student Builder Group, I've worked with people from different backgrounds, on web tasks and on promotional design. Contributing to a team takes more than technical knowledge: it takes clear communication, owning responsibilities and adapting when plans change." },
  { h: "How I build", p: "A project starts with a question: what problem am I solving, who benefits, and what's the simplest useful version? Then I break it into steps and build. Debugging is part of the craft; errors usually reveal an assumption worth rethinking." },
]
