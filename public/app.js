// Interactive Galleries Data for All 4 Projects
const PROJECT_GALLERIES = {
  portico: [
    { src: '/assets/images/portico-dashboard.png', caption: 'Executive Practice Dashboard — $48.6M AUM, Book KPIs, Household Cards & Live Daily Brief Markets' },
    { src: '/assets/images/portico-landing.png', caption: 'Unified Advisor Command Center — Drift Monitoring, Daily Briefs, Copilot Spreadsheet & Custodian Sync' },
    { src: '/assets/images/portico-copilot-excel-ai.png', caption: 'Portfolio Copilot AI Drawer alongside Full-Screen Luckysheet Workbook (Ask/Create Modes + IB Skills)' },
    { src: '/assets/images/portico-luckysheet.png', caption: 'Expanded Full-Screen Copilot Spreadsheet with Pending AI Rebalance Banner & Live Holdings' },
    { src: '/assets/images/portico-client-holdings.png', caption: 'Client Portfolio Holdings Grid ($12.45M MV), Mistral OCR Upload & Trailing Performance (1M–3Y)' },
    { src: '/assets/images/portico-construction.png', caption: '2-Anchor Portfolio Versioning Bar (Original Master, Current Master & Proposals) with Dirty Cell Tracking' },
    { src: '/assets/images/portico-daily-brief.png', caption: 'Overnight Autonomous Agent Brief (Celery Beat + GPT-4o + Perplexity) & Teams Pre-Meeting Prep' },
    { src: '/assets/images/portico-action-queue.png', caption: 'Human-in-the-Loop Action Queue & Triage Board for Confidence-Scored AI Proposals' },
    { src: '/assets/images/portico-ai-skills.png', caption: 'Modular Institutional AI Skills Library (DCF Valuation, Trading Comps, LBO Model, P&L Attribution)' },
    { src: '/assets/images/portico-langgraph-ai.png', caption: 'Portfolio AI — 40+ Agent LangGraph Supervisor with SSE Token Streaming & 3-Tier Episodic Memory' },
    { src: '/assets/images/portico-tax-harvesting.png', caption: '50-State Tax Estimator & Automated Lot-Level Tax-Loss Harvesting with 30-Day Wash-Sale Engine' },
    { src: '/assets/images/portico-custodian-hub.png', caption: 'Custodian Integration Hub — Charles Schwab, Fidelity SFTP, Orion & Black Diamond (Fernet Encrypted)' }
  ],
  voca: [
    { src: '/assets/images/voca-hero.png', caption: 'Voca AI Brand Portal & Live Voice Telemetry Showcase (182ms Turn Latency & 92/100 AutoQA Score)' },
    { src: '/assets/images/voca-kpi-overview.png', caption: 'Quality Management Overview & Executive KPI Command Center across 1,428 Omnichannel Interactions' },
    { src: '/assets/images/voca-call-explorer.png', caption: 'Omnichannel Call Explorer unifying Voca Voice Agents, NICE CXone & RingCentral with PGVector Search' },
    { src: '/assets/images/voca-call-detail.png', caption: 'Deep Call Detail (CALL-2026-0841) — Stereo Audio, Diarized Transcript, AI Summary & QA Scorecard' },
    { src: '/assets/images/voca-ai-ops-cost.png', caption: 'AI Operations & Cost Telemetry — 1,120 Calls (4.82M Tokens) Processed for $1.4820 (~5x Token Reduction)' },
    { src: '/assets/images/voca-document-hub.png', caption: 'Document Hub — Policy RAG Knowledge Base with Heading-Bounded 3,072-Dim Vector Chunk Registry' },
    { src: '/assets/images/voca-hub-ask-rag.png', caption: 'Hub Ask — 18-Tool Conversational Agentic RAG Assistant with 4-Arm Hybrid Policy Citations' },
    { src: '/assets/images/voca-compliance.png', caption: 'Compliance Queue & Priority Rule Governance Center (FDCPA, TCPA, CFPB, HIPAA & Mini-Miranda)' }
  ],
  auri: [
    { src: '/assets/images/auri-hero.png', caption: 'Auri Multi-Domain Product Stage — Domain-Aware Action AI across Finance, Health, HR & Real Estate' },
    { src: '/assets/images/auri-friction-contrast.png', caption: 'Live Friction Removal Contrast — 8–12 Min Agent Queue Replaced by 1.1s Scoped Tool Execution' },
    { src: '/assets/images/auri-latency-pipeline.png', caption: 'Sub-Second Latency Benchmarks (<800ms Intent p50, <1,200ms Tool Round-Trip, 99.9% Success Rate)' },
    { src: '/assets/images/auri-floating-widget.png', caption: 'Zero-Dependency Embeddable AuriChat Floating Widget Executing Live Scoped REST Tool Calls' },
    { src: '/assets/images/auri-api-registry.png', caption: 'Custom Domain & Dynamic API Contract Registry with Live HTTP Probe Testing & Self-Healing Circuit Breaker' },
    { src: '/assets/images/auri-finance-dashboard.png', caption: 'Multi-Tenant Operator Console in Finance Mode (Acme Lending) with One-Click Agent Test Triggers' },
    { src: '/assets/images/auri-healthcare.png', caption: 'Healthcare Domain Showcase (Auri Care Clinical Theme) with HIPAA-Ready OTP Gating' },
    { src: '/assets/images/auri-chat-sandbox.png', caption: 'Interactive Agent Console & Prompt Sandbox Executing Live Property Contract Templates' },
    { src: '/assets/images/auri-scale-analytics.png', caption: 'Portfolio Scale Targets & Service Mix Analytics across 40+ Multi-Tenant Brands' },
    { src: '/assets/images/auri-willow-estates.png', caption: 'Willow Estates Live Client App — Real-Time Property Inventory & Booking Desk Mutated via Auri Chat' }
  ],
  algoatlas: [
    { src: '/assets/images/algoatlas-hero.svg', caption: 'AlgoAtlas Live Workspace — Pattern Taxonomy Explorer, AST Complexity Analyzer & Conversational AI Socratic Tutor' },
    { src: '/assets/images/algoatlas-revision.svg', caption: 'Algorithmic Knowledge Graph & SM-2+ Decay-Aware Spaced-Repetition Revision Engine (94.6% Recall)' }
  ]
};

