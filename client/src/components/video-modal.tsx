import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
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

  // Convert Google Drive share URL to embed URL
  const getEmbedUrl = (url: string) => {
    // Extract file ID from Google Drive URL
    const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      // Use the embed URL format
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl mx-4 bg-black overflow-hidden shadow-2xl">
        {/* Video Container - Larger size */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title="Property Video"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
