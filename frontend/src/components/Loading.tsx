interface LoadingProps {
  isLoading: boolean;
  actionMessage?: string;
}

export default function LoadingModal({ isLoading, actionMessage }: LoadingProps) {
  if (!isLoading) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">{actionMessage ? actionMessage : "Working on it, please wait..."} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
