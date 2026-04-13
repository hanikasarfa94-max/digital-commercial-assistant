# ZOVI-like Platform Rebuild Spec v0.3

## 1. Document Purpose

This document defines the development spec for a **ZOVI-like e-commerce operating intelligence platform**.

The goal is **not** to perfectly replicate a real commercial system in all of its complexity. Instead, the goal is to build a **full-platform skeleton with one runnable representative capability per layer**, so the result is:

1. Runnable
2. Demo-ready
3. Iteration-friendly
4. Useful as a business-understanding vehicle for an incoming AI PM
5. Directly actionable for Claude Code / Cursor / Opus / other coding agents

This platform should help the builder understand how products in the ZOVI category actually work: not just as LLM wrappers, but as a combination of:

* business data infrastructure
* operating knowledge layers
* diagnosis workflows
* report-generation systems
* agentized task orchestration

---

## 2. Project Goals

### 2.1 Overall Goal

Within 3–6 weeks, build a **single-tenant, virtual-enterprise-oriented e-commerce operating intelligence platform demo** that covers the following end-to-end path:

**data ingestion → operating dashboard → intelligent diagnosis → strategy generation → polished report output → agent workflows → report archive and task circulation**

### 2.2 Success Criteria

The v1 demo is considered usable if it satisfies the following:

1. A user can log in and enter an enterprise workspace.
2. A user can upload or import mock business data.
3. The system can generate a basic operating dashboard automatically.
4. A user can initiate at least 3 diagnostic task types:

   * weekly review
   * campaign retrospective
   * single-metric anomaly analysis
5. The system can generate structured analysis output and at least one directly usable finished report.
6. A user can view historical reports, duplicate them, export them, and regenerate them.
7. The system contains at least 3 runnable agents:

   * Business Analyst
   * Weekly Report Writer
   * Campaign Review Assistant
8. The system contains an enterprise knowledge center that can provide business context for AI outputs.

### 2.3 Non-Goals

The following are explicitly out of scope for v1:

1. No true multi-tenant SaaS permission system.
2. No billing or pricing system.
3. No large-scale real platform API integrations.
4. No high-fidelity visual design.
5. No advanced ontology engine or graph-editing UI.
6. No deep IM / chat app workflow integration in v1.

---

## 3. Product Positioning

### 3.1 One-Sentence Definition

This is an **AI operating system for e-commerce management teams**, designed to combine business data, enterprise knowledge, and expert analysis workflows into actionable operating judgments and polished business outputs.

### 3.2 How It Differs from Other Products

#### Versus BI dashboards

BI tools display data. This platform should:

* detect anomalies
* produce preliminary root-cause reasoning
* suggest actions
* generate finished outputs
* embed analysis into workflows

#### Versus general chat assistants

General chat assistants answer questions. This platform should operate on:

* enterprise business context
* structured performance data
* metric movements
* fixed business templates
* multi-role output requirements

#### Versus desktop execution agents

Desktop execution agents focus on action execution. This platform focuses more on:

* business understanding
* diagnosis logic
* knowledge accumulation
* reporting collaboration
* organization-level decision support

---

## 4. Target Users and Roles

### 4.1 Primary Users

#### Role A: E-commerce Operations Lead

* Cares about: GMV, conversion rate, ROI, channel health, campaign performance
* Frequent tasks: reading weekly reviews, running business meetings, coordinating actions, planning next-week initiatives
* Key need: fast access to trustworthy, actionable, meeting-ready outputs

#### Role B: CEO / Business Owner

* Cares about: overall operating health, major risks, major opportunities, key anomalies, compressed conclusions
* Frequent tasks: reading summaries, making judgments, setting priorities
* Key need: fewer details, more conclusions and priority actions

#### Role C: Channel / Content / Product Operators

* Cares about: module-specific performance, concrete optimization actions, execution priority
* Frequent tasks: checking assigned actions and results
* Key need: operationally specific recommendations

### 4.2 Secondary Users

* Analysts: validate data definitions and result quality
* AI PM / Product Manager: design workflows, evaluate output quality, iterate diagnosis logic and agents

---

## 5. Virtual Enterprise Setup (Single-Tenant Demo)

To accelerate development and business understanding, the platform should serve one default virtual enterprise.

### 5.1 Basic Enterprise Profile

**Company Name:** QingLan Beauty Co., Ltd.
**Brand Name:** QingLan
**Industry:** Domestic skincare
**Core Categories:** serum, cream, sunscreen, facial cleanser
**Business Model:** DTC + marketplace e-commerce
**Primary Channels:**

* Tmall flagship store
* Douyin flagship store
* Xiaohongshu content seeding and traffic generation

### 5.2 Product Lines

* SKU001: Brightening Serum
* SKU002: Repair Cream
* SKU003: Lightweight Sunscreen Milk
* SKU004: Amino Acid Facial Cleanser

### 5.3 Internal Roles

* CEO / Brand Lead
* E-commerce Operations Lead
* Douyin Performance Lead
* Tmall Store Operator
* Product Manager
* Data Analyst

### 5.4 Business Objectives

* monthly GMV growth
* stable ad ROI
* sustained hero-product growth
* successful first-month launch performance for new products
* controlled refund rate

### 5.5 Predefined Business Events

To support diagnosis and retrospectives, the demo should include events such as:

1. sunscreen product launch in March
2. mid-March influencer traffic expansion
3. end-of-month Tmall promotion
4. Douyin traffic fluctuation causing conversion decline
5. low-price competitor attack on the serum category

---

## 6. Virtual Enterprise Roleplay Agent (Optional Module)

This module is not required for v1, but it is strongly recommended as a learning and evaluation tool.

### 6.1 Goal

Create an internal **business-side roleplay agent** that simulates stakeholder viewpoints and acts as:

* requirement requester
* output evaluator
* business-context supplementer

### 6.2 Possible Role Personas

* CEO Agent: cares mainly about conclusions, risks, opportunities, and executive summary quality
* Operations Lead Agent: cares about root causes and next-step actions
* Performance Agent: cares about channels, media efficiency, and creatives
* Product Manager Agent: cares about launches, selling points, competition, and conversion issues

### 6.3 Typical Uses

1. role-specific scoring of AI outputs
2. simulated requirement inputs
3. testing multi-role output adaptation
4. PM self-testing and demo enhancement

---

## 7. Information Architecture

### 7.1 Primary Navigation

1. Workspace
2. Data Center
3. Knowledge Center
4. Operating Dashboard
5. Intelligent Diagnosis
6. Strategy & Final Outputs
7. Agent Center
8. Reports & Tasks
9. System Settings

### 7.2 Page Overview

#### 7.2.1 Workspace

Shows:

* today’s operating summary
* recent anomaly alerts
* pending diagnosis tasks
* recent reports
* recent agent runs

#### 7.2.2 Data Center

Shows:

* data source list
* upload entry
* recent sync history
* field mapping
* data preview
* data health status

#### 7.2.3 Knowledge Center

Shows:

* enterprise background
* product records
* channel notes
* business targets
* historical winning/losing cases
* prompt templates / analysis rules

#### 7.2.4 Operating Dashboard

Shows:

* core metric overview
* channel performance
* product performance
* campaign performance
* anomaly alerts

#### 7.2.5 Intelligent Diagnosis

Supports:

* starting a diagnosis task
* viewing structured results
* viewing evidence and context
* follow-up prompts and reruns

#### 7.2.6 Strategy & Final Outputs

Supports:

* generating weekly reports
* generating retrospective reports
* generating CEO summaries
* generating action lists
* exporting to Markdown / PDF / plain text

#### 7.2.7 Agent Center

Supports:

* viewing available agents
* entering tasks
* running agents
* checking status and outputs

#### 7.2.8 Reports & Tasks

Supports:

* report list
* status management
* historical versions
* owner assignment
* export and duplication

---

## 8. Core Business Object Model

### 8.1 Enterprise

* id
* name
* industry
* description
* created_at

### 8.2 Brand

* id
* enterprise_id
* name
* category
* positioning

### 8.3 Channel

* id
* enterprise_id
* name
* type (tmall / douyin / xiaohongshu / manual)
* status

### 8.4 Product

* id
* enterprise_id
* sku
* name
* category
* price_band
* lifecycle_stage

### 8.5 MetricSnapshot

* id
* enterprise_id
* channel_id
* product_id (nullable)
* date
* gmv
* uv
* conversion_rate
* aov
* roi
* refund_rate
* spend
* orders

### 8.6 Campaign

* id
* enterprise_id
* name
* channel_id
* start_date
* end_date
* target
* actual_result
* notes

### 8.7 KnowledgeEntry

* id
* enterprise_id
* type
* title
* content
* tags
* source

### 8.8 DiagnosticTask

* id
* enterprise_id
* task_type
* title
* time_range
* input_payload
* status
* created_by
* created_at

### 8.9 DiagnosticResult

* id
* task_id
* summary
* anomalies_json
* hypotheses_json
* risks_json
* recommendations_json
* evidence_json
* raw_llm_output

### 8.10 Report

* id
* enterprise_id
* source_task_id
* report_type
* title
* body_markdown
* status
* owner
* version

