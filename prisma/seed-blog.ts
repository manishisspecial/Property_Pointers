import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding blog posts...");

  const admin = await prisma.user.findFirst({ where: { role: "admin" } });
  if (!admin) {
    console.error("No admin user found. Run the main seed first.");
    return;
  }

  await prisma.blogPost.deleteMany();

  const posts = [
    {
      title: "Complete Guide to Buying Your First Home in India (2026)",
      slug: "complete-guide-buying-first-home-india-2026",
      excerpt: "Everything you need to know about purchasing your first property in India - from budgeting to registration. A comprehensive step-by-step guide for first-time home buyers.",
      content: `Buying your first home is one of the most significant financial decisions you'll ever make. This comprehensive guide walks you through every step of the process in India.

1. ASSESS YOUR FINANCIAL READINESS

Before you start house hunting, evaluate your finances:
- Calculate your total savings and investments
- Check your credit score (750+ is ideal for home loans)
- Determine how much EMI you can comfortably pay (shouldn't exceed 40% of income)
- Factor in additional costs: registration (5-7%), GST (5% for under-construction), maintenance deposit, interior work

2. UNDERSTAND HOME LOAN OPTIONS

Major banks offer home loans at 8.5% - 9.5% p.a. in 2026:
- SBI: Starting from 8.50% p.a.
- HDFC: Starting from 8.70% p.a.
- ICICI: Starting from 8.75% p.a.
- Bank of Baroda: Starting from 8.60% p.a.

Most banks finance up to 80% of property value. You'll need at least 20% as down payment.

3. CHOOSE THE RIGHT LOCATION

Key factors to consider:
- Proximity to workplace and schools
- Public transport connectivity (metro, bus)
- Social infrastructure (hospitals, markets, parks)
- Future development plans
- Resale value potential

4. CHECK LEGAL DOCUMENTS

Essential documents to verify:
- Title deed and ownership proof
- RERA registration number
- Approved building plan
- Encumbrance certificate
- Occupancy certificate (for ready properties)
- No-objection certificates (NOCs)

5. NEGOTIATE AND CLOSE THE DEAL

- Compare prices of similar properties in the area
- Don't hesitate to negotiate (5-10% discount is common)
- Get everything in writing
- Use a registered agreement for sale
- Pay through banking channels only

6. REGISTRATION AND POSSESSION

- Pay stamp duty and registration charges
- Register the property at the sub-registrar office
- Get the original sale deed
- Transfer utility connections
- Update your address everywhere

PROPERTY POINTERS TIP: Use our platform to compare verified listings, calculate EMI, and connect directly with property owners - saving you lakhs in brokerage!`,
      coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
      category: "buying-guide",
      tags: JSON.stringify(["first home", "home buying", "property guide", "India real estate", "home loan"]),
      published: true,
      views: 1245,
      authorId: admin.id,
    },
    {
      title: "Noida Real Estate Market Trends 2026: Where to Invest",
      slug: "noida-real-estate-market-trends-2026",
      excerpt: "Detailed analysis of Noida's real estate market in 2026. Discover the best sectors for investment, price trends, upcoming infrastructure projects, and expert predictions.",
      content: `Noida continues to be one of the most dynamic real estate markets in the Delhi NCR region. Here's our detailed analysis for 2026.

MARKET OVERVIEW

The Noida real estate market has shown remarkable resilience and growth:
- Average property prices have appreciated 12-18% in the last year
- New supply has increased by 25% compared to 2025
- Rental yields have improved to 3.5-4.5% annually
- RERA compliance has reached 95% for new projects

TOP SECTORS FOR INVESTMENT

Sector 150 (Noida Expressway)
- Average price: ₹6,500-8,500/sqft
- Why invest: Direct expressway connectivity, upcoming metro extension, premium projects
- Best for: Long-term investment, end-users seeking modern amenities

Sector 75-79
- Average price: ₹5,500-7,000/sqft
- Why invest: Established area, metro connectivity, good schools and hospitals
- Best for: Families, working professionals

Greater Noida West (Noida Extension)
- Average price: ₹3,500-5,000/sqft
- Why invest: Most affordable, rapidly developing infrastructure, young professionals
- Best for: Budget buyers, first-time homebuyers

Sector 128-137 (Noida Expressway)
- Average price: ₹8,000-12,000/sqft
- Why invest: Premium location, golf courses, luxury villas
- Best for: High-net-worth individuals, luxury seekers

UPCOMING INFRASTRUCTURE

Key developments boosting property values:
1. Noida International Airport (Jewar) - Expected to begin operations
2. Regional Rapid Transit System (RRTS) - Delhi to Meerut via Noida
3. Metro Phase 4 extensions
4. Film City development
5. New data center parks

INVESTMENT RECOMMENDATIONS

For short-term (2-3 years): Sector 150, Greater Noida West
For mid-term (3-5 years): Sectors near Jewar Airport
For long-term (5+ years): Areas along upcoming metro corridors

PROPERTY POINTERS PREDICTION: Noida real estate is expected to appreciate 15-20% over the next 2 years, driven by infrastructure development and increasing demand from IT professionals.`,
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop",
      category: "market-trends",
      tags: JSON.stringify(["Noida", "market trends", "investment", "real estate 2026", "Delhi NCR"]),
      published: true,
      views: 892,
      authorId: admin.id,
    },
    {
      title: "Understanding RERA: How It Protects Home Buyers in India",
      slug: "understanding-rera-protects-home-buyers-india",
      excerpt: "Learn how the Real Estate Regulatory Authority (RERA) Act protects home buyers. Know your rights, how to verify projects, and file complaints against builders.",
      content: `The Real Estate (Regulation and Development) Act, 2016 (RERA) was a game-changer for Indian real estate. Here's everything you need to know.

WHAT IS RERA?

RERA is a central law that:
- Regulates the real estate sector in India
- Protects interests of home buyers
- Ensures transparency in property transactions
- Mandates registration of all real estate projects

KEY PROTECTIONS FOR BUYERS

1. Mandatory Project Registration
All commercial and residential projects above 500 sqm or having more than 8 apartments must be registered with RERA before advertising or selling.

2. Standardized Carpet Area
Builders must sell properties based on carpet area (usable area), not super built-up area. This prevents misleading advertisements.

3. Escrow Account
70% of project funds collected from buyers must be deposited in a separate escrow account. This ensures money is used for construction.

4. Timely Delivery
Builders must deliver projects within the timeline promised. If delayed, they must pay interest to buyers at the SBI prime lending rate + 2%.

5. Quality Guarantee
Builders are responsible for structural defects for 5 years after possession. They must fix any issues at no cost to the buyer.

HOW TO VERIFY A RERA PROJECT

1. Visit your state's RERA website
2. Search by project name or RERA registration number
3. Check project details, timeline, and builder's track record
4. Verify the approved plan and number of units
5. Check for any complaints filed

State RERA Websites:
- UP RERA: www.up-rera.in
- MahaRERA: maharera.mahaonline.gov.in
- HRERA (Haryana): haryanarera.gov.in
- Karnataka RERA: rera.karnataka.gov.in

FILING A COMPLAINT

If a builder violates RERA provisions:
1. Register on state RERA portal
2. File a complaint with supporting documents
3. Pay the nominal filing fee
4. Attend hearings (can be done online)
5. RERA authority will pass an order

Always buy RERA-registered properties. On Property Pointers, all listed projects display their RERA registration number for your peace of mind.`,
      coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop",
      category: "legal",
      tags: JSON.stringify(["RERA", "legal", "home buyer rights", "real estate law", "property registration"]),
      published: true,
      views: 567,
      authorId: admin.id,
    },
    {
      title: "Home Loan EMI Guide: How to Get the Best Interest Rate in 2026",
      slug: "home-loan-emi-guide-best-interest-rate-2026",
      excerpt: "Compare home loan interest rates from top banks, learn how to reduce your EMI, and discover tips to get your loan approved faster in 2026.",
      content: `Getting the right home loan can save you lakhs over the loan tenure. Here's your complete guide to home loans in 2026.

CURRENT HOME LOAN INTEREST RATES (2026)

Bank-wise comparison:
- State Bank of India (SBI): 8.50% - 9.65%
- HDFC Ltd: 8.70% - 9.50%
- ICICI Bank: 8.75% - 9.60%
- Bank of Baroda: 8.60% - 9.70%
- Axis Bank: 8.75% - 9.55%
- PNB Housing: 8.80% - 9.75%

Note: Rates depend on loan amount, credit score, and employment type.

HOW TO GET THE LOWEST RATE

1. Maintain a High Credit Score (750+)
- Pay all EMIs and credit card bills on time
- Keep credit utilization below 30%
- Don't apply for multiple loans simultaneously

2. Choose the Right Loan Type
- Fixed Rate: EMI remains constant (good if rates are low)
- Floating Rate: EMI changes with market (usually 0.5-1% lower than fixed)
- Most experts recommend floating rate in the current scenario

3. Negotiate with Banks
- Get quotes from at least 3-4 banks
- Use a competitor's offer as leverage
- Ask about special offers for women borrowers (0.05% discount)
- Corporate salary accounts often get preferential rates

DOCUMENTS REQUIRED

For Salaried Individuals:
- Identity proof (Aadhaar, PAN)
- Address proof
- Last 6 months salary slips
- Last 2 years Form 16/ITR
- Last 6 months bank statements
- Property documents

For Self-Employed:
- All above plus:
- Last 3 years ITR with computation
- Business proof
- CA-certified profit and loss statement
- Business bank statements

EMI CALCULATION FORMULA

EMI = P × r × (1+r)^n / ((1+r)^n - 1)

Where:
P = Principal loan amount
r = Monthly interest rate (annual rate / 12 / 100)
n = Loan tenure in months

Example: ₹50 Lac loan at 8.5% for 20 years = ₹43,391/month

Use our EMI Calculator at Property Pointers for instant calculations!

TIPS TO REDUCE YOUR EMI

1. Make a larger down payment (25-30% instead of 20%)
2. Opt for a longer tenure to reduce EMI (but increases total interest)
3. Make prepayments whenever possible
4. Consider balance transfer if you find a lower rate
5. Claim tax benefits under Section 24(b) and 80C`,
      coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
      category: "home-loans",
      tags: JSON.stringify(["home loan", "EMI", "interest rate", "bank loan", "finance"]),
      published: true,
      views: 723,
      authorId: admin.id,
    },
    {
      title: "10 Vastu Tips for Your New Home: Direction, Placement & Colors",
      slug: "vastu-tips-new-home-direction-placement-colors",
      excerpt: "Essential Vastu Shastra tips for buying or designing your new home. Learn about ideal directions, room placement, colors, and common Vastu mistakes to avoid.",
      content: `Vastu Shastra, the ancient Indian science of architecture, plays an important role in Indian home buying. Here are 10 essential Vastu tips.

1. MAIN ENTRANCE
The main door should ideally face North, East, or North-East. Avoid South-West facing entrances. The door should open clockwise and be the largest door in the house.

2. LIVING ROOM
Place the living room in the North or East direction. The furniture should be arranged in a square or rectangular pattern. The head of the family should sit facing North or East.

3. MASTER BEDROOM
The master bedroom should be in the South-West corner. The bed should be placed so that the head points South or West while sleeping. Avoid mirrors facing the bed.

4. KITCHEN
The ideal kitchen location is the South-East corner (Agni corner). The cook should face East while cooking. Keep the stove away from the water source.

5. BATHROOM
Bathrooms should be in the North-West or West direction. The toilet seat should face North-South. Avoid bathrooms in the North-East corner.

6. POOJA ROOM
The prayer room should be in the North-East corner. Face East or North while praying. Keep the room clean and clutter-free.

7. CHILDREN'S ROOM
Place the children's room in the West or North-West direction. The study table should face East or North for better concentration.

8. COLORS BY DIRECTION
- North: Green, Blue
- South: Red, Orange
- East: White, Light Blue
- West: Blue, Grey
- North-East: Yellow, Light colors
- South-West: Brown, Peach

9. STAIRCASE
Staircases should be in the South, West, or South-West direction. They should always turn clockwise while going up. Avoid spiral staircases.

10. COMMON MISTAKES TO AVOID
- No toilet above or below the pooja room
- Avoid cactus or thorny plants inside the home
- Don't keep broken mirrors or clocks
- Avoid irregular-shaped plots
- Don't block the North-East corner

Remember: While Vastu is important, it shouldn't compromise on practical aspects like ventilation, natural light, and structural safety.`,
      coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=600&fit=crop",
      category: "interior",
      tags: JSON.stringify(["vastu", "interior design", "home tips", "directions", "Indian home"]),
      published: true,
      views: 456,
      authorId: admin.id,
    },
    {
      title: "NRI Guide: How to Buy Property in India from Abroad",
      slug: "nri-guide-buy-property-india-abroad",
      excerpt: "Complete guide for Non-Resident Indians (NRIs) looking to invest in Indian real estate. Covers legal requirements, taxation, power of attorney, and best practices.",
      content: `India's real estate market offers excellent opportunities for NRIs. Here's your comprehensive guide to buying property from abroad.

CAN NRIs BUY PROPERTY IN INDIA?

Yes! Under FEMA regulations:
- NRIs can buy residential and commercial properties
- No limit on the number of properties
- Agricultural land, plantation, and farmhouses are NOT allowed
- Payment must be from NRE/NRO/FCNR accounts or through banking channels

LEGAL REQUIREMENTS

1. PAN Card (mandatory for property transactions)
2. Valid passport with NRI status
3. OCI/PIO card (if applicable)
4. Power of Attorney (if you can't be present)
5. NRE/NRO bank account in India

POWER OF ATTORNEY (POA)

If you can't travel to India for registration:
- Execute a Special Power of Attorney
- Get it attested by the Indian Embassy/Consulate
- It must be registered in India within 3 months
- Include specific details of the property and transactions allowed

TAXATION FOR NRIs

Property Purchase:
- TDS: 1% if seller is resident, 20% if NRI selling to NRI
- Stamp duty: Same as resident Indians (varies by state)
- GST: 5% for under-construction (1% for affordable housing)

Rental Income:
- Taxed as per income tax slab rates in India
- TDS of 30% by tenant
- Can claim deductions on home loan interest and property tax

Capital Gains (on sale):
- Short-term (held < 2 years): As per slab rate
- Long-term (held > 2 years): 20% with indexation benefit
- Can be exempt under Section 54/54EC by reinvesting

BEST CITIES FOR NRI INVESTMENT (2026)

1. Bangalore - IT hub, consistent appreciation
2. Mumbai - Premium market, high rental yields
3. Noida/Greater Noida - Affordable, excellent infrastructure
4. Hyderabad - Growing IT sector, reasonable prices
5. Pune - IT corridor, good lifestyle

TIPS FOR NRI BUYERS

1. Always verify property title through a local lawyer
2. Use only RERA-registered projects
3. Visit the property or send a trusted representative
4. Keep all payment receipts and bank transfer proofs
5. File Indian tax returns if you earn rental income
6. Use Property Pointers to find verified listings and connect with trusted agents

Our platform helps NRIs with:
- Verified property listings across major cities
- Direct owner contact to avoid unnecessary brokerage
- Virtual property tours
- EMI calculator for home loan planning`,
      coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&h=600&fit=crop",
      category: "nri",
      tags: JSON.stringify(["NRI", "property investment", "India real estate", "FEMA", "overseas buyer"]),
      published: true,
      views: 334,
      authorId: admin.id,
    },
    {
      title: "How to Sell Your Property Fast: 8 Proven Tips for Indian Sellers",
      slug: "sell-property-fast-tips-indian-sellers",
      excerpt: "Want to sell your property quickly and at the best price? Follow these 8 proven strategies that successful property sellers in India use.",
      content: `Selling property in India can be challenging, but these proven strategies will help you close the deal faster and at a better price.

1. PRICE IT RIGHT FROM DAY ONE
Research comparable properties in your area. Overpricing is the #1 reason properties sit unsold for months. Use Property Pointers to check market rates.

2. GET PROFESSIONAL PHOTOS
High-quality photos can increase inquiries by 300%. Use natural light, declutter rooms, and capture all angles. Consider 360° virtual tours.

3. LIST ON MULTIPLE PLATFORMS
Don't rely on just one channel. List on Property Pointers, social media, and through local agents. Our platform reaches millions of active buyers.

4. PREPARE ALL DOCUMENTS IN ADVANCE
Buyers get discouraged by documentation delays. Keep ready:
- Original sale deed
- Encumbrance certificate
- Property tax receipts
- Society NOC
- Approved building plan

5. MAKE MINOR REPAIRS
Fix leaky faucets, repaint walls in neutral colors, fix broken tiles. Small investments of ₹10,000-50,000 can increase sale value by lakhs.

6. BE FLEXIBLE WITH SHOWINGS
Make the property accessible for viewings. Weekend slots are most popular. Keep the property clean and well-ventilated.

7. HIGHLIGHT UNIQUE SELLING POINTS
Every property has something special. Maybe it's the view, the location, natural light, or proximity to a metro station. Emphasize these in your listing.

8. OFFER COMPETITIVE TERMS
Consider offering:
- Flexible possession timeline
- Inclusion of fixtures/fittings
- Help with documentation
- Slight negotiation margin in your asking price

BONUS: Post your property FREE on Property Pointers to reach verified buyers instantly!`,
      coverImage: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&h=600&fit=crop",
      category: "selling-tips",
      tags: JSON.stringify(["selling property", "real estate tips", "property selling guide", "home selling"]),
      published: true,
      views: 289,
      authorId: admin.id,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.create({ data: post });
  }

  console.log(`Seeded ${posts.length} blog posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
