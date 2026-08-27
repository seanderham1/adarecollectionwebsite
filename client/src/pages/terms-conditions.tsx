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
                    Welcome. These Terms and Conditions (&quot;Terms&quot;) govern your use of the website and services provided by The Adare Collection Limited, trading as The Adare Collection (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), including marketing and booking facilitation for luxury short-term residential accommodation for Ryder Cup 2027 and related events at Adare Manor, County Limerick, Ireland.
                  </p>
                  <p>
                    The Adare Collection Limited acts as exclusive representative, marketing agent, and booking facilitator. Where a booking proceeds, the Residential Letting Agreement is between the property Owner and the Occupier (Guest). We are not a party to that Letting Agreement, except to the extent we collect and hold payments in our designated client account and coordinate guest services as described in your booking documents.
                  </p>
                  <p>
                    By accessing our website, making inquiries, or proceeding with a booking, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services. If there is any conflict between these Terms and a signed Residential Letting Agreement for a specific property, the signed Letting Agreement prevails for that booking.
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
                    <li><strong>&quot;The Adare Collection Limited&quot;</strong> (trading as <strong>&quot;The Adare Collection&quot;</strong>), and <strong>&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;</strong>, means the company acting as exclusive representative, marketing agent, and booking facilitator (CRO No. 812874)</li>
                    <li><strong>&quot;Owner&quot;</strong> means the owner of the Property under the Residential Letting Agreement</li>
                    <li><strong>&quot;Guest,&quot; &quot;Occupier,&quot; &quot;you,&quot; or &quot;your&quot;</strong> refers to any person making inquiries or bookings through our service, and (once a Letting Agreement is signed) the Occupier under that agreement</li>
                    <li><strong>&quot;Property&quot;</strong> or <strong>&quot;Premises&quot;</strong> refers to any accommodation offered under The Adare Collection brand</li>
                    <li><strong>&quot;Booking&quot;</strong> refers to a confirmed reservation secured by a signed Residential Letting Agreement and payment of the Deposit</li>
                    <li><strong>&quot;Deposit&quot;</strong> means the non-refundable booking deposit equating to 50% of the Rent (plus VAT where applicable)</li>
                    <li><strong>&quot;Rent&quot;</strong> means the rental sum stated in the Residential Letting Agreement (plus VAT where applicable)</li>
                    <li><strong>&quot;Security Deposit&quot;</strong> means the sum equating to 20% of the Rent, held as security for performance of the Occupier&apos;s obligations</li>
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
                    <li>All bookings are subject to availability and confirmation</li>
                    <li>Bookings are confirmed only upon signing the Residential Letting Agreement and payment of the non-refundable Deposit as set out in Section 3.2</li>
                    <li>We reserve the right to refuse bookings at our discretion</li>
                    <li>Ryder Cup 2027 rentals are for an agreed fixed period (typically up to eight nights); the Letting Period, check-in, and check-out times for your stay are those stated in your Letting Agreement and property schedules</li>
                    <li>Unless otherwise stated, standard check-in is from 3:00 p.m. and check-out is by 12:00 noon on the departure date</li>
                    <li>All guests must be 18 years or older to make a booking</li>
                    <li>A Booking is personal to the Occupier and may not be transferred, sublet, or otherwise disposed of without prior written approval</li>
                  </ul>

                  <h3
                    id="payment-terms"
                    className="font-serif text-xl font-normal text-primary mb-3 mt-6 scroll-mt-24"
                  >
                    3.2 Payment Terms
                  </h3>
                  <div className="space-y-4">
                    <p>
                      A non-refundable Deposit of 50% of the Rent (plus VAT at 13.5%, or such other rate as applies) is required upon signing the Residential Letting Agreement to secure the Property. The balance of the Rent and the Security Deposit are payable no later than 31st January 2027 unless otherwise agreed in writing in your Letting Agreement.
                    </p>
                    <p>
                      The Deposit is strictly non-refundable, except only to the limited extent provided under the Event Cancellation terms in Section 3.3.
                    </p>
                    <p>
                      A Security Deposit equal to 20% of the Rent is also required by the final payment date. It is held as security for proper performance of the Occupier&apos;s obligations. After the Letting ends and the Occupier has removed all personal property from the Premises, any balance remaining after deduction of losses, costs, charges, and expenses arising from non-observance or non-performance of those obligations will be repaid. No interest is payable on the Security Deposit. The Occupier remains fully liable for any loss or damage whether or not such loss exceeds the Security Deposit.
                    </p>
                    <p>
                      All payments due under a Residential Letting Agreement must be paid into the designated client account of The Adare Collection Limited. We may cancel or the Letting may terminate where payment deadlines are not met (including where sums remain unpaid for seven days after the due date, as provided in the Letting Agreement).
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We accept payment by bank transfer to our designated client account, or by other methods we agree in writing</li>
                      <li>All prices are quoted in Euro (€). Rent and the Deposit are subject to Irish VAT at 13.5% (or the prevailing rate)</li>
                      <li>Additional charges may apply for extra services, damages, or cleaning fees</li>
                      <li>Payment processing fees may apply depending on the payment method chosen</li>
                    </ul>
                  </div>

                  <h3
                    id="cancellation-refund-policy"
                    className="font-serif text-xl font-normal text-primary mb-3 mt-6 scroll-mt-24"
                  >
                    3.3 Cancellation and Refund Policy
                  </h3>
                  <div className="space-y-4">
                    <p>
                      All cancellation requests by a Guest must be made in writing to{" "}
                      <a href="mailto:info@theadarecollection.ie" className="text-primary hover:underline">
                        info@theadarecollection.ie
                      </a>
                      . Except as expressly set out below or in your signed Residential Letting Agreement, there is no contractual right to a refund of the Deposit or of Rent paid if you cancel or otherwise terminate the booking.
                    </p>
                    <p>
                      <strong>Guest cancellation.</strong> The Deposit is non-refundable. Sums paid towards the Rent (including the Deposit and any balance) are not refundable on Guest cancellation. Where a Security Deposit has been paid and the stay does not proceed solely because of Guest cancellation, the Security Deposit will be returned in full.
                    </p>
                    <p id="event-cancellation" className="scroll-mt-24">
                      <strong>Event Cancellation (Ryder Cup 2027).</strong> If the Ryder Cup 2027 is cancelled, or is postponed or relocated so that it does not take place at Adare Manor during the Letting Period, and that cancellation, postponement, or relocation is publicly confirmed by the Ryder Cup organisers before the Commencement Date, the Letting terminates automatically from the date of that confirmation. Within ten (10) working days of such termination:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Eighty per cent (80%) of the Deposit and any other sums (other than the Security Deposit) actually received from the Occupier will be refunded from our client account</li>
                      <li>The remaining twenty per cent (20%) is not refundable</li>
                      <li>The Security Deposit, if paid, will be refunded in full without deduction within the same period</li>
                    </ul>
                    <p>
                      Save for those refund obligations, neither party has any further claim against the other arising from such cancellation, postponement, or relocation. This Event Cancellation regime applies only to cancellation, postponement, or relocation of the Ryder Cup 2027 itself, and not to cancellation or termination of a booking for any other reason.
                    </p>
                    <p>
                      <strong>Owner withdrawal.</strong> If an Owner withdraws a Property or cancels a confirmed booking after a Guest Deposit has been received (other than under the Event Cancellation clause above), all Guest payments already received will be refunded in full.
                    </p>
                    <p>
                      <strong>Property unavailable.</strong> If the Premises become incapable of use through fire, destruction, or another reason beyond the Owner&apos;s control, the Letting may terminate in accordance with the Residential Letting Agreement.
                    </p>
                  </div>
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
                    <li>Guests must use the Property solely for short-term residential accommodation (and reasonable private social entertaining where permitted by the House Rules)</li>
                    <li>Maximum overnight occupancy limits stated for the Property must be strictly observed; no additional overnight guests without prior written approval through The Adare Collection</li>
                    <li>Properties must be left clean, tidy, and in the same condition as found, fair wear and tear excepted</li>
                    <li>Smoking and vaping are prohibited inside any Property; smoking may take place only in any external area specifically designated for that purpose</li>
                    <li>Pets and animals are not permitted without the Owner&apos;s prior written consent, except legally recognised assistance animals where applicable</li>
                    <li>Ticketed or public events, commercial promotions, corporate brand activations, media events, or events requiring external structures, entertainment, security, or other event suppliers require prior written approval through The Adare Collection</li>
                    <li>Damage, breakage, faults, accidents, safety concerns, or maintenance issues must be reported promptly to The Adare Collection</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    4.2 Noise and Neighbor Consideration
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests must behave responsibly and avoid excessive noise, disturbance, nuisance, or inconvenience to neighbouring properties</li>
                    <li>Particular consideration must be given during the hours of 11:00 p.m. to 8:00 a.m.</li>
                    <li>A serious or repeated breach of House Rules may result in termination of the right to occupy, without prejudice to claims for loss or damage</li>
                    <li>Outdoor gatherings must comply with local regulations, insurance requirements, and the Property&apos;s House Rules</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    4.3 Security and Safety
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests are responsible for securing the Property whenever it is unattended</li>
                    <li>All doors, windows, gates, and access points must be secured when leaving the Property</li>
                    <li>Keys, access cards, alarm codes, and gate controls must not be copied, shared with unauthorised persons, or left unsecured</li>
                    <li>Guests must not cover, disconnect, disable, or interfere with smoke alarms, carbon-monoxide alarms, fire equipment, security systems, CCTV equipment, or other safety devices</li>
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
                    To the maximum extent permitted by Irish law, and subject always to the Residential Letting Agreement (which is between Owner and Occupier), The Adare Collection Limited shall not be liable for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Loss or damage to personal belongings</li>
                    <li>Personal injury or death (except where caused by our negligence or as otherwise not excludable by law)</li>
                    <li>Indirect, consequential, or punitive damages</li>
                    <li>Loss of profits, business, or opportunity</li>
                    <li>Events beyond our reasonable control, including Event Cancellation as defined in Section 3.3</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    5.2 Guest Insurance Requirements
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests are strongly advised to obtain comprehensive travel insurance</li>
                    <li>Insurance should cover cancellation, personal belongings, and public liability</li>
                    <li>We are not responsible for any uninsured losses</li>
                    <li>Guests must not do anything that may make any policy of insurance on the Premises void or voidable</li>
                  </ul>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    5.3 Property Damage
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guests are liable for any damage caused to the Property or its contents by the Occupier or any employee, servant, agent, or invitee</li>
                    <li>Damage charges may be deducted from the Security Deposit or charged separately; liability is not limited to the Security Deposit</li>
                    <li>Minor fair wear and tear is expected and not chargeable</li>
                    <li>Significant damage or serious breach of House Rules may result in immediate termination of the Letting</li>
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
                  8. Force Majeure and Event Disruption
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Cancellation, postponement, or relocation of the Ryder Cup 2027 itself is dealt with exclusively under the Event Cancellation terms in Section 3.3 (and the corresponding clause in your Residential Letting Agreement). That regime does not apply to cancellation or termination of a booking for any other reason.
                  </p>
                  <p>
                    For website operation and our booking-facilitation services (other than the Event Cancellation regime above), we shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Natural disasters, extreme weather conditions, or acts of God</li>
                    <li>Government actions, travel restrictions, or public health emergencies</li>
                    <li>War, terrorism, civil unrest, or other security threats</li>
                    <li>Strikes, labor disputes, or transportation disruptions</li>
                    <li>Utility failures or infrastructure problems</li>
                  </ul>
                  <p>
                    If the Premises become incapable of use through fire, destruction, or another reason beyond the Owner&apos;s control, rights and remedies follow the Residential Letting Agreement.
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
                    For existing bookings, the Residential Letting Agreement signed for that booking, and the version of these Terms in effect at the time of booking, will continue to apply unless changes are required by law or for safety reasons.
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
                    <p>CRO No. 812874</p>
                    <p>Email: <a href="mailto:info@theadarecollection.ie" className="text-primary hover:underline">info@theadarecollection.ie</a></p>
                    <p>Phone: <a href="tel:+353866681930" className="text-primary hover:underline">+353 86 668 1930</a></p>
                    <p>
                      Registered office: Byrne and Co., Gortboy, Church Street, Newcastle West, Co. Limerick, Ireland, V42 F982
                    </p>
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
