import { GuacConnection } from "@/types";

interface Props {
  connections: GuacConnection[];
  onRemove: (index: number) => void;
}

export function ConnectionList({ connections, onRemove }: Props) {
  return (
    <div className="bg-guac-panel border border-guac-line rounded-xl p-5 flex flex-col gap-3 shadow-xl overflow-hidden min-h-0 shrink-0">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-guac-muted border-b border-guac-line pb-3 mb-1 m-0 shrink-0">
        Staging Queue
      </h2>

      <div className="space-y-2 overflow-y-auto min-h-0">
        {connections.length === 0 ? (
          <div className="text-guac-muted text-[11px] text-center p-[22px] border border-dashed border-guac-line rounded-lg uppercase tracking-wide">
            Queue is empty
          </div>
        ) : (
          connections.map((conn, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-guac-bg border border-guac-line p-3 rounded-lg"
            >
              <div className="flex flex-col min-w-0 mr-4">
                <span className="text-xs font-semibold truncate text-guac-ink">{conn.name}</span>
                <span className="text-[10px] font-mono text-guac-muted truncate">
                  {conn.parameters.username} @ {conn.parameters.hostname}
                </span>
              </div>
              <button
                onClick={() => onRemove(i)}
                className="bg-transparent border-none text-guac-danger text-[10px] font-bold uppercase cursor-pointer hover:opacity-80 transition-opacity"
              >
                Discard
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
