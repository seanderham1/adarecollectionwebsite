import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import type { ReactNode } from "react";
import { FaqPageStructuredData } from "@/components/structured-data";

type FaqItem = { question: string; answer: ReactNode };

export default function FAQ() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/faq")!));

  const faqs: FaqItem[] = [
    {
      question: "What is The Adare Collection?",
      answer:
        "We curate luxury private residences and estates within and around Adare Manor for Ryder Cup 2027. Every home is chosen for discretion, proximity to championship golf where applicable, and the quality expected for sponsors, executives, or private stays.",
    },
    {
      question: "Are you official Ryder Cup accommodation on the Adare Manor estate?",
      answer: (
        <div className="space-y-3">
          <p>
            The Adare Collection is an independent luxury accommodation provider. We are not affiliated
            with Adare Manor or Ryder Cup Europe. Several of our homes sit on the Adare Manor demesne or
            within the gated resort, among the closest private Ryder Cup 2027 accommodation to the
            tournament venue.
          </p>
          <p>
            Browse{" "}
            <Link href="/properties" className="text-primary underline underline-offset-2 hover:no-underline">
              properties
            </Link>
            ,{" "}
            <Link href="/ryder-cup-packages" className="text-primary underline underline-offset-2 hover:no-underline">
              packages
            </Link>
            , or{" "}
            <Link href="/corporate-hospitality" className="text-primary underline underline-offset-2 hover:no-underline">
              corporate hospitality
            </Link>{" "}
            for options confirmed enquiry-by-enquiry.
          </p>
        </div>
      ),
    },
    {
      question: "Do you offer Ryder Cup 2027 packages or corporate hospitality?",
      answer: (
        <div className="space-y-3">
          <p>
            Yes. Our{" "}
            <Link href="/ryder-cup-packages" className="text-primary underline underline-offset-2 hover:no-underline">
              Ryder Cup 2027 packages
            </Link>{" "}
            combine estate rentals with optional chef, chauffeur, and concierge.{" "}
            <Link href="/corporate-hospitality" className="text-primary underline underline-offset-2 hover:no-underline">
              Corporate hospitality
            </Link>{" "}
            pages describe whole-home hosting for sponsors and executive groups.
          </p>
        </div>
      ),
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
        "Do you offer full packaged Ryder Cup travel management such as flights and holiday bundles?",
      answer: (
        <div className="space-y-3">
          <p>
            We specialise in premium accommodation and estate-hosted services, not airline or package-holiday
            sales. See our{" "}
            <Link href="/services" className="text-primary underline underline-offset-2 hover:no-underline">
              Ryder Cup 2027 travel management
            </Link>{" "}
            page for concierge, chef, chauffeur, and ground transfers arranged around your rental.
          </p>
          <p>Flight booking remains with you or your travel partner.</p>
        </div>
      ),
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
      answer: (
        <div className="space-y-3">
          <p>
            Contact us through our website{" "}
            <Link href="/contact" className="text-primary underline underline-offset-2 hover:no-underline">
              contact form
            </Link>
            . We&apos;ll discuss your requirements, show you available properties, and guide you through the booking process. All bookings are handled personally by our team. Each reservation is for a fixed rental period of up to eight nights, with no minimum length required.
          </p>
          <p>
            A non-refundable booking deposit of 50% is required upon signing to secure a property. The remaining balance is due no later than 31 January 2027 unless otherwise agreed in writing, and a 20% security deposit is required with final payment. Full payment terms are in our{" "}
            <Link
              href="/terms#payment-terms"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              Terms &amp; Conditions
            </Link>
            , Section 3.2 (Payment Terms).
          </p>
        </div>
      ),
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
      question: "What are the stay lengths for Ryder Cup 2027?",
      answer:
        "Stays are offered for a fixed rental period of up to eight nights during the Ryder Cup window. There is no minimum stay; you may book for fewer nights within that cap. Your quoted price and payment schedule cover the agreed period confirmed at booking (up to eight nights), not open-ended nightly extensions. Exact check-in and check-out dates are finalised when you enquire, subject to availability.",
    },
    {
      question: "Do you provide transportation to the golf course?",
      answer:
        "Many properties lie within walking distance of the Ryder Cup 2027 host venue. Properties further away can usually access private chauffeurs, shuttles, or licensed transport partners when arranged in advance as part of your stay planning.",
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer: (
        <div className="space-y-3">
          <p>
            Cancellations must be requested in writing to{" "}
            <a
              href="mailto:info@theadarecollection.ie"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              info@theadarecollection.ie
            </a>
            . The 50% booking deposit is strictly non-refundable under all circumstances. Refunds on amounts paid above that deposit depend on how far in advance you cancel before your arrival date:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>More than 180 days before arrival: 100% refund of amounts paid in excess of the deposit</li>
            <li>Between 120 and 180 days before arrival: 50% refund of amounts paid in excess of the deposit</li>
            <li>Less than 120 days before arrival: no refund of amounts paid in excess of the deposit</li>
            <li>Approved refunds are processed within 14 business days of cancellation confirmation</li>
          </ul>
          <p>
            This is a summary only. The binding terms, including how{" "}
            <Link href="/terms#force-majeure" className="text-primary underline underline-offset-2 hover:no-underline">
              Section 8 (Force Majeure)
            </Link>{" "}
            may apply, are in our{" "}
            <Link
              href="/terms#cancellation-refund-policy"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              Terms &amp; Conditions
            </Link>
            , Section 3.3 (Cancellation and Refund Policy). Please read those sections in full; we confirm the
            position for your specific booking when you reserve.
          </p>
        </div>
      ),
    },
    {
      question: "Are pets allowed in the properties?",
      answer:
        "No. Pets are not permitted in any of our properties. However, if you rely on a registered assistance dog, please mention this when you enquire so we can advise on next steps.",
    },
    {
      question: "Do you offer properties outside of Ryder Cup 2027 dates?",
      answer:
        "Yes, while we specialise in Ryder Cup 2027 accommodations, many of our properties are available for other dates throughout the year. Contact us to discuss availability for your preferred dates.",
    },
    {
      question: "How do I get to the Ryder Cup 2027?",
      answer: (
        <div className="space-y-4">
          <p>
            The 2027 Ryder Cup runs 13–19 September at Adare Manor, County Limerick. There is{" "}
            <strong>no spectator parking on-site</strong>. Organisers strongly recommend official{" "}
            <em>Train and Ride</em> or <em>Park and Ride</em> services for match days. Below is a
            practical overview; always check{" "}
            <a
              href="https://www.rydercup.com/attend/transport"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              official Ryder Cup transport guidance
            </a>{" "}
            before you travel, as routes and booking windows may be updated.
          </p>

          <div>
            <p className="font-medium text-primary mb-2">By air</p>
            <p>
              Adare Manor is reachable from four main airports:{" "}
              <strong>Shannon</strong> (roughly 30–40 minutes by road, the closest international
              hub), <strong>Dublin</strong> (around 2–2.5 hours), <strong>Cork</strong>, and{" "}
              <strong>Kerry</strong>. Most international visitors fly into Dublin or Shannon; Shannon
              suits guests arriving from the UK, Europe, and transatlantic routes serving the west of
              Ireland.
            </p>
            <p className="mt-2">
              We do not sell flights, but we can arrange chauffeur and ground transfers around your
              rental through our{" "}
              <Link href="/services" className="text-primary underline underline-offset-2 hover:no-underline">
                travel management
              </Link>{" "}
              service.{" "}
              <Link href="/contact" className="text-primary underline underline-offset-2 hover:no-underline">
                contact us
              </Link>{" "}
              to discuss.
            </p>
          </div>

          <div>
            <p className="font-medium text-primary mb-2">By train</p>
            <p>
              Irish Rail and the National Transport Authority are running a dedicated spectator shuttle
              on a reinstated line between <strong>Limerick Junction</strong> and a temporary{" "}
              <strong>Adare station</strong>, a short walk from the Ryder Cup gates. Limerick Junction
              connects direct services from Dublin Heuston (~1h 30m), Cork Kent (~55m), Killarney
              (~1h 30m), and Waterford (~1h 45m); the Adare shuttle takes approximately 45 minutes.
            </p>
            <p className="mt-2">
              Travelling from <strong>Galway</strong>? Take the train to Limerick Colbert (~2 hours),
              then a dedicated shuttle bus to the Ryder Cup bus terminal (~35–40 minutes).
            </p>
            <p className="mt-2">
              Read our guide:{" "}
              <Link
                href="/blog/adare-ryder-cup-railway-line"
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                New railway line for Ryder Cup 2027 spectators
              </Link>
              .
            </p>
          </div>

          <div>
            <p className="font-medium text-primary mb-2">By car (Park and Ride)</p>
            <p>
              If you drive, you cannot park at Adare Manor. Use official{" "}
              <strong>Park and Ride</strong> sites across Limerick. Pre-booked shuttle buses complete
              the journey (typically 10–30 minutes to the venue). Multiple temporary sites are planned,
              including facilities with several thousand spaces near Patrickswell on the N21 corridor.
            </p>
          </div>

          <div>
            <p className="font-medium text-primary mb-2">By helicopter</p>
            <p>
              A dedicated on-site heliport is planned for tournament week alongside Adare Manor&apos;s
              existing private landing area (~7.5 nm from Shannon). Prior permission (PPR) is required
              for all helicopter arrivals; this remains a niche option for VIP and corporate guests
              rather than typical spectators.
            </p>
            <p className="mt-2">
              More detail in our{" "}
              <Link
                href="/blog/helicopter-landing-ryder-cup-2027"
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                helicopter landing guide
              </Link>
              .
            </p>
          </div>

          <div>
            <p className="font-medium text-primary mb-2">From the UK and overseas</p>
            <p>
              Common routes include short hops or full flights into Shannon or Dublin, rail connections
              via Limerick Junction for match days, or self-drive to a Park and Ride site. Many of our
              guests combine a whole-home rental near Adare with private chauffeur access to the
              tournament. Browse{" "}
              <Link href="/properties" className="text-primary underline underline-offset-2 hover:no-underline">
                properties
              </Link>{" "}
              and{" "}
              <Link href="/ryder-cup-packages" className="text-primary underline underline-offset-2 hover:no-underline">
                Ryder Cup packages
              </Link>{" "}
              to plan your base for the week.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const faqSchemaItems = faqs.map((f) => ({
    question: f.question,
    answer: typeof f.answer === "string" ? f.answer : "See our website for full details.",
  }));

  return (
    <div className="min-h-screen bg-white">
      <FaqPageStructuredData items={faqSchemaItems} />
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
