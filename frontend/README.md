# ZOVI-like: E-Commerce Operating Intelligence Platform

A full-stack demo of an AI-powered e-commerce operating intelligence platform for the virtual enterprise **QingLan Beauty** (青岚美妆). Built to understand how ZOVI-category products work: data infrastructure, knowledge layers, diagnosis workflows, report generation, and agent orchestration.

## Quick Start

```bash
cd frontend
pnpm install
pnpm dev          # http://localhost:3000
```

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Framework    | Next.js 16 (App Router)                         |
| Language     | TypeScript (strict)                              |
| Styling      | Tailwind CSS v4 + shadcn/ui (base-nova)         |
| Charts       | Recharts                                        |
| Icons        | Lucide React                                    |
| i18n         | next-intl (English + Chinese)                   |
| Data Layer   | Repository pattern with mock implementations    |
| API          | Next.js Route Handlers (24 endpoints)           |
| State        | React hooks + `useApi` custom hook              |

## Project Structure

```
ZOVI-like/
├── dev.md                          # Full product spec (v0.3)
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    └── src/
        ├── middleware.ts               # i18n routing middleware
        │
        ├── app/
        │   ├── layout.tsx              # Root layout
        │   ├── page.tsx                # Root redirect
        │   ├── globals.css             # Global styles
        │   │
        │   ├── api/                    # ── API Route Handlers ──────────
        │   │   ├── auth/
        │   │   │   ├── login/route.ts      POST  /api/auth/login
        │   │   │   └── me/route.ts         GET   /api/auth/me
        │   │   ├── metrics/
        │   │   │   ├── overview/route.ts   GET   /api/metrics/overview
        │   │   │   ├── trend/route.ts      GET   /api/metrics/trend?days=
        │   │   │   ├── channels/route.ts   GET   /api/metrics/channels
        │   │   │   ├── products/route.ts   GET   /api/metrics/products
        │   │   │   └── anomalies/route.ts  GET   /api/metrics/anomalies
        │   │   ├── data/
        │   │   │   ├── sources/route.ts    GET   /api/data/sources
        │   │   │   └── imports/route.ts    GET   /api/data/imports?page=&pageSize=
        │   │   ├── knowledge/
        │   │   │   ├── enterprise/route.ts GET|PUT /api/knowledge/enterprise
        │   │   │   ├── products/route.ts   GET   /api/knowledge/products
        │   │   │   ├── targets/route.ts    GET   /api/knowledge/targets
        │   │   │   ├── cases/route.ts      GET   /api/knowledge/cases
        │   │   │   └── prompts/route.ts    GET   /api/knowledge/prompts
        │   │   ├── diagnosis/
        │   │   │   ├── route.ts            GET|POST /api/diagnosis
        │   │   │   └── [id]/route.ts       GET   /api/diagnosis/:id
        │   │   ├── reports/
        │   │   │   ├── route.ts            GET|POST /api/reports
        │   │   │   └── [id]/
        │   │   │       ├── route.ts        GET   /api/reports/:id
        │   │   │       ├── status/route.ts PATCH /api/reports/:id/status
        │   │   │       └── feedback/route.ts POST /api/reports/:id/feedback
        │   │   ├── agents/
        │   │   │   ├── route.ts            GET   /api/agents?includeRuns=
        │   │   │   └── [id]/run/route.ts   POST  /api/agents/:id/run
        │   │   ├── agent-runs/
        │   │   │   └── [id]/route.ts       GET   /api/agent-runs/:id
        │   │   └── workspace/
        │   │       └── route.ts            GET   /api/workspace
        │   │
        │   └── [locale]/               # ── Pages (i18n) ───────────────
        │       ├── layout.tsx              # Locale-aware root layout
        │       ├── page.tsx                # Landing / redirect
        │       ├── login/page.tsx          # Role-based login
        │       └── (dashboard)/            # Authenticated layout group
        │           ├── layout.tsx          # Sidebar + header shell
        │           ├── workspace/page.tsx
        │           ├── dashboard/page.tsx
        │           ├── data-center/page.tsx
        │           ├── knowledge-center/page.tsx
        │           ├── diagnosis/
        │           │   ├── page.tsx            # Diagnosis list
        │           │   └── [id]/page.tsx       # Diagnosis detail
        │           ├── reports/
        │           │   ├── page.tsx            # Reports list
        │           │   └── [id]/page.tsx       # Report detail
        │           ├── agent-center/
        │           │   ├── page.tsx            # Agent list + run history
        │           │   └── [id]/page.tsx       # Agent run detail
        │           └── settings/page.tsx
        │
        ├── components/
        │   ├── ui/                     # shadcn/ui primitives
        │   │   ├── avatar.tsx, badge.tsx, button.tsx, card.tsx
        │   │   ├── progress.tsx, select.tsx, separator.tsx
        │   │   ├── sheet.tsx, tabs.tsx, textarea.tsx, tooltip.tsx
        │   ├── layout/
        │   │   ├── sidebar.tsx         # Main navigation sidebar
        │   │   ├── header.tsx          # Top bar with user/locale
        │   │   └── locale-switcher.tsx # EN/ZH toggle
        │   └── diagnosis/
        │       └── result-view.tsx     # Structured diagnosis result renderer
        │
        ├── lib/
        │   ├── api-client.ts           # Typed fetch wrapper + endpoint helpers
        │   ├── use-api.ts              # React data-fetching hook
        │   ├── utils.ts                # cn() and general utils
        │   │
        │   ├── mock-api/               # ── Raw Mock Data ──────────────
        │   │   ├── helpers.ts          # Seeded RNG, bilingual helpers
        │   │   ├── metrics.ts          # KPIs, trends, channels, anomalies
        │   │   ├── products.ts         # 10 SKUs + product metrics generator
        │   │   ├── knowledge.ts        # Enterprise profile, targets, cases, prompts
        │   │   ├── diagnosis.ts        # 8 diagnosis results (3 types)
        │   │   ├── reports.ts          # 5 reports with full markdown
        │   │   ├── agents.ts           # 5 agent definitions + 10 run records
        │   │   ├── data-center.ts      # 8 data sources, 12 imports, field mappings
        │   │   ├── workspace.ts        # Users + pending tasks
        │   │   └── index.ts            # Barrel export
        │   │
        │   ├── repositories/           # ── Data Abstraction Layer ─────
        │   │   ├── interfaces.ts       # 8 repository interfaces (contracts)
        │   │   ├── index.ts            # Registry: getRepo() → active impl
        │   │   └── mock/               # Mock implementations
        │   │       ├── store.ts        # Mutable in-memory store (singleton)
        │   │       ├── auth.ts
        │   │       ├── metrics.ts
        │   │       ├── data-center.ts
        │   │       ├── knowledge.ts
        │   │       ├── diagnosis.ts     # LLM-powered diagnosis creation
        │   │       ├── reports.ts       # LLM-powered report generation
        │   │       ├── agents.ts        # LLM-powered agent execution
        │   │       ├── workspace.ts
        │   │       └── index.ts
        │   │
        │   ├── llm/                    # ── LLM Provider Abstraction ───
        │   │   ├── interfaces.ts       # ILLMProvider + completeJSON helper
        │   │   ├── index.ts            # Registry: getLLM() → active provider
        │   │   ├── prompts.ts          # Prompt builders (diagnosis, report, agent)
        │   │   ├── mock.ts             # Pre-written responses (no API calls)
        │   │   ├── deepseek.ts         # DeepSeek API (OpenAI-compatible)
        │   │   └── local.ts            # Local LLM (ollama/vLLM)
        │   │
        │   └── (legacy mock files)     # Older mock data, gradually being replaced
        │       ├── mock-data.ts
        │       ├── mock-diagnosis.ts
        │       ├── mock-reports.ts
        │       ├── mock-agents.ts
        │       ├── mock-knowledge.ts
        │       └── mock-collaboration.ts
        │
        ├── types/
        │   └── api.ts                  # All request/response types (single source of truth)
        │
        ├── i18n/
        │   ├── config.ts              # Supported locales
        │   ├── routing.ts             # i18n route config
        │   ├── request.ts             # Server-side locale
        │   └── navigation.ts          # Typed link/redirect helpers
        │
        └── messages/
            ├── en.json                 # English translations
            └── zh.json                 # Chinese translations
```