const galleryState = {
  portico: 0,
  voca: 0,
  auri: 0,
  algoatlas: 0
};

const autoTourTimers = {};

function updateGallery(projectKey, newIndex) {
  const items = PROJECT_GALLERIES[projectKey];
  if (!items || !items.length) return;
  const idx = (newIndex + items.length) % items.length;
  galleryState[projectKey] = idx;

  const container = document.querySelector(`[data-gallery="${projectKey}"]`);
  if (!container) return;

  const mainImg = container.querySelector('.gallery-main-img');
  const captionEl = container.querySelector('.gallery-caption-text');
  const counterEl = container.querySelector('.gallery-counter');
  const thumbs = container.querySelectorAll('.gallery-thumb');

  if (mainImg) {
    mainImg.classList.remove('slide-in');
    void mainImg.offsetWidth; // trigger reflow
    mainImg.src = items[idx].src;
    mainImg.alt = items[idx].caption;
    mainImg.classList.add('slide-in');
  }
  if (captionEl) captionEl.textContent = items[idx].caption;
  if (counterEl) counterEl.textContent = `${idx + 1} / ${items.length}`;

  thumbs.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}

function toggleAutoTour(projectKey, btn) {
  if (autoTourTimers[projectKey]) {
    clearInterval(autoTourTimers[projectKey]);
    delete autoTourTimers[projectKey];
    if (btn) btn.innerHTML = '▶ Auto Tour';
  } else {
    if (btn) btn.innerHTML = '⏸ Pause Tour';
    autoTourTimers[projectKey] = setInterval(() => {
      updateGallery(projectKey, galleryState[projectKey] + 1);
    }, 3200);
  }
}

function initGalleries() {
  Object.keys(PROJECT_GALLERIES).forEach((key) => {
    const container = document.querySelector(`[data-gallery="${key}"]`);
    if (!container) return;
    const items = PROJECT_GALLERIES[key];
    const thumbsWrap = container.querySelector('.gallery-thumbs');
    if (thumbsWrap) {
      thumbsWrap.innerHTML = items
        .map(
          (item, i) =>
            `<img src="${item.src}" alt="${item.caption}" loading="lazy" decoding="async" class="gallery-thumb ${
              i === 0 ? 'active' : ''
            }" data-idx="${i}" />`
        )
        .join('');
      thumbsWrap.addEventListener('click', (e) => {
        const thumb = e.target.closest('.gallery-thumb');
        if (!thumb) return;
        updateGallery(key, parseInt(thumb.dataset.idx, 10));
      });
    }

    const prevBtn = container.querySelector('[data-action="prev"]');
    const nextBtn = container.querySelector('[data-action="next"]');
    const expandBtn = container.querySelector('[data-action="expand"]');
    const mainImg = container.querySelector('.gallery-main-img');

    if (prevBtn) prevBtn.addEventListener('click', () => updateGallery(key, galleryState[key] - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateGallery(key, galleryState[key] + 1));

    const openModal = () => {
      const current = items[galleryState[key]];
      openLightbox(current.src, current.caption);
    };
    if (expandBtn) expandBtn.addEventListener('click', openModal);
    if (mainImg) mainImg.addEventListener('click', openModal);
  });
}

// Lightbox Modal
function openLightbox(src, title) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const ttl = document.getElementById('lightbox-title');
  if (!lb || !img) return;
  img.src = src;
  img.alt = title || 'Project Screenshot';
  if (ttl) ttl.textContent = title || '';
  lb.classList.add('open');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  initGalleries();

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Auto Tour Buttons
  document.querySelectorAll('.gallery-auto-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const gKey = btn.dataset.gallery;
      toggleAutoTour(gKey, btn);
    });
  });

  // Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-showcase');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const tags = card.dataset.tags || '';
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Events
  const lbClose = document.getElementById('lightbox-close');
  const lb = document.getElementById('lightbox');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Scroll Reveal Observer
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }
});