### 8.11 AgentRun

* id
* enterprise_id
* agent_type
* input_json
* output_json
* status
* started_at
* finished_at

---

## 9. Data Design and Input Methods

### 9.1 v1 Data Input Methods

Use three input methods in parallel:

1. **CSV/Excel upload**

   * store metric data
   * product data
   * ad/performance data
   * campaign data

2. **Form input**

   * enterprise profile
   * business goals
   * key events

3. **Prebuilt mock connectors / mock datasets**

   * default full demo enterprise data
   * used for out-of-the-box demos

### 9.2 Data Definition Scope

v1 only standardizes a minimal set of metrics:

* GMV
* UV
* conversion rate
* AOV
* ROI
* spend
* refund rate
* order count

### 9.3 Data Quality Mechanisms

After each import, generate:

* field mapping result
* missing field warnings
* time-range consistency checks
* duplicate-data warnings
* abnormal-value warnings

---

## 10. Core Business Flows

### 10.1 Data Ingestion Flow

1. User enters Data Center
2. User selects import type
3. User uploads file or loads mock data
4. System performs field mapping
5. User confirms import
6. Data is written into storage
7. Dashboard data is refreshed automatically

### 10.2 Weekly Review Diagnosis Flow

1. User enters Intelligent Diagnosis
2. User selects “Weekly Review”
3. User selects time range
4. User selects channels/products
5. System extracts metrics and anomaly points
6. System combines enterprise knowledge and context
7. System outputs structured diagnostic results
8. User clicks “Generate Final Report”
9. System generates meeting-ready weekly report
10. User confirms and saves

### 10.3 Campaign Retrospective Flow

1. User selects “Campaign Review”
2. User binds a campaign
3. System loads campaign target and result
4. System analyzes attainment and anomalies
5. System outputs retrospective conclusions and recommendations
6. System generates retrospective report draft

### 10.4 Agent Task Flow

1. User enters Agent Center
2. User selects an agent
3. User inputs task description
4. System selects context and templates
5. Agent runs
6. System returns result
7. User accepts / retries / converts to report

---

## 11. AI Design

### 11.1 AI Design Principles

1. Outputs should be structured whenever possible; do not rely on free-form text first.
2. Use rules + LLM, with rules before generation.
3. Results must separate:

   * known facts
   * inferred hypotheses
   * pending validation items
4. Outputs must support multiple audience roles.

### 11.2 Core AI Capabilities

#### Capability A: anomaly identification

Input: metric tables
Output: anomaly list, anomaly severity, relevant dimensions

#### Capability B: preliminary root-cause reasoning

Input: anomalies + campaign/channel/product context
Output: candidate causes with confidence

#### Capability C: recommendation generation

Input: diagnostic result + enterprise context
Output: action recommendations

#### Capability D: final-output generation

Input: structured results + templates + audience role
Output: weekly report / retrospective / CEO summary / action list

### 11.3 Output JSON Schema Example

```json
{
  "summary": "Overall performance was under pressure this week, mainly due to a decline in Douyin conversion rate and weak payback from the sunscreen launch campaign.",
  "anomalies": [
    {
      "metric": "conversion_rate",
      "scope": "douyin",
      "change": "-18%",
      "severity": "high"
    }
  ],
  "hypotheses": [
    {
      "reason": "Creative fatigue from influencer assets led to weaker post-click conversion.",
      "confidence": 0.72
    }
  ],
  "risks": [
    "If conversion rate declines continue for two weeks, ROI may fall below the target threshold."
  ],
  "recommendations": [
    "Refresh influencer creatives and reduce spend on low-efficiency ad groups.",
    "Review the product detail page and negative feedback in comments."
  ],
  "pending_checks": [
    "Verify CTR movement for newly added creatives over the last 7 days.",
    "Check customer service feedback regarding product texture complaints."
  ]
}
```

### 11.4 Prompt Layering Recommendation

* System Prompt: role, tone, constraints, output discipline
* Business Context Prompt: enterprise background, goals, role structure
* Data Prompt: metric summary and events
* Output Prompt: required JSON schema or markdown format

---

## 12. Agent Design

### 12.1 Required v1 Agents

#### Agent 1: Business Analyst

Responsibility: generate weekly business diagnosis from selected time range and data.

#### Agent 2: Weekly Report Writer

Responsibility: transform structured diagnosis into a polished report draft.

#### Agent 3: Campaign Reviewer

Responsibility: generate structured campaign retrospective conclusions.

### 12.2 Optional v1.5 Agents

* Data QA Inspector
* Product Opportunity Analyst
* Competitor Observer
* CEO Brief Assistant

### 12.3 Agent Interaction Pattern

* form-based task input
* run status display
* structured result display
* one-click convert to report
* one-click copy/export

---

## 13. Final Output Types

### 13.1 Weekly Report

Output structure:

1. overall weekly conclusion
2. key anomalies and highlights
3. cause analysis
4. next-week action suggestions
5. risks and pending checks

### 13.2 Campaign Retrospective

Output structure:

1. campaign target
2. actual performance
3. key wins and losses
4. cause breakdown
5. future recommendations

### 13.3 CEO Summary

Output structure:

1. one-line conclusion
2. three key bullets
3. one to two recommended actions

### 13.4 Action List

Output structure:

* owner
* action
* priority
* timing requirement

---

## 14. Technical Architecture Recommendation

### 14.1 Recommended Stack

#### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts

#### Backend

* FastAPI
* Python
* SQLAlchemy or an equivalent ORM
* Celery / background tasks later if needed

#### Data Layer

* PostgreSQL
* Redis
* pgvector or Qdrant
* MinIO or local file storage

#### AI Layer

* LLM provider abstraction
* prompt template management
* retrieval module
* JSON output validation

### 14.2 System Layering

1. frontend presentation layer
2. application/API service layer
3. task and agent orchestration layer
4. data and knowledge layer
5. LLM invocation layer

---

## 15. Development Priorities

### Phase 1: platform skeleton

* login page
* workspace
* navigation shell
* base database models
* mock data import

### Phase 2: data center + dashboard

* upload flow
* field mapping
* metric cards
* trend charts
* anomaly list

### Phase 3: intelligent diagnosis

* weekly review
* campaign review
* structured result display

### Phase 4: final output generation

* weekly report
* retrospective
* CEO summary
* export

### Phase 5: agent center

* Business Analyst agent
* Weekly Report Writer agent
* Campaign Reviewer agent

### Phase 6: knowledge center

* enterprise context
* product notes
* historical cases
* prompt context injection

### Phase 7: collaboration and refinement

* report status
* ownership
* version history
* feedback scoring

---

## 16. Evaluation Metrics

### 16.1 Product-Level Metrics

* diagnosis task completion rate
* report generation rate
* report save rate
* export rate

### 16.2 AI-Level Metrics

* structured output validity rate
* actionability score
* root-cause plausibility score
* multi-role adaptation score

### 16.3 Demo-Level Metrics

* time from login to first generated weekly report
* whether a new user can finish the core loop within 10 minutes

---

## 17. Risks and Warnings

1. Do not overbuild multi-agent orchestration too early.
2. Do not start page implementation before defining schemas.
3. Do not send raw dirty business data directly into the model with no preprocessing.
4. Do not turn the system into “a chatbot wearing a dashboard UI.”
5. Do not ignore report persistence and task circulation; this is what makes it feel like an enterprise platform.

---

## 18. Claude Code Collaboration Guidelines

### 18.1 Development Principles

* move one module at a time
* define data structures before UI
* standardize AI outputs as JSON
* run every page first on mock data
* make each phase independently demoable

### 18.2 Suggested Build Order

1. initialize project and layout
2. create database schema and mock data
3. build workspace and data center
4. build dashboard
5. build intelligent diagnosis page
6. build report generation page
7. build agent center
8. build knowledge center
9. build reports page

### 18.3 Preferred Task Granularity for Claude Code

Each task should ideally be scoped as one of the following:

* implement one page
* implement one object model
* implement one import flow
* implement one AI task API
* implement one report renderer

---

## 19. Current Document Status

At the current stage, the document already defines:

* product goals
* user roles
* virtual enterprise
* information architecture
* core object model
* main workflows
* AI design principles
* agent design
* technical architecture
* phased development path

This is sufficient as a starting build spec and as a parent document for more detailed PRDs, data models, API definitions, and task decomposition.

---

## 20. Database Schema Design (v0.2)

This section translates the business object model into relational database structures. PostgreSQL is the primary database.

### 20.1 Design Principles

1. Keep business core tables simple.
2. Allow JSON fields for AI intermediate structures.
3. Every major table should keep `created_at` and `updated_at`.
4. Every soft-delete-capable table may later add `deleted_at` if needed.
5. The demo is single-tenant, but `enterprise_id` should still be retained to preserve future upgradeability.

### 20.2 enterprises

Purpose: enterprise master table.

Fields:

* id (uuid, pk)
* name (varchar, not null)
* industry (varchar)
* description (text)
* logo_url (varchar)
* created_at (timestamp)
* updated_at (timestamp)

### 20.3 users

