import { useEffect } from "react";
import { X } from "lucide-react";

interface MatterportModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  /** Accessible name for the embedded tour */
  title?: string;
}

export default function MatterportModal({
  isOpen,
  onClose,
  src,
  title = "360 degree virtual property tour",
}: MatterportModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-6xl bg-black overflow-hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white hover:bg-gray-100 text-black transition-all duration-200"
          aria-label="Close virtual tour"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative w-full aspect-video min-h-[50vh] sm:min-h-[60vh]">
          <iframe
            key={src}
            src={src}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="fullscreen; xr-spatial-tracking"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
