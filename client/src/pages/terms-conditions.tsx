import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";

export default function TermsConditions() {
  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/terms")!));

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-left mb-12">
            <h1 className="font-serif text-4xl font-normal text-primary mb-4">
              Terms and Conditions
            </h1>
            <p className="text-sm text-gray-500">
              Last updated: January 2025
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
                    Welcome. These Terms and Conditions (&quot;Terms&quot;) govern your use of the website and services provided by The Adare Collection Limited, trading as The Adare Collection, including luxury property rental accommodations for Ryder Cup 2027 and related events at Adare Manor, County Limerick, Ireland.
                  </p>
                  <p>
                    By accessing our website, making inquiries, or booking our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.
                  </p>
                  <p>
                    These Terms are governed by Irish law and are subject to the jurisdiction of the Irish courts.
                  </p>
                </div>
              </section>

              {/* Definitions */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  2. Definitions
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>&quot;The Adare Collection Limited&quot;</strong> (trading as <strong>&quot;The Adare Collection&quot;</strong>), and <strong>&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;</strong>, means the luxury property rental business operated under that trading name</li>
                    <li><strong>&quot;Guest,&quot; &quot;you,&quot; or &quot;your&quot;</strong> refers to any person making inquiries or bookings through our service</li>
                    <li><strong>&quot;Property&quot;</strong> refers to any accommodation offered by us using The Adare Collection brand</li>
                    <li><strong>&quot;Booking&quot;</strong> refers to a confirmed reservation for a property</li>
                    <li><strong>&quot;Services&quot;</strong> refers to all services we provide under these Terms</li>
                    <li><strong>&quot;Website&quot;</strong> refers to our online platform and all associated content</li>
                  </ul>
                </div>
              </section>

              {/* Property Rental Terms */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  3. Property Rental Terms
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <h3 className="font-serif text-xl font-normal text-primary mb-3">
                    3.1 Booking and Reservations
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All bookings are subject to availability and confirmation by The Adare Collection Limited (trading as The Adare Collection)</li>
                    <li>Bookings are confirmed only upon receipt of full payment and signed rental agreement</li>
                    <li>We reserve the right to refuse bookings at our discretion</li>
                    <li>Minimum stay requirements may apply during Ryder Cup 2027 and other special events</li>
                    <li>All guests must be 18 years or older to make a booking</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    3.2 Payment Terms
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full payment is required at the time of booking confirmation</li>
                    <li>We accept payment by bank transfer, credit card, or other agreed methods</li>
                    <li>All prices are quoted in Euro (€) and include applicable Irish VAT</li>
                    <li>Additional charges may apply for extra services, damages, or cleaning fees</li>
                    <li>Payment processing fees may apply depending on the payment method chosen</li>
                  </ul>

                  <h3
                    id="cancellation-refund-policy"
                    className="font-serif text-xl font-normal text-primary mb-3 mt-6 scroll-mt-24"
                  >
                    3.3 Cancellation and Refund Policy
                  </h3>
                  <p className="mb-4">
                    We understand that plans may change, and we have established a fair cancellation policy to accommodate different circumstances. All cancellation requests must be made in writing to info@theadarecollection.ie.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cancellations made more than 180 days before arrival: 100% refund</li>
                    <li>Cancellations made 120-180 days before arrival: 50% refund</li>
                    <li>Cancellations made less than 120 days before arrival: No refund</li>
                    <li>Refunds will be processed within 14 business days of cancellation confirmation</li>
                    <li>Force majeure events may be subject to different cancellation terms as outlined in Section 8</li>
                  </ul>
                </div>
              </section>

              {/* Guest Responsibilities */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  4. Guest Responsibilities and Conduct
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <h3 className="font-serif text-xl font-normal text-primary mb-3">
                    4.1 Property Use and Care
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests must use the property solely for residential purposes</li>
                    <li>Maximum occupancy limits must be strictly observed</li>
                    <li>Properties must be left in the same condition as found</li>
                    <li>No smoking is permitted inside any property</li>
                    <li>Pets are not permitted unless specifically agreed in writing</li>
                    <li>No commercial activities or events without prior written consent</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    4.2 Noise and Neighbor Consideration
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests must respect noise levels, especially between 11:00 PM and 7:00 AM</li>
                    <li>Excessive noise that disturbs neighbors may result in immediate eviction</li>
                    <li>Outdoor gatherings must comply with local regulations and property rules</li>
                    <li>Music and entertainment must be kept at reasonable levels</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    4.3 Security and Safety
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests are responsible for the security of the property during their stay</li>
                    <li>All doors and windows must be secured when leaving the property</li>
                    <li>Emergency contact information must be provided and kept current</li>
                    <li>Guests must report any security incidents or property damage immediately</li>
                  </ul>
                </div>
              </section>

              {/* Liability and Insurance */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  5. Liability and Insurance
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <h3 className="font-serif text-xl font-normal text-primary mb-3">
                    5.1 Limitation of Liability
                  </h3>
                  <p>
                    The liability of The Adare Collection Limited (trading as The Adare Collection) is limited to the maximum extent permitted by Irish law. We shall not be liable for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Loss or damage to personal belongings</li>
                    <li>Personal injury or death (except where caused by our negligence)</li>
                    <li>Indirect, consequential, or punitive damages</li>
                    <li>Loss of profits, business, or opportunity</li>
                    <li>Events beyond our reasonable control</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    5.2 Guest Insurance Requirements
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests are strongly advised to obtain comprehensive travel insurance</li>
                    <li>Insurance should cover cancellation, personal belongings, and public liability</li>
                    <li>We are not responsible for any uninsured losses</li>
                    <li>Guests may be required to provide proof of insurance for certain bookings</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    5.3 Property Damage
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests are liable for any damage caused to the property or its contents</li>
                    <li>Damage charges will be deducted from the security deposit or charged separately</li>
                    <li>Minor wear and tear is expected and not chargeable</li>
                    <li>Significant damage may result in immediate termination of the rental agreement</li>
                  </ul>
                </div>
              </section>

              {/* Website Use */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  6. Website Use and Intellectual Property
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <h3 className="font-serif text-xl font-normal text-primary mb-3">
                    6.1 Acceptable Use
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You may use our website only for lawful purposes</li>
                    <li>You must not use the website in any way that could damage or impair its functionality</li>
                    <li>You must not attempt to gain unauthorized access to any part of the website</li>
                    <li>You must not use automated systems to access the website without permission</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    6.2 Intellectual Property Rights
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All content on this website is protected by Irish and international copyright laws</li>
                    <li>You may not reproduce, distribute, or create derivative works without permission</li>
                    <li>Property images and descriptions are for informational purposes only</li>
                    <li>Unauthorized use of our content may result in legal action</li>
                  </ul>
                </div>
              </section>

              {/* Privacy and Data Protection */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  7. Privacy and Data Protection
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which forms part of these Terms. By using our services, you consent to the collection and use of your information as described in our Privacy Policy.
                  </p>
                  <p>
                    We comply with the General Data Protection Regulation (GDPR) and Irish data protection laws.
                  </p>
                </div>
              </section>

              {/* Force Majeure */}
              <section>
                <h2 id="force-majeure" className="font-serif text-2xl font-normal text-primary mb-4 scroll-mt-24">
                  8. Force Majeure
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Natural disasters, extreme weather conditions, or acts of God</li>
                    <li>Government actions, travel restrictions, or public health emergencies</li>
                    <li>War, terrorism, civil unrest, or other security threats</li>
                    <li>Strikes, labor disputes, or transportation disruptions</li>
                    <li>Utility failures or infrastructure problems</li>
                  </ul>
                  <p>
                    In such circumstances, we will make reasonable efforts to provide alternative arrangements or refunds as appropriate.
                  </p>
                </div>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  9. Governing Law and Jurisdiction
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    These Terms are governed by and construed in accordance with the laws of Ireland. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the Irish courts.
                  </p>
                  <p>
                    If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  10. Changes to Terms and Conditions
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
                  </p>
                  <p>
                    For existing bookings, the Terms in effect at the time of booking will continue to apply unless changes are required by law or for safety reasons.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  11. Contact Information
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p><strong>The Adare Collection Limited</strong></p>
                    <p>Email: <a href="mailto:info@theadarecollection.ie" className="text-primary hover:underline">info@theadarecollection.ie</a></p>
                    <p>Phone: <a href="tel:+353866681930" className="text-primary hover:underline">+353 86 668 1930</a></p>
                    <p>Address: Adare Manor, Co. Limerick, Ireland</p>
                  </div>
                  <p>
                    For urgent matters during your stay, emergency contact information will be provided upon booking confirmation.
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
