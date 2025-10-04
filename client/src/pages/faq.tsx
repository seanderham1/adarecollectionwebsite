import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  useSEO({
    title: 'Frequently Asked Questions - Ryder Cup 2027 Accommodation | The Adare Collection',
    description: 'Get answers to common questions about luxury Ryder Cup 2027 accommodations at The Adare Collection. Learn about booking, amenities, location, and exclusive access to Adare Manor Estate.',
    keywords: 'Ryder Cup 2027 FAQ, luxury accommodation questions, Adare Manor booking, golf tournament housing, Ireland luxury rentals',
    ogImage: 'https://theadarecollection.com/images/hero/adaremanor-img1.webp',
    ogUrl: 'https://theadarecollection.com/faq'
  });

  const faqs = [
    {
      question: "What is The Adare Collection?",
      answer: "The Adare Collection offers exclusive luxury private residences for Ryder Cup 2027. We provide handpicked properties within and around Adare Manor Estate, each chosen for comfort, privacy, and proximity to the golf course."
    },
    {
      question: "How close are the properties to Adare Manor Golf Course?",
      answer: "Our properties range from being within the Adare Manor Estate grounds to just minutes away. Some properties are literally steps from the 1st tee, while others offer a short 5-minute walk to the course entrance."
    },
    {
      question: "What amenities are included with each property?",
      answer: "Each property includes premium amenities such as luxury furnishings, fully equipped kitchens, multiple bedrooms and bathrooms, private parking, and concierge services. Specific amenities vary by property and are detailed in each listing."
    },
    {
      question: "How do I book a property for Ryder Cup 2027?",
      answer: "Contact us through our website or email info@theadarecollection.ie. We'll discuss your requirements, show you available properties, and guide you through the booking process. All bookings are handled personally by our team."
    },
    {
      question: "What is included in the concierge service?",
      answer: "Our concierge service includes assistance with restaurant reservations, transportation arrangements, event tickets, local recommendations, and any special requests you may have during your stay."
    },
    {
      question: "Are the properties suitable for corporate groups?",
      answer: "Yes, our properties are perfect for corporate groups, sponsors, and business entertainment. We offer properties ranging from intimate 4-bedroom homes to large estates accommodating multiple guests with meeting spaces and entertainment areas."
    },
    {
      question: "What is the minimum stay requirement?",
      answer: "Minimum stay requirements vary by property and dates. For Ryder Cup 2027, we typically require a minimum 3-7 night stay depending on the property and tournament schedule."
    },
    {
      question: "Do you provide transportation to the golf course?",
      answer: "Many of our properties are within walking distance of the course. For properties further away, we can arrange transportation services including private drivers, golf carts, or shuttle services."
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer: "Cancellation policies vary by property and booking terms. We recommend discussing cancellation policies during the booking process. We understand that plans can change and will work with you to find the best solution."
    },
    {
      question: "Are pets allowed in the properties?",
      answer: "Pet policies vary by property. Some properties welcome pets, while others may have restrictions. Please discuss your pet requirements when making your booking inquiry."
    },
    {
      question: "Do you offer properties outside of Ryder Cup 2027 dates?",
      answer: "Yes, while we specialize in Ryder Cup 2027 accommodations, many of our properties are available for other dates throughout the year. Contact us to discuss availability for your preferred dates."
    },
    {
      question: "How do I get to Adare Manor from the airport?",
      answer: "Adare Manor is approximately 20 minutes from Shannon Airport and 2.5 hours from Dublin Airport. We can arrange airport transfers, or you can rent a car. Detailed directions and transportation options are provided upon booking."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-normal text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-3xl mx-auto">
              Everything you need to know about luxury accommodations for Ryder Cup 2027 at The Adare Collection
            </p>
          </div>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-primary hover:text-gray-700 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-secondary leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-normal text-primary mb-4">
              Still have questions?
            </h2>
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