Purpose: platform user table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk -> enterprises.id)
* name (varchar, not null)
* email (varchar, unique)
* password_hash (varchar)
* role (varchar)
  allowed: `ceo`, `ops_lead`, `channel_operator`, `product_manager`, `analyst`, `admin`
* avatar_url (varchar)
* status (varchar)
  allowed: `active`, `inactive`
* created_at (timestamp)
* updated_at (timestamp)

### 20.4 brands

Purpose: brand table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* name (varchar, not null)
* category (varchar)
* positioning (text)
* created_at (timestamp)
* updated_at (timestamp)

### 20.5 channels

Purpose: channel table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* name (varchar, not null)
* type (varchar, not null)
  allowed: `tmall`, `douyin`, `xiaohongshu`, `jd`, `manual`
* status (varchar)
  allowed: `active`, `inactive`
* description (text)
* created_at (timestamp)
* updated_at (timestamp)

### 20.6 products

Purpose: product master table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* brand_id (uuid, fk -> brands.id)
* sku (varchar, unique)
* name (varchar, not null)
* category (varchar)
* price_band (varchar)
* lifecycle_stage (varchar)
  allowed: `new`, `growth`, `mature`, `declining`
* launch_date (date)
* description (text)
* created_at (timestamp)
* updated_at (timestamp)

### 20.7 metric_snapshots

Purpose: fact table for business metrics; this is the analytical core.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* channel_id (uuid, fk -> channels.id)
* product_id (uuid, fk -> products.id, nullable)
* snapshot_date (date, not null)
* gmv (numeric)
* uv (integer)
* conversion_rate (numeric)
* aov (numeric)
* roi (numeric)
* refund_rate (numeric)
* spend (numeric)
* orders (integer)
* impressions (integer, nullable)
* clicks (integer, nullable)
* ctr (numeric, nullable)
* created_at (timestamp)
* updated_at (timestamp)

Suggested indexes:

* `(enterprise_id, snapshot_date)`
* `(channel_id, snapshot_date)`
* `(product_id, snapshot_date)`

### 20.8 campaigns

Purpose: campaign master table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* channel_id (uuid, fk)
* name (varchar, not null)
* campaign_type (varchar)
  allowed: `promotion`, `launch`, `ad_push`, `seasonal`
* start_date (date)
* end_date (date)
* target_json (jsonb)
* actual_result_json (jsonb)
* notes (text)
* created_at (timestamp)
* updated_at (timestamp)

### 20.9 business_events

Purpose: key business events that affect analysis quality.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* title (varchar, not null)
* event_type (varchar)
  allowed: `product_launch`, `competitor_move`, `traffic_change`, `price_change`, `ops_action`, `other`
* event_date (date)
* description (text)
* related_channel_id (uuid, nullable)
* related_product_id (uuid, nullable)
* created_at (timestamp)
* updated_at (timestamp)

### 20.10 knowledge_entries

Purpose: enterprise knowledge center main table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* type (varchar, not null)
  allowed: `company_profile`, `product_note`, `channel_rule`, `strategy_case`, `diagnosis_rule`, `prompt_template`, `historical_review`
* title (varchar, not null)
* content (text, not null)
* tags (jsonb)
* source (varchar)
* embedding_status (varchar)
  allowed: `pending`, `done`, `failed`
* created_at (timestamp)
* updated_at (timestamp)

### 20.11 data_import_jobs

Purpose: import task table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* import_type (varchar)
  allowed: `metrics`, `products`, `campaigns`, `events`
* file_name (varchar)
* file_path (varchar)
* status (varchar)
  allowed: `pending`, `processing`, `success`, `failed`
* mapping_json (jsonb)
* error_json (jsonb)
* created_by (uuid, fk -> users.id)
* created_at (timestamp)
* updated_at (timestamp)

### 20.12 diagnostic_tasks

Purpose: diagnosis task queue table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* task_type (varchar, not null)
  allowed: `weekly_review`, `campaign_review`, `metric_anomaly`, `product_analysis`
* title (varchar, not null)
* time_range_start (date)
* time_range_end (date)
* input_payload (jsonb)
* status (varchar)
  allowed: `draft`, `queued`, `running`, `completed`, `failed`
* created_by (uuid, fk -> users.id)
* created_at (timestamp)
* updated_at (timestamp)

### 20.13 diagnostic_results

Purpose: diagnosis result table.

Fields:

* id (uuid, pk)
* task_id (uuid, fk -> diagnostic_tasks.id)
* summary (text)
* anomalies_json (jsonb)
* hypotheses_json (jsonb)
* risks_json (jsonb)
* recommendations_json (jsonb)
* evidence_json (jsonb)
* pending_checks_json (jsonb)
* raw_llm_output (jsonb)
* model_name (varchar)
* prompt_version (varchar)
* created_at (timestamp)
* updated_at (timestamp)

### 20.14 reports

Purpose: final output / report table.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* source_task_id (uuid, fk -> diagnostic_tasks.id, nullable)
* report_type (varchar)
  allowed: `weekly_report`, `campaign_report`, `ceo_summary`, `action_list`
* title (varchar, not null)
* body_markdown (text)
* body_json (jsonb, nullable)
* status (varchar)
  allowed: `draft`, `confirmed`, `published`, `archived`
* owner_id (uuid, fk -> users.id)
* version (integer, default 1)
* created_at (timestamp)
* updated_at (timestamp)

### 20.15 agent_runs

Purpose: agent execution log.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* agent_type (varchar, not null)
  allowed: `analyst`, `weekly_writer`, `campaign_reviewer`, `ceo_brief`, `qa_reviewer`
* input_json (jsonb)
* output_json (jsonb)
* status (varchar)
  allowed: `queued`, `running`, `completed`, `failed`
* related_task_id (uuid, nullable)
* error_message (text, nullable)
* started_at (timestamp)
* finished_at (timestamp)
* created_at (timestamp)
* updated_at (timestamp)

### 20.16 report_feedbacks

Purpose: feedback scoring table for reports.

Fields:

* id (uuid, pk)
* enterprise_id (uuid, fk)
* report_id (uuid, fk -> reports.id)
* user_id (uuid, fk -> users.id)
* usefulness_score (integer)
* correctness_score (integer)
* actionability_score (integer)
* comment (text)
* created_at (timestamp)
* updated_at (timestamp)

### 20.17 Minimal ER Structure

* one enterprise has many users / brands / channels / products / metric snapshots / knowledge entries / diagnostic tasks / reports / agent runs
* one diagnostic task has zero or one diagnostic result
* one diagnostic task can generate multiple reports
* one report can receive multiple pieces of feedback
* one campaign is associated with metric snapshots indirectly by channel + time range in v1

---

## 21. API Design Document (v0.2)

The platform should use REST as the primary API style. SSE or websocket support may be added later for long-running AI tasks.

### 21.1 General API Conventions

* Base URL: `/api/v1`
* Authentication: simplified JWT for demo stage
* Unified success response:

```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

Unified error response:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required field: time_range_start"
  }
}
```

### 21.2 Authentication and User Endpoints

#### POST `/auth/login`

Purpose: log in.

Request body:

```json
{
  "email": "opslead@qinglan.com",
  "password": "demo1234"
}
```

Returns: token, user info, enterprise info.

#### GET `/me`

Purpose: fetch current user profile.

#### GET `/users`

Purpose: fetch current enterprise users.

---

### 21.3 Enterprise and Basic Metadata

#### GET `/enterprise/profile`

Purpose: fetch current enterprise profile.

#### PUT `/enterprise/profile`

Purpose: update enterprise profile.

#### GET `/brands`

Purpose: fetch brand list.

#### GET `/channels`

Purpose: fetch channel list.

#### GET `/products`

Purpose: fetch product list.

Supported query params:

* `category`
* `lifecycle_stage`
* `channel_id` (reserved)

#### POST `/products`

Purpose: create product.

---

### 21.4 Data Center

#### GET `/imports`

Purpose: fetch import job list.

#### POST `/imports/upload`

Purpose: upload CSV/Excel file.

FormData:

* `file`
* `import_type`

Returns: import job id and field preview.

#### POST `/imports/{id}/confirm`

Purpose: confirm field mapping and import.

Request body:

```json
{
  "mapping": {
    "Date": "snapshot_date",
    "GMV": "gmv",
    "UV": "uv",
    "Conversion Rate": "conversion_rate"
  }
}
```

#### GET `/imports/{id}`

Purpose: fetch single import job detail.

#### GET `/metrics`

Purpose: fetch metric snapshots.

Supported query params:

* `start_date`
* `end_date`
* `channel_id`
* `product_id`
* `granularity=day|week`

---

### 21.5 Knowledge Center

#### GET `/knowledge`

Purpose: fetch knowledge entries.

Supported query params:

* `type`
* `keyword`

#### POST `/knowledge`

Purpose: create knowledge entry.

#### PUT `/knowledge/{id}`

Purpose: update knowledge entry.

#### DELETE `/knowledge/{id}`

Purpose: delete knowledge entry.

#### POST `/knowledge/reindex`

Purpose: re-embed or reindex knowledge.

---

