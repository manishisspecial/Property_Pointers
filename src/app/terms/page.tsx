import type { Metadata } from "next";
import { ScrollText } from "lucide-react";
import {
  LegalDocument,
  Section,
  SubSection,
  BulletList,
  Callout,
  DataTable,
} from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service | Property Pointers",
  description:
    "Property Pointers Terms of Service (Terms & Conditions) — the legal agreement governing your use of www.propertypointers.com and its services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      icon={ScrollText}
      title="Terms of Service"
      subtitle="Legal Agreement & Platform Policies (Terms & Conditions)"
      meta={[
        { label: "Effective Date", value: "April 2, 2026" },
        { label: "Last Updated", value: "April 2, 2026" },
        { label: "Governing Law", value: "Republic of India" },
        { label: "Website", value: "www.propertypointers.com" },
        { label: "Legal Contact", value: "legal@propertypointers.com" },
        { label: "Applicable To", value: "All Platform Users" },
      ]}
      intro="By accessing or using the Property Pointers platform, you agree to be bound by these Terms of Service. Please read this document carefully before proceeding."
    >
      <Callout variant="notice" title="Notice — Please Read Before Proceeding">
        This Terms of Service Agreement (&quot;Agreement&quot;) is a legally binding
        contract between you (&quot;User&quot;) and Property Pointers (&quot;Company&quot;),
        the operator of the real estate platform at www.propertypointers.com and its
        mobile applications. By accessing, registering on, or using any part of the
        Platform, you unconditionally accept these Terms. If you do not agree, please
        discontinue use immediately.
      </Callout>

      <Section number="01" title="Acceptance of Terms">
        <p>
          By accessing or using Property Pointers — including browsing listings, posting
          properties, registering an account, using our EMI calculator, scheduling
          property visits, or availing any services — you represent that you have read,
          understood, and agree to be bound by these Terms of Service, our Privacy Policy,
          and any other policies referenced herein. These Terms apply to all users of the
          Platform, including buyers, sellers, landlords, tenants, real estate agents,
          brokers, developers, and any other individuals who access or contribute to the
          Platform.
        </p>
        <p>
          Your continued use of the Platform following the posting of any changes to these
          Terms constitutes acceptance of those changes. If you are accessing the Platform
          on behalf of a business entity, you represent that you have the authority to
          bind such entity to these Terms.
        </p>
        <Callout variant="info" title="Minor Users">
          The Platform is not intended for use by individuals below the age of 18 years.
          By using this Platform, you confirm that you are at least 18 years of age and
          legally competent to enter into a binding contract under the Indian Contract
          Act, 1872.
        </Callout>
      </Section>

      <Section number="02" title="Definitions">
        <p>
          For the purposes of this Agreement, the following terms shall have the meanings
          ascribed below:
        </p>
        <DataTable
          headers={["Term", "Meaning"]}
          rows={[
            {
              label: '"Platform"',
              value:
                "The website www.propertypointers.com, its subdomains, mobile applications, APIs, and all associated digital services operated by Property Pointers.",
            },
            {
              label: '"User" / "You"',
              value:
                "Any individual or legal entity that accesses, registers on, or uses the Platform in any capacity, including buyers, sellers, tenants, landlords, brokers, developers, and visitors.",
            },
            {
              label: '"Listing"',
              value:
                "Any property advertisement, including text, images, virtual tours, documents, pricing information, and other content submitted by a User to be displayed on the Platform.",
            },
            {
              label: '"Services"',
              value:
                "All features, tools, and functionalities provided by Property Pointers, including property search, listing management, virtual tours, EMI calculators, market insights, lead generation, and partner services.",
            },
            {
              label: '"Verified Listing"',
              value:
                "A Listing reviewed by Property Pointers' internal team and confirmed to meet basic verification criteria. Verification does not constitute a guarantee of accuracy or title.",
            },
            {
              label: '"RERA"',
              value:
                "The Real Estate (Regulation and Development) Act, 2016, and the rules made thereunder by the respective State Governments.",
            },
            {
              label: '"Content"',
              value:
                "All information, data, text, photographs, videos, audio, graphics, and other material uploaded, posted, or submitted by Users on the Platform.",
            },
            {
              label: '"Partner"',
              value:
                "Real estate brokers, agents, developers, financial institutions, and other service providers who have entered into a formal agreement with Property Pointers.",
            },
            {
              label: '"Vendor"',
              value:
                "Entities listed on the Vendor Marketplace offering ancillary services such as interior design, home loans, legal assistance, vastu consultation, and related services.",
            },
          ]}
        />
      </Section>

      <Section number="03" title="Eligibility & Registration">
        <SubSection number="3.1" title="Eligibility Criteria">
          <p>To register and use the Platform, you must:</p>
          <BulletList
            items={[
              "Be at least 18 years of age and legally capable of entering contracts under applicable law.",
              "Not be barred from receiving services under the laws of India or any other applicable jurisdiction.",
              "Provide accurate, complete, and current registration information.",
              "Not have been previously suspended or removed from the Platform by Property Pointers.",
            ]}
          />
        </SubSection>
        <SubSection number="3.2" title="Account Registration">
          <p>
            You may be required to register for an account to access certain features of
            the Platform. During registration, you must provide true, accurate, current,
            and complete information about yourself. You are solely responsible for
            maintaining the confidentiality of your login credentials and for all
            activities that occur under your account.
          </p>
        </SubSection>
        <SubSection number="3.3" title="Account Security">
          <p>
            You agree to notify Property Pointers immediately at
            support@propertypointers.com upon becoming aware of any unauthorized use of
            your account or any other breach of security. Property Pointers will not be
            liable for any loss or damage arising from unauthorized use of your
            credentials prior to notification.
          </p>
        </SubSection>
        <SubSection number="3.4" title="Account Types">
          <BulletList
            items={[
              <span key="1"><strong className="text-white/90">Individual / Home Seeker Account:</strong> For buyers, renters, and PG seekers searching for residential properties.</span>,
              <span key="2"><strong className="text-white/90">Owner / Seller Account:</strong> For property owners wishing to list their property for sale or rent.</span>,
              <span key="3"><strong className="text-white/90">Builder / Developer Account:</strong> For registered real estate developers listing new projects.</span>,
              <span key="4"><strong className="text-white/90">Broker / Agent Account:</strong> For licensed real estate professionals listing on behalf of owners.</span>,
              <span key="5"><strong className="text-white/90">Partner Account:</strong> For entities enrolled in the Property Pointers Partner Network programme.</span>,
            ]}
          />
        </SubSection>
        <Callout variant="info" title="Note">
          Each account type carries specific privileges and responsibilities.
          Misrepresenting your account type is a violation of these Terms and may result
          in immediate termination.
        </Callout>
      </Section>

      <Section number="04" title="Nature of the Platform — Intermediary Role">
        <p>
          Property Pointers is an online real estate advertising and information platform
          that acts as an intermediary under the Information Technology Act, 2000, and the
          IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. The
          Platform facilitates communication between property buyers, sellers, renters,
          and landlords. It does not, by itself, own, manage, operate, or broker any real
          estate property.
        </p>
        <Callout variant="notice" title="Important Disclaimer">
          Property Pointers is a marketplace and advertisement medium only. It is not a
          party to any transaction between Users. Any transaction, agreement, or deal
          entered into between Users is strictly between those Users. Property Pointers
          bears no responsibility for the authenticity, quality, title, or legal standing
          of any property listed on the Platform, whether or not it bears a
          &quot;Verified&quot; badge.
        </Callout>
        <p>
          Users are STRONGLY ADVISED to independently verify all details related to a
          property — including title deeds, ownership documents, RERA registration,
          encumbrances, approvals, area measurements, and pricing — before entering into
          any agreement or making any financial commitment.
        </p>
        <p>
          The Platform does not endorse, recommend, or guarantee any User, property,
          developer, broker, or vendor listed on the Platform. Market insights, price
          trends, and analytical content published on the Platform are for informational
          purposes only and should not be construed as investment, legal, or financial
          advice.
        </p>
      </Section>

      <Section number="05" title="Services Offered">
        <SubSection number="5.1" title="Core Services">
          <BulletList
            items={[
              <span key="1"><strong className="text-white/90">Property Search & Discovery:</strong> Browse and filter thousands of residential and commercial property listings across Delhi, Noida, Greater Noida, Gurugram, Ghaziabad, Jaipur, and Pune.</span>,
              <span key="2"><strong className="text-white/90">Free Property Listing:</strong> Owners and agents can post properties for sale, rent, or PG/Co-Living free of charge, subject to fair use limits.</span>,
              <span key="3"><strong className="text-white/90">Virtual Tours:</strong> Immersive 3D property tours available for select listings, allowing remote property viewing.</span>,
              <span key="4"><strong className="text-white/90">EMI Calculator:</strong> A financial tool to estimate loan eligibility and EMI amounts. Results are indicative only and are not financial advice.</span>,
              <span key="5"><strong className="text-white/90">Market Insights:</strong> Data-driven price trends, area-level analytics, and investment information for major cities.</span>,
              <span key="6"><strong className="text-white/90">Lead Management:</strong> Tools enabling property owners, brokers, and developers to manage incoming buyer or renter leads.</span>,
            ]}
          />
        </SubSection>
        <SubSection number="5.2" title="Premium & Paid Services">
          <BulletList
            items={[
              <span key="1"><strong className="text-white/90">Featured / Boosted Listings:</strong> Enhanced visibility through paid promotional slots on the Platform.</span>,
              <span key="2"><strong className="text-white/90">Developer Project Pages:</strong> Dedicated microsites and banner placements for builders and developers.</span>,
              <span key="3"><strong className="text-white/90">Partner Network Subscription:</strong> Preferential lead access, analytics dashboards, and branding benefits for enrolled partners.</span>,
              <span key="4"><strong className="text-white/90">Vendor Marketplace:</strong> Paid listings and service promotion for ancillary real estate services.</span>,
            ]}
          />
        </SubSection>
        <SubSection number="5.3" title="Third-Party Services">
          <p>
            The Platform may include or link to third-party services such as home loan
            providers, legal consultation services, interior design firms, and insurance
            providers. Property Pointers does not endorse these third-party services, and
            their use is governed by the respective service providers&apos; terms and
            conditions.
          </p>
        </SubSection>
        <Callout variant="info" title="Note">
          Service availability may vary by city, property type, and user account type.
          Property Pointers reserves the right to modify, suspend, or discontinue any
          service at any time without prior notice.
        </Callout>
      </Section>

      <Section number="06" title="Property Listings — Submission & Standards">
        <SubSection number="6.1" title="Listing Accuracy">
          <p>
            When posting a Listing on the Platform, you represent and warrant that all
            information provided — including property location, area, configuration,
            price, ownership status, photographs, and legal compliance — is true,
            accurate, and not misleading. You are solely responsible for the accuracy and
            completeness of your Listing.
          </p>
        </SubSection>
        <SubSection number="6.2" title="Mandatory Listing Requirements">
          <BulletList
            items={[
              "All property areas must be expressed in standard units (sq. ft. or sq. mt.) as prescribed under RERA.",
              "Listings must not promote, target, or restrict access based on religion, caste, community, race, gender, or any other prohibited ground under applicable Indian law.",
              "All photographs and media must accurately represent the listed property and must not be misleading or digitally fabricated.",
              "Listings for under-construction projects must include valid RERA registration numbers applicable to the respective state.",
              "Pre-launch offers and unregistered projects must be clearly disclosed as such; Users dealing in unregistered projects do so entirely at their own risk.",
            ]}
          />
        </SubSection>
        <SubSection number="6.3" title="Listing Removal">
          <p>
            Property Pointers reserves the right to remove, disable, or modify any Listing
            that, in our sole discretion, violates these Terms, applicable law, or
            community standards — without prior notice to the listing User. Repeat
            violations may result in account suspension or termination.
          </p>
        </SubSection>
        <SubSection number="6.4" title="Listing Ownership & Licence">
          <p>
            By submitting a Listing, you grant Property Pointers a non-exclusive,
            royalty-free, worldwide, sub-licensable licence to use, reproduce, display,
            distribute, and promote the Listing content across the Platform, its marketing
            channels, partner platforms, and affiliated media for the purpose of
            delivering the Services.
          </p>
        </SubSection>
      </Section>

      <Section number="07" title="User Obligations & Conduct">
        <SubSection number="7.1" title="General Obligations">
          <BulletList
            items={[
              "Use the Platform only for lawful purposes and in compliance with all applicable laws and regulations of India.",
              "Provide truthful and up-to-date information in all interactions on the Platform.",
              "Not impersonate any person, organisation, or entity, or falsely represent your relationship with any person or organisation.",
              "Not use the Platform to facilitate services or transactions outside of the Platform in a manner intended to circumvent our payment systems or terms.",
              "Promptly remove or update any Listing once the property is no longer available (sold, rented, or taken off the market).",
            ]}
          />
        </SubSection>
        <SubSection number="7.2" title="Buyer / Renter Obligations">
          <BulletList
            items={[
              "Conduct your own independent due diligence before committing to any property purchase, rental, or investment decision.",
              "Independently verify the identity of the property owner or authorised representative before making any payment or signing any agreement.",
              "Not pay any property visit charges, gate-pass fees, or advance booking amounts to individuals contacted through the Platform without appropriate legal documentation.",
              "Report suspicious, fraudulent, or misleading listings to Property Pointers at report@propertypointers.com promptly.",
            ]}
          />
        </SubSection>
        <SubSection number="7.3" title="Seller / Owner / Agent Obligations">
          <BulletList
            items={[
              "List only properties for which you hold valid ownership or duly authorised rights to advertise.",
              "Disclose all material facts about the property, including encumbrances, disputes, pending approvals, or legal proceedings.",
              "Ensure that all listed projects comply with applicable RERA requirements in the relevant state.",
              "Respond promptly and honestly to genuine inquiries received through the Platform.",
            ]}
          />
        </SubSection>
      </Section>

      <Section number="08" title="RERA Compliance">
        <p>
          Property Pointers is committed to promoting transparency and compliance with the
          Real Estate (Regulation and Development) Act, 2016 (&quot;RERA&quot;) and the
          rules framed thereunder by individual State Governments.
        </p>
        <SubSection number="8.1" title="Developer Obligations under RERA">
          <BulletList
            items={[
              "All developers listing new residential or commercial projects on the Platform must provide a valid RERA registration number for each project in the applicable state.",
              "Project details displayed on the Platform must be consistent with details registered with the respective State RERA authority.",
              "Any material updates to a project (completion dates, specifications, or approvals) must be promptly updated on the Platform Listing.",
              "Property Pointers reserves the right to delist projects found to be non-compliant with RERA requirements.",
            ]}
          />
        </SubSection>
        <SubSection number="8.2" title="Platform Verification Effort">
          <p>
            Property Pointers makes reasonable efforts to verify RERA registration details
            for listed projects; however, it is the sole responsibility of the developer
            to maintain compliance. Property Pointers shall not be held liable for any
            inaccuracy in RERA information provided by developers.
          </p>
        </SubSection>
        <Callout variant="advisory" title="Buyer Advisory">
          Before investing in any real estate project, independently verify the
          project&apos;s RERA registration on your respective State&apos;s RERA portal
          (e.g., RERA Uttar Pradesh, Rajasthan RERA, Maha RERA). Do not rely solely on
          information displayed on Property Pointers.
        </Callout>
        <SubSection number="8.3" title="Agent / Broker RERA Registration">
          <p>
            Real estate agents and brokers operating on the Platform must possess a valid
            RERA agent registration number in the state(s) where they practice. Property
            Pointers may request proof of RERA agent registration at any time and may
            remove non-compliant agent accounts.
          </p>
        </SubSection>
      </Section>

      <Section number="09" title="Zero Brokerage Policy">
        <p>
          Property Pointers promotes a zero-brokerage model that enables direct
          communication between property buyers/renters and property owners/sellers,
          thereby eliminating intermediary commissions in applicable scenarios.
        </p>
        <SubSection number="9.1" title="Scope of Zero Brokerage">
          <BulletList
            items={[
              "The zero-brokerage model applies to direct owner listings where Properties are listed by their owners and buyers/renters are connected directly.",
              "Property Pointers charges no transaction fee or commission from buyers or renters for establishing contact with a property owner through the Platform.",
              "The Platform may charge listing fees, promotional fees, or subscription charges to property owners, developers, or brokers separately from buyer/renter interactions.",
            ]}
          />
        </SubSection>
        <SubSection number="9.2" title="Broker-Listed Properties">
          <p>
            Properties listed by licensed real estate agents or brokers may be subject to
            brokerage commissions as agreed between the broker and the buyer/renter. Such
            listings will be clearly identified. Property Pointers is not responsible for
            brokerage agreements between Users and third-party brokers.
          </p>
        </SubSection>
        <Callout variant="warning" title="Alert">
          Property Pointers will never ask buyers or renters to pay any platform fee,
          property visit charges, or advance payment as a condition to view or contact a
          property. If any individual claiming to represent Property Pointers asks for
          such payments, please report it immediately to fraud@propertypointers.com.
        </Callout>
      </Section>

      <Section number="10" title="Payment Terms">
        <SubSection number="10.1" title="Paid Services">
          <p>
            Certain features of the Platform (including featured listings, developer
            project pages, partner subscriptions, and vendor marketplace placements) are
            offered on a paid basis. All payments for paid Services must be made on a 100%
            advance basis unless otherwise explicitly stated in a separate written
            agreement.
          </p>
        </SubSection>
        <SubSection number="10.2" title="Taxes">
          <p>
            All fees are exclusive of applicable taxes, including Goods and Services Tax
            (GST), unless explicitly stated otherwise. You are responsible for paying all
            applicable taxes arising from your use of paid Services.
          </p>
        </SubSection>
        <SubSection number="10.3" title="Refund Policy">
          <BulletList
            items={[
              "Payments made for listing plans, promotional packages, or subscriptions are non-refundable once a Service has been activated or utilised, except where required by applicable law.",
              "Refunds, if any, shall be processed at the sole discretion of Property Pointers and may take 7-14 business days to reflect in the User's bank or payment account.",
              "In the event of a technical error resulting in a duplicate payment, Property Pointers will investigate and, upon confirmation, process a refund within 15 business days.",
              "No refund will be issued for listings that are removed due to violations of these Terms.",
            ]}
          />
        </SubSection>
        <SubSection number="10.4" title="Payment Methods">
          <p>
            Property Pointers accepts payments through authorised payment gateways
            including UPI, net banking, credit/debit cards, and other methods made
            available from time to time. Property Pointers does not store payment card
            information; all payment processing is handled by compliant third-party
            payment processors.
          </p>
        </SubSection>
        <SubSection number="10.5" title="Billing Disputes">
          <p>
            Any billing disputes must be raised with Property Pointers within 30 days of
            the disputed charge. After this period, charges will be deemed accepted and
            non-disputable.
          </p>
        </SubSection>
      </Section>

      <Section number="11" title="Verified Listings — Scope & Limitations">
        <p>
          Property Pointers offers a &quot;Verified Listing&quot; badge on properties that
          have undergone a basic review process by our team. This process may include
          cross-referencing user-submitted details, contacting the listing owner, and
          reviewing documents voluntarily provided.
        </p>
        <Callout variant="warning" title="Critical Limitation">
          A &quot;Verified&quot; badge signifies that Property Pointers has performed a
          basic review at a point in time. It does NOT constitute a warranty, guarantee,
          or legal confirmation of: (a) ownership or title to the property; (b) absence of
          encumbrances or disputes; (c) accuracy of listed area or price; (d) compliance
          with building codes or local regulations; or (e) suitability for any particular
          purpose. Users must independently verify all material information before
          proceeding with any transaction.
        </Callout>
        <p>
          The verification badge is a platform-level trust indicator only. Property
          Pointers expressly disclaims any and all liability for losses, disputes, or
          claims arising from reliance on the Verified Listing badge.
        </p>
      </Section>

      <Section number="12" title="Virtual Tours & Digital Media">
        <p>
          The Platform may offer immersive 3D virtual tour functionality for select
          property listings. Use of virtual tours is subject to the following terms:
        </p>
        <BulletList
          items={[
            "Virtual tours are for informational and visualisation purposes only. They do not replace an in-person physical inspection of the property.",
            "Property Pointers does not warrant that virtual tours accurately represent the current physical condition, furnishing, dimensions, or finish of a property.",
            "Users must conduct a physical site visit before finalising any purchase, rental, or investment decision.",
            "All photographs, videos, and virtual tour content uploaded by listing Users must be genuine representations of the actual property. Use of stock images, computer-generated imagery, or content from other properties is strictly prohibited.",
            "By uploading photographs or virtual tour content, the listing User confirms ownership of or appropriate rights to such content and grants Property Pointers a licence to display and promote such content on the Platform and its marketing channels.",
          ]}
        />
        <Callout variant="info" title="Note">
          Property Pointers is not responsible for the quality, accuracy, or availability
          of virtual tours provided by third-party technology integrations.
        </Callout>
      </Section>

      <Section number="13" title="Partner Network & Vendor Marketplace">
        <SubSection number="13.1" title="Partner Network">
          <p>
            Property Pointers&apos; Partner Network connects real estate professionals —
            including brokers, agents, developers, and financial advisors — with buyers
            and sellers on the Platform. Partners must agree to a separate Partner
            Agreement and comply with all applicable RERA and professional standards.
          </p>
          <BulletList
            items={[
              "Partners are solely responsible for the accuracy of their listings and the quality of their services.",
              "Property Pointers makes no warranty regarding the performance, conduct, or reliability of any Partner.",
              "Disputes between Users and Partners must be resolved directly between the parties.",
            ]}
          />
        </SubSection>
        <SubSection number="13.2" title="Vendor Marketplace">
          <p>
            The Vendor Marketplace features third-party service providers offering
            ancillary real estate services. Engagement with any Vendor is at the
            User&apos;s sole discretion and risk. Property Pointers does not endorse,
            guarantee, or take responsibility for the services provided by Vendors.
            Disputes with Vendors must be addressed directly with the respective Vendor.
          </p>
        </SubSection>
        <SubSection number="13.3" title="Third-Party Links">
          <p>
            The Platform may contain links to third-party websites. Property Pointers does
            not control these sites and is not responsible for their content, privacy
            practices, or accuracy. Visiting third-party links is at your own risk.
          </p>
        </SubSection>
      </Section>

      <Section number="14" title="Intellectual Property Rights">
        <p>
          All content on the Platform — including the Property Pointers name, logo, brand
          identity, website design, interface layout, software, database structure, market
          reports, original articles, and compilations of data — is the exclusive
          intellectual property of Property Pointers or its licensors, and is protected
          under the Copyright Act, 1957, the Trade Marks Act, 1999, and other applicable
          Indian and international intellectual property laws.
        </p>
        <SubSection number="14.1" title="Permitted Use">
          <p>
            You are granted a limited, non-exclusive, non-transferable, revocable licence
            to access and use the Platform and its content solely for personal,
            non-commercial purposes in connection with the Services.
          </p>
        </SubSection>
        <SubSection number="14.2" title="Prohibited Uses">
          <BulletList
            items={[
              "Scraping, crawling, or systematically extracting data from the Platform using automated tools.",
              "Reproducing, republishing, or commercially exploiting any Platform content without prior written consent from Property Pointers.",
              "Using Property Pointers' trademarks, logos, or brand elements in any manner without express written permission.",
              "Reverse engineering, decompiling, or disassembling any software or technology underlying the Platform.",
              "Creating derivative works based on the Platform's proprietary content or technology.",
            ]}
          />
        </SubSection>
        <SubSection number="14.3" title="User Content Licence">
          <p>
            You retain ownership of the Content you submit to the Platform. However, by
            submitting Content, you grant Property Pointers a perpetual, irrevocable,
            worldwide, royalty-free, sub-licensable licence to use, reproduce, adapt,
            publish, translate, and distribute your Content across the Platform and its
            affiliated channels for the purpose of providing and promoting the Services.
          </p>
        </SubSection>
      </Section>

      <Section number="15" title="Disclaimer of Warranties">
        <p>
          The Platform and all Services are provided on an &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; basis, without any warranties of any kind, whether express,
          implied, statutory, or otherwise.
        </p>
        <p>
          Property Pointers expressly disclaims all warranties, including but not limited
          to:
        </p>
        <BulletList
          items={[
            "Implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
            "That the Platform will be available without interruption, error-free, or free from viruses or other harmful components.",
            "That any property Listing is accurate, complete, current, or legally compliant.",
            "That search results will meet the User's requirements or expectations.",
            "That any information on the Platform — including market insights, price trends, or EMI calculations — is suitable for financial or investment decision-making.",
            "That the Platform is free from security vulnerabilities or that User data will be entirely immune from unauthorised access.",
          ]}
        />
        <Callout variant="info" title="Note">
          Property Pointers offers no guarantee that there will be any satisfactory
          response — or any response at all — from a property owner, seller, or renter
          after a Listing is posted or an inquiry is sent.
        </Callout>
      </Section>

      <Section number="16" title="Limitation of Liability">
        <p>
          To the maximum extent permitted under applicable law, Property Pointers, its
          directors, officers, employees, agents, partners, affiliates, and licensors
          shall not be liable for any direct, indirect, incidental, special, consequential,
          punitive, or exemplary damages arising out of or in connection with your use of
          the Platform or Services, including but not limited to:
        </p>
        <BulletList
          items={[
            "Loss of property, money, or investment resulting from a real estate transaction facilitated through or discovered on the Platform.",
            "Fraudulent Listings, misrepresentation by property owners, sellers, or brokers.",
            "Failure of a property transaction to complete for any reason.",
            "Inaccuracy of EMI calculations, market data, or price trend information.",
            "Unauthorised access to or alteration of your User account or submitted Content.",
            "Losses arising from reliance on the Verified Listing badge.",
            "Platform downtime, technical failures, or data loss.",
          ]}
        />
        <p>
          In any event, Property Pointers&apos; total liability to you for any claim
          arising out of or in connection with these Terms or the Platform shall be
          limited to the amount paid by you to Property Pointers for the specific Service
          giving rise to the claim in the twelve (12) months preceding the claim.
        </p>
        <Callout variant="advisory" title="High-Value Transactions">
          Real estate transactions typically involve significant financial commitments.
          Property Pointers strongly advises all Users to engage qualified legal counsel,
          chartered accountants, and financial advisors before entering into any property
          transaction, regardless of information available on the Platform.
        </Callout>
      </Section>

      <Section number="17" title="Privacy & Data Protection">
        <p>
          Property Pointers is committed to protecting the privacy and personal data of
          its Users in compliance with the Information Technology (Amendment) Act, 2008,
          and the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;), along
          with all applicable rules and regulations.
        </p>
        <SubSection number="17.1" title="Data Collection & Use">
          <p>
            By using the Platform, you consent to the collection, storage, and processing
            of your personal data as described in our Privacy Policy, which is
            incorporated into and forms a part of these Terms. Your data may be used to:
          </p>
          <BulletList
            items={[
              "Provide, maintain, and improve the Services.",
              "Verify your identity and account information.",
              "Facilitate connections between buyers, sellers, renters, and landlords.",
              "Send you relevant property alerts, promotional communications, and Service notifications (subject to your preferences).",
              "Comply with legal and regulatory obligations.",
              "Conduct anti-fraud, security, and compliance monitoring.",
            ]}
          />
        </SubSection>
        <SubSection number="17.2" title="Communication Consent">
          <p>
            By registering on the Platform or submitting an inquiry for a property, you
            authorise Property Pointers to contact you via calls, SMS, WhatsApp, email,
            and push notifications — even if you are registered with the National Do Not
            Call (NDNC) or Do Not Disturb (DND) registry — in relation to the Services and
            relevant property opportunities.
          </p>
        </SubSection>
        <SubSection number="17.3" title="Data Shared with Third Parties">
          <p>
            When you submit an inquiry for a Listing, your contact details and profile
            information may be shared with the relevant property owner, seller, developer,
            or broker. By submitting an inquiry, you consent to this sharing of
            information. Property Pointers may also share anonymised, aggregated data with
            research and analytics partners.
          </p>
        </SubSection>
        <SubSection number="17.4" title="Data Security">
          <p>
            Property Pointers implements physical, technical, and administrative security
            measures designed to protect your personal data from unauthorised access,
            disclosure, or misuse. However, no system is entirely infallible, and Property
            Pointers cannot guarantee absolute security of your data.
          </p>
        </SubSection>
      </Section>

      <Section number="18" title="Prohibited Conduct">
        <p>
          The following activities are strictly prohibited on the Platform and may result
          in immediate account termination and/or legal action:
        </p>
        <BulletList
          items={[
            "Posting false, fabricated, or fraudulent property listings, including properties that do not exist or that you are not authorised to advertise.",
            "Collecting or harvesting contact information of other Users for spam, phishing, or unsolicited commercial communications.",
            "Using the Platform to conduct or facilitate money laundering, benami transactions, or any activity in violation of the Prevention of Money Laundering Act, 2002.",
            "Posting content that discriminates against any individual based on religion, caste, community, race, gender, disability, or any other protected characteristic under Indian law.",
            "Uploading malicious code, viruses, or any software designed to disrupt, damage, or gain unauthorised access to the Platform.",
            "Impersonating Property Pointers representatives, other Users, or any third party in a misleading or fraudulent manner.",
            "Engaging in any activity designed to manipulate, game, or artificially inflate listing visibility or user ratings.",
            "Reverse-engineering, hacking, or attempting to circumvent the security measures of the Platform.",
            "Using the Platform to solicit Users to move transactions off-platform in order to avoid our policies or payment systems.",
            "Posting pre-launch project information without RERA registration, in violation of the RERA Act.",
            "Listing residential properties with instructions that restrict viewings or transactions on the basis of community, religion, or caste.",
          ]}
        />
        <Callout variant="warning" title="Warning">
          Violation of these prohibitions may attract civil and criminal liability under
          applicable Indian law, including the Indian Penal Code, Information Technology
          Act, RERA, and Consumer Protection Act, in addition to Platform-level sanctions.
        </Callout>
      </Section>

      <Section number="19" title="Account Suspension & Termination">
        <SubSection number="19.1" title="Grounds for Suspension or Termination">
          <p>
            Property Pointers reserves the right, at its sole discretion, to suspend,
            restrict, or permanently terminate any User account — with or without prior
            notice — in the following circumstances:
          </p>
          <BulletList
            items={[
              "Violation of any provision of these Terms of Service.",
              "Submission of false, fraudulent, or misleading information or Listings.",
              "Non-compliance with applicable RERA requirements.",
              "Engagement in prohibited conduct as described in Section 18.",
              "Complaints received from other Users, regulatory authorities, or law enforcement agencies.",
              "Extended periods of account inactivity.",
              "Legal obligations or court orders requiring account restriction.",
            ]}
          />
        </SubSection>
        <SubSection number="19.2" title="Consequences of Termination">
          <p>
            Upon account termination, all your Listings will be removed from the Platform,
            access to your account will be disabled, and any unused paid credits or
            subscriptions will be forfeited (subject to any applicable legal refund
            rights). Property Pointers shall not be liable for any loss or damage arising
            from account termination.
          </p>
        </SubSection>
        <SubSection number="19.3" title="User-Initiated Termination">
          <p>
            You may delete your account at any time by contacting us at
            support@propertypointers.com. Deletion of your account does not automatically
            remove active Listings from the Platform; you must remove them manually prior
            to account deletion, or request Property Pointers to do so.
          </p>
        </SubSection>
      </Section>

      <Section number="20" title="Indemnification">
        <p>
          You agree to defend, indemnify, and hold harmless Property Pointers and its
          affiliates, officers, directors, employees, agents, licensors, and service
          providers from and against any claims, liabilities, damages, judgments, awards,
          losses, costs, expenses, or fees (including reasonable legal fees) arising out
          of or relating to:
        </p>
        <BulletList
          items={[
            "Your violation of these Terms of Service.",
            "Your Listings, Content, or conduct on the Platform.",
            "Your violation of any applicable law or regulation.",
            "Your violation of any third party's rights, including intellectual property rights.",
            "Any real estate transaction entered into by you with another User found through the Platform.",
            "Any dispute between you and any other User, Partner, Vendor, or third party.",
          ]}
        />
        <p>
          Property Pointers reserves the right to assume the exclusive defence and control
          of any matter otherwise subject to indemnification by you, and you agree to
          cooperate fully with Property Pointers in the defence of any such claims.
        </p>
      </Section>

      <Section number="21" title="Dispute Resolution & Arbitration">
        <SubSection number="21.1" title="Negotiation">
          <p>
            In the event of any dispute, controversy, or claim arising out of or in
            connection with these Terms, the Services, or any transaction facilitated
            through the Platform, the parties shall first attempt to resolve the matter
            through good-faith negotiations for a period of thirty (30) days from the date
            on which the dispute is notified in writing.
          </p>
        </SubSection>
        <SubSection number="21.2" title="Arbitration">
          <p>
            If the dispute cannot be resolved by negotiation within the prescribed period,
            it shall be referred to and finally resolved by binding arbitration under the
            Arbitration and Conciliation Act, 1996, as amended. The arbitration shall be
            conducted by a sole arbitrator mutually agreed upon by the parties. The seat
            of arbitration shall be New Delhi, India. The language of the arbitration
            proceedings shall be English.
          </p>
        </SubSection>
        <SubSection number="21.3" title="Consumer Disputes">
          <p>
            Nothing in this Section shall limit a User&apos;s right to file a complaint
            with a Consumer Disputes Redressal Commission under the Consumer Protection
            Act, 2019, if the User qualifies as a &quot;consumer&quot; under that Act.
          </p>
        </SubSection>
        <SubSection number="21.4" title="Class Action Waiver">
          <p>
            You agree that any disputes will be resolved on an individual basis only, and
            not as a class, consolidated, or representative action. You waive any right to
            bring or participate in class action proceedings against Property Pointers.
          </p>
        </SubSection>
      </Section>

      <Section number="22" title="Governing Law & Jurisdiction">
        <p>
          These Terms of Service shall be governed by and construed in accordance with the
          laws of the Republic of India, without regard to its conflict of laws
          principles. Subject to the arbitration clause in Section 21, the parties
          irrevocably submit to the exclusive jurisdiction of the competent courts of New
          Delhi, India for the resolution of any dispute not subject to arbitration.
        </p>
        <Callout variant="info" title="Applicable Statutes">
          Information Technology Act, 2000; IT (Intermediary Guidelines) Rules, 2021; Real
          Estate (Regulation and Development) Act, 2016; Consumer Protection Act, 2019;
          Digital Personal Data Protection Act, 2023; Indian Contract Act, 1872;
          Prevention of Money Laundering Act, 2002; Transfer of Property Act, 1882.
        </Callout>
      </Section>

      <Section number="23" title="Modifications to Terms">
        <p>
          Property Pointers reserves the right to revise, update, or replace any part of
          these Terms of Service at any time, at its sole discretion. Updated Terms will
          be posted on the Platform with a revised &quot;Last Updated&quot; date. Where
          the changes are material, Property Pointers will endeavour to notify registered
          Users via email or a prominent Platform notification prior to the changes taking
          effect.
        </p>
        <p>
          Your continued access to or use of the Platform following the posting of any
          revised Terms constitutes your acceptance of those changes. If you do not agree
          to the revised Terms, you must discontinue use of the Platform.
        </p>
        <p>
          Property Pointers also reserves the right, at any time and without prior notice,
          to: modify or discontinue (temporarily or permanently) any part of the Platform
          or the Services; change access fees for paid Services; and update technical
          specifications or operational procedures.
        </p>
      </Section>

      <Section number="24" title="Grievance Redressal">
        <p>
          In accordance with the Information Technology Act, 2000, the IT (Intermediary
          Guidelines) Rules, 2021, and the Consumer Protection Act, 2019, Property
          Pointers has designated a Grievance Officer to address User complaints and
          concerns relating to the Platform and its Services.
        </p>
        <DataTable
          headers={["Purpose", "Contact"]}
          rows={[
            {
              label: "Grievance Officer",
              value: "Designated representative (published on Platform)",
            },
            { label: "Email", value: "grievance@propertypointers.com" },
            {
              label: "Postal Address",
              value: "Property Pointers, Registered Office Address, India",
            },
            {
              label: "Acknowledgement",
              value: "Within 24 hours of receiving the complaint",
            },
            {
              label: "Resolution Time",
              value: "Within 15 days of acknowledgement",
            },
            { label: "Escalation", value: "legal@propertypointers.com" },
          ]}
        />
        <p>
          All grievances must be submitted in writing with adequate details of the
          complaint, including the User&apos;s registered email, nature of the grievance,
          and any supporting documents. Frivolous or vexatious complaints may be summarily
          rejected.
        </p>
        <Callout variant="info" title="Listing Reports">
          Users may also report offensive, illegal, or fraudulent listings directly
          through the &quot;Report Listing&quot; functionality available on every property
          listing page on the Platform.
        </Callout>
      </Section>

      <Section number="25" title="Contact & Legal Notices">
        <p>
          For all legal notices, general queries, or correspondence relating to these
          Terms of Service, please contact Property Pointers through the following
          channels:
        </p>
        <DataTable
          headers={["Purpose", "Contact"]}
          rows={[
            { label: "General Support", value: "support@propertypointers.com" },
            { label: "Legal & Compliance", value: "legal@propertypointers.com" },
            { label: "Grievance Officer", value: "grievance@propertypointers.com" },
            { label: "Fraud / Abuse Reporting", value: "fraud@propertypointers.com" },
            { label: "Listing Removal Requests", value: "report@propertypointers.com" },
            { label: "Website", value: "www.propertypointers.com" },
          ]}
        />
        <p>
          These Terms of Service, together with the Privacy Policy, Cookie Policy, and any
          separate written agreements or platform-specific policies published on the
          Platform, constitute the entire agreement between you and Property Pointers with
          respect to your use of the Platform, and supersede all prior or contemporaneous
          communications, representations, and agreements.
        </p>
        <p>
          If any provision of these Terms is found to be invalid or unenforceable by a
          court of competent jurisdiction, the remaining provisions shall continue in full
          force and effect. The failure of Property Pointers to enforce any right or
          provision under these Terms shall not constitute a waiver of such right or
          provision.
        </p>
      </Section>

      <Callout variant="success" title="Thank You">
        Thank you for choosing Property Pointers. We are committed to making your property
        search, listing, and transaction experience safe, transparent, and rewarding. For
        queries about these Terms, do not hesitate to reach us at
        legal@propertypointers.com.
      </Callout>

      <p className="text-center text-xs text-gray-500 pt-4">
        Property Pointers — Terms of Service &nbsp;|&nbsp; www.propertypointers.com
        &nbsp;|&nbsp; Effective April 2, 2026 &nbsp;|&nbsp; Governing Law: Republic of
        India
      </p>
    </LegalDocument>
  );
}
