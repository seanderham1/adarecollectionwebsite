import { useEffect, useState } from "react";
import { X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  title: string;
}

export default function BrochureModal({ isOpen, onClose, propertyId, title }: BrochureModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [lastPagePdf, setLastPagePdf] = useState<string>("");

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

  // Load brochure data when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setCurrentPage(0);
      
      // Load images for the property
      const loadBrochureData = async () => {
        try {
          const imagePromises = [];
          let pageCount = 0;
          
          // Load all page images
          for (let i = 0; i < 20; i++) { // Check up to 20 pages
            const imagePath = `/images/brochures/${propertyId}/page-${i}.webp`;
            const img = new Image();
            
            const promise = new Promise<string | null>((resolve) => {
              img.onload = () => resolve(imagePath);
              img.onerror = () => resolve(null);
              img.src = imagePath;
            });
            
            imagePromises.push(promise);
          }
          
          const results = await Promise.all(imagePromises);
          const validImages = results.filter((img): img is string => img !== null);
          
          setImages(validImages);
          // Set total pages based on property - some have PDF final page, others are all images
          let totalPageCount = validImages.length;
          if (propertyId === 'rangeview') {
            // Range View: pages 0-10 are images, page 11 is PDF final page
            totalPageCount = validImages.length + 1;
          } else if (propertyId === 'the-fairways') {
            // The Fairways: pages 0-12 are images, page 14 is PDF final page
            totalPageCount = validImages.length + 1;
          } else if (propertyId === 'the-captains') {
            // The Captains: pages 0-11 are images, page 12 is PDF final page
            totalPageCount = validImages.length + 1;
          } else if (propertyId === 'cragleigh-house') {
            // Cragleigh House: pages 0-10 are images, page 11 is PDF final page
            totalPageCount = validImages.length + 1;
          } else {
            // Other properties: images + 1 PDF final page
            totalPageCount = validImages.length + 1;
          }
          setTotalPages(totalPageCount);
          
          // Use the extracted final page PDF based on property ID
          let finalPagePdfPath = '';
          switch(propertyId) {
            case 'rangeview':
              finalPagePdfPath = '/images/brochures/rangeview/last-page.pdf';
              break;
            case 'putters-way':
              finalPagePdfPath = '/images/brochures/putters-way/last-page.pdf';
              break;
            case 'the-fairways':
              finalPagePdfPath = '/images/brochures/the-fairways/last-page.pdf';
              break;
            case 'the-captains':
              finalPagePdfPath = '/images/brochures/the-captains/last-page.pdf';
              break;
            case 'cragleigh-house':
              finalPagePdfPath = '/images/brochures/cragleigh-house/last-page.pdf';
              break;
            default:
              finalPagePdfPath = `/images/brochures/${propertyId}/last-page.pdf`;
          }
          setLastPagePdf(finalPagePdfPath);
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading brochure:', error);
          setHasError(true);
          setIsLoading(false);
        }
      };
      
      loadBrochureData();
    }
  }, [isOpen, propertyId]);

  const goToPrevPage = () => {
    setCurrentPage(prev => prev === 0 ? totalPages - 1 : prev - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(prev => prev === totalPages - 1 ? 0 : prev + 1);
  };



  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
              {/* Modal Content */}
              <div className="relative w-full max-w-6xl mx-4 bg-white overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-normal text-gray-900 truncate pr-4">
            {title} - Brochure
          </h2>
          <div className="flex items-center space-x-2">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Brochure Controls */}
        <div className="flex items-center justify-center px-4 py-2 border-b bg-gray-100">
          <div className="flex items-center space-x-2">
            {/* Page Navigation */}
            <button
              onClick={goToPrevPage}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
              title="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <span className="text-xs text-gray-700 px-2">
              {currentPage + 1} / {totalPages}
            </span>
            
            <button
              onClick={goToNextPage}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
              title="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative w-full flex items-center justify-center" style={{ height: "70vh" }}>
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
              <Loader2 className="h-8 w-8 text-gray-600 animate-spin mb-4" />
              <div className="text-gray-600 text-sm">Loading brochure...</div>
              <div className="text-gray-500 text-xs mt-2 max-w-sm text-center">
                Optimized for fast loading
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-600">
              <p className="text-lg mb-4">Failed to load brochure</p>
              <p className="text-sm text-gray-500 mb-4">
                There was an error loading the brochure content
              </p>
              <button
                onClick={() => {
                  setIsLoading(true);
                  setHasError(false);
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !hasError && (
            <>
              {isLastPage ? (
                // Show PDF for last page with clickable links
                <div 
                  className="shadow-lg"
                  style={{ 
                    width: '1000px',
                    height: '562px', // 1440:810 aspect ratio (1000/1440*810 = 562)
                    maxWidth: '90%',
                    maxHeight: '90%',
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    border: 'none',
                    position: 'relative'
                  }}
                >
                  <iframe
                    src={`${lastPagePdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&disableprint=1`}
                    className="border-0"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      backgroundColor: 'white',
                      display: 'block'
                    }}
                    title={`${title} Brochure - Last Page`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </div>
              ) : (
                // Show optimized WebP image
                <img
                  src={images[currentPage]}
                  alt={`${title} Brochure - Page ${currentPage + 1}`}
                  className="shadow-lg"
                  style={{ 
                    maxWidth: '90%',
                    maxHeight: '90%',
                    width: 'auto',
                    height: 'auto',
                  }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </>
          )}
        </div>

        {/* Instructions Footer */}
        <div className="px-4 py-3 border-t bg-gray-50">
          <p className="text-xs text-gray-700 text-center">
            Navigate through the brochure pages using the arrow controls above
          </p>
        </div>

      </div>
    </div>
  );
}