## Architecture

### Data Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐
│  UI Pages    │───▸│  api-client  │───▸│  API Route Handlers  │
│  (React)     │    │  (fetch)     │    │  (Next.js /api/*)    │
└──────────────┘    └──────────────┘    └──────────┬───────────┘
                                                   │
                                          getRepo() │
                                                   ▼
                                        ┌──────────────────────┐
                                        │  Repository Layer    │
                                        │  (interfaces.ts)     │
                                        └──────────┬───────────┘
                                                   │
                                    ┌──────────────┼──────────────┐
                                    ▼              ▼              ▼
                              ┌──────────┐  ┌──────────┐  ┌──────────┐
                              │  Mock    │  │ Postgres │  │ Supabase │
                              │  (now)   │  │ (future) │  │ (future) │
                              └──────────┘  └──────────┘  └──────────┘
```

### Repository Pattern

All API routes are **data-source agnostic**. They call `getRepo()` which returns the active implementation:

```typescript
// In any route handler:
import { getRepo } from "@/lib/repositories";

export async function GET() {
  const data = await getRepo().metrics.getOverview();
  return NextResponse.json({ success: true, data });
}
```

**To connect a real database:**
1. Create `src/lib/repositories/postgres/` with classes implementing the interfaces
2. Set `NEXT_PUBLIC_DATA_SOURCE=postgres` in `.env`
3. Add the case in `repositories/index.ts`
4. All routes, client code, and UI continue working unchanged

### LLM Provider Abstraction

Same pattern as repositories — the system never knows which LLM is behind the scenes:

```
ILLMProvider interface
  ├── MockLLMProvider      → pre-written responses (offline dev/demo)
  ├── DeepSeekProvider     → DeepSeek API, OpenAI-compatible (testing)
  └── LocalLLMProvider     → ollama/vLLM for enterprise production
```

Set `NEXT_PUBLIC_LLM_PROVIDER` to switch:
- `mock` — pre-written responses, no API calls (default)
- `deepseek` — needs `DEEPSEEK_API_KEY`
- `local` — needs `LOCAL_LLM_BASE_URL` (default: ollama at localhost:11434)

LLM is wired into **diagnosis**, **report generation**, and **agent execution**. When a user starts a diagnosis or agent run:
1. A record is created with `status: "running"`
2. The LLM is called in the background with business context from the knowledge center
3. The result is parsed and stored — status becomes `"completed"`
4. The frontend polls until done

### Stateful In-Memory Store

The mock repositories use a **mutable in-memory store** (`store.ts`) instead of static imports:
- POST creates real records in the store
- GET retrieves them — including newly created ones
- PATCH/PUT mutates existing records
- Data persists across requests within a server session
- All seeded with the original mock data on startup

### API Response Convention

All endpoints return:
```json
{
  "success": true,
  "data": { ... }
}
```

Paginated endpoints return:
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 42,
    "page": 1,
    "pageSize": 20
  }
}
```

## API Endpoint Reference

| Method | Endpoint                       | Description                          |
| ------ | ------------------------------ | ------------------------------------ |
| POST   | `/api/auth/login`              | Login by role                        |
| GET    | `/api/auth/me`                 | Get current user from token          |
| GET    | `/api/metrics/overview`        | KPI overview (8 metrics)             |
| GET    | `/api/metrics/trend`           | Daily trend data (84 days)           |
| GET    | `/api/metrics/channels`        | Per-channel breakdown (6 channels)   |
| GET    | `/api/metrics/products`        | Per-product metrics (10 SKUs)        |
| GET    | `/api/metrics/anomalies`       | Detected anomalies (7 items)         |
| GET    | `/api/data/sources`            | Data source registry                 |
| GET    | `/api/data/imports`            | Import history (paginated)           |
| GET    | `/api/knowledge/enterprise`    | Enterprise profile                   |
| PUT    | `/api/knowledge/enterprise`    | Update enterprise profile            |
| GET    | `/api/knowledge/products`      | Product catalog                      |
| GET    | `/api/knowledge/targets`       | Business targets                     |
| GET    | `/api/knowledge/cases`         | Historical cases (wins/losses)       |
| GET    | `/api/knowledge/prompts`       | Prompt templates                     |
| GET    | `/api/diagnosis`               | List diagnoses (paginated, filtered) |
| POST   | `/api/diagnosis`               | Start new diagnosis run              |
| GET    | `/api/diagnosis/:id`           | Get diagnosis by ID                  |
| GET    | `/api/reports`                 | List reports (paginated, filtered)   |
| POST   | `/api/reports`                 | Generate new report                  |
| GET    | `/api/reports/:id`             | Get full report with markdown        |
| PATCH  | `/api/reports/:id/status`      | Update report status                 |
| POST   | `/api/reports/:id/feedback`    | Add feedback to report               |
| GET    | `/api/agents`                  | List agents (+ optional runs)        |
| POST   | `/api/agents/:id/run`          | Start agent run                      |
| GET    | `/api/agent-runs/:id`          | Get agent run status/output          |
| GET    | `/api/workspace`               | Aggregated workspace dashboard       |

## Virtual Enterprise: QingLan Beauty

- **10 SKUs** across serums, creams, sunscreen, cleanser, toner, eye care, body care, treatment
- **6 channels**: Tmall, Douyin, Xiaohongshu, JD, Pinduoduo, Offline
- **5 roles**: CEO, Ops Lead, Analyst, Product Manager, Douyin Lead
- **8 diagnoses**: weekly reviews, campaign retros, anomaly deep dives
- **5 agents**: Business Analyst, Report Writer, Campaign Reviewer, Anomaly Investigator, Competitor Intelligence
- **Bilingual**: all business data has EN/ZH bilingual support

## Development Phases

### Phase 1: Frontend Scaffold (DONE)
- Next.js setup with i18n, Tailwind, shadcn/ui
- All 9 navigation routes scaffolded
- Login page with role selection
- Dashboard layout with sidebar + header

### Phase 2: Data Center + Dashboard Interactivity (DONE)
- Mock data generation (seeded, reproducible)
- 24 API route handlers
- Dashboard with KPI cards, trend charts, channel/product tables
- Data center with source list and import history
- Workspace aggregation page

### Phase 3: Repository Pattern + API Abstraction (DONE)
- 8 repository interfaces as contracts
- Mock implementations wrapping existing data
- Central registry with env-based switching
- All routes refactored to use `getRepo()`

### Phase 4: Stateful APIs + LLM Abstraction (DONE)
- In-memory store with mutable state (CRUD works for real)
- LLM provider abstraction: `ILLMProvider` interface
- Mock provider (pre-written responses), DeepSeek provider, Local LLM provider
- Prompt builders with business context injection from knowledge center
- Diagnosis, report generation, and agent execution all wired to LLM
- Frontend polling for async LLM operations
- Diagnosis page fully refactored to use real API calls
- Report generation wired to API
- `usePolling` hook for long-running operations

### Phase 5: Full Page Migration + DeepSeek Testing (NEXT)
- Migrate agent-center pages from old mock format to API
- Test end-to-end with DeepSeek API key
- Add streaming responses for real-time LLM output display
- Error handling and retry UX for LLM failures

### Phase 6: Real Data Integration (PLANNED)
- Connect to PostgreSQL/Supabase
- Implement repository interfaces with real queries
- Data import pipeline (CSV/Excel upload)
- Live data sync from channel APIs

### Phase 7: Knowledge Center Enhancement (PLANNED)
- Dynamic knowledge graph
- Business context injection tuning
- Case learning from diagnosis/report feedback
- Prompt template management with versioning

### Phase 8: Collaboration (PLANNED)
- Task assignment and tracking
- Multi-role approval workflows
- Activity feed and notifications
- Team workspace features
