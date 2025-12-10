import React from "react";

interface SaveModalUsersProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }

export default function SaveModalUsers({ show, onClose, onConfirm } : SaveModalUsersProps) {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Changes</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to add these changes?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              Yes, Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
