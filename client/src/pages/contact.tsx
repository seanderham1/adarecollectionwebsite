import Navigation from "@/components/navigation";
import { useSEO } from "@/hooks/use-seo";
import Footer from "@/components/footer";
import { ContactEnquiryForm } from "@/components/contact-enquiry-form";
import { SEO_META_KEYWORDS_COMPACT } from "@/lib/seo-keyword-clusters";

export default function Contact() {
  useSEO({
    title: "Contact | Ryder Cup 2027 Accommodation | The Adare Collection Limited",
    description:
      "Enquire about luxury Ryder Cup 2027 accommodation at Adare Manor. Book your Adare rental for the Ryder Cup. Contact The Adare Collection Limited (trading as The Adare Collection).",
    keywords: SEO_META_KEYWORDS_COMPACT,
    ogImage: "https://theadarecollection.com/images/hero/adaremanor-img2.webp",
    ogUrl: "https://theadarecollection.com/contact",
  });

  return (
    <div className="min-h-screen bg-white">
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
