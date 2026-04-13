"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { diagnosisApi } from "@/lib/api-client";
import { useApi } from "@/lib/use-api";
import { DiagnosisResultView } from "@/components/diagnosis/result-view";

export default function DiagnosisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("diagnosis");

  const { data: diagnosis, loading, error } = useApi(() => diagnosisApi.get(id), [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !diagnosis) {
    return (
      <div className="space-y-4">
        <Link href="/diagnosis" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("back")}
        </Link>
        <p className="text-muted-foreground">{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/diagnosis" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("back")}
      </Link>
      <DiagnosisResultView result={diagnosis} />
    </div>
  );
}
