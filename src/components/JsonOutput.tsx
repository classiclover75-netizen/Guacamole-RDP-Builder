import { GuacConnection } from "@/types";

interface Props {
  connections: GuacConnection[];
  onCopy: () => void;
  onDownload: () => void;
  onClearAll: () => void;
}

export function JsonOutput({ connections, onCopy, onDownload, onClearAll }: Props) {
  return (
    <div className="bg-guac-panel border border-guac-line rounded-xl flex flex-col md:h-[480px] h-[300px] overflow-hidden shadow-2xl shrink-0">
      <div className="flex justify-between items-center px-5 py-3 border-b border-guac-line bg-guac-panel-header shrink-0">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-guac-muted m-0">
          Generated JSON Manifest
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onCopy}
            className="border-none bg-guac-line text-[10px] font-bold text-white px-3 py-1 rounded uppercase hover:brightness-110 cursor-pointer transition-all"
          >
            Copy
          </button>
          <button
            onClick={onDownload}
            className="border-none bg-guac-line text-[10px] font-bold text-white px-3 py-1 rounded uppercase hover:brightness-110 cursor-pointer transition-all"
          >
            Download
          </button>
          <button
            onClick={onClearAll}
            className="border-none bg-guac-danger text-[10px] font-bold text-white px-3 py-1 rounded uppercase hover:brightness-110 cursor-pointer transition-all"
          >
            Clear All
          </button>
        </div>
      </div>
      <pre className="flex-1 p-5 overflow-auto text-[11px] leading-relaxed font-mono text-[#C9D1D9] bg-guac-pre m-0">
        {JSON.stringify(connections, null, 2)}
      </pre>
    </div>
  );
}
