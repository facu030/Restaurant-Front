 function Modal({ open, isOpen, title, onClose, children, sizeClass = 'max-w-xl' }) {
  const visible = open ?? isOpen;
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${sizeClass} rounded-xl bg-white shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