### 21.6 Workspace and Dashboard

#### GET `/dashboard/summary`

Purpose: fetch workspace summary.

Suggested response includes:

* today’s operating summary
* this week’s key anomalies
* recent reports
* pending tasks

#### GET `/dashboard/overview`

Purpose: fetch dashboard overview data.

Suggested response includes:

* core metric cards
* channel trends
* product trends
* anomaly alerts

#### GET `/dashboard/anomalies`

Purpose: fetch anomaly list.

Supported query params:

* `start_date`
* `end_date`
* `severity`

---

### 21.7 Intelligent Diagnosis

#### POST `/diagnostic-tasks`

Purpose: create diagnosis task.

Request body:

```json
{
  "task_type": "weekly_review",
  "title": "2026-W14 Weekly Review",
  "time_range_start": "2026-04-01",
  "time_range_end": "2026-04-07",
  "input_payload": {
    "channel_ids": ["channel-1", "channel-2"],
    "product_ids": ["product-1"],
    "notes": "Focus on sunscreen launch performance and Douyin volatility."
  }
}
```

#### GET `/diagnostic-tasks`

Purpose: fetch diagnosis task list.

#### GET `/diagnostic-tasks/{id}`

Purpose: fetch diagnosis task detail.

#### POST `/diagnostic-tasks/{id}/run`

Purpose: execute diagnosis task.

#### GET `/diagnostic-tasks/{id}/result`

Purpose: fetch diagnosis result.

#### POST `/diagnostic-tasks/{id}/rerun`

Purpose: rerun diagnosis, optionally with updated notes or prompt settings.

---

### 21.8 Reports and Final Outputs

#### POST `/reports/generate`

Purpose: generate a report from a diagnosis result.

Request body:

```json
{
  "source_task_id": "task-123",
  "report_type": "weekly_report",
  "audience": "ops_lead"
}
```

#### GET `/reports`

Purpose: fetch report list.

Supported query params:

* `report_type`
* `status`
* `owner_id`

#### GET `/reports/{id}`

Purpose: fetch report detail.

#### PUT `/reports/{id}`

Purpose: update report content or status.

#### POST `/reports/{id}/export`

Purpose: export report.

Request body:

```json
{
  "format": "markdown"
}
```

#### POST `/reports/{id}/feedback`

Purpose: submit report feedback score.

---

### 21.9 Agent Center

#### GET `/agents`

Purpose: fetch available agents.

#### POST `/agents/run`

Purpose: run an agent.

Request body:

```json
{
  "agent_type": "analyst",
  "input": {
    "task_type": "weekly_review",
    "time_range_start": "2026-04-01",
    "time_range_end": "2026-04-07"
  }
}
```

#### GET `/agent-runs`

Purpose: fetch agent run history.

#### GET `/agent-runs/{id}`

Purpose: fetch single agent run detail.

#### POST `/agent-runs/{id}/to-report`

Purpose: convert agent output into a report draft.

---

### 21.10 Suggested Backend Service Decomposition

To avoid API sprawl, logically separate the backend into:

1. auth service
2. enterprise service
3. data import service
4. dashboard service
5. diagnostic service
6. report service
7. knowledge service
8. agent service

Deployment can still remain single-service in the demo stage.

---

## 22. Page-Level PRD (v0.2)

This section defines each major page in terms of goal, structure, key interactions, and minimum viable implementation.

### 22.1 Login Page

#### Goal

Allow the user to enter the system as an enterprise member.

#### Elements

* product logo
* login form: email, password
* quick Demo account login button
* one-line positioning copy

#### Key Interactions

* login with email/password
* one-click enter Demo enterprise

#### Minimum Implementation

* static login form
* successful login redirects to workspace

---

### 22.2 Workspace

#### Goal

Serve as the enterprise homepage, showing current operating status and action entry points.

#### Page Structure

1. top bar: enterprise name, time range switcher
2. operating summary cards
3. this week’s key anomalies
4. pending diagnosis tasks
5. recent reports
6. recent agent outputs

#### Key Interactions

* click anomaly to open diagnosis page
* click report to open report detail
* click new task to enter diagnosis creation flow

#### Minimum Implementation

* display 4–6 cards with mock data
* navigation links to diagnosis and reports

---

### 22.3 Data Center

#### Goal

Let the user import business data and manage sources.

#### Page Structure

1. data source cards
2. file upload zone
3. recent import history
4. field mapping modal
5. data quality message area

#### Key Interactions

* upload CSV/Excel
* inspect field preview
* confirm mapping and import
* view failure reason

#### Minimum Implementation

* support one metric file upload flow
* support manual field mapping
* refresh dashboard after successful import

---

### 22.4 Knowledge Center

#### Goal

Store enterprise background, product notes, historical cases, and analysis rules as AI context.

#### Page Structure

1. left-side category nav
2. center entry list
3. right-side detail/editor panel
4. add-entry button
5. tag filter

#### Key Interactions

* view knowledge entry
* create/update entry
* filter by type
* trigger re-embedding

#### Minimum Implementation

* support `company_profile`, `product_note`, `strategy_case`
* support markdown or rich-text editing

---

### 22.5 Operating Dashboard

#### Goal

Let the user quickly understand overall business condition and enter diagnosis from data.

#### Page Structure

1. core metric cards (GMV / UV / conversion rate / ROI / refund rate)
2. trend chart over time
3. channel comparison
4. product ranking
5. anomaly table

#### Key Interactions

* switch time range
* filter by channel/product
* click anomaly to open diagnosis

#### Minimum Implementation

* metric cards + one trend chart + one anomaly table
* channel filtering support

---

### 22.6 Intelligent Diagnosis Page

#### Goal

Allow the user to create diagnosis tasks and inspect structured results.

#### Page Structure

1. task creation area

   * task type selector
   * time-range selector
   * channel/product selector
   * notes input
2. run button
3. result area

   * overall judgment
   * anomalies
   * possible causes
   * risks
   * recommended actions
   * pending checks
4. evidence section (collapsible)

#### Key Interactions

* create and run task
* inspect structured result
* rerun task
* generate final output

#### Minimum Implementation

* support `weekly_review` and `campaign_review`
* show results as fixed result cards

---

### 22.7 Strategy & Final Outputs Page

#### Goal

Turn diagnosis outputs into directly shareable business artifacts.

#### Page Structure

1. report type selector
2. audience selector
3. report preview area
4. editable content area
5. export area

#### Key Interactions

* choose weekly report / retrospective / CEO summary / action list
* regenerate
* manually edit
* save as report
* export Markdown / PDF

#### Minimum Implementation

* support generating one markdown report from a diagnosis result
* support copy and save

---

### 22.8 Agent Center

#### Goal

Productize analysis capabilities as reusable agents.

#### Page Structure

1. agent list
2. agent description cards
3. task input area
4. run status area
5. output area

#### Key Interactions

* select agent
* input task
* execute
* inspect history
* convert to report

#### Minimum Implementation

* provide 3 preset agents
* each agent has a fixed input template

---

### 22.9 Reports & Tasks Page

#### Goal

Persist historical artifacts and support state management and review.

#### Page Structure

1. filter bar (type / status / owner)
2. report list
3. task list tab
4. detail drawer or detail page

#### Key Interactions

* view historical report
* update status
* view feedback scores
* edit again or export

#### Minimum Implementation

* display historical report list
* support status filters
* drill into detail page

---

### 22.10 System Settings Page

#### Goal

Manage base demo-enterprise configuration.

#### Page Structure

* enterprise profile
* users and roles
* default date range
* model settings (reserved)
* prompt version (reserved)

#### Minimum Implementation

* show enterprise profile and user list
* model settings can remain static placeholders

---

## 23. Recommended Page Build Order (v0.2)

Suggested implementation sequence:

1. Login Page
2. Workspace
3. Data Center
4. Operating Dashboard
5. Intelligent Diagnosis
6. Strategy & Final Outputs
7. Reports & Tasks
8. Knowledge Center
9. Agent Center
10. System Settings

Reason: the first 6 pages are sufficient to complete the core product loop. The final 4 strengthen platform realism and maintainability.

---

## 24. SQL Schema (v0.3)

The following SQL targets PostgreSQL and assumes `gen_random_uuid()` is available. If using Supabase, Neon, or a managed RDS setup, confirm extension support first.

### 24.1 Required Extension

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### 24.2 enterprises

```sql
CREATE TABLE enterprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  description TEXT,
  logo_url VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### 24.3 users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('ceo', 'ops_lead', 'channel_operator', 'product_manager', 'analyst', 'admin')),
  avatar_url VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_enterprise_id ON users(enterprise_id);
```

### 24.4 brands

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  positioning TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_brands_enterprise_id ON brands(enterprise_id);
```

### 24.5 channels

```sql
CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('tmall', 'douyin', 'xiaohongshu', 'jd', 'manual')),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_channels_enterprise_id ON channels(enterprise_id);
CREATE INDEX idx_channels_type ON channels(type);
```

### 24.6 products

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  brand_id UUID REFERENCES brands(id),
  sku VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price_band VARCHAR(100),
  lifecycle_stage VARCHAR(20) CHECK (lifecycle_stage IN ('new', 'growth', 'mature', 'declining')),
  launch_date DATE,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_enterprise_id ON products(enterprise_id);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_category ON products(category);
```

