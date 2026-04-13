import type { IAgentsRepository, PaginationOpts, PaginatedResult } from "../interfaces";
import type { AgentDef, AgentRun } from "@/types/api";
import { getStore } from "./store";
import { getLLM, completeJSON } from "@/lib/llm";
import { buildAgentPrompt } from "@/lib/llm/prompts";

type AgentLLMOutput = {
  markdownOutput: { en: string; zh: string };
  structuredOutput: Record<string, unknown>;
};

export class MockAgentsRepository implements IAgentsRepository {
  async listAgents() {
    return { agents: getStore().agentDefs };
  }

  async listRuns(opts?: PaginationOpts): Promise<PaginatedResult<AgentRun>> {
    const store = getStore();
    const page = opts?.page ?? 1;
    const pageSize = opts?.pageSize ?? 20;
    const allRuns = Array.from(store.agentRuns.values())
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
    const start = (page - 1) * pageSize;
    return {
      items: allRuns.slice(start, start + pageSize),
      total: allRuns.length,
      page,
      pageSize,
    };
  }

  async getAgentById(id: string): Promise<AgentDef | null> {
    return getStore().agentDefs.find((a) => a.id === id) ?? null;
  }

  async getRunById(id: string): Promise<AgentRun | null> {
    return getStore().agentRuns.get(id) ?? null;
  }

  async createRun(agentId: string, input: Record<string, string>): Promise<AgentRun> {
    const store = getStore();
    const agent = store.agentDefs.find((a) => a.id === agentId);
    if (!agent) throw new Error("Agent not found");

    const runId = store.nextId("run");
    const now = store.now();

    const run: AgentRun = {
      id: runId,
      agentId,
      agentName: agent.name,
      status: "running",
      input,
      startedAt: now,
    };

    store.agentRuns.set(runId, run);

    // Run LLM in background
    this.executeAgentLLM(runId, agent, input).catch((err) => {
      console.error(`[Agents] LLM failed for ${runId}:`, err);
      const r = store.agentRuns.get(runId);
      if (r) {
        r.status = "failed";
        r.completedAt = store.now();
        r.markdownOutput = {
          en: `Agent execution failed: ${err.message}`,
          zh: `智能体执行失败: ${err.message}`,
        };
      }
    });

    return run;
  }

  private async executeAgentLLM(
    runId: string,
    agent: AgentDef,
    input: Record<string, string>
  ): Promise<void> {
    const store = getStore();
    const llm = getLLM();
    const startTime = Date.now();

    const messages = buildAgentPrompt({
      agentType: agent.name.en,
      input,
      enterprise: store.enterprise,
      additionalContext: `Agent description: ${agent.description.en}`,
    });

    const result = await completeJSON<AgentLLMOutput>(llm, messages, {
      temperature: 0.6,
      maxTokens: 4096,
    });

    // Update run with result
    const run = store.agentRuns.get(runId);
    if (!run) return;

    run.status = "completed";
    run.completedAt = store.now();
    run.duration = Math.round((Date.now() - startTime) / 1000);
    run.markdownOutput = result.markdownOutput;
    run.structuredOutput = result.structuredOutput;
  }
}
