// --- PIYUSH MAKHIJA PORTFOLIO ADVANCED INTERACTIVE ENGINE --- //

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initMouseGlow();
    initCard3DTilt();
    initSkillProjectLinkage();
    initProjectModals();
    initResearchModal();
    initAIChatbot();
});

// ==========================================
// 1. NAVIGATION & SCROLL ACTIVE MARKS
// ==========================================
function initNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = "rgba(7, 8, 12, 0.9)";
                navbar.style.boxShadow = "0 1rem 3rem rgba(0, 0, 0, 0.4)";
                navbar.style.height = "7rem";
            } else {
                navbar.style.background = "rgba(7, 8, 12, 0.7)";
                navbar.style.boxShadow = "none";
                navbar.style.height = "8rem";
            }
        }
    });

    // Active Section Scroll Spy
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;
        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active-link");
                    navLink.style.color = "var(--accent-cyan)";
                } else {
                    navLink.classList.remove("active-link");
                    navLink.style.color = "";
                }
            }
        });
    });
}

// ==========================================
// 2. MOUSE HALO LERP FOLLOW EFFECT
// ==========================================
function initMouseGlow() {
    const mouseGlow = document.querySelector(".mouse-glow");
    if (!mouseGlow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let active = false;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!active) {
            mouseGlow.style.opacity = "1";
            active = true;
        }
    });

    window.addEventListener("mouseleave", () => {
        mouseGlow.style.opacity = "0";
        active = false;
    });

    const animateGlow = () => {
        if (active) {
            // Smooth lerp formula
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            mouseGlow.style.left = `${glowX}px`;
            mouseGlow.style.top = `${glowY}px`;
        }
        requestAnimationFrame(animateGlow);
    };
    animateGlow();
}