### 24.7 metric_snapshots

```sql
CREATE TABLE metric_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  channel_id UUID NOT NULL REFERENCES channels(id),
  product_id UUID REFERENCES products(id),
  snapshot_date DATE NOT NULL,
  gmv NUMERIC(14,2),
  uv INTEGER,
  conversion_rate NUMERIC(8,4),
  aov NUMERIC(12,2),
  roi NUMERIC(8,4),
  refund_rate NUMERIC(8,4),
  spend NUMERIC(14,2),
  orders INTEGER,
  impressions INTEGER,
  clicks INTEGER,
  ctr NUMERIC(8,4),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_metric_snapshots_enterprise_date ON metric_snapshots(enterprise_id, snapshot_date);
CREATE INDEX idx_metric_snapshots_channel_date ON metric_snapshots(channel_id, snapshot_date);
CREATE INDEX idx_metric_snapshots_product_date ON metric_snapshots(product_id, snapshot_date);
```

### 24.8 campaigns

```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  channel_id UUID REFERENCES channels(id),
  name VARCHAR(255) NOT NULL,
  campaign_type VARCHAR(50) CHECK (campaign_type IN ('promotion', 'launch', 'ad_push', 'seasonal')),
  start_date DATE,
  end_date DATE,
  target_json JSONB,
  actual_result_json JSONB,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_campaigns_enterprise_id ON campaigns(enterprise_id);
CREATE INDEX idx_campaigns_channel_id ON campaigns(channel_id);
```

### 24.9 business_events

```sql
CREATE TABLE business_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  title VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) CHECK (event_type IN ('product_launch', 'competitor_move', 'traffic_change', 'price_change', 'ops_action', 'other')),
  event_date DATE,
  description TEXT,
  related_channel_id UUID REFERENCES channels(id),
  related_product_id UUID REFERENCES products(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_business_events_enterprise_date ON business_events(enterprise_id, event_date);
```

### 24.10 knowledge_entries

```sql
CREATE TABLE knowledge_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  type VARCHAR(50) NOT NULL CHECK (type IN ('company_profile', 'product_note', 'channel_rule', 'strategy_case', 'diagnosis_rule', 'prompt_template', 'historical_review')),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  tags JSONB,
  source VARCHAR(255),
  embedding_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (embedding_status IN ('pending', 'done', 'failed')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_knowledge_entries_enterprise_type ON knowledge_entries(enterprise_id, type);
```

### 24.11 data_import_jobs

```sql
CREATE TABLE data_import_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  import_type VARCHAR(50) NOT NULL CHECK (import_type IN ('metrics', 'products', 'campaigns', 'events')),
  file_name VARCHAR(255),
  file_path VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'success', 'failed')),
  mapping_json JSONB,
  error_json JSONB,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_data_import_jobs_enterprise_id ON data_import_jobs(enterprise_id);
```

### 24.12 diagnostic_tasks

```sql
CREATE TABLE diagnostic_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  task_type VARCHAR(50) NOT NULL CHECK (task_type IN ('weekly_review', 'campaign_review', 'metric_anomaly', 'product_analysis')),
  title VARCHAR(255) NOT NULL,
  time_range_start DATE,
  time_range_end DATE,
  input_payload JSONB,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'queued', 'running', 'completed', 'failed')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_diagnostic_tasks_enterprise_id ON diagnostic_tasks(enterprise_id);
CREATE INDEX idx_diagnostic_tasks_status ON diagnostic_tasks(status);
```

### 24.13 diagnostic_results

```sql
CREATE TABLE diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL UNIQUE REFERENCES diagnostic_tasks(id),
  summary TEXT,
  anomalies_json JSONB,
  hypotheses_json JSONB,
  risks_json JSONB,
  recommendations_json JSONB,
  evidence_json JSONB,
  pending_checks_json JSONB,
  raw_llm_output JSONB,
  model_name VARCHAR(100),
  prompt_version VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### 24.14 reports

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  source_task_id UUID REFERENCES diagnostic_tasks(id),
  report_type VARCHAR(50) NOT NULL CHECK (report_type IN ('weekly_report', 'campaign_report', 'ceo_summary', 'action_list')),
  title VARCHAR(255) NOT NULL,
  body_markdown TEXT,
  body_json JSONB,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'published', 'archived')),
  owner_id UUID REFERENCES users(id),
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reports_enterprise_id ON reports(enterprise_id);
CREATE INDEX idx_reports_status ON reports(status);
```

### 24.15 agent_runs

```sql
CREATE TABLE agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  agent_type VARCHAR(50) NOT NULL CHECK (agent_type IN ('analyst', 'weekly_writer', 'campaign_reviewer', 'ceo_brief', 'qa_reviewer')),
  input_json JSONB,
  output_json JSONB,
  status VARCHAR(20) NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed')),
  related_task_id UUID,
  error_message TEXT,
  started_at TIMESTAMP,
  finished_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_agent_runs_enterprise_id ON agent_runs(enterprise_id);
CREATE INDEX idx_agent_runs_status ON agent_runs(status);
```

### 24.16 report_feedbacks

```sql
CREATE TABLE report_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES enterprises(id),
  report_id UUID NOT NULL REFERENCES reports(id),
  user_id UUID REFERENCES users(id),
  usefulness_score INTEGER CHECK (usefulness_score BETWEEN 1 AND 5),
  correctness_score INTEGER CHECK (correctness_score BETWEEN 1 AND 5),
  actionability_score INTEGER CHECK (actionability_score BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_report_feedbacks_report_id ON report_feedbacks(report_id);
```

### 24.17 Demo Seed Data Recommendation

After schema creation, immediately seed:

* 1 enterprise
* 5–6 users
* 1 brand
* 3 channels
* 4 products
* 90 days of metric snapshots
* 3 campaigns
* 5 business events
* 10–20 knowledge entries

---

## 25. Prompt Library (v0.3)

This section defines the prompts required for v1. The principle is simple: prompts are for structured business reasoning, not for decorative writing.

### 25.1 Prompt Design Principles

1. Define role first, then define output structure.
2. Explicitly separate facts, inferences, and pending checks.
3. Do not allow fabricated enterprise data.
4. Prefer JSON for intermediate outputs.
5. Every prompt must carry a version.

### 25.2 System-Level Base Prompt

#### Prompt ID: `system.business_analyst.v1`

Purpose: baseline identity for business diagnosis.

```text
You are an e-commerce operating analysis assistant serving a brand-side commerce team. Your task is not to speak generally, but to produce structured, careful, actionable analysis based on the provided enterprise context, business data, and event information.

You must follow these rules:
1. Only make judgments based on the provided data and context.
2. Clearly distinguish between known facts, inferred hypotheses, and pending validation items.
3. Do not output vague recommendations that cannot be executed.
4. Recommendations should map to a concrete role, channel, or product whenever possible.
5. If the data is insufficient, explicitly say what is missing rather than forcing a conclusion.
```

### 25.3 Weekly Review Diagnosis Prompt

#### Prompt ID: `diagnosis.weekly_review.v1`

Input: enterprise info, time range, metric summary, dimension breakdown, business events, knowledge snippets.

```text
Please diagnose the weekly business performance using the information below.

[Enterprise Context]
{{enterprise_context}}

[Analysis Time Range]
{{time_range}}

[Core Metrics]
{{metrics_summary}}

[Channel and Product Breakdown]
{{dimension_breakdown}}

[Key Business Events]
{{business_events}}

[Historical Experience and Knowledge Context]
{{knowledge_context}}

Return strict JSON with the following fields only:
- summary
- anomalies
- hypotheses
- risks
- recommendations
- pending_checks

Requirements:
1. summary should be 1–2 sentences.
2. anomalies must be an array; each item should include metric, scope, change, severity.
3. hypotheses must be an array; each item should include reason and confidence.
4. recommendations must be as concrete as possible.
5. Do not output any text outside the JSON.
```

### 25.4 Campaign Review Prompt

#### Prompt ID: `diagnosis.campaign_review.v1`

```text
You are reviewing an e-commerce campaign. Based on the campaign goal, outcome, channel performance, and business events, produce a structured retrospective.

[Enterprise Context]
{{enterprise_context}}

[Campaign Context]
{{campaign_context}}

[Campaign Target]
{{campaign_target}}

[Campaign Result]
{{campaign_result}}

[Metric Changes During Campaign]
{{metrics_summary}}

[Related Business Events]
{{business_events}}

Return strict JSON with the following fields only:
- summary
- wins
- losses
- hypotheses
- risks
- recommendations
- reusable_learnings

Requirements:
1. Summarize attainment versus target.
2. Highlight what worked and what failed.
3. recommendations should bias toward the next campaign iteration.
4. reusable_learnings should be suitable for storing in the knowledge center.
5. Do not output any text outside the JSON.
```

### 25.5 Single-Metric Anomaly Diagnosis Prompt

#### Prompt ID: `diagnosis.metric_anomaly.v1`

