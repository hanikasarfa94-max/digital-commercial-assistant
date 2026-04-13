"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Upload, RefreshCw, Table2, FileUp, CheckCircle2, Loader2 } from "lucide-react";

type ImportRecord = {
  id: string;
  fileName: string;
  records: number;
  date: string;
  status: "success" | "failed";
};

const mockHistory: ImportRecord[] = [
  { id: "i1", fileName: "tmall_metrics_w10.csv", records: 4200, date: "2025-03-09", status: "success" },
  { id: "i2", fileName: "douyin_metrics_w10.csv", records: 3800, date: "2025-03-09", status: "success" },
  { id: "i3", fileName: "campaigns_q1.xlsx", records: 12, date: "2025-03-08", status: "success" },
  { id: "i4", fileName: "xiaohongshu_data.csv", records: 2840, date: "2025-03-07", status: "success" },
];

const fieldMappings = [
  { source: "日期", target: "date", type: "date" },
  { source: "GMV(元)", target: "gmv", type: "number" },
  { source: "访客数", target: "uv", type: "number" },
  { source: "转化率(%)", target: "conversion_rate", type: "percent" },
  { source: "客单价", target: "aov", type: "number" },
  { source: "ROI", target: "roi", type: "number" },
  { source: "花费", target: "spend", type: "number" },
  { source: "退款率(%)", target: "refund_rate", type: "percent" },
  { source: "订单数", target: "orders", type: "number" },
];

export default function DataCenterPage() {
  const t = useTranslations("dataCenter");
  const tst = useTranslations("status");

  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showMapping, setShowMapping] = useState(false);
  const [importing, setImporting] = useState(false);
  const [mockLoaded, setMockLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setUploadedFile(file.name);
    setShowMapping(true);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleImport() {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setShowMapping(false);
      setUploadedFile(null);
    }, 1500);
  }

  function handleLoadMock() {
    setMockLoaded(true);
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Database, label: t("dataSources"), value: `3 ${t("connected")}` },
          { icon: Upload, label: t("lastImport"), value: "2025-03-09" },
          { icon: RefreshCw, label: t("syncStatus"), value: t("upToDate") },
          { icon: Table2, label: t("totalRecords"), value: "12,840" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="rounded-md bg-muted p-2">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("uploadFile")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <FileUp className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm text-center">{t("uploadDesc")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("supportedFormats")}</p>
              {uploadedFile && (
                <Badge variant="secondary" className="mt-3">{uploadedFile}</Badge>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Load Mock Data */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("loadMockData")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{t("loadMockDataDesc")}</p>
            {mockLoaded ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">{t("mockDataLoaded")}</span>
              </div>
            ) : (
              <Button onClick={handleLoadMock}>{t("loadMockData")}</Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Field Mapping */}
      {showMapping && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">{t("fieldMapping")}</CardTitle>
            <Button size="sm" onClick={handleImport} disabled={importing}>
              {importing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {t("startImport")}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 font-medium">{t("sourceField")}</th>
                    <th className="text-left py-2 font-medium">{t("targetField")}</th>
                    <th className="text-left py-2 font-medium">{t("dataType")}</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldMappings.map((f) => (
                    <tr key={f.source} className="border-b last:border-0">
                      <td className="py-2.5">{f.source}</td>
                      <td className="py-2.5 font-mono text-xs">{f.target}</td>
                      <td className="py-2.5">
                        <Badge variant="outline" className="text-xs">{f.type}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Import History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("importHistory")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 font-medium">{t("fileName")}</th>
                  <th className="text-right py-2 font-medium">{t("records")}</th>
                  <th className="text-left py-2 font-medium">{t("date")}</th>
                  <th className="text-left py-2 font-medium">{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {mockHistory.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-2.5 font-medium">{r.fileName}</td>
                    <td className="py-2.5 text-right">{r.records.toLocaleString()}</td>
                    <td className="py-2.5 text-muted-foreground">{r.date}</td>
                    <td className="py-2.5">
                      <Badge variant={r.status === "success" ? "default" : "destructive"} className="text-xs">
                        {tst(r.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
