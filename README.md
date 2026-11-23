# Piyush Ohri — Senior Full-Stack & Applied AI Engineer Portfolio

**Live Portfolio & Production Architecture Showcase** for **Piyush Ohri** (Ex-Amazon SDE · Ex-PharmEasy · NIT Raipur B.Tech CSE, CGPA 9.32/10 · Hyderabad, Telangana, India).

## 🚀 Featured Live Platforms (32 High-Resolution Captures)

1. **[Portico (finSightAI) — Enterprise Wealth & IB Intelligence Platform](https://d1wkb4s7mqpbgh.cloudfront.net/auth/login)**
   - 5-service monorepo (`React 18`, `FastAPI`, `Celery`, `LangGraph`, `Next.js`), 40+ specialist LangGraph agents, 7-stage Hybrid Vault RAG (`FAISS` + `MySQL FULLTEXT` + `RRF k=60` + `Cohere Rerank v3.0` + 3-Tier Numeric Table Rescue), embedded `Luckysheet` Copilot Excel AI, `skfolio` quantitative engine, 50-state tax-loss harvesting, and Fernet-encrypted Custodian Hub.
2. **[Voca AI — Conversational Voice AI & Omnichannel QA Intelligence Platform](https://6jf2h5rlkh.execute-api.ap-southeast-2.amazonaws.com/)**
   - Sub-200ms (`182ms`) WebRTC/SIP voice agents (`LiveKit`, `ReactFlow`, `LangGraph`), Dual Vector Store topology (`Milvus` 3072-d for live voice + `PostgreSQL 16 pgvector halfvec(3072)` for post-call QA), 4-Arm Hybrid Policy RAG (`94.2%` hit rate), and Consolidated 9-Domain Single-Pass LLM Orchestrator (~5× token cost reduction: 1,120 calls / 4.82M tokens for `$1.4820`).
3. **[Auri (Sage Chat Platform) — Domain-Aware Action AI & Multi-Tenant Plugin Platform](https://fmxr79etvf.execute-api.ap-southeast-2.amazonaws.com/)**
   - Multi-tenant action assistant executing live REST APIs across Finance, Payments, Real Estate, Healthcare, and HR with a 5-stage fault-tolerant AI engine (`AWS Bedrock Claude 3 Haiku` + zero-latency `Local Scoped NLU` failover), dynamic API contract registry, and self-healing circuit breaker (`Draft -> Test -> Live -> Failing`).
4. **[AlgoAtlas — Algorithmic Upskilling & Conversational AI Coaching Platform](https://d2e3pam5pm0s7f.cloudfront.net/)**
   - Pattern taxonomy graph, AST complexity analyzer, SM-2+ decay-aware spaced-repetition revision workflows, and a 4-stage Conversational AI Socratic code tutor.

## 🔬 Research Highlights

- **Current Research — Self-Improving Agents & Episodic Memory:** Salience-scored episodic memory consolidation (`Salience = 0.30*EntityCoverage + 0.25*AgentDiversity + 0.25*ActionItems + 0.20*SummaryRichness`), self-healing tool contract circuit breakers, and zero-hallucination evidence verification loops.
- **Production AI — Cost-Optimized Multi-Arm Hybrid RAG:** 4-Arm Reciprocal Rank Fusion (`k=60`), 3-tier adaptive context scaling, deterministic RE2 regex & keyword pre-routers, and single-pass multi-domain prompting reducing LLM token costs by ~5×.
- **College Research (NIT Raipur) — Nested Named Entity Recognition (NNER) with Deep Exhaustive Models:** Exhaustive span-enumeration over hierarchical multi-boundary nested entities.

## ⚡ Performance & SEO Architecture

- **Zero-dependency Brotli/Gzip Node.js HTTP Server** (`server.js`) with immutable asset caching and sub-50ms TTFB.
- **100/100 SEO Readiness:** Semantic HTML5, OpenGraph & Twitter Cards, `Schema.org` JSON-LD (`Person` + `ItemList` of `SoftwareApplication`), `sitemap.xml`, `robots.txt`, and `manifest.json`.
- **Cloud-Native Deployment:** Ready for **Google Cloud Run** (`Dockerfile`, `cloudbuild.yaml`, and automated scripts in [`./deployment/`](./deployment/README.md)).

## 🛠️ Local Development & Google Cloud Deployment

```bash
# Run locally on http://localhost:8080
npm start

# Deploy to Google Cloud Run (see ./deployment/README.md for full details)
./deployment/deploy-gcp-cloudrun.sh <YOUR_GCP_PROJECT_ID> asia-south1
```

## 📬 Contact

- **Email:** [ohri.piyush0190@gmail.com](mailto:ohri.piyush0190@gmail.com)
- **Phone:** +91-9098929737
- **Location:** Hyderabad, Telangana, India
- **GitHub Org:** [github.com/star-tuner](https://github.com/star-tuner)
