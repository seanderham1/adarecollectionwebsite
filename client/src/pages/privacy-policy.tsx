import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useSEO } from "@/hooks/use-seo";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import {
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_VERSION,
} from "@/lib/privacy-policy-meta";

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
              Last updated: {PRIVACY_POLICY_LAST_UPDATED} (version {PRIVACY_POLICY_VERSION})
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              
              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  1. Introduction
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    The Adare Collection Limited, trading as The Adare Collection (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), CRO No. 812874, is the data controller for personal information collected through this website and through related enquiry follow-up. We act as exclusive representative, marketing agent, and booking facilitator for luxury short-term residential accommodation. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit an enquiry, or interact with us in connection with property rentals for Ryder Cup 2027 and related events.
                  </p>
                  <p>
                    Please read this policy before submitting an enquiry. Using the website does not, by itself, constitute consent to optional cookies or to processing of enquiry data. Enquiry data is processed only after you submit the form and tick the consent box. Optional analytics and advertising cookies are used only if you allow them.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  2. Information We Collect
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <h3 className="font-serif text-xl font-normal text-primary mb-3">
                    2.1 Information you provide through the website
                  </h3>
                  <p>
                    The website has one enquiry form (on the contact page, the homepage, and as a property enquiry). Fields collected are:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full name, email address, and telephone number (including international dialling code)</li>
                    <li>Whether you are enquiring as a private individual, a company, or an agency, and (where relevant) organisation name and role</li>
                    <li>Estimated number of guests, intended use of the property, optional previous major-event experience, indicative budget, and preferred properties</li>
                    <li>Any additional notes you choose to write</li>
                    <li>Confirmation that you have read this policy and consent to processing for the enquiry</li>
                  </ul>
                  <p>
                    We do not collect postal addresses, payment-card details, or newsletter subscriptions through the website. There is no website booking or payment form.
                  </p>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    2.2 Information collected if a booking proceeds
                  </h3>
                  <p>
                    If an enquiry becomes a booking, further information needed to perform the Residential Letting Agreement may be collected off-website (for example by email or in booking documents). That can include guest-party details, stay dates, postal address, and payment details for Deposit, Rent, and Security Deposit paid into our designated client account. Those details are not collected by the website form.
                  </p>

                  <h3 className="font-serif text-xl font-normal text-primary mb-3 mt-6">
                    2.3 Automatically collected information
                  </h3>
                  <p>
                    Our hosting provider (Google Firebase) records technical logs that can include IP address, request URL, and timestamp. If you allow analytics cookies, Google Analytics may collect device and usage information such as pages viewed, approximate location derived from IP address, browser type, and referring site. If you allow advertising cookies, Google Ads may set cookies used for conversion measurement and remarketing. Pages that show an interactive map load Google Maps, which receives your IP address in order to display the map. If you open a Matterport 3D tour, Matterport will receive your IP address in order to deliver that content.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  3. How We Use Your Information
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Responding to enquiries:</strong> to assess your request, contact you from info@theadarecollection.ie and dylan@theadarecollection.ie, and discuss suitable properties</li>
                    <li><strong>Service provision:</strong> where a booking proceeds, to market properties, facilitate the letting, collect Deposit, Rent, and Security Deposit into our designated client account, and coordinate guest services</li>
                    <li><strong>Contract performance:</strong> to enable Owners and Occupiers to enter into and perform Residential Letting Agreements</li>
                    <li><strong>Sharing with partners you need:</strong> with property owners and with caterers, transport, concierge, security, or other suppliers where needed to deliver services you have asked us to arrange</li>
                    <li><strong>Legal compliance:</strong> to comply with applicable laws, regulations, and legal processes</li>
                    <li><strong>Website operation:</strong> to keep the site working, to measure usage if you allow analytics cookies, and to measure advertising if you allow advertising cookies</li>
                    <li><strong>Security:</strong> to protect against fraud, abuse of the enquiry form, unauthorised access, and other security threats</li>
                  </ul>
                  <p>
                    We do not send newsletters, and we do not use your enquiry to run automated decision-making or profiling that produces legal or similarly significant effects.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  4. Legal Basis for Processing
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We process your personal information based on the following legal grounds under the GDPR:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Consent (Article 6(1)(a)):</strong> for the website enquiry itself (the tick-box on the form) and for optional analytics and advertising cookies</li>
                    <li><strong>Contract and pre-contract steps (Article 6(1)(b)):</strong> to follow up your enquiry, prepare a booking, and perform a Residential Letting Agreement</li>
                    <li><strong>Legitimate interests (Article 6(1)(f)):</strong> to operate and secure the website, prevent form abuse, and keep records needed to run the business, where those interests are not overridden by your rights</li>
                    <li><strong>Legal obligation (Article 6(1)(c)):</strong> where Irish accounting, tax, or other law requires us to keep booking and payment records</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  5. Information Sharing and Disclosure
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We do not sell, trade, or rent your personal information. Enquiry data is stored in a Google Sheet used as our lead register, copied to the info@theadarecollection.ie mailbox, and used by our team (including dylan@theadarecollection.ie) to reply to you. We may also share information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Processors:</strong> Google Ireland Limited / Google LLC provide website hosting (Firebase), the Cloud Function that receives the form, Gmail, Google Sheets, Google Analytics, Google Ads, Google Tag Manager, and Google Maps. Matterport, Inc. provides 3D tours when you choose to open one. These providers process data on our instructions or, for Maps, Analytics, Ads, and Matterport, as described in their own notices when you use those features.</li>
                    <li><strong>Property Owners:</strong> with property Owners and their representatives as necessary to conclude and perform Residential Letting Agreements, coordinate access, housekeeping, inspections, and guest services, and handle Security Deposit matters</li>
                    <li><strong>Guest Service Partners:</strong> with caterers, transport, concierge, security, or other suppliers you ask us to arrange, where needed to deliver those services</li>
                    <li><strong>Legal Requirements:</strong> when required by law, court order, or government regulation</li>
                    <li><strong>Business Transfers:</strong> in connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>Safety and Security:</strong> to protect the rights, property, or safety of The Adare Collection Limited, property Owners, our users, or others</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  6. Data Security
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We implement appropriate technical and organisational measures to protect your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>TLS encryption of data in transit between your browser, our website, and our Cloud Function</li>
                    <li>Processing of website enquiries on Google Cloud in the European Union (Belgium, europe-west1)</li>
                    <li>Gmail App Password stored in Google Secret Manager rather than in application code</li>
                    <li>Access to the Google Sheets lead register limited to named individuals</li>
                    <li>Rate limiting on the enquiry endpoint to reduce abuse</li>
                  </ul>
                  <p>
                    No method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  7. Data Retention
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We retain personal information only as long as needed for the purposes in this policy, or longer where the law requires. Specifically:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Website enquiries</strong> (the Google Sheets lead register and related enquiry emails): 24 months from the date of submission, unless a booking proceeds or you ask us to delete sooner where we have no overriding obligation to keep the data. A monthly job deletes sheet rows older than 24 months.</li>
                    <li><strong>Booking and payment records:</strong> retained for 7 years after the stay for Irish legal and accounting purposes</li>
                    <li><strong>Analytics data:</strong> retained according to our Google Analytics settings, and in any event not longer than 14 months of identifiable usage data</li>
                    <li><strong>Cookie choices:</strong> stored in your browser until you clear site data or we change cookie categories and ask again</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  8. Your Rights
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    You have the following rights regarding your personal information, subject to the GDPR:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> request a copy of the personal information we hold about you</li>
                    <li><strong>Rectification:</strong> request correction of inaccurate or incomplete information</li>
                    <li><strong>Erasure:</strong> request deletion of your personal information</li>
                    <li><strong>Restriction:</strong> request restriction of processing</li>
                    <li><strong>Portability:</strong> request transfer of personal information you provided to us, in a structured, commonly used format</li>
                    <li><strong>Objection:</strong> object to processing based on legitimate interests</li>
                    <li><strong>Withdraw consent:</strong> withdraw consent for the enquiry or for optional cookies, without affecting processing that already took place</li>
                  </ul>
                  <p>
                    To exercise these rights, email{" "}
                    <a href="mailto:info@theadarecollection.ie" className="text-primary hover:underline">
                      info@theadarecollection.ie
                    </a>
                    . Email is the primary contact route for data-protection requests. We will respond within 30 days.
                  </p>
                </div>
              </section>

              <section id="cookies">
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  9. Cookies and Tracking Technologies
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We use Google Tag Manager (container GTM-WK9PD9T3). Before any optional tag runs, the site sets Google Consent Mode so that analytics and advertising storage are denied until you choose. You can change your choice at any time using <strong>Cookie settings</strong> in the website footer.
                  </p>
                  <p>
                    Google Maps loads automatically on pages that include a map (the homepage and property pages). Matterport tours load only after you open one. We self-host our website fonts so they are not fetched from Google Fonts on page load.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 p-2 font-medium">Name</th>
                          <th className="border border-gray-200 p-2 font-medium">Provider</th>
                          <th className="border border-gray-200 p-2 font-medium">Purpose</th>
                          <th className="border border-gray-200 p-2 font-medium">Duration</th>
                          <th className="border border-gray-200 p-2 font-medium">Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-200 p-2">adare_cookie_consent</td>
                          <td className="border border-gray-200 p-2">The Adare Collection (local storage)</td>
                          <td className="border border-gray-200 p-2">Stores your cookie choice</td>
                          <td className="border border-gray-200 p-2">Until you clear it or we change categories</td>
                          <td className="border border-gray-200 p-2">Essential</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2">_ga, _ga_*</td>
                          <td className="border border-gray-200 p-2">Google Analytics</td>
                          <td className="border border-gray-200 p-2">Distinguish visitors and persist a session</td>
                          <td className="border border-gray-200 p-2">Up to 2 years / 24 hours</td>
                          <td className="border border-gray-200 p-2">Analytics (optional)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2">_gid</td>
                          <td className="border border-gray-200 p-2">Google Analytics</td>
                          <td className="border border-gray-200 p-2">Distinguish visitors</td>
                          <td className="border border-gray-200 p-2">24 hours</td>
                          <td className="border border-gray-200 p-2">Analytics (optional)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2">_gcl_au, _gcl_aw, _gac*</td>
                          <td className="border border-gray-200 p-2">Google Ads</td>
                          <td className="border border-gray-200 p-2">Conversion measurement and remarketing</td>
                          <td className="border border-gray-200 p-2">Typically 90 days</td>
                          <td className="border border-gray-200 p-2">Advertising (optional)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>
                    You can also control cookies through your browser. Blocking all cookies may affect some site features. Essential storage used for your cookie preference is not advertising or analytics.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  10. International Data Transfers
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Website enquiry processing (the Cloud Function that receives the form) runs in the European Union (Belgium). Google Workspace (Gmail and Google Sheets) is provided by Google to us under Google&apos;s Data Processing Addendum. Some Google services — in particular Google Ads (if you allow advertising cookies) and Google Maps on pages that display a map — may involve transfers to the United States. Where Google transfers personal data outside the EEA, it relies on the EU-US Data Privacy Framework adequacy decision where applicable and/or Standard Contractual Clauses. Matterport tours, if you open one, may also involve processing outside Ireland as described in Matterport&apos;s notices.
                  </p>
                </div>
              </section>

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

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  12. Children&apos;s Privacy
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Our services are not directed to children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  13. Changes to This Privacy Policy
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. Material changes will be shown by updating the version number and date at the top of this page. We may also email you if we have your address from an enquiry or booking and the change is material.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-2xl font-normal text-primary mb-4">
                  14. Contact Information
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  <p>
                    For questions, concerns, or requests about this Privacy Policy or our data practices, please email us. Email is the primary route for data-protection requests. Our data-protection contact is:
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
                    You also have the right to lodge a complaint with the Data Protection Commission (Ireland) if you believe we have not handled your personal information in accordance with applicable data protection laws.
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
