import type { IAuthRepository } from "../interfaces";
import type { User, Role, LoginResponse } from "@/types/api";
import { getStore } from "./store";

export class MockAuthRepository implements IAuthRepository {
  async login(role: Role): Promise<LoginResponse> {
    const store = getStore();
    const user = store.users.find((u) => u.role === role);
    if (!user) throw new Error("Invalid role");
    return {
      token: `mock-jwt-${user.role}-${Date.now()}`,
      user,
    };
  }

  async getUserByToken(token: string): Promise<User | null> {
    const store = getStore();
    const role = token.replace("mock-jwt-", "").split("-")[0];
    return store.users.find((u) => u.role === role) ?? store.users[0];
  }

  async getAllUsers(): Promise<User[]> {
    return getStore().users;
  }
}
