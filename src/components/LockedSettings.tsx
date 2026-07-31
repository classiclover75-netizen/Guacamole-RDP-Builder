export function LockedSettings() {
  const lockedValues = [
    { label: "protocol", value: "rdp" },
    { label: "group", value: "ROOT" },
    { label: "port", value: "3389" },
    { label: "security", value: "nla" },
    { label: "ignore-cert", value: "true" },
    { label: "width", value: "1280" },
    { label: "height", value: "720" },
    { label: "color-depth", value: "16" },
    { label: "enable-drive", value: "true" },
    { label: "drive-name", value: "H" },
    { label: "drive-path", value: "Download" },
    { label: "create-drive-path", value: "true" },
    { label: "font-smoothing", value: "true" },
    { label: "max-connections", value: "5" },
    { label: "per-user", value: "5" },
  ];

  return (
    <div className="bg-guac-panel border border-guac-line rounded-xl p-5 shadow-xl grow overflow-hidden shrink-0">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-guac-muted border-b border-guac-line pb-3 mb-3 m-0">
        Environmental Constraints
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
        {lockedValues.map((item) => (
          <div key={item.label} className="flex justify-between border-b border-guac-line pb-1 items-end">
            <span className="text-[10px] font-mono text-guac-muted uppercase truncate mr-2">{item.label}</span>
            <span className="text-[10px] font-mono text-guac-accent uppercase text-right">{item.value}</span>
          </div>
        ))}
      </div>
      
      <p className="mt-4 mb-0 text-[9px] italic text-guac-muted leading-normal uppercase tracking-wider">
        System-level overrides are enforced globally for consistent audit logging and remote performance.
      </p>
    </div>
  );
}
