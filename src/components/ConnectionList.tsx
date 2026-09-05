import { ConnectionState } from "@/types";
import { Download, Trash2, CheckSquare, Square, XCircle } from "lucide-react";

interface Props {
  connections: ConnectionState[];
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  onClearAll: () => void;
  onDownloadSingle: (id: string) => void;
}

export function ConnectionList({ 
  connections, 
  onRemove, 
  onToggleSelect, 
  onSelectAll, 
  onSelectNone,
  onClearAll,
  onDownloadSingle 
}: Props) {
  return (
    <div className="bg-guac-panel border border-guac-line rounded-xl p-5 flex flex-col gap-3 shadow-xl overflow-hidden min-h-0 shrink-0">
      <div className="flex justify-between items-center border-b border-guac-line pb-3 mb-1 shrink-0">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-guac-muted m-0">
          Staging Queue
        </h2>
        <div className="flex gap-2">
          {connections.length > 0 && (
            <>
              <button
                onClick={onSelectAll}
                className="bg-transparent border-none text-guac-muted text-[10px] font-bold uppercase cursor-pointer hover:text-guac-ink transition-colors"
              >
                All
              </button>
              <button
                onClick={onSelectNone}
                className="bg-transparent border-none text-guac-muted text-[10px] font-bold uppercase cursor-pointer hover:text-guac-ink transition-colors"
              >
                None
              </button>
              <span className="text-guac-line mx-1">|</span>
              <button
                onClick={onClearAll}
                className="bg-transparent border-none text-guac-danger text-[10px] font-bold uppercase cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1"
                title="Clear All"
              >
                <XCircle size={12} />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2 overflow-y-auto min-h-0 pr-1">
        {connections.length === 0 ? (
          <div className="text-guac-muted text-[11px] text-center p-[22px] border border-dashed border-guac-line rounded-lg uppercase tracking-wide">
            Queue is empty
          </div>
        ) : (
          connections.map((c) => (
            <div
              key={c.id}
              className={`flex justify-between items-center bg-guac-bg border p-3 rounded-lg transition-colors ${
                c.selected ? 'border-guac-accent shadow-[0_0_8px_rgba(77,182,165,0.15)]' : 'border-guac-line'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 mr-4">
                <button
                  onClick={() => onToggleSelect(c.id)}
                  className="bg-transparent border-none p-0 cursor-pointer text-guac-muted hover:text-guac-ink transition-colors flex items-center"
                >
                  {c.selected ? (
                    <CheckSquare size={16} className="text-guac-accent" />
                  ) : (
                    <Square size={16} />
                  )}
                </button>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-semibold truncate ${c.selected ? 'text-guac-ink' : 'text-guac-muted'}`}>{c.data.name}</span>
                  <span className="text-[10px] font-mono text-guac-muted truncate">
                    {c.data.parameters.username} @ {c.data.parameters.hostname}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => onDownloadSingle(c.id)}
                  className="bg-transparent border-none text-guac-muted cursor-pointer hover:text-guac-ink transition-colors flex items-center"
                  title="Download"
                >
                  <Download size={14} />
                </button>
                <button
                  onClick={() => onRemove(c.id)}
                  className="bg-transparent border-none text-guac-danger text-[10px] font-bold uppercase cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Discard
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

