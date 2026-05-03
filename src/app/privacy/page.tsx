import type { Metadata } from "next";
import { Lock } from "lucide-react";
import {
  LegalDocument,
  Section,
  SubSection,
  BulletList,
  Callout,
  DataTable,
} from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | Property Pointers",
  description:
    "Property Pointers Privacy Policy — how we collect, use, store, and protect your personal data in compliance with the DPDP Act 2023 and IT Act 2000.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      icon={Lock}
      title="Privacy Policy"
      subtitle="How We Collect, Use, Store & Protect Your Personal Data"
      meta={[
        { label: "Effective Date", value: "April 2, 2026" },
        { label: "Last Reviewed", value: "April 2, 2026" },
        { label: "Regulation", value: "DPDP Act 2023 | IT Act 2000 | IT Rules 2021" },
        { label: "Data Controller", value: "Property Pointers (www.propertypointers.com)" },
        { label: "DPO Contact", value: "privacy@propertypointers.com" },
        { label: "Governing Law", value: "Republic of India" },
      ]}
      intro="This Privacy Policy describes how Property Pointers collects, uses, shares, and safeguards your personal data in compliance with Indian data protection law."
    >
      <Section title="Our Commitment to Your Privacy">
        <p>
          At Property Pointers, we understand that your personal data is important. This
          Privacy Policy explains in clear, plain language exactly what data we collect,
          why we collect it, how we use and share it, how long we keep it, and what rights
          you have over it. We are committed to handling your data responsibly,
          transparently, and in full compliance with the Digital Personal Data Protection
          Act, 2023 (&quot;DPDP Act&quot;), the Information Technology Act, 2000, and the
          IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
        </p>
      </Section>

      <Section number="01" title="Who We Are — Data Controller">
        <p>
          Property Pointers operates the real estate platform accessible at
          www.propertypointers.com and its associated mobile applications (collectively,
          the &quot;Platform&quot;). For the purposes of applicable data protection law,
          Property Pointers is the Data Controller responsible for the personal data you
          provide or that is collected when you use the Platform.
        </p>
        <DataTable
          headers={["Detail", "Information"]}
          rows={[
            { label: "Legal Entity", value: "Property Pointers" },
            { label: "Platform", value: "www.propertypointers.com" },
            { label: "Registered Address", value: "[Registered Office Address], India" },
            { label: "Data Controller", value: "Property Pointers" },
            { label: "DPO / Privacy Contact", value: "privacy@propertypointers.com" },
            { label: "Grievance Officer", value: "grievance@propertypointers.com" },
            { label: "Governing Law", value: "Republic of India — DPDP Act 2023, IT Act 2000" },
          ]}
        />
      </Section>

      <Section number="02" title="Scope of This Policy">
        <p>
          This Privacy Policy applies to all individuals who interact with the Platform in
          any capacity, including:
        </p>
        <BulletList
          items={[
            <span key="1"><strong className="text-white/90">Visitors:</strong> Individuals who browse the Platform without registering an account.</span>,
            <span key="2"><strong className="text-white/90">Registered Users:</strong> Individuals who create an account as a home seeker, property owner, tenant, or landlord.</span>,
            <span key="3"><strong className="text-white/90">Brokers & Agents:</strong> Licensed real estate professionals who list properties on behalf of owners.</span>,
            <span key="4"><strong className="text-white/90">Developers & Builders:</strong> Companies listing new real estate projects.</span>,
            <span key="5"><strong className="text-white/90">Partners:</strong> Entities enrolled in the Property Pointers Partner Network.</span>,
            <span key="6"><strong className="text-white/90">Vendors:</strong> Service providers listed on the Property Pointers Vendor Marketplace.</span>,
          ]}
        />
        <p>
          This Policy does not apply to third-party websites, services, or platforms that
          may be linked to or integrated with the Platform. Those third parties operate
          under their own privacy policies, which we encourage you to review.
        </p>
      </Section>

      <Section number="03" title="Personal Data We Collect">
        <p>
          We collect personal data in the following categories, depending on how you use
          the Platform:
        </p>

        <SubSection number="3.1" title="Data You Provide Directly">
          <DataTable
            headers={["Data Type", "Examples & When Collected"]}
            rows={[
              {
                label: "Identity Data",
                value:
                  "Full name, username, profile photograph — collected at registration and via account profile.",
              },
              {
                label: "Contact Data",
                value:
                  "Mobile number, email address, postal address — collected at registration, property inquiry, lead forms.",
              },
              {
                label: "Authentication Data",
                value:
                  "Password (stored in encrypted form), OTP verification — used for account login and security.",
              },
              {
                label: "Property Listing Data",
                value:
                  "Property address, description, photographs, videos, price, area, RERA number — collected at listing submission.",
              },
              {
                label: "Financial Data",
                value:
                  "Payment card/UPI details (processed by payment gateway — not stored by us), transaction IDs — for paid services.",
              },
              {
                label: "Identity Verification",
                value:
                  "PAN, Aadhaar (last 4 digits only), agent RERA number, GSTIN — for broker/developer verification.",
              },
              {
                label: "Communication Data",
                value:
                  "Messages sent via Platform chat, inquiry forms, support tickets — for user-to-user and user-to-support communication.",
              },
              {
                label: "Feedback & Reviews",
                value:
                  "Star ratings, written reviews, comments — collected through community features.",
              },
            ]}
          />
        </SubSection>

        <SubSection number="3.2" title="Data Collected Automatically">
          <p>
            When you visit or use the Platform, we automatically collect certain technical
            and behavioural data:
          </p>
          <BulletList
            items={[
              <span key="1"><strong className="text-white/90">Device Information:</strong> Device type, operating system, browser type and version, screen resolution, device identifiers.</span>,
              <span key="2"><strong className="text-white/90">Usage Data:</strong> Pages visited, search queries entered, listings viewed, time spent on pages, click patterns, scroll depth, buttons clicked.</span>,
              <span key="3"><strong className="text-white/90">Location Data:</strong> Approximate location derived from IP address; precise GPS location (only if you grant permission in the mobile app for proximity-based search features).</span>,
              <span key="4"><strong className="text-white/90">Log Data:</strong> IP address, access timestamps, referrer URLs, error logs, and session identifiers.</span>,
              <span key="5"><strong className="text-white/90">Cookie & Tracker Data:</strong> Preferences, session tokens, and analytics identifiers stored via cookies, web beacons, and similar technologies. See Section 10 for full details.</span>,
            ]}
          />
        </SubSection>

        <SubSection number="3.3" title="Data Received from Third Parties">
          <BulletList
            items={[
              <span key="1"><strong className="text-white/90">Social Login Data:</strong> If you register or log in using Google, Facebook, or another social account, we receive your name, email address, and profile picture from that provider, subject to your privacy settings on that platform.</span>,
              <span key="2"><strong className="text-white/90">Partner & Referral Data:</strong> If you are referred to the Platform by a partner or affiliate, we may receive basic referral information from that partner.</span>,
              <span key="3"><strong className="text-white/90">Public Records & Verification Services:</strong> We may cross-reference listing data against publicly available government records (e.g., RERA portals, municipal databases) for verification purposes.</span>,
            ]}
          />
        </SubSection>

        <Callout variant="success" title="What We Do NOT Collect">
          We do not collect full Aadhaar numbers, full bank account details, credit/debit
          card numbers, or biometric data. Payment processing is handled entirely by our
          third-party payment gateway partners who are PCI-DSS compliant. We do not have
          access to your full card details.
        </Callout>
      </Section>

      <Section number="04" title="Legal Bases for Processing Your Data">
        <p>
          Under the Digital Personal Data Protection Act, 2023, we process your personal
          data on the following lawful bases:
        </p>
        <DataTable
          headers={["Legal Basis", "When We Rely on It"]}
          rows={[
            {
              label: "Consent",
              value:
                "We rely on your consent for sending promotional communications, using non-essential cookies, sharing data with third-party advertisers, and processing sensitive data categories where required by law. You may withdraw consent at any time.",
            },
            {
              label: "Contractual Necessity",
              value:
                "We process data necessary to provide the Services you have requested — such as maintaining your account, displaying your listings, connecting you with buyers/tenants, and processing payments.",
            },
            {
              label: "Legitimate Interests",
              value:
                "We process data to detect and prevent fraud, improve the Platform, personalise your experience, and ensure the security of the Platform — where these interests are not overridden by your data protection rights.",
            },
            {
              label: "Legal Obligation",
              value:
                "We process data to comply with applicable Indian laws including the IT Act 2000, RERA, Prevention of Money Laundering Act, and in response to valid orders from courts or law enforcement authorities.",
            },
            {
              label: "Vital Interests",
              value:
                "In rare emergency circumstances, we may process data to protect the vital interests of a user or another individual.",
            },
          ]}
        />
      </Section>

      <Section number="05" title="How We Use Your Personal Data">
        <p>We use the personal data we collect for the following purposes:</p>

        <SubSection number="5.1" title="Providing & Operating the Platform">
          <BulletList
            items={[
              "Creating and managing your account and user profile.",
              "Displaying your property listings to relevant buyers, renters, or tenants.",
              "Connecting buyers and renters with property owners, agents, and developers.",
              "Processing payments for paid services and issuing receipts.",
              "Enabling in-Platform communication between users through our chat and inquiry systems.",
              "Delivering property alerts, saved search results, and shortlist notifications.",
            ]}
          />
        </SubSection>

        <SubSection number="5.2" title="Verification & Trust">
          <BulletList
            items={[
              "Verifying the identity of users, particularly for broker and developer accounts.",
              "Cross-checking listing details against public RERA databases for compliance.",
              "Detecting and investigating fraudulent listings, fake accounts, or suspicious activity.",
              "Assigning and displaying the Verified Listing badge where criteria are met.",
            ]}
          />
        </SubSection>

        <SubSection number="5.3" title="Communication">
          <BulletList
            items={[
              "Sending transactional messages — account creation confirmations, password resets, payment confirmations, listing approval/rejection notices.",
              "Sending property recommendation alerts and saved search notifications (with your consent or as part of our service).",
              "Sending promotional and marketing communications about new features, platform updates, or relevant real estate offers (with your consent; you may unsubscribe at any time).",
              "Contacting you in response to support requests or grievances.",
            ]}
          />
        </SubSection>

        <SubSection number="5.4" title="Personalisation & Analytics">
          <BulletList
            items={[
              "Personalising the property listings, articles, and tools shown to you based on your search history, location, and stated preferences.",
              "Analysing usage patterns to improve Platform design, navigation, and feature sets.",
              "Generating anonymised, aggregated market insights and trend reports.",
              "Conducting A/B testing to evaluate new features and user experience improvements.",
            ]}
          />
        </SubSection>

        <SubSection number="5.5" title="Legal & Compliance">
          <BulletList
            items={[
              "Complying with applicable laws, regulations, and government orders.",
              "Responding to valid legal processes — court orders, summons, and law enforcement requests.",
              "Enforcing our Terms of Service, Terms of Use, and other platform policies.",
              "Maintaining records required under RERA, GST, and other applicable legislation.",
            ]}
          />
        </SubSection>
      </Section>

      <Section number="06" title="How We Share Your Personal Data">
        <p>
          We do not sell your personal data to any third party. We share your data only in
          the following limited circumstances:
        </p>

        <SubSection number="6.1" title="With Other Users (as part of the Service)">
          <p>
            When you submit a property inquiry or express interest in a listing, your
            contact details and profile information (name, phone number, email) are shared
            with the property owner, listing agent, or developer relevant to that inquiry.
            This sharing is integral to the Platform&apos;s core service and you consent
            to it by submitting an inquiry. Similarly, when you list a property, your
            contact details are visible to prospective buyers and tenants.
          </p>
        </SubSection>

        <SubSection number="6.2" title="With Service Providers & Processors">
          <p>
            We share data with trusted third-party vendors who process data on our behalf
            under strict contractual obligations, including:
          </p>
          <DataTable
            headers={["Service Type", "Purpose & Provider Type"]}
            rows={[
              {
                label: "Cloud Hosting",
                value:
                  "Infrastructure, storage, and computing services — AWS / Azure / GCP (as applicable).",
              },
              {
                label: "Payment Processing",
                value:
                  "Secure payment transactions — Razorpay / PayU / CCAvenue (PCI-DSS compliant).",
              },
              {
                label: "Analytics",
                value:
                  "Platform usage analysis and performance monitoring — Google Analytics, Mixpanel (anonymised).",
              },
              {
                label: "SMS / Email / Push",
                value:
                  "Transactional and promotional communications — Twilio, SendGrid, Firebase.",
              },
              {
                label: "Verification",
                value:
                  "Identity and RERA data verification — Government databases, authorised bureaus.",
              },
              {
                label: "Customer Support",
                value: "Support ticket management — Zendesk or equivalent.",
              },
              {
                label: "Fraud Detection",
                value:
                  "AI-based listing and account fraud screening — third-party ML services.",
              },
            ]}
          />
          <p>
            All service providers are required to process your data only for the specified
            purpose, in accordance with our instructions, and under contractual data
            processing agreements that include appropriate security and confidentiality
            obligations.
          </p>
        </SubSection>

        <SubSection number="6.3" title="With Partners & Vendors (With Your Consent)">
          <p>
            If you explicitly request information from a Partner (e.g., a home loan
            partner, insurance provider, or legal service listed on the Platform), we may
            share relevant data with that Partner to fulfil your request. Such sharing
            will only occur after you have expressly consented to it, either through a
            specific consent prompt or by submitting an inquiry directed at the Partner.
          </p>
        </SubSection>

        <SubSection number="6.4" title="With Regulators & Law Enforcement">
          <p>
            We may disclose personal data to government authorities, regulatory bodies,
            courts, or law enforcement agencies when required by applicable law, court
            order, summons, or other valid legal process. We will notify you of such
            disclosure where permitted by law.
          </p>
        </SubSection>

        <SubSection number="6.5" title="In Business Transfers">
          <p>
            In the event of a merger, acquisition, restructuring, or sale of Property
            Pointers, your personal data may be transferred to the acquiring entity. We
            will notify you before your data is transferred and becomes subject to a
            different privacy policy.
          </p>
        </SubSection>

        <Callout variant="success" title="Our Commitment">
          Property Pointers does not sell, rent, or trade your personal data to any third
          party for commercial gain. Any sharing of data is limited to what is strictly
          necessary to provide the Services you have requested or to comply with legal
          obligations.
        </Callout>
      </Section>

      <Section number="07" title="Data Retention">
        <p>
          We retain your personal data only for as long as necessary to fulfil the
          purposes for which it was collected, or as required by applicable law. The
          following retention schedule applies:
        </p>
        <DataTable
          headers={["Data Category", "Retention Period & Reason"]}
          rows={[
            {
              label: "Account Data",
              value:
                "Duration of account + 3 years post-closure — for legal obligations and dispute resolution.",
            },
            {
              label: "Property Listing Data",
              value:
                "Duration of listing + 2 years — for RERA compliance and audit trail.",
            },
            {
              label: "Transaction Records",
              value:
                "7 years from transaction date — for GST, Income Tax, and financial audit requirements.",
            },
            {
              label: "Communication Logs",
              value: "2 years — for fraud prevention and dispute resolution.",
            },
            {
              label: "Device & Log Data",
              value: "90 days (rolling) — for security monitoring and debugging.",
            },
            {
              label: "Cookie / Analytics",
              value:
                "13 months (as per Google Analytics standard) — for Platform analytics and personalisation.",
            },
            {
              label: "KYC / Verification",
              value:
                "As required by RERA and applicable law (up to 7 years) — for regulatory compliance.",
            },
            {
              label: "Fraud / Legal Holds",
              value:
                "Until legal proceedings conclude — for legal defence and law enforcement cooperation.",
            },
          ]}
        />
        <p>
          After the applicable retention period, your data is securely deleted or
          anonymised so that it can no longer be associated with you. Where deletion is
          not technically feasible in the short term (e.g., backup archives), we ensure
          the data is not actively processed and is deleted at the next practicable
          opportunity.
        </p>
      </Section>

      <Section number="08" title="Your Data Protection Rights">
        <p>
          Under the Digital Personal Data Protection Act, 2023 and other applicable Indian
          data protection laws, you have the following rights with respect to your
          personal data:
        </p>
        <DataTable
          headers={["Your Right", "What It Means"]}
          rows={[
            {
              label: "Right of Access",
              value:
                "You have the right to request a copy of the personal data we hold about you, including information about how it is processed.",
            },
            {
              label: "Right to Correction",
              value:
                "You have the right to request correction of any inaccurate or incomplete personal data we hold about you. You may update most of your data directly through your account settings.",
            },
            {
              label: "Right to Erasure",
              value:
                "You have the right to request deletion of your personal data where it is no longer necessary for the purpose for which it was collected, or where you withdraw consent (subject to legal retention obligations).",
            },
            {
              label: "Right to Withdraw Consent",
              value:
                "Where we rely on your consent to process data, you may withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing prior to withdrawal.",
            },
            {
              label: "Right to Grievance",
              value:
                "You have the right to lodge a complaint with our Grievance Officer (grievance@propertypointers.com) regarding any alleged violation of your data rights.",
            },
            {
              label: "Right to Nominate",
              value:
                "Under the DPDP Act 2023, you may nominate another individual to exercise your data rights on your behalf in the event of your death or incapacity.",
            },
            {
              label: "Right to Non-Discrimination",
              value:
                "We will not discriminate against you for exercising any of the rights described in this section.",
            },
          ]}
        />
        <p>
          To exercise any of the above rights, please submit a written request to
          privacy@propertypointers.com with your registered email address, the right(s)
          you wish to exercise, and any relevant details. We will respond within 30 days
          of receiving a valid request.
        </p>
        <Callout variant="info" title="Note on Legitimate Refusals">
          In certain circumstances, we may be unable to fulfil a data rights request — for
          example, where deletion would impair our ability to comply with a legal
          obligation, or where an access request would require disclosure of another
          person&apos;s data. We will explain the reason for any such refusal clearly.
        </Callout>
      </Section>

      <Section number="09" title="Data Security">
        <SubSection number="9.1" title="Security Measures">
          <p>
            Property Pointers implements a comprehensive set of technical, physical, and
            organisational security measures to protect your personal data against
            unauthorised access, disclosure, alteration, loss, or destruction. These
            include:
          </p>
          <BulletList
            items={[
              <span key="1"><strong className="text-white/90">Encryption in Transit:</strong> All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher (HTTPS).</span>,
              <span key="2"><strong className="text-white/90">Encryption at Rest:</strong> Sensitive data stored in our databases is encrypted at rest using industry-standard encryption algorithms.</span>,
              <span key="3"><strong className="text-white/90">Access Controls:</strong> Access to personal data is strictly limited to authorised personnel who require it for their job functions, on a need-to-know basis.</span>,
              <span key="4"><strong className="text-white/90">Authentication:</strong> All employee accounts accessing production systems require multi-factor authentication (MFA).</span>,
              <span key="5"><strong className="text-white/90">Password Security:</strong> User passwords are never stored in plain text; they are hashed using industry-standard algorithms (bcrypt or equivalent).</span>,
              <span key="6"><strong className="text-white/90">Penetration Testing:</strong> We conduct periodic security audits and penetration testing by qualified third parties to identify and remediate vulnerabilities.</span>,
              <span key="7"><strong className="text-white/90">Incident Response:</strong> We maintain a documented data breach response plan and will notify affected users and relevant authorities in the event of a significant data breach, as required by applicable law.</span>,
              <span key="8"><strong className="text-white/90">Vendor Security:</strong> Third-party processors are subject to contractual security requirements and are assessed for compliance.</span>,
            ]}
          />
        </SubSection>
        <SubSection number="9.2" title="Your Role in Security">
          <p>
            The security of your account also depends on you. You are responsible for
            maintaining the confidentiality of your login credentials, using a strong and
            unique password, and logging out of shared devices. Property Pointers will
            never ask for your password via email, phone, or any channel other than the
            login screen.
          </p>
        </SubSection>
        <Callout variant="warning" title="Data Breach Notification">
          In the event of a personal data breach that is likely to result in a risk to
          your rights, we will notify you and the relevant regulatory authority (Data
          Protection Board of India) within the timeframe required by the DPDP Act 2023
          and applicable rules.
        </Callout>
      </Section>

      <Section number="10" title="Cookies & Tracking Technologies">
        <SubSection number="10.1" title="What Are Cookies">
          <p>
            Cookies are small text files stored on your device by your browser when you
            visit a website. Property Pointers uses cookies and similar technologies (web
            beacons, pixel tags, local storage, session storage) to operate the Platform
            effectively and to understand how users interact with it.
          </p>
        </SubSection>
        <SubSection number="10.2" title="Types of Cookies We Use">
          <DataTable
            headers={["Cookie Type", "Purpose & Notes"]}
            rows={[
              {
                label: "Strictly Necessary",
                value:
                  "Essential for the Platform to function — login sessions, security tokens, load balancing. Cannot be disabled without breaking the Platform.",
              },
              {
                label: "Functional",
                value:
                  "Remember your preferences, language settings, recently viewed properties, and saved searches.",
              },
              {
                label: "Analytics",
                value:
                  "Collect anonymised data about how users navigate and use the Platform to help us improve it (e.g., Google Analytics).",
              },
              {
                label: "Marketing / Targeting",
                value:
                  "Used to deliver relevant advertisements on and off the Platform, and to measure ad effectiveness. Only set with your consent.",
              },
              {
                label: "Third-Party",
                value:
                  "Set by our integrated partners (e.g., home loan providers, map services). Governed by their respective cookie policies.",
              },
            ]}
          />
        </SubSection>
        <SubSection number="10.3" title="Managing Cookies">
          <p>
            You can manage your cookie preferences at any time through our Cookie
            Preference Centre, accessible via the cookie banner displayed on your first
            visit, or through your browser settings. Please note that disabling strictly
            necessary cookies will impair the Platform&apos;s core functionality.
          </p>
        </SubSection>
        <SubSection number="10.4" title="Do Not Track">
          <p>
            Some browsers include a &quot;Do Not Track&quot; (DNT) feature. The Platform
            currently does not respond to DNT signals from browsers, as there is no
            industry-wide standard for how to interpret them. You may, however, use our
            cookie preference controls to limit tracking.
          </p>
        </SubSection>
      </Section>

      <Section number="11" title="Cross-Border Data Transfers">
        <p>
          Property Pointers stores and primarily processes your personal data in India.
          However, some of our service providers (such as cloud hosting providers,
          analytics platforms, and communication tools) may process data in other
          countries.
        </p>
        <p>
          Where we transfer personal data outside India, we ensure that appropriate
          safeguards are in place, as required by the DPDP Act 2023 and any rules notified
          thereunder. This may include: entering into data processing agreements with
          standard contractual clauses; transferring data only to countries with adequate
          data protection standards as assessed by the Government of India; or relying on
          other approved transfer mechanisms.
        </p>
        <Callout variant="info" title="User Rights in Cross-Border Transfers">
          Your rights under this Privacy Policy apply regardless of where your data is
          processed. If you have concerns about the transfer of your data outside India,
          please contact privacy@propertypointers.com.
        </Callout>
      </Section>

      <Section number="12" title="Children's Privacy">
        <p>
          The Property Pointers Platform is not directed at children under the age of 18.
          We do not knowingly collect, process, or retain personal data of minors. If you
          are under 18, please do not use the Platform or provide any personal
          information.
        </p>
        <p>
          If we become aware that we have inadvertently collected personal data from a
          child under 18, we will take immediate steps to delete such data. If you are a
          parent or guardian and believe your child has provided us with personal data
          without your consent, please contact us at privacy@propertypointers.com and we
          will act promptly.
        </p>
      </Section>

      <Section number="13" title="Third-Party Services & Integrations">
        <p>
          The Platform integrates with third-party services whose use of your data is
          governed by their own privacy policies. These include:
        </p>
        <DataTable
          headers={["Integration", "Privacy Notes"]}
          rows={[
            {
              label: "Google Maps",
              value:
                "Property location display and area-level maps. Governed by Google's Privacy Policy.",
            },
            {
              label: "Google Analytics",
              value:
                "Website and app usage analytics. Data is anonymised and aggregated. Governed by Google's Privacy Policy.",
            },
            {
              label: "Home Loan Partners",
              value:
                "If you submit a home loan inquiry, your data is shared with the relevant lender under a data sharing agreement. You will be notified at the point of submission.",
            },
            {
              label: "Social Login (Google/Facebook)",
              value:
                "If you register via social login, limited profile data is shared with us from that platform per your social account's privacy settings.",
            },
            {
              label: "Payment Gateways",
              value:
                "Payment data is processed by our payment partners under PCI-DSS standards. We do not receive or store full card details.",
            },
            {
              label: "Push Notifications",
              value:
                "Delivered via Firebase Cloud Messaging (FCM) or Apple Push Notification Service (APNS). Governed by the respective providers' policies.",
            },
          ]}
        />
      </Section>

      <Section number="14" title="Marketing Communications">
        <SubSection number="14.1" title="Promotional Emails & SMS">
          <p>
            With your consent, we may send you promotional communications about new
            property listings matching your saved searches, platform feature updates, real
            estate market reports, and special offers from Property Pointers or its
            partners. You can opt out of promotional communications at any time by
            clicking &quot;Unsubscribe&quot; in any email or by updating your notification
            preferences in your account settings.
          </p>
        </SubSection>
        <SubSection number="14.2" title="Transactional Communications">
          <p>
            We will continue to send you transactional messages (account confirmations,
            OTPs, payment receipts, listing approval/rejection notices, inquiry
            notifications) even if you opt out of promotional communications, as these are
            essential to providing the Services.
          </p>
        </SubSection>
        <SubSection number="14.3" title="NDNC / DND Registry">
          <p>
            By registering on the Platform or submitting a property inquiry, you expressly
            consent to Property Pointers contacting you via calls, SMS, and WhatsApp in
            connection with the Services, even if your number is registered with the
            National Do Not Call (NDNC) or Do Not Disturb (DND) registry. This consent may
            be withdrawn by writing to privacy@propertypointers.com.
          </p>
        </SubSection>
      </Section>

      <Section number="15" title="Automated Decision-Making & Profiling">
        <p>Property Pointers uses automated systems for the following purposes:</p>
        <BulletList
          items={[
            <span key="1"><strong className="text-white/90">Search & Recommendation:</strong> Algorithms rank property listings and generate personalised recommendations based on your search history, saved preferences, and location. These outputs are informational and do not produce legally significant effects on your rights.</span>,
            <span key="2"><strong className="text-white/90">Fraud Detection:</strong> Automated systems screen listings and account behaviour for indicators of fraud, such as duplicate listings, mismatched pricing, or unusual login patterns. Accounts flagged by automated systems are reviewed by a human moderator before action is taken.</span>,
            <span key="3"><strong className="text-white/90">Price Estimation:</strong> Our tools provide automated property value estimates based on comparable listings and market data. These are indicative only and not formal valuations.</span>,
          ]}
        />
        <p>
          We do not use fully automated decision-making that produces legal or similarly
          significant effects on individuals without human oversight. If you have concerns
          about any automated decision that has affected you, please contact
          privacy@propertypointers.com.
        </p>
      </Section>

      <Section number="16" title="Data Protection Officer (DPO)">
        <p>
          In accordance with applicable data protection law, Property Pointers has
          designated a Data Protection Officer (DPO) responsible for overseeing our data
          protection practices and serving as the primary point of contact for data
          subjects and regulatory authorities.
        </p>
        <DataTable
          headers={["Detail", "Information"]}
          rows={[
            { label: "Role", value: "Data Protection Officer (DPO)" },
            { label: "Organisation", value: "Property Pointers" },
            { label: "Email", value: "privacy@propertypointers.com" },
            {
              label: "Postal Address",
              value: "[DPO Address], Property Pointers, India",
            },
            {
              label: "Response Time",
              value:
                "Acknowledgement within 48 hours; substantive response within 30 days.",
            },
            {
              label: "Regulatory Contact",
              value:
                "Data Protection Board of India (once constituted under DPDP Act 2023).",
            },
          ]}
        />
      </Section>

      <Section number="17" title="Grievance Redressal for Privacy Complaints">
        <p>
          If you have any complaint, concern, or query regarding the processing of your
          personal data, you may contact our Grievance Officer through the channels below.
          All privacy-related grievances will be acknowledged within 24 hours and resolved
          within 15 working days.
        </p>
        <DataTable
          headers={["Channel", "Contact"]}
          rows={[
            { label: "Grievance Officer Email", value: "grievance@propertypointers.com" },
            { label: "Data Rights Requests", value: "privacy@propertypointers.com" },
            { label: "General Support", value: "support@propertypointers.com" },
            { label: "Legal & Compliance", value: "legal@propertypointers.com" },
            { label: "Website", value: "www.propertypointers.com" },
          ]}
        />
        <p>
          If you are not satisfied with our response to your grievance, you may escalate
          your complaint to the Data Protection Board of India (once established under the
          DPDP Act 2023) or to any other competent authority under applicable law.
        </p>
        <Callout variant="advisory" title="Escalation Path">
          <p>
            <strong className="text-white/90">Step 1:</strong> Contact
            privacy@propertypointers.com.
          </p>
          <p>
            <strong className="text-white/90">Step 2:</strong> If unresolved within 30
            days, escalate to grievance@propertypointers.com.
          </p>
          <p>
            <strong className="text-white/90">Step 3:</strong> File a complaint with the
            Data Protection Board of India (DPBI) or the competent regulatory authority.
          </p>
        </Callout>
      </Section>

      <Section number="18" title="Changes to This Privacy Policy">
        <p>
          Property Pointers reserves the right to update, modify, or replace this Privacy
          Policy at any time to reflect changes in our data practices, applicable law, or
          Platform functionality. We will notify you of material changes through:
        </p>
        <BulletList
          items={[
            "A prominent notice on the Platform homepage or login page.",
            "An email notification to your registered email address (for significant changes).",
            'An updated "Last Reviewed" date at the top of this document.',
          ]}
        />
        <p>
          We encourage you to review this Privacy Policy periodically to stay informed
          about how we protect your data. Your continued use of the Platform after the
          effective date of any changes constitutes your acceptance of the updated Policy.
        </p>
      </Section>

      <Section number="19" title="Governing Law & Jurisdiction">
        <p>
          This Privacy Policy is governed by and construed in accordance with the laws of
          the Republic of India, including the Digital Personal Data Protection Act, 2023,
          and the Information Technology Act, 2000. Any disputes arising from or in
          connection with this Privacy Policy shall be subject to the exclusive
          jurisdiction of the competent courts in New Delhi, India.
        </p>
      </Section>

      <Section number="20" title="Definitions">
        <DataTable
          headers={["Term", "Definition"]}
          rows={[
            {
              label: "Personal Data",
              value:
                "Any data about an individual who is identifiable by or in relation to such data, as defined under the DPDP Act 2023.",
            },
            {
              label: "Data Controller",
              value:
                "The entity that determines the purposes and means of processing personal data — in this case, Property Pointers.",
            },
            {
              label: "Data Processor",
              value:
                "A third party that processes personal data on behalf of the Data Controller under a data processing agreement.",
            },
            {
              label: "Processing",
              value:
                "Any operation performed on personal data, including collection, storage, use, disclosure, transfer, or deletion.",
            },
            {
              label: "Consent",
              value:
                "A free, specific, informed, unconditional, and unambiguous indication of the data subject's agreement to processing.",
            },
            {
              label: "Data Principal",
              value:
                "The individual to whom the personal data relates — i.e., you, the user.",
            },
            {
              label: "DPDP Act",
              value:
                "The Digital Personal Data Protection Act, 2023, enacted by the Parliament of India.",
            },
            {
              label: "DPBI",
              value:
                "Data Protection Board of India — the regulatory authority established under the DPDP Act 2023.",
            },
            {
              label: "Sensitive Data",
              value:
                "Categories of personal data requiring heightened protection, such as financial data, identity documents, and health information.",
            },
            {
              label: "Anonymised Data",
              value:
                "Data that has been irreversibly altered so that an individual can no longer be identified from it.",
            },
          ]}
        />
      </Section>

      <Callout variant="success" title="Summary of Your Key Rights">
        You have the right to: (1) Access your data — know what we hold. (2) Correct your
        data — fix errors. (3) Erase your data — request deletion. (4) Withdraw consent —
        stop certain processing. (5) Lodge a grievance — complain to us or to the DPBI.
        Contact: privacy@propertypointers.com.
      </Callout>

      <p className="text-center text-xs text-gray-500 pt-4">
        Property Pointers — Privacy Policy &nbsp;|&nbsp; www.propertypointers.com
        &nbsp;|&nbsp; Effective April 2, 2026 &nbsp;|&nbsp; Governing Law: Republic of
        India
      </p>
    </LegalDocument>
  );
}
