import { useEffect } from "react";
import { X } from "lucide-react";
import type { Property } from "@/lib/properties";
import { ContactEnquiryForm } from "@/components/contact-enquiry-form";

type PropertyEnquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
};

export function PropertyEnquiryModal({ isOpen, onClose, property }: PropertyEnquiryModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50] flex items-start justify-center overflow-y-auto py-6 md:items-center md:py-10 px-4">
      <div
        className="absolute inset-0 bg-black/75"
        aria-hidden
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-3xl max-h-[min(90vh,calc(100vh-3rem))] overflow-y-auto bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Request availability for ${property.name}`}
      >
        <div className="sticky top-0 z-20 flex justify-end bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-none p-2 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>

        <div className="px-5 pb-8 pt-2 md:px-8 md:pb-10">
          <ContactEnquiryForm
            heading="h2"
            introTestId="property-enquiry-intro"
            submitButtonTestId="button-send-property-enquiry"
            headingClassName="font-serif text-2xl md:text-3xl font-normal text-primary mb-3"
            containerClassName="w-full max-w-none mx-0"
            primaryPropertyId={property.id}
            onSubmitted={onClose}
          />
        </div>
      </div>
    </div>
  );
}
