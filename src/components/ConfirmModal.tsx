import React from 'react';

interface Props {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ isOpen, message, onConfirm, onCancel }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-guac-panel border border-guac-line rounded-xl p-6 shadow-2xl max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-guac-ink mb-2 m-0">Confirm Action</h3>
        <p className="text-sm text-guac-muted mb-6 m-0">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-transparent border border-guac-line text-guac-muted hover:text-guac-ink hover:border-guac-accent transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-guac-danger text-white border-none hover:brightness-110 transition-colors cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