// ==========================================
// 3. 3D PERSPECTIVE CARD TILT & SHINE
// ==========================================
function initCard3DTilt() {
    // Select cards to apply tilt effect
    const cards = document.querySelectorAll(".project-card, .cert-card, .research-wrapper, .timeline-card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X inside element
            const y = e.clientY - rect.top;  // Mouse Y inside element

            // Normalize coordinate system relative to center (ranges from -0.5 to 0.5)
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = (x - xc) / xc;
            const dy = (y - yc) / yc;

            // Tilt rotation angles (maximum 10 degrees)
            const maxTilt = 8;
            const tiltX = -dy * maxTilt;
            const tiltY = dx * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-0.5rem)`;
            
            // Set dynamic CSS properties for shine overlay
            card.style.setProperty("--shine-x", `${(x / rect.width) * 100}%`);
            card.style.setProperty("--shine-y", `${(y / rect.height) * 100}%`);
        });

        card.addEventListener("mouseleave", () => {
            // Smoothly snap back to original position
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
            card.style.setProperty("--shine-x", "50%");
            card.style.setProperty("--shine-y", "50%");
            card.style.transition = "transform 0.5s ease";
        });

        card.addEventListener("mouseenter", () => {
            card.style.transition = "none"; // Disable transitions during mousemove for responsiveness
        });
    });
}

// ==========================================
// 4. TECHNICAL SKILL-TO-PROJECT LINKAGE
// ==========================================
function initSkillProjectLinkage() {
    const skillPills = document.querySelectorAll(".skill-pill");
    const projectCards = document.querySelectorAll(".project-card");

    // Skill Hover
    skillPills.forEach((pill) => {
        const rawProjects = pill.getAttribute("data-projects");
        if (!rawProjects) return;

        const linkedProjectIds = rawProjects.split(",");

        pill.addEventListener("mouseenter", () => {
            projectCards.forEach((card) => {
                if (linkedProjectIds.includes(card.id)) {
                    card.classList.add("project-highlight");
                } else {
                    card.classList.add("project-dim");
                }
            });
        });

        pill.addEventListener("mouseleave", () => {
            projectCards.forEach((card) => {
                card.classList.remove("project-highlight", "project-dim");
            });
        });
    });

    // Project Card Hover
    projectCards.forEach((card) => {
        const rawSkills = card.getAttribute("data-skills");
        if (!rawSkills) return;

        const skillsArray = rawSkills.split(",").map(s => s.trim().toLowerCase());

        card.addEventListener("mouseenter", () => {
            skillPills.forEach((pill) => {
                const pillName = pill.textContent.trim().toLowerCase();
                if (skillsArray.includes(pillName)) {
                    pill.classList.add("skill-highlight");
                } else {
                    pill.classList.add("skill-dim");
                }
            });
        });

        card.addEventListener("mouseleave", () => {
            skillPills.forEach((pill) => {
                pill.classList.remove("skill-highlight", "skill-dim");
            });
        });
    });
}

// ==========================================
// 5. PROJECT ARCHITECTURE DEEP-DIVE MODALS
// ==========================================
const projectData = {
    "project-omnichat": {
        title: "OmniChat",
        tech: "Python, FastAPI, PostgreSQL, Redis, Docker, LangChain, LLMs",
        challenge: "Routing queries between multiple large language models dynamically while controlling API costs and keeping latency below thresholds.",
        solution: "Engineered a smart router utilizing model-latency metrics and caching. Implemented a dual-layered long-term memory system utilizing PostgreSQL vector stores.",
        impact: "Optimized model utilization costs by 40% and improved response accuracy through contextual memory injection.",
        diagram: `<svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
          <!-- User Node -->
          <rect x="20" y="90" width="80" height="60" rx="8" fill="#141827" stroke="#8b5cf6" stroke-width="2"/>
          <text x="60" y="125" fill="#f8fafc" font-size="12" font-family="JetBrains Mono" text-anchor="middle">User Client</text>
          
          <!-- FastAPI Router -->
          <rect x="170" y="90" width="110" height="60" rx="8" fill="#141827" stroke="#06b6d4" stroke-width="2"/>
          <text x="225" y="120" fill="#f8fafc" font-size="12" font-family="JetBrains Mono" text-anchor="middle">FastAPI Router</text>
          <text x="225" y="135" fill="#94a3b8" font-size="10" font-family="JetBrains Mono" text-anchor="middle">+ Redis Cache</text>
          
          <!-- LLM Decision Routing Engine -->
          <polygon points="340,120 400,70 460,120 400,170" fill="#141827" stroke="#6366f1" stroke-width="2"/>
          <text x="400" y="125" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Multi-LLM Router</text>
          
          <!-- Target LLMs -->
          <rect x="500" y="30" width="80" height="40" rx="6" fill="#141827" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="540" y="55" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">High-Cost LLM</text>
          
          <rect x="500" y="170" width="80" height="40" rx="6" fill="#141827" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="540" y="195" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Low-Cost LLM</text>
          
          <!-- Connector Lines -->
          <path d="M100 120 H170" stroke="#f8fafc" stroke-width="1.5" stroke-dasharray="4"/>
          <path d="M280 120 H340" stroke="#f8fafc" stroke-width="1.5"/>
          <path d="M430 95 L500 50" stroke="#06b6d4" stroke-width="1.5"/>
          <path d="M430 145 L500 190" stroke="#06b6d4" stroke-width="1.5"/>
        </svg>`,
        code: `class LLMRouter:
    def __init__(self, cost_limit: float):
        self.cost_limit = cost_limit
        
    async def route_query(self, query: str, context: dict) -> str:
        complexity = self.analyze_complexity(query)
        if complexity > 0.8:
            # Route to powerful costly LLM (GPT-4 / Claude-3)
            return await self.invoke_llm("high-performance", query, context)
        else:
            # Route to cost-efficient lightweight LLM
            return await self.invoke_llm("low-latency", query, context)`
    },
    "project-apigateway": {
        title: "API Gateway",
        tech: "FastAPI, Redis, Docker, Prometheus, Grafana, GitHub Actions",
        challenge: "Protecting upstream internal microservices from traffic surges, enforcing access control, and handling failures without cascading outages.",
        solution: "Engineered a custom reverse proxy API Gateway with circuit breakers in FastAPI. Implemented high-performance Redis rate-limiting (Token Bucket algorithm). Integrated Prometheus middleware.",
        impact: "Enforced rate limits at sub-millisecond speeds, prevented outages via automatic circuit-breakers, and enabled real-time service observability.",
        diagram: `<svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
          <!-- Request -->
          <rect x="20" y="90" width="80" height="60" rx="8" fill="#141827" stroke="#8b5cf6" stroke-width="2"/>
          <text x="60" y="125" fill="#f8fafc" font-size="12" font-family="JetBrains Mono" text-anchor="middle">HTTP Client</text>
          
          <!-- Redis Token Bucket -->
          <rect x="170" y="20" width="110" height="50" rx="8" fill="#141827" stroke="#a78bfa" stroke-width="1.5"/>
          <text x="225" y="50" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">Redis Rate Limit</text>
          
          <!-- API Gateway Proxy -->
          <rect x="170" y="110" width="110" height="60" rx="8" fill="#141827" stroke="#06b6d4" stroke-width="2"/>
          <text x="225" y="145" fill="#f8fafc" font-size="12" font-family="JetBrains Mono" text-anchor="middle">API Gateway</text>
          
          <!-- Circuit Breaker -->
          <rect x="330" y="110" width="100" height="60" rx="8" fill="#141827" stroke="#6366f1" stroke-width="1.5"/>
          <text x="380" y="145" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">Circuit Breaker</text>
          
          <!-- Microservices -->
          <rect x="480" y="70" width="100" height="40" rx="6" fill="#141827" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="530" y="95" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Service A</text>
          
          <rect x="480" y="150" width="100" height="40" rx="6" fill="#141827" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="530" y="175" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">Service B</text>
          
          <!-- Connectors -->
          <path d="M100 120 L170 120" stroke="#f8fafc" stroke-width="1.5"/>
          <path d="M225 110 V70" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="3"/>
          <path d="M280 140 H330" stroke="#f8fafc" stroke-width="1.5"/>
          <path d="M430 140 L480 100" stroke="#06b6d4" stroke-width="1.5"/>
          <path d="M430 140 L480 170" stroke="#06b6d4" stroke-width="1.5"/>
        </svg>`,
        code: `async def is_rate_limited(client_ip: str, limit: int, window: int) -> bool:
    key = f"rate_limit:{client_ip}"
    current_requests = await redis_client.get(key)
    
    if current_requests and int(current_requests) >= limit:
        return True # Trigger HTTP 429 Too Many Requests
        
    async with redis_client.pipeline() as pipe:
        pipe.incr(key)
        pipe.expire(key, window)
        await pipe.execute()
    return False`
    },
    "project-csm": {
        title: "Client Service Management",
        tech: "Node.js, Express.js, React.js, MongoDB, Docker, GitHub Actions",
        challenge: "Managing complex administrative work orders and customer feedback logs without centralized control or container validation.",
        solution: "Built a React-Express web platform with MongoDB to automate workflows. Dockerized services for zero-install local setups. Configured CI/CD automated builds.",
        impact: "Unified administrative workflows, reduced service feedback response delay, and standardized the development environment across all OS systems.",
        diagram: `<svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
          <!-- Client Frontend -->
          <rect x="20" y="90" width="100" height="60" rx="8" fill="#141827" stroke="#8b5cf6" stroke-width="2"/>
          <text x="70" y="125" fill="#f8fafc" font-size="12" font-family="JetBrains Mono" text-anchor="middle">React Web App</text>
          
          <!-- Express Backend -->
          <rect x="220" y="90" width="110" height="60" rx="8" fill="#141827" stroke="#06b6d4" stroke-width="2"/>
          <text x="275" y="125" fill="#f8fafc" font-size="12" font-family="JetBrains Mono" text-anchor="middle">Express API</text>
          
          <!-- Database -->
          <rect x="420" y="90" width="100" height="60" rx="8" fill="#141827" stroke="#6366f1" stroke-width="2"/>
          <text x="470" y="125" fill="#f8fafc" font-size="12" font-family="JetBrains Mono" text-anchor="middle">MongoDB</text>
          
          <!-- Connectors -->
          <path d="M120 120 H220" stroke="#f8fafc" stroke-width="1.5" stroke-dasharray="4"/>
          <path d="M330 120 H420" stroke="#f8fafc" stroke-width="1.5"/>
        </svg>`,
        code: `// Express schema definition for tracking client ticket updates
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  clientName: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In-Progress', 'Resolved'], default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});`
    },
    "project-focuslock": {
        title: "Focus Lock",
        tech: "JavaScript, Chrome Extension API, IndexedDB",
        challenge: "Creating a privacy-first, highly efficient content filtering system on Chrome browser that operates offline without slowing down page load speeds.",
        solution: "Utilized Chrome's native declarativeNetRequest API to filter network traffic dynamically. Created an IndexedDB-based local database to store blocklists, configuration rules, and usage data locally.",
        impact: "Shipped a 100% privacy-first user tool with zero external servers, local analytics rendering under 5ms, and published on the official Chrome Web Store.",
        diagram: `<svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
          <!-- User / Request -->
          <rect x="20" y="90" width="100" height="60" rx="8" fill="#141827" stroke="#8b5cf6" stroke-width="2"/>
          <text x="70" y="125" fill="#f8fafc" font-size="12" font-family="JetBrains Mono" text-anchor="middle">Chrome Browser</text>
          
          <!-- DeclarativeNetRequest Filter -->
          <polygon points="230,120 280,70 330,120 280,170" fill="#141827" stroke="#06b6d4" stroke-width="2"/>
          <text x="280" y="125" fill="#f8fafc" font-size="9" font-family="JetBrains Mono" text-anchor="middle">dNR API Filter</text>
          
          <!-- Local IndexedDB Rules -->
          <rect x="230" y="20" width="100" height="40" rx="6" fill="#141827" stroke="#a78bfa" stroke-width="1.5"/>
          <text x="280" y="45" fill="#f8fafc" font-size="10" font-family="JetBrains Mono" text-anchor="middle">IndexedDB Rules</text>
          
          <!-- Destination Page -->
          <rect x="450" y="30" width="110" height="50" rx="8" fill="#141827" stroke="#6366f1" stroke-width="1.5"/>
          <text x="505" y="60" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">Allowed Site</text>
          
          <rect x="450" y="160" width="110" height="50" rx="8" fill="#141827" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="505" y="190" fill="#f8fafc" font-size="11" font-family="JetBrains Mono" text-anchor="middle">Blocked Page</text>
          
          <!-- Connectors -->
          <path d="M120 120 H230" stroke="#f8fafc" stroke-width="1.5"/>
          <path d="M280 110 V60" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="3"/>
          <path d="M305 95 L450 55" stroke="#06b6d4" stroke-width="1.5"/>
          <path d="M305 145 L450 185" stroke="#06b6d4" stroke-width="1.5"/>
        </svg>`,
        code: `// Chrome Extension Service Worker registering dynamic filter rules
chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [{
    id: 1,
    priority: 1,
    action: { type: 'redirect', redirect: { extensionPath: '/blocked.html' } },
    condition: { urlFilter: 'youtube.com/shorts', resourceTypes: ['main_frame'] }
  }],
  removeRuleIds: [1]
});`
    }
};

