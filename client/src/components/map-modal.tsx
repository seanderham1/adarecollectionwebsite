import { useEffect } from "react";
import { X } from "lucide-react";
import PropertyMap from "./property-map";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

export default function MapModal({ isOpen, onClose, propertyId }: MapModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl mx-4 bg-black overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white hover:bg-gray-100 text-black transition-all duration-200"
          aria-label="Close map"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Map Container - Responsive aspect ratio */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video">
          <div id="modal-property-map" className="absolute inset-0 w-full h-full">
            <PropertyMap propertyId={propertyId} containerId="modal-property-map" />
          </div>
        </div>
      </div>
    </div>
  );
}
