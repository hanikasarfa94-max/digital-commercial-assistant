"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";

const roleIds = ["ops_lead", "ceo", "analyst"] as const;

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("login");
  const tc = useTranslations("common");
  const [selectedRole, setSelectedRole] = useState<string>("ops_lead");

  function handleLogin() {
    if (typeof window !== "undefined") {
      localStorage.setItem("zovi_role", selectedRole);
    }
    router.push("/workspace");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="absolute top-4 right-4">
        <LocaleSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl font-bold">
            Q
          </div>
          <CardTitle className="text-2xl">{tc("appName")}</CardTitle>
          <CardDescription>{tc("appDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("selectRole")}</label>
            <div className="space-y-2">
              {roleIds.map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedRole(id)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selectedRole === id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="text-sm font-medium">{t(`roles.${id}`)}</div>
                  <div className="text-xs text-muted-foreground">{t(`roles.${id}_desc`)}</div>
                </button>
              ))}
            </div>
          </div>
          <Button className="w-full" size="lg" onClick={handleLogin}>
            {t("enter")}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            {t("demoNote")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