```text
Please perform a focused diagnosis on the following business anomaly.

[Enterprise Context]
{{enterprise_context}}

[Anomaly]
{{anomaly_context}}

[Relevant Dimension Breakdown]
{{dimension_breakdown}}

[Recent Business Events]
{{business_events}}

Return strict JSON with the following fields only:
- summary
- likely_causes
- affected_scopes
- verification_steps
- suggested_actions

Requirements:
1. likely_causes should be ordered by plausibility.
2. verification_steps must be operationally checkable.
3. suggested_actions must correspond to concrete business actions.
```

### 25.6 Weekly Report Prompt

#### Prompt ID: `report.weekly_report.v1`

```text
Transform the structured diagnosis below into a weekly operating report suitable for a brand-side e-commerce operations lead.

[Audience]
Operations Lead

[Enterprise Context]
{{enterprise_context}}

[Diagnosis JSON]
{{diagnosis_json}}

Output Markdown with the following structure:
# Weekly Operating Report
## 1. Overall Weekly Judgment
## 2. Key Anomalies and Highlights
## 3. Cause Analysis
## 4. Recommended Actions for Next Week
## 5. Risks and Pending Checks

Requirements:
1. Keep the writing clear and businesslike.
2. Recommendations should remain concrete.
3. Do not fabricate source data.
```

### 25.7 CEO Summary Prompt

#### Prompt ID: `report.ceo_summary.v1`

```text
Generate a highly compressed CEO summary.

[Diagnosis JSON]
{{diagnosis_json}}

Output Markdown using this structure:
# CEO Summary
- One-line conclusion
- Three key points
- Two suggested actions
- One biggest risk

Requirements:
1. Keep it under 180 words.
2. Focus on conclusions rather than process.
```

### 25.8 Action List Prompt

#### Prompt ID: `report.action_list.v1`

```text
Convert the following diagnosis result into an executable action list.

[Diagnosis JSON]
{{diagnosis_json}}

[Team Roles]
{{team_roles}}

Return strict JSON with this field only:
- actions

Each action item must include:
- owner_role
- task
- priority
- deadline_hint
- dependency

Requirements:
1. owner_role must be explicit.
2. priority must be one of high / medium / low.
3. task must be executable.
```

### 25.9 Virtual Enterprise Roleplay Prompt

#### Prompt ID: `roleplay.ops_lead.v1`

```text
You are now acting as the e-commerce operations lead of QingLan Beauty. Your task is to evaluate an AI-generated result from a business-side perspective, not to re-run the analysis.

Your concerns are:
1. whether the conclusion is credible
2. whether it identifies the true priority issue
3. whether the recommended actions are directly usable
4. whether important business context is missing

Return JSON with the following fields:
- accept (true/false)
- concerns
- missing_context
- useful_points
- followup_questions
```

### 25.10 Prompt Versioning Guidelines

Every prompt must:

* store `prompt_id` and `version`
* preserve `prompt_version` in diagnosis result records
* keep a simple changelog when prompt logic changes

Recommended directory structure:

* `/prompts/system/`
* `/prompts/diagnosis/`
* `/prompts/report/`
* `/prompts/roleplay/`

---

## 26. Mock Data Samples and Generation Rules (v0.3)

Mock data is not decorative. It is the business substrate of the entire demo. It should:

* look like a real e-commerce business
* support anomaly analysis
* support campaign retrospectives
* support different stakeholder viewpoints

### 26.1 Enterprise Setup

Enterprise: QingLan Beauty Co., Ltd.
Brand: QingLan
Category: domestic skincare
Channels: Tmall, Douyin, Xiaohongshu traffic source
Products: serum, cream, sunscreen, cleanser

### 26.2 Suggested Time Span

* 90 consecutive days of daily data
* latest 28 days used as the main diagnosis window
* data should include at least one major promotion, one launch, one traffic anomaly, and one competitor attack

### 26.3 metric_snapshots Generation Rules

#### Baseline Behavior

1. Tmall GMV is more stable.
2. Douyin is more volatile.
3. Serum and sunscreen are the two key hero lines.
4. UV tends to be slightly higher on weekends.
5. ROI and conversion rate tend to move in the same direction, but not perfectly.

#### Manually Injected Anomalies

1. Days 45–50: Douyin UV rises but conversion rate drops sharply, simulating creative fatigue or PDP issues.
2. Days 60–67: sunscreen launch volume expands, GMV rises but ROI declines, simulating growth-through-spend.
3. Days 72–75: a low-price competitor attack puts serum conversion and AOV under pressure.
4. Days 80–82: refund rate temporarily rises, simulating product texture controversy.

### 26.4 Campaign Sample Design

At least 3 campaigns should be created:

#### Campaign A: Sunscreen Launch

* Channel: Douyin
* Goal: first-week GMV above 300k
* Result: GMV achieved, ROI below target
* Useful for analyzing growth vs efficiency tradeoff

#### Campaign B: End-of-Month Tmall Promotion

* Channel: Tmall
* Goal: inventory movement + AOV increase
* Result: GMV stable, AOV slightly improved
* Useful for “stable-state operation” retrospectives

#### Campaign C: Influencer Push Sprint

* Channel: Douyin
* Goal: rapid traffic expansion
* Result: UV rises strongly, downstream efficiency weak
* Useful for anomaly diagnosis

### 26.5 business_events Sample Design

At minimum include:

1. sunscreen launch
2. a key competitor runs a low-price promotion
3. Douyin influencer creative package is changed
4. a Xiaohongshu post goes viral and brings external traffic
5. customer service reports more complaints about sunscreen texture

### 26.6 knowledge_entries Sample Design

Prepare at least the following:

#### company_profile

* brand positioning
* target user profile
* business objectives

#### product_note

* key selling points for each SKU
* price band
* target audience

#### channel_rule

* Tmall favors stable-state operation
* Douyin supports burst growth but is volatile
* Xiaohongshu is primarily for seeding rather than direct sales closure

#### strategy_case

* a prior successful campaign case
* a previous ROI-recovery case
* a prior handling strategy for negative review clusters

### 26.7 Recommended Mock Files

Under `/mock/`, prepare:

* `enterprise_profile.json`
* `users.json`
* `brands.json`
* `channels.json`
* `products.json`
* `metric_snapshots.csv`
* `campaigns.json`
* `business_events.json`
* `knowledge_entries.json`

### 26.8 Mock Data Generation Method

Recommended order:

1. handwrite small, high-quality seed samples
2. expand them with scripts to 90-day coverage
3. manually inspect whether the anomalies remain legible

Do not start with pure random generation; random data rarely contains real business tension.

---

## 27. Sprint Plan (v0.3)

This version uses a 4-week plan. It can be compressed to 3 weeks or expanded to 6 depending on speed and availability.

### Sprint 0: Initialization (1–2 days)

Goal: establish project skeleton.

Deliverables:

* Next.js frontend init
* FastAPI backend init
* PostgreSQL local connection
* base directory structure
* shared layout UI
* environment variable template
* README

Task list:

1. initialize monorepo or dual-repo structure
2. configure lint / format / tsconfig / python environment
3. establish base routes
4. implement minimal login flow

### Sprint 1: Data Foundation + Workspace (Week 1)

Goal: make the system feel like a platform.

Deliverables:

* login page
* workspace
* database tables
* seed scripts
* mock data import

Task list:

1. create migrations and schema
2. seed demo enterprise and users
3. implement workspace card APIs
4. render workspace frontend
5. complete navigation shell

Acceptance criteria:

* user can log in and enter workspace
* workspace shows summary, tasks, and placeholder reports

### Sprint 2: Data Center + Dashboard (Week 2)

Goal: give the system a real data flow.

Deliverables:

* upload page
* field mapping modal
* import job records
* core dashboard
* anomaly list

Task list:

1. build file upload API
2. build CSV parsing and mapping logic
3. insert metric snapshots into DB
4. implement dashboard/overview API
5. build frontend chart page

Acceptance criteria:

* user can upload metric file
* dashboard changes with time range
* anomaly list shows at least 3 anomalies

### Sprint 3: Diagnosis + Final Outputs (Week 3)

Goal: complete the main product loop.

Deliverables:

* intelligent diagnosis page
* diagnosis task APIs
* prompt integration
* structured diagnosis result display
* report generation page
* markdown export

Task list:

1. implement diagnostic_tasks / diagnostic_results APIs
2. create weekly_review / campaign_review prompt templates
3. integrate one LLM provider
4. build JSON validation for model output
5. implement report generation and persistence

Acceptance criteria:

* user can create and run one weekly review diagnosis
* user can inspect structured result
* user can generate one weekly report draft

### Sprint 4: Knowledge Center + Agent Center (Week 4)

Goal: make the demo feel like an enterprise operating platform rather than a single analysis page.

Deliverables:

* knowledge center
* knowledge_entries API
* agent list and execution page
* optional roleplay agent
* report feedback mechanism

Task list:

1. implement knowledge entry CRUD and query
2. inject knowledge snippets into diagnosis context
3. implement agent_runs API
4. implement 3 preset agents
5. implement report feedback form

Acceptance criteria:

