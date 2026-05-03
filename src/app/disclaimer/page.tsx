import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import {
  LegalDocument,
  Section,
  SubSection,
  BulletList,
  Callout,
  DataTable,
} from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Disclaimer Policy | Property Pointers",
  description:
    "Property Pointers Disclaimer Policy — platform limitations, liability exclusions, and important notices for users of www.propertypointers.com.",
};

export default function DisclaimerPage() {
  return (
    <LegalDocument
      icon={ShieldAlert}
      title="Disclaimer Policy"
      subtitle="Platform Limitations, Liability Exclusions & Important Notices"
      meta={[
        { label: "Effective Date", value: "April 2, 2026" },
        { label: "Last Reviewed", value: "April 2, 2026" },
        { label: "Document Type", value: "Standalone Disclaimer Policy" },
        { label: "Applicable To", value: "All Users of www.propertypointers.com" },
        { label: "Governing Law", value: "Republic of India" },
        { label: "Legal Contact", value: "legal@propertypointers.com" },
      ]}
      intro="Please read this Disclaimer Policy carefully. It defines the limits of Property Pointers' responsibilities and the assumptions of risk that you accept by using the Platform."
    >
      <Section title="Why This Document Exists">
        <p>
          Property Pointers is an online real estate intermediary platform. We connect
          buyers, sellers, renters, landlords, developers, and brokers — but we are not a
          party to any property transaction. This Disclaimer Policy clearly sets out the
          boundaries of our responsibilities, the limitations of the information and tools
          we provide, and the risks you assume when using the Platform. It is a standalone
          document and must be read together with our Terms of Service, Terms of Use, and
          Privacy Policy.
        </p>
      </Section>

      <Section number="01" title="General Disclaimer">
        <p>
          The content, information, tools, listings, and services available on the
          Property Pointers platform at www.propertypointers.com and its associated mobile
          applications (collectively, the &quot;Platform&quot;) are provided on an
          &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, strictly for general
          informational and facilitative purposes only. Property Pointers makes no
          representation or warranty of any kind — express, implied, statutory, or
          otherwise — regarding the accuracy, completeness, reliability, suitability,
          legality, or availability of any content or service on the Platform.
        </p>
        <p>
          Nothing contained on the Platform constitutes professional legal advice,
          financial advice, investment advice, tax advice, real estate valuation, or any
          other form of regulated professional advice. All content on the Platform is
          provided for general informational purposes only, and any reliance you place
          upon it is strictly at your own risk.
        </p>
        <Callout variant="notice" title="Core Principle">
          Property Pointers is a marketplace, not an advisor. We facilitate connections
          between real estate market participants. We do not verify every listing, endorse
          every property, or guarantee the outcome of any transaction facilitated through
          the Platform. The responsibility for independent due diligence rests solely with
          the User.
        </Callout>
      </Section>

      <Section number="02" title="Disclaimer of Accuracy — Listings & Content">
        <SubSection number="2.1" title="User-Submitted Listing Content">
          <p>
            A significant portion of the content on the Platform — including property
            listings, descriptions, photographs, pricing, area measurements, amenity
            details, and project information — is submitted by individual users (property
            owners, brokers, agents, and developers). Property Pointers does not
            independently verify, authenticate, or validate all such user-submitted
            content before it is published on the Platform.
          </p>
          <p>
            Property Pointers expressly disclaims any and all liability for any
            inaccuracy, misrepresentation, omission, or error in user-submitted listing
            content. Users are strongly advised to independently verify all material
            information about a property before making any purchasing, renting, or
            investment decision.
          </p>
        </SubSection>

        <SubSection number="2.2" title="Verified Listings">
          <p>
            Certain listings may display a &quot;Verified&quot; badge, indicating that
            Property Pointers has undertaken a basic review of that listing. The Verified
            badge represents a limited, point-in-time review only. It does NOT constitute:
          </p>
          <BulletList
            items={[
              "A guarantee of the accuracy or completeness of the listing information.",
              "Confirmation of legal ownership or valid title to the property.",
              "Confirmation of the absence of encumbrances, disputes, litigation, or claims on the property.",
              "Confirmation of compliance with applicable building regulations, municipal approvals, or environmental clearances.",
              "A formal property valuation or assessment of fair market value.",
              "An endorsement of the property, the seller, or the asking price.",
            ]}
          />
          <p>
            Users must not rely solely on the Verified badge when making property-related
            decisions. Independent legal and physical due diligence is essential prior to
            any transaction.
          </p>
        </SubSection>

        <SubSection number="2.3" title="Photographs & Virtual Tours">
          <p>
            Photographs, floor plans, 3D renders, and virtual tour content displayed on
            listings are provided by listing users. Property Pointers does not guarantee
            that such visual content accurately represents the current condition, layout,
            furnishing, finish quality, or dimensions of the property at the time of
            viewing. Properties may have been photographed at different stages of
            construction, under different lighting conditions, or with staging that does
            not reflect the actual state of the property. Virtual tours are indicative
            representations only and do not replace an in-person physical inspection.
          </p>
        </SubSection>

        <SubSection number="2.4" title="Area & Measurement Data">
          <p>
            Property area figures displayed on listings are provided by listing users and
            are typically expressed in square feet or square metres. These figures may
            reflect carpet area, built-up area, or super built-up area, and may not be
            consistent between listings. Property Pointers does not guarantee the accuracy
            of area measurements and is not responsible for discrepancies between listed
            and actual area. Buyers must verify area measurements independently,
            preferably through a licensed surveyor or legal professional.
          </p>
        </SubSection>

        <Callout variant="advisory" title="Buyer Advisory">
          Before committing to any property transaction, always: (a) conduct a physical
          site visit; (b) obtain a professional legal opinion on title; (c) verify area
          through independent measurement; (d) check RERA registration status on the
          relevant State RERA portal; and (e) consult a qualified property lawyer and
          financial advisor.
        </Callout>
      </Section>

      <Section number="03" title="Disclaimer — No Professional Advice">
        <SubSection number="3.1" title="Not Legal Advice">
          <p>
            Nothing on the Platform constitutes legal advice. Any general legal
            information published on the Platform — including articles about RERA
            provisions, tenancy laws, property registration procedures, stamp duty
            requirements, or ownership rights — is provided for general informational
            purposes only. It is not a substitute for professional legal advice tailored
            to your specific circumstances. Property Pointers is not a law firm and none
            of its employees, officers, or agents are acting as your legal advisor.
          </p>
          <p>
            Before entering into any property-related agreement, mortgage, or legal
            instrument, you should seek independent advice from a qualified advocate or
            solicitor registered with the Bar Council of India or the relevant State Bar
            Council.
          </p>
        </SubSection>

        <SubSection number="3.2" title="Not Financial or Investment Advice">
          <p>
            Property Pointers is not a SEBI-registered investment advisor, AMFI-registered
            mutual fund distributor, or RBI-regulated entity. Nothing on the Platform —
            including market price trend reports, rental yield estimates, investment area
            guides, EMI calculator outputs, property appreciation forecasts, or any other
            analytical content — constitutes financial advice, investment recommendation,
            or a solicitation to buy or sell any property or financial instrument.
          </p>
          <p>
            Real estate investment carries significant financial risk. Past price trends
            do not guarantee future performance. You should conduct your own independent
            financial analysis and consult a SEBI-registered investment advisor or a
            certified financial planner before making any investment decision.
          </p>
        </SubSection>

        <SubSection number="3.3" title="Not Tax Advice">
          <p>
            Any content on the Platform relating to taxes — including stamp duty,
            registration charges, capital gains tax, GST on property transactions, TDS on
            property purchases, or income from house property — is provided for general
            awareness only. Tax laws are subject to change and their application varies
            based on individual circumstances. Please consult a qualified Chartered
            Accountant (CA) registered with the Institute of Chartered Accountants of
            India (ICAI) before making tax-related decisions in connection with any
            property transaction.
          </p>
        </SubSection>

        <SubSection number="3.4" title="Not a Valuation Report">
          <p>
            Property Pointers does not provide formal property valuations. Any price
            estimates, price per sq. ft. data, fair value indicators, or affordability
            tools on the Platform are algorithmic estimates based on historical listing
            data and publicly available information. They are not formal valuation reports
            as defined under the Wealth Tax Act, Companies Act, or any other applicable
            legislation, and should not be presented to banks, courts, or government
            authorities as such. Formal valuations must be obtained from a registered
            valuer under the Insolvency and Bankruptcy Code, 2016, or an authorised valuer
            as required by the relevant authority.
          </p>
        </SubSection>

        <SubSection number="3.5" title="Not an Architectural or Technical Assessment">
          <p>
            Property Pointers does not assess the structural integrity, construction
            quality, safety compliance, or technical specifications of any listed
            property. Information about amenities, specifications, materials, or
            construction quality provided in listings is sourced entirely from listing
            users and has not been verified by Property Pointers. Users should commission
            an independent structural survey or technical assessment before purchasing any
            property.
          </p>
        </SubSection>
      </Section>

      <Section number="04" title="Disclaimer — RERA & Regulatory Compliance">
        <p>
          While Property Pointers encourages and endeavours to promote RERA compliance
          among listed developers and agents, the Platform does not guarantee that all
          listed projects and agents are RERA-registered or currently compliant with the
          Real Estate (Regulation and Development) Act, 2016, and the rules thereunder.
        </p>
        <BulletList
          items={[
            "RERA registration details displayed on the Platform are sourced from developers and agents and have not been independently verified by Property Pointers in all cases.",
            "RERA registration status may change after a listing is published. A listing displaying a RERA number does not guarantee that the registration is currently active or valid.",
            "Property Pointers is not responsible for any developer's failure to comply with RERA obligations, including delivery timelines, escrow requirements, or quality standards.",
            "Buyers and investors are advised to independently verify RERA registration and compliance status directly on the relevant State RERA portal before committing to any project.",
          ]}
        />
        <DataTable
          headers={["State RERA Authority", "Official Website (for verification)"]}
          rows={[
            { label: "Uttar Pradesh RERA", value: "https://www.up-rera.in" },
            { label: "Rajasthan RERA", value: "https://rera.rajasthan.gov.in" },
            { label: "MahaRERA (Maharashtra)", value: "https://maharera.mahaonline.gov.in" },
            { label: "Haryana RERA", value: "https://haryanarera.gov.in" },
            { label: "Delhi RERA", value: "https://rera.delhi.gov.in" },
            { label: "Gujarat RERA", value: "https://gujrera.gujarat.gov.in" },
            { label: "Karnataka RERA", value: "https://rera.karnataka.gov.in" },
          ]}
        />
      </Section>

      <Section number="05" title="Disclaimer — Market Data & Price Information">
        <p>
          The Platform publishes various forms of market data, including property price
          trends, rental yield figures, capital appreciation estimates, area-level
          analytics, demand and supply indicators, and investment attractiveness scores.
          The following disclaimers apply to all such market data:
        </p>
        <BulletList
          items={[
            "All market data is compiled from a combination of user-submitted listing data, publicly available government records, and proprietary algorithmic modelling. It has not been audited or certified by any independent authority.",
            "Market data reflects historical trends and is inherently backward-looking. It does not predict future performance, market movements, or investment returns.",
            "Real estate prices are affected by a wide range of macro and micro-economic factors — including interest rates, government policy, infrastructure development, demographic shifts, and global economic conditions — that cannot be fully captured by any model.",
            "Area-level price data represents averages or medians across a range of transactions and may not reflect the specific characteristics, condition, floor level, or negotiated price of any individual property.",
            "Property Pointers is not responsible for any loss or damage arising from reliance on market data published on the Platform for investment, lending, taxation, legal, or any other purposes.",
          ]}
        />
        <Callout variant="notice" title="Important Notice">
          Market data on this Platform is for general awareness only. It is not a
          substitute for a professional property valuation or a formal market analysis
          commissioned from a qualified real estate research firm. Investment decisions
          based solely on this Platform&apos;s market data are made entirely at the
          User&apos;s own risk.
        </Callout>
      </Section>

      <Section number="06" title="Disclaimer — EMI Calculator & Financial Tools">
        <p>
          The EMI Calculator and other financial tools available on the Platform are
          provided as a general convenience to help users estimate home loan eligibility
          and monthly instalments. The following limitations apply:
        </p>
        <BulletList
          items={[
            "EMI calculations are based on the inputs provided by the user (loan amount, interest rate, tenure) and standard mathematical formulae. They do not take into account bank-specific charges, processing fees, prepayment penalties, insurance premiums, GST on charges, or variable rate adjustments.",
            "Interest rates used in the calculator may be illustrative figures and may not reflect the current rates offered by any specific bank or NBFC.",
            "Actual loan eligibility, disbursed amount, and EMI will be determined solely by the lending institution based on your credit profile, income documentation, property valuation, and internal credit assessment criteria.",
            "The calculator output is not a loan sanction letter, in-principle approval, or commitment by any financial institution.",
            "Property Pointers is not a banking institution, NBFC, or housing finance company and is not authorised to grant, approve, or guarantee any loan.",
          ]}
        />
        <Callout variant="advisory" title="Advisory">
          Always obtain a formal loan sanction letter from your chosen lender before
          making any financial commitment on a property. Use multiple lenders&apos;
          official EMI calculators and consult a certified mortgage advisor for accurate
          loan planning.
        </Callout>
      </Section>

      <Section number="07" title="Disclaimer — Third-Party Content & Links">
        <p>
          The Platform may contain links to, or integrate content from, third-party
          websites, platforms, and services. These include government portals, news and
          media websites, home loan providers, legal services, insurance platforms,
          interior design platforms, and mapping services. The following disclaimers
          apply:
        </p>
        <BulletList
          items={[
            "Property Pointers does not control, endorse, or take responsibility for any content, accuracy, privacy practices, or availability of third-party websites or services.",
            "The inclusion of a hyperlink to a third-party website does not constitute an endorsement, partnership, or affiliation between Property Pointers and that third party.",
            "Sponsored content, advertiser material, and partner promotions displayed on the Platform are clearly labelled where required, but Property Pointers does not independently verify claims made in such content.",
            "Your interactions with third-party services — including submission of personal data to home loan partners, legal consultants, or insurance providers — are governed entirely by that third party's terms and privacy policy. Property Pointers bears no liability for the conduct, products, or services of third parties.",
            "Sponsored or promoted listings appear more prominently in search results by virtue of a commercial arrangement. Their prominence does not imply Property Pointers' endorsement of their quality, legality, or value.",
          ]}
        />
      </Section>

      <Section number="08" title="Disclaimer — Virtual Tours & Digital Media">
        <p>
          Virtual tours, 3D property walkthroughs, drone footage, and other digital media
          content displayed on the Platform are provided by listing users or their agents.
          The following limitations apply:
        </p>
        <BulletList
          items={[
            "Virtual tour content is created and supplied by the property lister and is not verified by Property Pointers for accuracy, completeness, or current relevance.",
            "Virtual tours may depict a property at a stage of construction or furnishing that does not reflect its current condition. Properties may have been renovated, altered, or damaged since the tour was recorded.",
            "Dimensions, layouts, and spatial impressions conveyed in virtual tours are approximate and may not accurately reflect actual measurements due to the limitations of photography and 3D rendering technology.",
            "Property Pointers does not warrant that virtual tours are free from errors, omissions, or technical defects.",
            "A virtual tour is a supplementary tool to aid initial property shortlisting only. It does not replace, and must not be treated as a substitute for, a thorough in-person physical inspection of the property conducted before any transaction is concluded.",
          ]}
        />
      </Section>

      <Section number="09" title="Disclaimer — Developer & Builder Information">
        <p>
          The Platform hosts listings and project profiles submitted by real estate
          developers and builders. Property Pointers makes no warranty or representation
          regarding:
        </p>
        <BulletList
          items={[
            "The financial stability, creditworthiness, or regulatory standing of any developer listed on the Platform.",
            "The likelihood of timely project completion or delivery in accordance with representations made in the listing.",
            "The accuracy of possession dates, construction timelines, or specification promises made by developers.",
            "The developer's track record of past project deliveries, litigation history, or dispute resolution conduct.",
            "Whether any pre-launch or soft-launch project has received all necessary government approvals, environmental clearances, or RERA registration at the time of listing.",
          ]}
        />
        <p>
          Buyers considering investment in new or under-construction projects are strongly
          advised to: verify the developer&apos;s RERA registration and compliance
          history; examine the project&apos;s Occupation Certificate (OC) or Commencement
          Certificate (CC) status; review the Builder-Buyer Agreement carefully with a
          qualified lawyer; verify the project&apos;s escrow account arrangement as
          required under RERA; and independently assess the developer&apos;s reputation
          and delivery history through public records and consumer forums.
        </p>
        <Callout variant="warning" title="Pre-Launch Projects Warning">
          Property Pointers does not endorse investment in any project that has not
          received official RERA registration and statutory approvals from competent
          authorities. Users who choose to invest in unregistered or pre-launch projects
          do so entirely at their own risk and financial liability. Property Pointers
          bears no responsibility whatsoever for losses arising from such investments.
        </Callout>
      </Section>

      <Section number="10" title="Disclaimer — Broker & Agent Information">
        <p>
          The Platform facilitates property listings posted by real estate brokers and
          agents. Property Pointers does not employ, endorse, or guarantee the services,
          conduct, or credentials of any broker or agent listed on or operating through
          the Platform. Specifically:
        </p>
        <BulletList
          items={[
            "Property Pointers does not verify that all brokers and agents hold a valid RERA agent registration in the relevant state, though it endeavours to encourage compliance.",
            "Property Pointers is not responsible for any misrepresentation, fraud, negligence, or breach of duty committed by a broker or agent in the course of a property transaction.",
            "Any commission, brokerage, or fee arrangement entered into between a user and a broker or agent is a private contract between those parties. Property Pointers is not a party to, and has no liability under, such arrangements.",
            "Reviews and ratings displayed for brokers on the Platform represent the subjective opinions of other users and do not constitute an endorsement by Property Pointers.",
          ]}
        />
      </Section>

      <Section number="11" title="Disclaimer — Platform Availability & Technical Issues">
        <p>
          Property Pointers makes no warranty that the Platform will be available at all
          times, without interruption, or free from errors, bugs, or security
          vulnerabilities. Specifically:
        </p>
        <BulletList
          items={[
            "The Platform may be temporarily unavailable due to scheduled maintenance, unplanned outages, third-party infrastructure failures, cyberattacks, or force majeure events.",
            "Property Pointers does not warrant that the Platform is compatible with all devices, browsers, operating systems, or internet connections.",
            "Search results, listing displays, and tool outputs may occasionally be affected by technical glitches, data synchronisation delays, or algorithmic errors. Property Pointers is not liable for decisions made based on erroneous technical outputs.",
            "Property Pointers shall not be liable for any loss of data, loss of access, or disruption to your use of the Platform arising from technical issues, regardless of their cause.",
            "Email and SMS notifications sent by the Platform may be delayed, filtered as spam, or fail to deliver due to factors beyond Property Pointers' control, including user device settings, network conditions, and email service provider filters.",
          ]}
        />
      </Section>

      <Section number="12" title="Disclaimer — User Conduct & Interactions">
        <p>
          Property Pointers is an online intermediary and does not monitor, moderate, or
          control all interactions between users in real time. Property Pointers is not
          responsible for:
        </p>
        <BulletList
          items={[
            "The conduct, character, intentions, or representations of any other user of the Platform, whether in online communications or in person during property visits.",
            "Fraudulent representations made by property owners, sellers, tenants, brokers, agents, or any other party identified through the Platform.",
            "Any physical, financial, emotional, or other harm arising from meetings, communications, or transactions between users facilitated through the Platform.",
            "The failure of any property transaction to conclude successfully, for any reason, including disagreements, financing failure, title defects, or change of mind.",
            "Any property remaining unsold, unrented, or without response, despite being listed on the Platform. Property Pointers provides no guarantee of transaction volume, buyer interest, or response rate for any listing.",
          ]}
        />
        <Callout variant="warning" title="Safety Reminder">
          When meeting a prospective buyer, seller, tenant, or landlord found through the
          Platform, always verify their identity independently before proceeding. Never
          transfer money, sign documents, or hand over keys without proper legal
          verification. If in doubt, involve a qualified lawyer.
        </Callout>
      </Section>

      <Section number="13" title="Disclaimer — Testimonials & Reviews">
        <p>
          The Platform may display user testimonials, property reviews, and ratings
          submitted by registered users. The following disclaimers apply:
        </p>
        <BulletList
          items={[
            "Testimonials and reviews represent the personal opinions and experiences of individual users. They are not verified by Property Pointers for accuracy, objectivity, or currency.",
            "Property Pointers does not guarantee that all reviews displayed on the Platform are authentic or free from bias. Despite automated and manual moderation efforts, some fake or misleading reviews may not be detected.",
            "Any testimonials or case studies highlighted in Property Pointers' marketing materials are based on specific individual experiences and are not representative of the typical outcome for all users.",
            "Property Pointers reserves the right to remove reviews or testimonials that violate its community standards, but is not obligated to display any particular review or to respond to requests for removal from subjects of reviews.",
          ]}
        />
      </Section>

      <Section number="14" title="Disclaimer — Market Insights & Editorial Content">
        <p>
          The Platform publishes editorial content including market reports, city guides,
          neighbourhood profiles, investment outlooks, regulatory updates, and real estate
          news articles. The following applies to all such content:
        </p>
        <BulletList
          items={[
            "Editorial content is produced for general informational purposes and reflects the views and analysis of the authors at the time of publication. It is not updated in real time and may become outdated.",
            "Opinions, forecasts, and projections expressed in editorial content are those of the authors and do not constitute official policy or endorsement by Property Pointers.",
            "Property Pointers does not guarantee the accuracy of any statistics, data points, or citations used in editorial content and recommends cross-referencing with primary sources.",
            "Editorial content about specific localities, developers, projects, or market trends is not a recommendation to buy, sell, rent, or invest in any particular property or location.",
          ]}
        />
      </Section>

      <Section number="15" title="Disclaimer — Force Majeure">
        <p>
          Property Pointers shall not be held liable for any failure or delay in
          performance of its obligations, or any unavailability of the Platform or its
          services, arising from circumstances beyond its reasonable control, including
          but not limited to:
        </p>
        <BulletList
          items={[
            "Natural disasters, earthquakes, floods, cyclones, or other acts of God.",
            "War, armed conflict, terrorism, civil unrest, or government-imposed restrictions.",
            "Pandemic, epidemic, or public health emergency.",
            "Government orders, sanctions, regulatory actions, or changes in applicable law.",
            "Widespread internet outages, DNS failures, or third-party infrastructure failures.",
            "Strikes, labour disputes, or industrial action affecting Property Pointers or its service providers.",
            "Power failures or disruption to telecommunications networks.",
          ]}
        />
        <p>
          In a force majeure event, Property Pointers will endeavour to restore the
          Platform and its services as quickly as reasonably practicable and will
          communicate updates to users through available channels.
        </p>
      </Section>

      <Section number="16" title="Limitation of Liability — Summary">
        <p>
          To the fullest extent permitted by applicable law, Property Pointers, its parent
          company, subsidiaries, affiliates, directors, officers, employees, agents,
          licensors, and service providers exclude all liability for:
        </p>
        <DataTable
          headers={["Category of Loss", "Disclaimer"]}
          rows={[
            {
              label: "Financial Loss",
              value:
                "Any loss of money, investment, profit, revenue, or savings arising from a property transaction facilitated through or discovered on the Platform.",
            },
            {
              label: "Property Fraud",
              value:
                "Any loss arising from fraudulent listings, misrepresentation by sellers, owners, or brokers, or identity fraud perpetrated by any user of the Platform.",
            },
            {
              label: "Transaction Failure",
              value:
                "Any loss or damage caused by a property transaction failing to complete, for any reason whatsoever.",
            },
            {
              label: "Inaccurate Information",
              value:
                "Any loss resulting from reliance on inaccurate listing data, market data, EMI calculations, legal summaries, or any other content on the Platform.",
            },
            {
              label: "Third-Party Conduct",
              value:
                "Any harm caused by the conduct of other users, brokers, developers, vendors, or partners encountered through the Platform.",
            },
            {
              label: "Technical Failures",
              value:
                "Any loss of data, disruption to service, or consequential loss arising from Platform downtime, technical glitches, or security incidents.",
            },
            {
              label: "Regulatory Non-Compliance",
              value:
                "Any loss arising from a developer's, broker's, or seller's non-compliance with RERA, building regulations, or any other applicable law.",
            },
            {
              label: "Advice Reliance",
              value:
                "Any loss arising from reliance on any content published on the Platform as legal, financial, tax, or investment advice.",
            },
          ]}
        />
        <p>
          In any event, Property Pointers&apos; total aggregate liability to any user, in
          connection with any claim arising from the use of the Platform, shall not exceed
          the amount (if any) paid by that user to Property Pointers in the twelve (12)
          months preceding the event giving rise to the claim.
        </p>
        <Callout variant="advisory" title="High-Stakes Transactions">
          Real estate is typically the single largest financial transaction in an
          individual&apos;s lifetime. Property Pointers strongly urges all users — buyers,
          investors, and renters alike — to engage qualified legal, financial, and
          technical professionals before committing to any property transaction,
          regardless of the information available on this Platform.
        </Callout>
      </Section>

      <Section number="17" title="Specific Disclaimers by User Type">
        <SubSection number="17.1" title="For Property Buyers & Investors">
          <BulletList
            items={[
              "Property Pointers does not recommend, endorse, or guarantee any property listed on the Platform as a safe or profitable investment.",
              "Displayed property prices are asking prices only. Actual transaction prices may differ significantly based on negotiation, market conditions, and property-specific factors.",
              "Property Pointers is not responsible for any discrepancy between the described and actual condition of a property upon physical inspection.",
            ]}
          />
        </SubSection>
        <SubSection number="17.2" title="For Renters & Tenants">
          <BulletList
            items={[
              "Property Pointers does not vet landlords for character, financial stability, or reliability. Renters must conduct their own assessment of a prospective landlord.",
              "Security deposit norms vary by city and locality. Property Pointers does not endorse any specific security deposit amount and is not responsible for disputes regarding deposit deductions or refunds.",
              "Property Pointers is not responsible for any dispute arising under a rental agreement, including non-refund of deposits, eviction disputes, or maintenance disagreements.",
            ]}
          />
        </SubSection>
        <SubSection number="17.3" title="For Property Sellers & Landlords">
          <BulletList
            items={[
              "Property Pointers does not guarantee the number or quality of inquiries a listing will receive, or that a listing will result in a successful sale or rental.",
              "Property Pointers is not responsible for the conduct of prospective buyers or tenants who contact sellers or landlords through the Platform.",
              "Any information about a buyer's or tenant's financial capacity, identity, or intentions, as communicated through the Platform, is provided by the buyer or tenant and has not been verified by Property Pointers.",
            ]}
          />
        </SubSection>
        <SubSection number="17.4" title="For Developers & Builders">
          <BulletList
            items={[
              "Property Pointers provides a promotional and lead-generation platform. It does not take responsibility for how leads are managed, followed up, or converted by developers.",
              "Property Pointers is not responsible for any regulatory action taken against a developer, project, or agent as a result of non-compliance with RERA or any other law.",
            ]}
          />
        </SubSection>
        <SubSection number="17.5" title="For Brokers & Agents">
          <BulletList
            items={[
              "Listing on the Property Pointers Platform does not exempt a broker or agent from their professional obligations under RERA, the Transfer of Property Act, or applicable state-level real estate regulations.",
              "Property Pointers does not verify the credentials, licences, or conduct of brokers and agents and is not liable for their professional conduct.",
            ]}
          />
        </SubSection>
      </Section>

      <Section number="18" title="Indemnity">
        <p>
          By using the Platform, you agree to indemnify, defend, and hold harmless
          Property Pointers and its affiliates, officers, directors, employees, agents,
          licensors, and service providers from and against any claims, damages, losses,
          liabilities, costs, and expenses (including reasonable legal fees) arising out
          of or in connection with:
        </p>
        <BulletList
          items={[
            "Your breach of this Disclaimer Policy or any other applicable policies of Property Pointers.",
            "Your use of the Platform in a manner not permitted by these policies.",
            "Any content you submit to the Platform, including inaccurate or fraudulent listings.",
            "Any dispute between you and another user, broker, developer, or third party facilitated through the Platform.",
            "Your violation of any applicable law, regulation, or third-party right.",
          ]}
        />
      </Section>

      <Section number="19" title="Governing Law & Jurisdiction">
        <p>
          This Disclaimer Policy is governed by and shall be construed in accordance with
          the laws of the Republic of India. Any dispute arising from or in connection
          with this Disclaimer Policy shall be subject to the exclusive jurisdiction of
          the competent courts in New Delhi, India, subject to any arbitration provisions
          contained in the Property Pointers Terms of Service.
        </p>
        <DataTable
          headers={["Legal Framework", "Applicable Statute"]}
          rows={[
            { label: "Governing Law", value: "Laws of the Republic of India" },
            { label: "Jurisdiction", value: "Courts of New Delhi, India (exclusive)" },
            { label: "IT Act", value: "Information Technology Act, 2000" },
            { label: "Consumer Protection", value: "Consumer Protection Act, 2019" },
            { label: "RERA", value: "Real Estate (Regulation and Development) Act, 2016" },
            { label: "Contract Law", value: "Indian Contract Act, 1872" },
            { label: "Arbitration", value: "Arbitration and Conciliation Act, 1996 (as amended)" },
          ]}
        />
      </Section>

      <Section number="20" title="Updates to This Disclaimer Policy">
        <p>
          Property Pointers reserves the right to update, modify, or expand this
          Disclaimer Policy at any time, at its sole discretion, to reflect changes in
          applicable law, Platform features, or business practices. The revised policy
          will be published on the Platform with an updated effective date.
        </p>
        <p>
          Your continued use of the Platform after any update to this Disclaimer Policy
          constitutes your acceptance of the revised terms. We recommend reviewing this
          document periodically to stay informed of any changes.
        </p>
      </Section>

      <Section number="21" title="Contact for Disclaimer-Related Queries">
        <p>
          If you have any questions, concerns, or queries about the content of this
          Disclaimer Policy or its application to your use of the Platform, please contact
          us:
        </p>
        <DataTable
          headers={["Purpose", "Contact"]}
          rows={[
            { label: "Legal & Compliance", value: "legal@propertypointers.com" },
            { label: "General Support", value: "support@propertypointers.com" },
            { label: "Grievance Officer", value: "grievance@propertypointers.com" },
            { label: "Fraud / Abuse", value: "fraud@propertypointers.com" },
            { label: "Website", value: "www.propertypointers.com" },
            {
              label: "Postal Address",
              value: "Property Pointers, [Registered Office Address], India",
            },
          ]}
        />
      </Section>

      <Callout variant="info" title="Master Disclaimer — Summary">
        <p>
          Property Pointers is an online intermediary and advertising platform. It is NOT
          a real estate agent, broker, developer, financial advisor, legal advisor,
          valuer, or RERA-registered entity. It does NOT own, manage, or sell any
          property. All content on the Platform is for general informational purposes
          only. Property Pointers makes NO warranty as to accuracy, completeness, or
          fitness for purpose of any listing, data, or tool on the Platform. Reliance on
          any content on this Platform for financial, legal, or investment decisions is
          ENTIRELY AT YOUR OWN RISK. Always conduct independent due diligence and engage
          qualified professionals before committing to any property transaction.
        </p>
      </Callout>

      <p className="text-center text-xs text-gray-500 pt-4">
        Property Pointers — Disclaimer Policy &nbsp;|&nbsp; www.propertypointers.com
        &nbsp;|&nbsp; Effective April 2, 2026 &nbsp;|&nbsp; Governing Law: Republic of
        India
      </p>
    </LegalDocument>
  );
}
