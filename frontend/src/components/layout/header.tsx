"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";

const titleKeys: Record<string, string> = {
  "/workspace": "workspace",
  "/dashboard": "dashboard",
  "/data-center": "dataCenter",
  "/knowledge-center": "knowledgeCenter",
  "/diagnosis": "diagnosis",
  "/reports": "reports",
  "/agent-center": "agentCenter",
  "/settings": "settings",
};

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tc = useTranslations("common");

  const titleKey = Object.entries(titleKeys).find(([key]) => pathname.startsWith(key))?.[1];
  const title = titleKey ? t(titleKey) : tc("appName");

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <button className="relative p-1 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">OL</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium">Operations Lead</span>
            <Badge variant="secondary" className="text-[10px] w-fit">{tc("appName")}</Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