* knowledge entries are visible in diagnosis context
* agent runs can execute independently
* reports can be rated and reviewed later

### Sprint 5: Polish and Demo (Optional Extra Week)

Goal: make the demo more stable, presentable, and reusable.

Deliverables:

* UI consistency pass
* empty/loading/error states
* export improvements
* prompt version panel (lightweight)
* demo script

---

## 28. Claude Code Task Templates (v0.3)

To increase execution efficiency, tasks for Claude Code should use standardized prompt shapes.

### 28.1 Page Implementation Task Template

```text
Please implement the [Page Name] page for the ZOVI-like platform.

Requirements:
1. Use Next.js + TypeScript + Tailwind + shadcn/ui.
2. The page should work with either mock data or real API data.
3. The page must contain:
   - [Module 1]
   - [Module 2]
   - [Module 3]
4. Keep the code clean and maintainable.
5. If temporary mock data is needed, isolate it in a dedicated file.

Output:
- page code
- related component code
- usage notes
```

### 28.2 API Implementation Task Template

```text
Please implement the [API Name] API for the ZOVI-like platform.

Technical requirements:
1. Use FastAPI.
2. Use SQLAlchemy or another suitable ORM.
3. Return format must always be success/data/message.
4. Include parameter validation and error handling.
5. Include request and response examples.

API definition:
- Path: [path]
- Method: [GET/POST/PUT]
- Purpose: [purpose]
- Input: [field spec]
- Output: [field spec]
```

### 28.3 Prompt Integration Task Template

```text
Please implement the [Prompt Name] calling logic for the ZOVI-like platform.

Requirements:
1. Inputs include enterprise context, metric summary, business events, and knowledge summary.
2. The model output must be JSON.
3. JSON schema validation is required.
4. If parsing fails, return a structured error object.
5. Provide both the prompt file and the invocation code.
```

### 28.4 Mock Data Generation Task Template

```text
Please generate a high-quality mock dataset for the ZOVI-like platform.

Enterprise setting: QingLan Beauty.
Requirements:
1. Include 90 days of daily business data.
2. Channels must include Tmall, Douyin, and Xiaohongshu.
3. Products must include serum, cream, sunscreen, and cleanser.
4. The data must contain at least 4 manually injected anomaly scenarios.
5. Output CSV/JSON files and explain the business meaning of each anomaly.
```

---

## 29. Engineering Kickoff Prompt

This prompt is intended to be pasted directly into Claude Code / Opus as the initial engineering instruction for the project.

### 29.1 Kickoff Prompt (Full Version)

```text
You are helping me build a ZOVI-like e-commerce operating intelligence platform.

This is not a toy chatbot project. It is a lightweight but complete platform rebuild that includes:
- data ingestion
- operating dashboard
- intelligent diagnosis
- strategy/final report generation
- enterprise knowledge center
- agent center
- reports and task archive

The goal is to build a runnable single-tenant demo for a virtual enterprise called QingLan Beauty.

Core principles:
1. Build the full platform skeleton first, not just one page.
2. Use thin implementation and mock data where needed, but preserve correct product structure.
3. Define schemas before UI whenever possible.
4. Standardize AI intermediate outputs as structured JSON.
5. Keep the system enterprise-like rather than chat-like.
6. Every module should be independently understandable and incrementally extensible.

Tech stack preferences:
- Frontend: Next.js, TypeScript, Tailwind, shadcn/ui, Recharts
- Backend: FastAPI, Python, PostgreSQL
- Data layer: PostgreSQL, Redis optional, pgvector or Qdrant optional in later phases
- AI layer: prompt templates + LLM provider abstraction + JSON validation

The virtual enterprise setup is:
- Company: QingLan Beauty Co., Ltd.
- Industry: domestic skincare
- Channels: Tmall, Douyin, Xiaohongshu
- Products: serum, cream, sunscreen, cleanser
- Roles: CEO, ops lead, channel operator, product manager, analyst

What I want from you:
1. Help me implement the project in a modular way.
2. Follow the rebuild spec strictly where possible.
3. When details are missing, make reasonable engineering assumptions and state them clearly.
4. Prefer maintainable, production-shaped code over hacks.
5. Do not overengineer multi-tenancy, auth, or workflow orchestration in the first pass.
6. Use mock data first whenever that helps unblock the loop.

Execution style:
- Work module by module.
- For each module, first restate the scope and files to be created.
- Then implement.
- Then provide a short validation checklist.
- Keep code organized.

Initial goal for this session:
Build the project skeleton and the first runnable product loop, including:
- app shell / navigation
- login page
- workspace page
- mock data loading
- dashboard overview
- one diagnosis flow
- one report generation flow

If you need to choose between perfect completeness and forward progress, choose forward progress while preserving the architecture.
```

### 29.2 Kickoff Prompt (Short Version)

Use this when you want a faster session start with less context pasted in.

```text
Help me build a ZOVI-like e-commerce operating intelligence platform.

This is a single-tenant demo for a virtual enterprise called QingLan Beauty. The system should include:
- workspace
- data center
- knowledge center
- dashboard
- intelligent diagnosis
- report generation
- agent center
- report/task archive

Preferred stack:
- Next.js + TypeScript + Tailwind + shadcn/ui
- FastAPI + PostgreSQL
- structured JSON outputs for all AI intermediate steps

Principles:
1. build the full skeleton first
2. use mock data early
3. preserve enterprise product structure
4. avoid turning it into a chatbot UI
5. keep implementation modular

Start by setting up the repo skeleton, core routes, base layout, and the first few pages: login, workspace, dashboard.
Then propose the next tasks in order.
```

### 29.3 How to Use the Kickoff Prompt

Recommended usage pattern:

1. paste the full version at the start of a new coding session
2. attach or paste relevant sections of this rebuild spec if needed
3. after the kickoff response, switch to scoped implementation tasks
4. do not keep asking for very large all-at-once deliveries once the project structure is in place

---

## 30. Recommended Repository Structure

A practical project structure is more important than theoretical purity at this stage. The repo should optimize for:

* fast iteration
* clean frontend/backend separation
* easy mock-data loading
* future agent / prompt extensibility

### 30.1 Recommended Top-Level Structure

```text
zovi-like-platform/
├─ README.md
├─ docs/
│  ├─ rebuild-spec.md
│  ├─ api-notes.md
│  ├─ prompt-notes.md
│  └─ sprint-plan.md
├─ frontend/
│  ├─ app/
│  ├─ components/
│  ├─ lib/
│  ├─ hooks/
│  ├─ mock/
│  ├─ types/
│  ├─ public/
│  ├─ styles/
│  ├─ package.json
│  └─ tsconfig.json
├─ backend/
│  ├─ app/
│  │  ├─ api/
│  │  ├─ core/
│  │  ├─ db/
│  │  ├─ models/
│  │  ├─ schemas/
│  │  ├─ services/
│  │  ├─ prompts/
│  │  ├─ agents/
│  │  └─ main.py
│  ├─ scripts/
│  ├─ tests/
│  ├─ requirements.txt
│  └─ alembic/
├─ mock/
│  ├─ enterprise_profile.json
│  ├─ users.json
│  ├─ brands.json
│  ├─ channels.json
│  ├─ products.json
│  ├─ metric_snapshots.csv
│  ├─ campaigns.json
│  ├─ business_events.json
│  └─ knowledge_entries.json
├─ sql/
│  ├─ init.sql
│  └─ seed.sql
├─ scripts/
│  ├─ start-dev.sh
│  ├─ seed-mock-data.py
│  └─ check-output-schema.py
└─ .env.example
```

### 30.2 Frontend Structure Recommendation

```text
frontend/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ login/
│  │  └─ page.tsx
│  ├─ workspace/
│  │  └─ page.tsx
│  ├─ data-center/
│  │  └─ page.tsx
│  ├─ dashboard/
│  │  └─ page.tsx
│  ├─ diagnosis/
│  │  └─ page.tsx
│  ├─ reports/
│  │  └─ page.tsx
│  ├─ knowledge/
│  │  └─ page.tsx
│  ├─ agents/
│  │  └─ page.tsx
│  └─ settings/
│     └─ page.tsx
├─ components/
│  ├─ layout/
│  ├─ dashboard/
│  ├─ diagnosis/
│  ├─ reports/
│  ├─ knowledge/
│  ├─ agents/
│  └─ ui/
├─ lib/
│  ├─ api.ts
│  ├─ constants.ts
│  ├─ format.ts
│  └─ utils.ts
├─ hooks/
│  ├─ use-dashboard.ts
│  ├─ use-diagnosis.ts
│  └─ use-reports.ts
├─ mock/
│  ├─ workspace.ts
│  ├─ dashboard.ts
│  ├─ diagnosis.ts
│  └─ reports.ts
└─ types/
   ├─ business.ts
   ├─ diagnosis.ts
   └─ report.ts
```

### 30.3 Backend Structure Recommendation

