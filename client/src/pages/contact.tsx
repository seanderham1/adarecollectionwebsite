import Navigation from "@/components/navigation";
import { useSEO } from "@/hooks/use-seo";
import Footer from "@/components/footer";
import { ContactEnquiryForm } from "@/components/contact-enquiry-form";
import { ContactLocalBusinessStructuredData } from "@/components/structured-data";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";

export default function Contact() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/contact")!));

  return (
    <div className="min-h-screen bg-white">
      <ContactLocalBusinessStructuredData />
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <ContactEnquiryForm
            heading="h1"
            introTestId="contact-intro"
            submitButtonTestId="button-send-inquiry"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
