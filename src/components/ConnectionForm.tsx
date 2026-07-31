import { useState, FormEvent, useRef, useEffect } from "react";
import { RememberedFields, GuacConnection } from "@/types";

interface Props {
  remembered: RememberedFields;
  onToggleRemember: (key: keyof RememberedFields, value: string) => void;
  onAdd: (connection: GuacConnection) => void;
  showToast: (msg: string, isError?: boolean) => void;
}

export function ConnectionForm({ remembered, onToggleRemember, onAdd, showToast }: Props) {
  const [formData, setFormData] = useState({
    name: remembered.name || "",
    host: remembered.host || "",
    user: remembered.user || "",
    pass: remembered.pass || "",
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // If remembered values change externally (e.g. initial load), update local state
    setFormData((prev) => ({
      name: remembered.name !== undefined ? remembered.name : prev.name,
      host: remembered.host !== undefined ? remembered.host : prev.host,
      user: remembered.user !== undefined ? remembered.user : prev.user,
      pass: remembered.pass !== undefined ? remembered.pass : prev.pass,
    }));
  }, [remembered]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (key: keyof typeof formData, label: string) => {
    const isRemembered = remembered[key] !== undefined;
    if (isRemembered) {
      // Forget
      onToggleRemember(key as keyof RememberedFields, "");
      showToast(`${label} forgotten`);
    } else {
      // Remember
      const val = formData[key].trim();
      if (key !== "pass" && val === "") {
        showToast(`Pehle ${label} likhein`, true);
        return;
      }
      if (key === "pass" && formData.pass === "") {
        showToast(`Pehle ${label} likhein`, true);
        return;
      }
      onToggleRemember(key as keyof RememberedFields, formData[key]);
      showToast(`${label} remembered`);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const { name, host, user, pass } = formData;
    
    if (!name.trim() || !host.trim() || !user.trim() || !pass) {
      showToast("Sab 4 fields bharein", true);
      return;
    }

    // Build the connection object
    const newConn: GuacConnection = {
      name: name.trim(),
      protocol: "rdp",
      parentIdentifier: "ROOT",
      parameters: {
        hostname: host.trim(),
        port: "3389",
        username: user.trim(),
        password: pass,
        security: "nla",
        "ignore-cert": "true",
        width: "1280",
        height: "720",
        "color-depth": "16",
        "enable-drive": "true",
        "drive-name": "H",
        "drive-path": "Download",
        "create-drive-path": "true",
        "enable-font-smoothing": "true",
      },
      attributes: {
        "max-connections": "5",
        "max-connections-per-user": "5",
      },
    };

    // Update any remembered fields with the latest submitted value
    if (remembered.name !== undefined) onToggleRemember("name", formData.name);
    if (remembered.host !== undefined) onToggleRemember("host", formData.host);
    if (remembered.user !== undefined) onToggleRemember("user", formData.user);
    if (remembered.pass !== undefined) onToggleRemember("pass", formData.pass);

    // Call add
    onAdd(newConn);

    // Clear unremembered fields
    setFormData((prev) => ({
      name: remembered.name !== undefined ? prev.name : "",
      host: remembered.host !== undefined ? prev.host : "",
      user: remembered.user !== undefined ? prev.user : "",
      pass: remembered.pass !== undefined ? prev.pass : "",
    }));

    // Focus first input
    nameInputRef.current?.focus();
  };

  const fields: Array<{
    key: keyof typeof formData;
    label: string;
    placeholder: string;
    type: string;
  }> = [
    { key: "name", label: "Connection name", placeholder: "e.g. Windows-VM-1", type: "text" },
    { key: "host", label: "Hostname / VM IP", placeholder: "e.g. 192.168.1.10", type: "text" },
    { key: "user", label: "Windows username", placeholder: "e.g. administrator", type: "text" },
    { key: "pass", label: "Windows password", placeholder: "••••••••", type: "password" },
  ];

  return (
    <div className="bg-guac-panel border border-guac-line rounded-xl p-5 flex flex-col gap-4 shadow-xl">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-guac-muted border-b border-guac-line pb-3 mb-1 m-0">
        Target Configuration
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-4">
          {fields.map((f) => {
            const isRemembered = remembered[f.key] !== undefined;
            const displayLabel = f.label.replace("Connection ", "").replace("Windows ", "");
            
            return (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label htmlFor={f.key} className="text-[11px] font-semibold text-guac-muted uppercase tracking-wide">
                  {f.label}
                </label>
                <div className="flex gap-2 items-stretch">
                  <input
                    ref={f.key === "name" ? nameInputRef : null}
                    id={f.key}
                    type={f.type}
                    value={formData[f.key]}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    autoComplete="off"
                    className="flex-1 bg-guac-field border border-guac-line rounded-lg px-3 py-2 text-sm text-guac-ink font-mono focus:border-guac-accent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleToggle(f.key, displayLabel)}
                    className={
                      isRemembered
                        ? "bg-guac-accent text-guac-accent-ink text-[10px] font-bold px-3 py-2 rounded-lg uppercase tracking-tight cursor-pointer"
                        : "border border-guac-line text-guac-muted text-[10px] font-bold px-3 py-2 rounded-lg uppercase tracking-tight hover:text-guac-ink hover:border-guac-accent cursor-pointer transition-colors"
                    }
                  >
                    {isRemembered ? "Saved" : "Pin"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="w-full bg-guac-ink text-guac-accent-ink font-bold py-3 mt-2 border-none rounded-lg text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
        >
          Append to Manifest
        </button>
      </form>
    </div>
  );
}
