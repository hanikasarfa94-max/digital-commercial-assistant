"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Home,
  Database,
  BookOpen,
  Stethoscope,
  FileText,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { labelKey: "workspace", href: "/workspace", icon: Home },
  { labelKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "dataCenter", href: "/data-center", icon: Database },
  { labelKey: "knowledgeCenter", href: "/knowledge-center", icon: BookOpen },
  { labelKey: "diagnosis", href: "/diagnosis", icon: Stethoscope },
  { labelKey: "reports", href: "/reports", icon: FileText },
  { labelKey: "agentCenter", href: "/agent-center", icon: Bot },
] as const;

const bottomItems = [
  { labelKey: "settings", href: "/settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tc = useTranslations("common");

  return (
    <aside className="flex h-full w-60 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2 px-4 font-semibold">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
          Q
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{tc("appName")}</span>
          <span className="text-[11px] text-muted-foreground">{tc("appDesc")}</span>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 space-y-1 px-2 py-3">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 px-2 pb-2">
        <Separator className="mb-2" />
        {bottomItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {t(item.labelKey)}
            </Link>
          );
        })}
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {t("signOut")}
        </Link>
      </div>
    </aside>
  );
}
