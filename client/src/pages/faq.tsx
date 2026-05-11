import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

export default function FAQ() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/faq")!));

  const faqs = [
    {
      question: "What is The Adare Collection?",
      answer:
        "We curate luxury private residences and estates within and around Adare Manor for Ryder Cup 2027. Every home is chosen for discretion, proximity to championship golf where applicable, and the quality expected for sponsors, executives, or private stays.",
    },
    {
      question: "Can our group rent a whole house near Adare Manor for Ryder Cup 2027?",
      answer:
        "Yes. Our portfolio centres on Ryder Cup 2027 houses for rent as complete private residences, so groups have exclusive use of the home throughout their stay subject to occupancy limits and confirmation.",
    },
    {
      question: "Do you offer corporate accommodation for Ryder Cup 2027?",
      answer:
        "Yes. Several properties suit corporate Ryder Cup 2027 accommodation and hospitality, including executive rentals on the manor grounds and larger estates elsewhere in County Limerick when you need entertaining space and discrete access to the venues.",
    },
    {
      question: "What is executive or high‑end corporate housing on your site?",
      answer:
        "These are flagship private homes booked for principals, delegates, sponsors, or branded hospitality. Fixtures, scale, and add‑on services vary by property; availability is confirmed enquiry‑by‑enquiry alongside any bespoke arrangements agreed in advance.",
    },
    {
      question:
        "Do you offer full packaged Ryder Cup travel services such as flights and holiday bundles?",
      answer:
        "We specialise in premium accommodation, not airline or package travel. Subject to confirmation, our team may coordinate onward ground logistics (for example chauffeurs or local transfers); flight booking remains with you or your travel partner.",
    },
    {
      question:
        "How close are the properties to Adare Manor, the demesne & the Ryder Cup 2027 tournament venue?",
      answer:
        "Distances vary by home: some estates sit on the manor demesne or within the golf village, steps or a short stroll from the course; others lie just minutes away by road for sponsors and corporate groups needing larger entertaining space and vehicle access.",
    },
    {
      question: "Are you focused on Ryder Cup 2027 private rental around Adare rather than all of Ireland?",
      answer:
        "Our Ryder Cup 2027 portfolio concentrates on County Limerick and the Adare Manor area so guests stay purposeful to the host venue. We are not a nationwide tour operator. Outside this core we only list additional homes when they directly support Ryder week itineraries.",
    },
    {
      question: "What amenities are included with each property?",
      answer:
        "Each property includes premium amenities such as luxury furnishings, fully equipped kitchens, multiple bedrooms and bathrooms, private parking, and concierge services. Specific amenities vary by property and are detailed in each listing.",
    },
    {
      question: "How do I book a property for Ryder Cup 2027?",
      answer:
        "Contact us through our website or email info@theadarecollection.ie. We'll discuss your requirements, show you available properties, and guide you through the booking process. All bookings are handled personally by our team.",
    },
    {
      question: "What is included in the concierge service?",
      answer:
        "Our concierge service includes assistance with restaurant reservations, transportation arrangements, event tickets, local recommendations, and any special requests you may have during your stay.",
    },
    {
      question: "Are the properties suitable for corporate groups?",
      answer:
        "Yes, our properties are perfect for corporate groups, sponsors, and business entertainment. We offer residences ranging from intimate 4‑bedroom homes to large estates accommodating multiple guests with meeting spaces and entertainment areas.",
    },
    {
      question: "What is the minimum stay requirement?",
      answer:
        "Minimum stay requirements vary by property and dates. For Ryder Cup 2027, we typically require a minimum 3‑7 night stay depending on the property and tournament schedule.",
    },
    {
      question: "Do you provide transportation to the golf course?",
      answer:
        "Many properties lie within walking distance of the Ryder Cup 2027 host venue. Properties further away can usually access private chauffeurs, shuttles, or licensed transport partners when arranged in advance as part of your stay planning.",
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer:
        "Cancellation policies vary by property and booking terms. We recommend discussing cancellation policies during the booking process. We understand that plans can change and will work with you to find the best solution.",
    },
    {
      question: "Are pets allowed in the properties?",
      answer:
        "Pet policies vary by property. Some properties welcome pets, while others may have restrictions. Please discuss your pet requirements when making your booking inquiry.",
    },
    {
      question: "Do you offer properties outside of Ryder Cup 2027 dates?",
      answer:
        "Yes, while we specialise in Ryder Cup 2027 accommodations, many of our properties are available for other dates throughout the year. Contact us to discuss availability for your preferred dates.",
    },
    {
      question: "How do I get to Adare Manor from the airport?",
      answer:
        "Adare Manor is approximately 20 minutes from Shannon Airport and 2.5 hours from Dublin Airport. We can arrange airport transfers, or you can rent a car. Detailed directions and transportation options are provided upon booking.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-normal text-primary mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-secondary leading-relaxed max-w-3xl mx-auto">
              Everything you need to know about luxury Ryder Cup 2027 accommodation near Adare Manor, from private
              estates to executive rentals and corporate stays in Ireland.
            </p>
            <p className="text-secondary text-base mt-4">
              Prefer to browse stays first?{" "}
              <Link href="/properties" className="underline underline-offset-4 hover:text-gray-900">
                View Ryder Cup 2027 properties
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-primary hover:text-gray-700 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-secondary leading-relaxed pb-6">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-normal text-primary mb-4">Still have questions?</h2>
            <p className="text-secondary mb-8">
              Our team is here to help you find the perfect accommodation for Ryder Cup 2027
            </p>
            <a
              href="/contact"
              className="inline-block border border-gray-700 bg-transparent text-gray-700 px-6 py-3 text-sm font-medium uppercase tracking-wider rounded-none hover:bg-gray-700 hover:text-white transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