```text
backend/
├─ app/
│  ├─ api/
│  │  ├─ routes_auth.py
│  │  ├─ routes_dashboard.py
│  │  ├─ routes_imports.py
│  │  ├─ routes_diagnostic_tasks.py
│  │  ├─ routes_reports.py
│  │  ├─ routes_knowledge.py
│  │  └─ routes_agents.py
│  ├─ core/
│  │  ├─ config.py
│  │  ├─ security.py
│  │  └─ logging.py
│  ├─ db/
│  │  ├─ base.py
│  │  ├─ session.py
│  │  └─ init_db.py
│  ├─ models/
│  │  ├─ enterprise.py
│  │  ├─ user.py
│  │  ├─ channel.py
│  │  ├─ product.py
│  │  ├─ metric_snapshot.py
│  │  ├─ campaign.py
│  │  ├─ business_event.py
│  │  ├─ knowledge_entry.py
│  │  ├─ diagnostic_task.py
│  │  ├─ diagnostic_result.py
│  │  ├─ report.py
│  │  ├─ agent_run.py
│  │  └─ report_feedback.py
│  ├─ schemas/
│  │  ├─ common.py
│  │  ├─ dashboard.py
│  │  ├─ imports.py
│  │  ├─ diagnosis.py
│  │  ├─ reports.py
│  │  ├─ knowledge.py
│  │  └─ agents.py
│  ├─ services/
│  │  ├─ dashboard_service.py
│  │  ├─ import_service.py
│  │  ├─ diagnosis_service.py
│  │  ├─ report_service.py
│  │  ├─ knowledge_service.py
│  │  └─ agent_service.py
│  ├─ prompts/
│  │  ├─ system/
│  │  ├─ diagnosis/
│  │  ├─ report/
│  │  └─ roleplay/
│  ├─ agents/
│  │  ├─ analyst_agent.py
│  │  ├─ weekly_writer_agent.py
│  │  ├─ campaign_reviewer_agent.py
│  │  └─ roleplay_ops_lead_agent.py
│  └─ main.py
├─ scripts/
│  ├─ seed_demo_data.py
│  ├─ import_mock_metrics.py
│  └─ validate_json_output.py
└─ tests/
   ├─ test_dashboard.py
   ├─ test_diagnosis.py
   └─ test_reports.py
```

### 30.4 Why This Structure Works

This structure keeps the project legible for both human developers and coding agents:

* prompts are isolated from services
* agents are isolated from generic services
* mock data exists both as shared root assets and frontend quick-view data
* backend route/service separation supports incremental expansion
* docs stay inside the repo instead of getting lost in chat history

---

## 31. First Engineering Tasks

These are the first concrete implementation tasks that should be executed after project kickoff.

### 31.1 First Task Group: Repository and Project Skeleton

Goal: create a runnable full-stack shell.

Tasks:

1. initialize `frontend/` with Next.js + TypeScript + Tailwind + shadcn/ui
2. initialize `backend/` with FastAPI
3. add `.env.example`
4. create root README with startup instructions
5. add shared docs placeholders under `docs/`
6. create the recommended directory tree

Deliverable:

* both frontend and backend boot successfully
* empty pages and base API available

Suggested instruction for Claude Code / Opus:

```text
Please initialize a full-stack project for a ZOVI-like e-commerce operating intelligence platform.

Requirements:
1. Create a Next.js frontend with TypeScript, Tailwind, and shadcn/ui under `frontend/`.
2. Create a FastAPI backend under `backend/`.
3. Create a clean top-level repo structure with docs, mock, sql, and scripts folders.
4. Add a root README.md with local startup instructions.
5. Add `.env.example` files where appropriate.
6. Keep the project structure extensible for diagnosis, reports, prompts, and agents.

Output:
- full folder structure
- base configs
- startup commands
```

### 31.2 Second Task Group: Base Layout and Core Routes

Goal: make the app look like a real platform immediately.

Tasks:

1. implement frontend app shell with sidebar + top bar
2. create empty routes for:

   * login
   * workspace
   * data-center
   * dashboard
   * diagnosis
   * reports
   * knowledge
   * agents
   * settings
3. create route navigation constants
4. create a clean dashboard-like layout

Deliverable:

* clickable platform skeleton with all core routes visible

Suggested instruction:

```text
Please implement the base app shell for the ZOVI-like platform.

Requirements:
1. Build a sidebar-based enterprise layout.
2. Add routes for login, workspace, data-center, dashboard, diagnosis, reports, knowledge, agents, and settings.
3. Use a clean enterprise admin style with Tailwind and shadcn/ui.
4. Each page can initially contain placeholder content, but the routing and layout must be complete.
5. Keep components reusable.

Output:
- app layout
- sidebar/nav components
- route pages
- styling notes
```

### 31.3 Third Task Group: Database Models and Seed Data

Goal: make the backend usable with realistic demo data.

Tasks:

1. implement SQLAlchemy models
2. connect PostgreSQL
3. create initialization script
4. create seed script for QingLan Beauty demo data
5. insert users, channels, products, campaigns, events, and metric snapshots

Deliverable:

* backend can serve real demo records instead of empty placeholders

Suggested instruction:

```text
Please implement the backend database layer for the ZOVI-like platform.

Requirements:
1. Use PostgreSQL and SQLAlchemy.
2. Implement the core models: enterprise, user, channel, product, metric_snapshot, campaign, business_event, knowledge_entry, diagnostic_task, diagnostic_result, report, agent_run.
3. Create a database initialization method.
4. Create a seed script that inserts a virtual enterprise called QingLan Beauty with realistic demo data.
5. Keep the code organized by model and schema.

Output:
- model files
- DB session config
- initialization script
- seed script
```

### 31.4 Fourth Task Group: Workspace and Dashboard APIs

Goal: expose enough data for the frontend to stop relying on static placeholders.

Tasks:

1. implement `/dashboard/summary`
2. implement `/dashboard/overview`
3. implement `/dashboard/anomalies`
4. add basic response schemas
5. connect frontend workspace and dashboard pages to these APIs

Deliverable:

* workspace and dashboard pages render using backend data

Suggested instruction:

```text
Please implement the initial dashboard APIs for the ZOVI-like platform.

Requirements:
1. Build `/api/v1/dashboard/summary`, `/api/v1/dashboard/overview`, and `/api/v1/dashboard/anomalies` in FastAPI.
2. Use seeded demo data from QingLan Beauty.
3. Return enterprise summary cards, recent anomalies, recent reports, and simple trend data.
4. Add Pydantic schemas for responses.
5. Keep logic inside a dedicated dashboard service.

Then update the frontend workspace and dashboard pages to consume these APIs.
```

### 31.5 Fifth Task Group: First Diagnosis Flow

Goal: complete the first truly differentiating loop of the product.

Tasks:

1. implement diagnosis task creation API
2. implement a basic diagnosis runner service
3. integrate one weekly review prompt
4. validate JSON output
5. render structured diagnosis result on frontend
6. allow one-click report generation

Deliverable:

* user can go from dashboard → diagnosis → report

Suggested instruction:

```text
Please implement the first diagnosis loop for the ZOVI-like platform.

Requirements:
1. Create APIs for creating and running a `weekly_review` diagnosis task.
2. Add a diagnosis service that collects the necessary business context and metric summary.
3. Integrate a structured weekly-review prompt.
4. Validate the LLM output as JSON.
5. Return structured result fields such as summary, anomalies, hypotheses, risks, recommendations, and pending_checks.
6. Add frontend UI to create the task, run it, and display the result.
7. Add a button to generate a weekly report draft from the diagnosis result.

Keep the implementation thin but clean.
```

### 31.6 Sixth Task Group: Knowledge Center and Agent Center

Goal: make the system feel like an operating platform rather than a single analysis pipeline.

Tasks:

1. CRUD for knowledge entries
2. basic prompt-context injection from knowledge center
3. agent definitions for:

   * analyst
   * weekly_writer
   * campaign_reviewer
4. agent run records
5. agent results to report conversion

Deliverable:

* reusable platform abilities beyond one diagnosis page

---

## 32. Suggested Build Order Across Sessions

If development is split across multiple sessions with Opus / Claude Code, use this order:

Session 1:

* repo init
* frontend/backend skeleton
* app shell
* base routes

Session 2:

* database models
* seed scripts
* dashboard APIs
* workspace data rendering

Session 3:

* diagnosis task flow
* weekly review prompt
* diagnosis result page

Session 4:

* report generation page
* report storage and listing
* report export

Session 5:

* knowledge center
* agent center
* roleplay evaluator

Session 6:

* polish, empty states, cleanup, documentation

This ordering minimizes the chance of spending too much time on infrastructure before a visible product loop exists.

---

## 33. Current Version Conclusion (v0.4 Addendum)

With this addendum, the English rebuild spec now also includes:

1. an engineering kickoff prompt
2. a recommended repository structure
3. the first concrete engineering tasks
4. a practical multi-session build order

This means the document now supports three layers of execution:

* product understanding
* system design
* direct development kickoff

At this point, the most useful next additions would be:

1. a frontend component tree
2. page state machines
3. a demo script for showcasing the rebuild
4. a deployment guide
5. a prompt evaluation and regression checklist

Once those are added, the spec will be strong enough not just for building the product, but for repeatedly operating, presenting, and iterating on it.
