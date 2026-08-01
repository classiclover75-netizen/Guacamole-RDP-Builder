import { useState } from "react";
import { GuacConnection, RememberedFields } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/useToast";
import { ConnectionForm } from "@/components/ConnectionForm";
import { LockedSettings } from "@/components/LockedSettings";
import { JsonOutput } from "@/components/JsonOutput";
import { ConnectionList } from "@/components/ConnectionList";
import { Toast } from "@/components/Toast";
import { ConfirmModal } from "@/components/ConfirmModal";

const STORE_KEY = "guac_rdp_remember_v2";

export default function App() {
  const [connections, setConnections] = useState<GuacConnection[]>([]);
  const [remembered, setRemembered] = useLocalStorage<RememberedFields>(STORE_KEY, {});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast, showToast } = useToast();

  const handleToggleRemember = (key: keyof RememberedFields, value: string) => {
    setRemembered((prev) => {
      const next = { ...prev };
      if (next[key] !== undefined && !value) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  };

  const handleAddConnection = (conn: GuacConnection) => {
    if (connections.some((c) => c.name.toLowerCase() === conn.name.toLowerCase())) {
      showToast("Ye name pehle se hai", true);
      return;
    }
    setConnections((prev) => [...prev, conn]);
    showToast(`Added: ${conn.name}`);
  };

  const handleRemoveConnection = (index: number) => {
    setConnections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCopyJson = () => {
    if (connections.length === 0) {
      showToast("Pehle connection add karein", true);
      return;
    }
    navigator.clipboard
      .writeText(JSON.stringify(connections, null, 2))
      .then(() => showToast("Copied!"))
      .catch(() => showToast("Copy fail", true));
  };

  const handleDownloadJson = () => {
    if (connections.length === 0) {
      showToast("Pehle connection add karein", true);
      return;
    }
    const blob = new Blob([JSON.stringify(connections, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "guacamole-import.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded");
  };

  const handleClearAll = () => {
    if (connections.length === 0) {
      showToast("List is already empty", true);
      return;
    }
    setIsConfirmOpen(true);
  };

  const confirmClearAll = () => {
    setConnections([]);
    setIsConfirmOpen(false);
    showToast("All connections cleared");
  };

  const cancelClearAll = () => {
    setIsConfirmOpen(false);
  };

  return (
    <div className="h-screen w-full bg-guac-bg text-guac-ink font-sans flex flex-col overflow-hidden">
      <header className="px-8 py-6 border-b border-guac-line flex justify-between items-end bg-guac-bg shrink-0">
        <div>
          <p className="text-guac-accent text-[10px] tracking-[0.2em] font-bold uppercase mb-1">Management Suite / Apache Guacamole</p>
          <h1 className="text-2xl font-semibold tracking-tight m-0">RDP Import Builder</h1>
          <p className="text-guac-muted text-xs mt-1 mb-0">Construct connection manifests for high-availability jump hosts.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-guac-panel border border-guac-line rounded px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-guac-muted">System Active</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0 overflow-auto">
        <section className="md:col-span-5 flex flex-col gap-6 min-h-0 shrink-0">
          <ConnectionForm
            remembered={remembered}
            onToggleRemember={handleToggleRemember}
            onAdd={handleAddConnection}
            showToast={showToast}
          />
          <ConnectionList
            connections={connections}
            onRemove={handleRemoveConnection}
          />
        </section>

        <section className="md:col-span-7 flex flex-col gap-6 min-h-0 shrink-0">
          <JsonOutput
            connections={connections}
            onCopy={handleCopyJson}
            onDownload={handleDownloadJson}
            onClearAll={handleClearAll}
          />
          <LockedSettings />
        </section>
      </main>

      <footer className="px-8 py-3 border-t border-guac-line flex justify-between items-center bg-guac-pre shrink-0">
        <div className="flex gap-4">
          <span className="text-[10px] text-guac-muted uppercase tracking-widest font-medium">Local Forge v4.2.0</span>
          <span className="text-[10px] text-guac-accent uppercase tracking-widest font-bold">
            Import Ready: {connections.length} {connections.length === 1 ? 'node' : 'nodes'} cached
          </span>
        </div>
        <div className="text-[10px] text-guac-muted">© 2024 Admin-Tools Engineering</div>
      </footer>

      <Toast message={toast.message} isError={toast.isError} visible={toast.visible} />
      
      <ConfirmModal 
        isOpen={isConfirmOpen}
        message="Are you sure? All added connections will be cleared."
        onConfirm={confirmClearAll}
        onCancel={cancelClearAll}
      />
    </div>
  );
}
