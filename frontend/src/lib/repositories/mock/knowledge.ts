import type { IKnowledgeRepository } from "../interfaces";
import type { EnterpriseProfile } from "@/types/api";
import { getStore } from "./store";

export class MockKnowledgeRepository implements IKnowledgeRepository {
  async getEnterprise() {
    return getStore().enterprise;
  }

  async updateEnterprise(data: Partial<EnterpriseProfile>) {
    const store = getStore();
    store.enterprise = { ...store.enterprise, ...data };
    return store.enterprise;
  }

  async getProducts() {
    return { products: getStore().products };
  }

  async getTargets() {
    return { targets: getStore().bizTargets };
  }

  async getCases() {
    return { cases: getStore().cases };
  }

  async getPrompts() {
    return { prompts: getStore().promptTemplates };
  }
}
