import { useEffect, useState, useRef } from "react";
import { X, Loader2, WifiOff } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [showControls, setShowControls] = useState(true);
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);


  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setRetryCount(0);
      setShowControls(true);
      
      // Detect connection speed
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const effectiveType = connection?.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setConnectionSpeed('slow');
        } else if (effectiveType === '3g') {
          setConnectionSpeed('medium');
        } else {
          setConnectionSpeed('fast');
        }
      }
      
      // Check if mobile and show warning
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        setShowMobileWarning(true);
        // Auto-hide warning after 5 seconds
        setTimeout(() => setShowMobileWarning(false), 5000);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowMobileWarning(false);
    }
  }, [isOpen]);


  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    if (retryCount < 3) {
      // Retry loading the video
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setIsLoading(true);
        setHasError(false);
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 1000 * (retryCount + 1)); // Exponential backoff
    } else {
      setHasError(true);
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setIsLoading(true);
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
    showControlsTemporarily();
  };

  // Auto-hide controls after 2.5 seconds (unless hovering over close button)
  const hideControlsAfterDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      // Don't hide controls if hovering over the close button
      if (!isHoveringCloseButton) {
        setShowControls(false);
      }
    }, 2500);
  };

  // Show controls and reset timer
  const showControlsTemporarily = () => {
    setShowControls(true);
    hideControlsAfterDelay();
  };

  const handleMouseMove = () => {
    showControlsTemporarily();
  };

  const handleMouseLeave = () => {
    // Fade out immediately when mouse leaves the player (unless hovering over close button)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Only hide controls if not hovering over the close button
    if (!isHoveringCloseButton) {
      setShowControls(false);
    }
  };

  const handleClick = () => {
    showControlsTemporarily();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-6xl mx-4 bg-black overflow-hidden shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          onMouseEnter={() => {
            setIsHoveringCloseButton(true);
            setShowControls(true);
            // Clear any pending hide timeout when hovering over close button
            if (controlsTimeoutRef.current) {
              clearTimeout(controlsTimeoutRef.current);
            }
          }}
          onMouseLeave={() => {
            setIsHoveringCloseButton(false);
            // Start the hide timer when leaving the close button
            hideControlsAfterDelay();
          }}
          className={`absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-opacity duration-300 bg-black/50 p-1 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <X className="h-6 w-6" />
        </button>

        {/* Video Container */}
        <div 
          className="relative w-full"
          style={{ paddingBottom: "56.25%" }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
              <Loader2 className="h-8 w-8 text-white animate-spin mb-4" />
              <div className="text-white text-sm">Loading video...</div>
            </div>
          )}

          {/* Mobile Data Warning */}
          {showMobileWarning && (
            <div className="absolute top-4 left-4 right-4 z-30 bg-yellow-500 text-black p-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <WifiOff className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Mobile Data Usage</div>
                  <div className="text-xs">
                    This video will use approximately 20-65MB of data
                    {connectionSpeed === 'slow' && ' • Slow connection detected'}
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMobileWarning(false);
                  }}
                  className="text-black hover:text-gray-700"
                  aria-label="Dismiss warning"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Connection Speed Indicator */}
          {connectionSpeed === 'slow' && !showMobileWarning && (
            <div className="absolute top-4 left-4 z-30 bg-orange-500 text-white px-2 py-1 rounded text-xs">
              Slow Connection
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white">
              <p className="text-lg mb-4">Failed to load video</p>
              <p className="text-sm text-gray-400 mb-4">
                {retryCount > 0 ? `Retry attempt ${retryCount}/3 failed` : 'Network or server error'}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRetry();
                }}
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
                aria-label="Retry loading video"
              >
                Try Again
              </button>
            </div>
          )}

          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute top-0 left-0 w-full h-full object-cover"
            controls
            autoPlay
            loop
            playsInline
            preload={connectionSpeed === 'slow' ? 'none' : 'metadata'}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={handleVideoCanPlay}
            style={{ display: isLoading || hasError ? 'none' : 'block' }}
          />

        </div>
      </div>
    </div>
  );
}