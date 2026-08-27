import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";

export default function PrivacyPolicy() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/privacy")!));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-left mb-12">
            <h1 className="font-serif text-4xl font-normal text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: August 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              
              {/* Introduction */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  1. Introduction
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    The Adare Collection Limited, trading as The Adare Collection (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), CRO No. 812874, is committed to protecting your privacy and personal information. We act as exclusive representative, marketing agent, and booking facilitator for luxury short-term residential accommodation. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in connection with property rentals for Ryder Cup 2027 and related events.
                  </p>
                  <p>
                    By using our website and services, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our services.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  2. Information We Collect
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <h3 className="font-serif text-xl font-normal text-primary mb-3">
                    2.1 Personal Information
                  </h3>
                  <p>
                    We collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Submit property inquiries or booking requests</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us through our website forms</li>
                    <li>Request availability information</li>
                    <li>Engage with our customer service</li>
                  </ul>
                  <p>
                    This information may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and contact details (email address, phone number, postal address)</li>
                    <li>Country of residence and international dialing codes</li>
                    <li>Property preferences and requirements</li>
                    <li>Event dates, group size, and guest-party details needed to perform a booking</li>
                    <li>Payment and booking details (including Deposit, Rent, and Security Deposit information processed via our designated client account)</li>
                    <li>Communication preferences</li>
                    <li>Any additional information you choose to provide</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    2.2 Automatically Collected Information
                  </h3>
                  <p>
                    When you visit our website, we automatically collect certain information about your device and usage patterns:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                    <li>Device identifiers and characteristics</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  3. How We Use Your Information
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Provision:</strong> To market properties, facilitate bookings, collect Deposit, Rent, and Security Deposit payments into our designated client account, and coordinate guest services</li>
                    <li><strong>Communication:</strong> To respond to your inquiries, send booking confirmations, and provide customer support</li>
                    <li><strong>Contract Performance:</strong> To enable Owners and Occupiers to enter into and perform Residential Letting Agreements</li>
                    <li><strong>Marketing:</strong> To send you newsletters, property updates, and promotional materials (with your consent)</li>
                    <li><strong>Personalization:</strong> To tailor our services and recommendations to your preferences</li>
                    <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                    <li><strong>Business Operations:</strong> To improve our services, analyze usage patterns, and enhance user experience</li>
                    <li><strong>Security:</strong> To protect against fraud, unauthorized access, and other security threats</li>
                  </ul>
                </div>
              </section>

              {/* Legal Basis for Processing */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  4. Legal Basis for Processing
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We process your personal information based on the following legal grounds:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Consent:</strong> When you have given clear consent for us to process your personal data for specific purposes</li>
                    <li><strong>Contract Performance:</strong> To fulfill our contractual obligations to you</li>
                    <li><strong>Legitimate Interests:</strong> To pursue our legitimate business interests, such as improving our services and preventing fraud</li>
                    <li><strong>Legal Obligation:</strong> To comply with legal requirements and regulations</li>
                  </ul>
                </div>
              </section>

              {/* Information Sharing */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  5. Information Sharing and Disclosure
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our business (e.g., property management, payment processing, email services, client-account administration)</li>
                    <li><strong>Property Owners:</strong> With property Owners and their representatives as necessary to conclude and perform Residential Letting Agreements, coordinate access, housekeeping, inspections, and guest services, and handle Security Deposit matters</li>
                    <li><strong>Guest Service Partners:</strong> With caterers, transport, concierge, security, or other suppliers you ask us to arrange, where needed to deliver those services</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>Consent:</strong> When you have given explicit consent for us to share your information</li>
                    <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of The Adare Collection Limited, property Owners, our users, or others</li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  6. Data Security
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication procedures</li>
                    <li>Staff training on data protection practices</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  7. Data Retention
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Booking Information:</strong> Retained for 7 years after your stay for legal and accounting purposes</li>
                    <li><strong>Marketing Communications:</strong> Retained until you unsubscribe or request deletion</li>
                    <li><strong>Website Usage Data:</strong> Retained for up to 2 years for analytics and improvement purposes</li>
                    <li><strong>Customer Service Records:</strong> Retained for 3 years after the last interaction</li>
                  </ul>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  8. Your Rights
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                    <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                    <li><strong>Restriction:</strong> Request restriction of processing of your personal information</li>
                    <li><strong>Portability:</strong> Request transfer of your personal information to another service provider</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information for certain purposes</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw consent for processing based on consent</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at{" "}
                    <a href="mailto:info@theadarecollection.ie" className="text-primary hover:underline">
                      info@theadarecollection.ie
                    </a>
                    . We will respond to your request within 30 days.
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies">
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  9. Cookies and Tracking Technologies
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. Cookies are small text files stored on your device that help us:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and user behavior</li>
                    <li>Improve website functionality and performance</li>
                    <li>Provide personalized content and recommendations</li>
                  </ul>
                  <p>
                    You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
                  </p>
                  <p>
                    When you first visit our website, we ask whether you allow optional analytics cookies. You can change this decision at any time using{" "}
                    <strong>Cookie settings</strong> in the website footer.
                  </p>
                </div>
              </section>

              {/* International Transfers */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  10. International Data Transfers
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    As a luxury property rental service serving international clients, we may transfer your personal information to countries outside your country of residence. When we do so, we ensure appropriate safeguards are in place, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standard contractual clauses approved by relevant data protection authorities</li>
                    <li>Adequacy decisions by relevant data protection authorities</li>
                    <li>Other appropriate safeguards as required by applicable law</li>
                  </ul>
                </div>
              </section>

              {/* CCTV and Property Monitoring */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  11. CCTV and Property Monitoring
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Some Properties may have CCTV cameras or other monitoring devices (for example at entrances, parking areas, or external spaces). Where such devices are present, the Owner is responsible for disclosing their existence, and we will take reasonable steps to ensure that approved disclosure wording and a privacy notice are available before your stay.
                  </p>
                  <p>
                    Monitoring is typically for security and safety of the Property, Occupiers, and neighbours. Footage may be processed by the Owner and/or their service providers as independent or joint controllers, depending on the arrangements for that Property. Guests must not cover, disconnect, disable, or interfere with CCTV or other safety or security equipment.
                  </p>
                  <p>
                    If you have questions about cameras at a specific Property, please contact us before arrival and we will obtain the relevant disclosure from the Owner.
                  </p>
                </div>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  12. Children's Privacy
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Our services are not directed to children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                  </p>
                </div>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  13. Changes to This Privacy Policy
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Posting the updated policy on our website</li>
                    <li>Sending you an email notification (if you have provided an email address)</li>
                    <li>Displaying a prominent notice on our website</li>
                  </ul>
                  <p>
                    Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  14. Contact Information
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p><strong>The Adare Collection Limited</strong></p>
                    <p>CRO No. 812874</p>
                    <p>Email: <a href="mailto:info@theadarecollection.ie" className="text-primary hover:underline">info@theadarecollection.ie</a></p>
                    <p>Phone: <a href="tel:+353866681930" className="text-primary hover:underline">+353 86 668 1930</a></p>
                    <p>
                      Registered office: Byrne and Co., Gortboy, Church Street, Newcastle West, Co. Limerick, Ireland, V42 F982
                    </p>
                  </div>
                  <p>
                    For EU residents, you also have the right to lodge a complaint with your local data protection authority if you believe we have not handled your personal information in accordance with applicable data protection laws. In Ireland, that authority is the Data Protection Commission.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