function initProjectModals() {
    const modal = document.getElementById("project-modal");
    const modalContent = document.getElementById("project-modal-content");
    const modalClose = document.getElementById("project-modal-close");
    const clickables = document.querySelectorAll(".clickable-project");

    if (!modal || !modalContent) return;

    clickables.forEach((card) => {
        card.addEventListener("click", () => {
            const data = projectData[card.id];
            if (!data) return;

            modalContent.innerHTML = `
                <h3 class="modal-project-title">${data.title}</h3>
                <span class="modal-subtitle">${data.tech}</span>
                
                <div class="modal-challenge-grid">
                  <div class="challenge-card-inner">
                    <h5>The Challenge</h5>
                    <p>${data.challenge}</p>
                  </div>
                  <div class="challenge-card-inner">
                    <h5>The Solution</h5>
                    <p>${data.solution}</p>
                  </div>
                  <div class="challenge-card-inner">
                    <h5>The Impact</h5>
                    <p>${data.impact}</p>
                  </div>
                </div>
                
                <div class="modal-section">
                  <h4>System Data Architecture</h4>
                  <div class="diagram-container">
                    ${data.diagram}
                  </div>
                </div>
                
                <div class="modal-section">
                  <h4>Technical Implementation Detail</h4>
                  <div class="code-container">
                    <pre><code>${data.code}</code></pre>
                  </div>
                </div>
            `;
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Disable scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Enable scroll
    };

    modalClose?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

// ==========================================
// 6. RESEARCH PAPER ABSTRACT MODAL
// ==========================================
function initResearchModal() {
    const modal = document.getElementById("research-modal");
    const btnOpen = document.getElementById("btn-read-abstract");
    const btnClose = document.getElementById("research-modal-close");

    if (!modal || !btnOpen) return;

    btnOpen.addEventListener("click", () => {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    };

    btnClose?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

// ==========================================
// 7. CLIENT-SIDE INTELLIGENT AI CHATBOT
// ==========================================
function initAIChatbot() {
    const toggle = document.getElementById("chatbot-toggle");
    const box = document.getElementById("chatbot-box");
    const close = document.getElementById("chatbot-close");
    const messagesContainer = document.getElementById("chatbot-messages");
    const form = document.getElementById("chatbot-form");
    const input = document.getElementById("chatbot-input");
    const chipsContainer = document.getElementById("chatbot-chips");

    if (!toggle || !box || !messagesContainer || !form || !input) return;

    // Toggle Open/Close Chatbox
    toggle.addEventListener("click", () => {
        box.classList.toggle("active");
        // Hide notification dot when opened
        const dot = toggle.querySelector(".chatbot-notification-dot");
        if (dot) dot.style.display = "none";
    });

    close.addEventListener("click", () => {
        box.classList.remove("active");
    });

    // Suggestion Chips Click
    chipsContainer?.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        const query = chip.getAttribute("data-query");
        if (query) {
            input.value = query;
            handleUserMessage();
        }
    });

    // Form Submit Message
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleUserMessage();
    });

    function handleUserMessage() {
        const text = input.value.trim();
        if (!text) return;

        // Append User Message
        appendMessage(text, "user-message");
        input.value = "";

        // Trigger Bot Response with Typing Effect
        showBotResponse(text);
    }

    function appendMessage(text, className) {
        const msg = document.createElement("div");
        msg.className = `message ${className}`;
        msg.textContent = text;
        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showBotResponse(userQuery) {
        // Show Typing Indicator
        const typing = document.createElement("div");
        typing.className = "message bot-message typing-indicator";
        typing.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesContainer.appendChild(typing);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate typing latency
        setTimeout(() => {
            typing.remove(); // Remove typing loader
            const responseText = routeQueryResponse(userQuery);
            appendMessage(responseText, "bot-message");
        }, 1000);
    }

    // Client-side dialog response router
    function routeQueryResponse(query) {
        const normalized = query.toLowerCase();

        // Greeting Matches
        if (/\b(hi|hello|hey|greetings|morning|afternoon)\b/.test(normalized)) {
            return "Hey there! I'm Piyush Makhija's AI assistant. Ask me about his projects (like OmniChat), backend skills, Google certifications, or how to contact him!";
        }

        // OmniChat
        if (/\b(omnichat|omni|chat|routing|rag|multi-llm)\b/.test(normalized)) {
            return "OmniChat is an AI routing project engineered by Piyush. It routes queries dynamically between models (GPT/Claude) using speed & cost heuristics (saving 40% in cost), uses a Redis/PostgreSQL vector database RAG pipeline for context retrieval, and refresh-token sessions.";
        }

        // Focus Lock
        if (/\b(focus|lock|chrome|extension|indexeddb|filter)\b/.test(normalized)) {
            return "Focus Lock is a privacy-first Chrome Extension built by Piyush that blocks distractions and filters YouTube. It uses the declarativeNetRequest Chrome API for zero-latency network blocking, and client-side IndexedDB to store custom rules and usage analytics offline.";
        }

        // API Gateway
        if (/\b(gateway|api|rate|limits|prometheus|grafana|reverse|proxy)\b/.test(normalized)) {
            return "Piyush built a high-availability API Gateway in FastAPI implementing reverse proxying and circuit breakers. It protects services using Token Bucket and Sliding Window rate-limiting algorithms built with Redis, monitored via Prometheus.";
        }

        // Client Service Management
        if (/\b(csm|client|service|management|node|express|react|mongo)\b/.test(normalized)) {
            return "Piyush developed a full-stack Client Service Management request tracker utilizing React.js, Express.js, and MongoDB. It containerizes services using Docker and uses automated build validation on GitHub Actions.";
        }

        // Skills / Tech
        if (/\b(skills|languages|python|c\+\+|backend|database|docker|git|concepts)\b/.test(normalized)) {
            return "Piyush's skills cover:\n- Languages: Python, C++, C, JavaScript, SQL\n- Backend: FastAPI, Node.js, Express.js, PostgreSQL, MongoDB, Redis, SQLAlchemy\n- AI/ML: Large Language Models, RAG, NLP\n- Tools: Docker, Git, Linux, Prometheus, Grafana.";
        }

        // Education
        if (/\b(education|university|vit|bhopal|degree|gpa|college|school)\b/.test(normalized)) {
            return "Piyush is pursuing his Bachelor of Technology (B.Tech) in Computer Science specializing in AI & Machine Learning (2023 - 2027) at VIT Bhopal University. He finished secondary school at World Way International School in 2023.";
        }

        // Publications / Research
        if (/\b(research|publications?|ieee|paper|molecular|cancer|ic3)\b/.test(normalized)) {
            return "Piyush co-authored a research paper: 'Network Coding for Efficient Molecular Data Transmission in Cancer Research' published in the IEEE IC3 2025 conference. It proves that intermediate molecular nodes using network coding increase packet reliability and reduce energy consumption by up to 35%.";
        }

        // Certifications
        if (/\b(certifications|certificates?|google|michigan|microsoft|sc-900)\b/.test(normalized)) {
            return "Piyush holds several premium credentials:\n- Applied Machine Learning (University of Michigan)\n- Google IT Support Certificate\n- Google Data Analytics Certificate\n- Microsoft SC-900 Security Fundamentals.";
        }

        // Contact Info
        if (/\b(contact|email|phone|call|mail|linkedin|github|reach|hire)\b/.test(normalized)) {
            return "You can reach Piyush directly:\n- Email: piyushmakhija26@gmail.com\n- LinkedIn: linkedin.com/in/piyush-makhija\n- GitHub: github.com/PiyushMakhija26";
        }

        // Fallback Default
        return "I'm not sure about that specific detail. You can ask me:\n1. 'Tell me about OmniChat'\n2. 'What is the API Gateway?'\n3. 'What technical skills do you have?'\n4. 'Tell me about your IEEE publication'\n5. 'How can I contact Piyush?'";
    }
}
