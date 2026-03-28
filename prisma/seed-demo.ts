import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo developer + project...\n");

  const devSlug = "property-pointers-developers";
  const projectSlug = "skyline-towers-sector-128-noida";

  // Clean up previous demo data if re-running
  await prisma.project.deleteMany({ where: { slug: projectSlug } });
  await prisma.developer.deleteMany({ where: { slug: devSlug } });

  // ── 1. Developer Profile (all fields filled) ──
  const developer = await prisma.developer.create({
    data: {
      name: "Property Pointers Developers",
      slug: devSlug,
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
      about:
        "Property Pointers Developers is a leading real estate group with 18+ years of experience delivering premium residential and commercial projects across Delhi NCR. Known for innovative design, timely delivery, and transparent dealings, we have served 10,000+ happy families. Our projects feature world-class amenities, sustainable construction practices, and prime locations near key infrastructure.",
      establishedYear: 2007,
      strengths: JSON.stringify([
        "Timely Delivery",
        "RERA Compliant",
        "Premium Construction Quality",
        "Transparent Documentation",
        "Customer-First Approach",
        "Sustainable Building Practices",
        "Award-Winning Designs",
      ]),
      partnerOpportunity:
        "We actively welcome channel partners, brokers, and institutional investors. Our partner program offers competitive brokerage, marketing support, site visit coordination, and dedicated relationship managers. Join 500+ active partners earning with Property Pointers Developers across Delhi NCR.",
      operatingCities: JSON.stringify(["Noida", "Greater Noida", "Gurgaon", "Delhi"]),
      website: "https://www.propertypointers.com",
      contactEmail: "sales@propertypointersdev.com",
      contactPhone: "+91-9990074072",
      featured: true,
      verified: true,
    },
  });
  console.log(`✓ Developer created: ${developer.name} (/developers/${developer.slug})`);

  // ── 2. Project with ALL fields populated ──
  const project = await prisma.project.create({
    data: {
      title: "Skyline Towers Sector 128 Noida",
      slug: projectSlug,
      description:
        "Skyline Towers is a landmark residential project by Property Pointers Developers in Sector 128, Noida Expressway. Spread across 12 acres with 4 high-rise towers, the project offers 2/3/4 BHK luxury apartments with panoramic Yamuna Expressway views. Designed by internationally acclaimed architects, every unit features double-height lobbies, smart home automation, VRV air conditioning, and imported marble flooring. The project is RERA registered and offers possession-ready units with OC received.",
      highlights: JSON.stringify([
        "12 Acres Township with 75% Open Area",
        "4 High-Rise Towers — 32 Floors Each",
        "Panoramic Yamuna Expressway Views",
        "Smart Home Automation in Every Unit",
        "VRV Air Conditioning Pre-installed",
        "Imported Italian Marble Flooring",
        "Double-Height Grand Entrance Lobby",
        "IGBC Gold Certified Green Building",
        "24/7 Concierge & Valet Parking",
        "500m from Noida Expressway",
      ]),
      builderName: "Property Pointers Developers",
      builderLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
      location: "Sector 128, Noida Expressway",
      city: "Noida",
      state: "Uttar Pradesh",
      reraNumber: "UPRERAPRJ442218",
      projectStatus: "ready-to-move",
      possessionDate: "December 2025",
      startingPrice: 1.85,
      priceUnit: "Cr",
      propertyType: "residential",
      configurations: JSON.stringify([
        "2 BHK — 1,250 sq.ft.",
        "3 BHK — 1,850 sq.ft.",
        "3 BHK + Study — 2,100 sq.ft.",
        "4 BHK — 2,800 sq.ft.",
        "4 BHK Duplex — 3,500 sq.ft.",
      ]),
      totalArea: "12 Acres",
      totalUnits: 1200,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      ]),
      amenities: JSON.stringify([
        "Swimming Pool",
        "Gymnasium",
        "Club House",
        "Children Play Area",
        "Jogging Track",
        "Landscaped Garden",
        "Indoor Games Room",
        "Yoga & Meditation Hall",
        "Mini Theatre",
        "Library & Reading Lounge",
        "Banquet Hall",
        "Squash Court",
        "Tennis Court",
        "Basketball Court",
        "Senior Citizen Park",
        "EV Charging Stations",
        "Rainwater Harvesting",
        "Solar Panels",
        "24/7 Security with CCTV",
        "Power Backup",
        "Intercom Facility",
        "Fire Fighting System",
        "Piped Gas Supply",
        "Visitor Parking",
      ]),
      floorPlans: JSON.stringify([
        {
          name: "2 BHK — 1,250 sq.ft.",
          size: "1,250 sq.ft. | East Facing",
          image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
        },
        {
          name: "3 BHK — 1,850 sq.ft.",
          size: "1,850 sq.ft. | North-East Facing",
          image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
        },
        {
          name: "4 BHK — 2,800 sq.ft.",
          size: "2,800 sq.ft. | Park Facing",
          image: "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=600&h=400&fit=crop",
        },
        {
          name: "4 BHK Duplex — 3,500 sq.ft.",
          size: "3,500 sq.ft. | Penthouse Level",
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
        },
      ]),
      locationAdvantages: JSON.stringify([
        { place: "Noida Expressway", distance: "500m" },
        { place: "Sector 137 Metro Station", distance: "1.2 km" },
        { place: "DPS School", distance: "800m" },
        { place: "Fortis Hospital", distance: "2 km" },
        { place: "Grand Venice Mall", distance: "3 km" },
        { place: "Botanical Garden Metro", distance: "4 km" },
        { place: "Amity University", distance: "1.5 km" },
        { place: "Jewar International Airport", distance: "35 km" },
        { place: "Film City", distance: "8 km" },
        { place: "Yamuna Expressway", distance: "2 km" },
      ]),
      paymentPlans: JSON.stringify([
        {
          title: "Down Payment Plan",
          detail: "10% on booking, 80% within 90 days, 10% on possession. Get 5% early bird discount.",
        },
        {
          title: "Construction Linked Plan",
          detail: "10% on booking, 15% on foundation, 20% on each slab milestone, 10% on possession.",
        },
        {
          title: "Flexi Payment Plan",
          detail: "10% on booking, balance in 24 equal monthly installments. Zero pre-EMI for 12 months.",
        },
        {
          title: "Subvention Scheme",
          detail: "Pay 20% now, builder pays your EMI until possession. No financial burden during construction.",
        },
      ]),
      brochureUrl: "https://www.propertypointers.com/brochure/skyline-towers.pdf",
      featured: true,
      verified: true,
      views: 1542,
    },
  });
  console.log(`✓ Project created: ${project.title} (/projects/${project.slug})`);

  // ── 3. Seed some community data (reviews, feedback, forum) for both ──
  const adminUser = await prisma.user.findFirst({ where: { role: "admin" } });
  const userId = adminUser?.id;

  if (userId) {
    // Project reviews
    const projectReviews = [
      { author: "Rohit Sharma", rating: 5, text: "Excellent construction quality. Moved in 3 months ago and everything is top-notch. The amenities are world-class and maintenance team is very responsive.", tag: "Verified Buyer" },
      { author: "Aditi Mehra", rating: 4.5, text: "Great location on Noida Expressway. The 3 BHK layout is very spacious. Only minor issue was a slight delay in possession, but the quality makes up for it.", tag: "Investor" },
      { author: "Vikram Patel", rating: 4, text: "Good value for money in this segment. The smart home features work really well. Swimming pool and gym are well maintained.", tag: "Verified Buyer" },
    ];

    const localityReviews = [
      { author: "Neha Arora", rating: 4.5, text: "Sector 128 has transformed completely. Metro connectivity is excellent, schools and hospitals are nearby. Traffic can be heavy during peak hours on the expressway.", tag: "Local Resident" },
      { author: "Kunal Bhatia", rating: 4, text: "Great social infrastructure. Multiple malls, restaurants, and entertainment options within 5 km. The Jewar Airport development will boost property values significantly.", tag: "Commuter" },
    ];

    const forumThreads = [
      { title: "How is the builder's possession track record?", replies: 24, lastActive: "2 days ago" },
      { title: "Any feedback on maintenance charges and amenities quality?", replies: 18, lastActive: "5 days ago" },
      { title: "What is the current resale value for 3 BHK units?", replies: 12, lastActive: "1 week ago" },
    ];

    for (const r of projectReviews) {
      await prisma.activityLog.create({
        data: {
          userId,
          action: "project_review",
          page: `/projects/${projectSlug}`,
          details: JSON.stringify({ id: crypto.randomUUID(), ...r, status: "approved" }),
        },
      });
    }

    for (const r of localityReviews) {
      await prisma.activityLog.create({
        data: {
          userId,
          action: "locality_review",
          page: `/projects/${projectSlug}`,
          details: JSON.stringify({ id: crypto.randomUUID(), ...r, status: "approved" }),
        },
      });
    }

    for (const t of forumThreads) {
      await prisma.activityLog.create({
        data: {
          userId,
          action: "forum_thread",
          page: `/projects/${projectSlug}`,
          details: JSON.stringify({ id: crypto.randomUUID(), ...t, status: "approved" }),
        },
      });
    }

    console.log(`✓ Project community: ${projectReviews.length} reviews, ${localityReviews.length} locality reviews, ${forumThreads.length} forum threads`);

    // Developer reviews & feedback
    const devReviews = [
      { author: "Rajesh Kumar", rating: 5, text: "Bought my first home from Property Pointers Developers. The entire process was transparent — from booking to possession. Highly recommend them." },
      { author: "Sunita Agarwal", rating: 4.5, text: "Good builder with a solid track record. Construction quality is premium and they use branded fittings. Customer service could be slightly faster." },
      { author: "Amit Joshi", rating: 4, text: "Invested in two of their projects. Both delivered on time with good appreciation. Reliable developer for long-term investment." },
    ];

    const devFeedback = [
      { type: "Buyer", text: "Possession was on time. The handover process was smooth with proper documentation. Very satisfied with the overall experience." },
      { type: "Investor", text: "15% appreciation in 2 years on my 3 BHK unit. Rental yield is also good at 3.5%. Solid investment choice in Noida." },
      { type: "Buyer", text: "The after-sales service is commendable. Any maintenance issues are resolved within 48 hours. The community management is professional." },
    ];

    for (const r of devReviews) {
      await prisma.activityLog.create({
        data: {
          userId,
          action: "developer_review",
          page: `/developers/${devSlug}`,
          details: JSON.stringify({ id: crypto.randomUUID(), ...r, status: "approved" }),
        },
      });
    }

    for (const f of devFeedback) {
      await prisma.activityLog.create({
        data: {
          userId,
          action: "developer_feedback",
          page: `/developers/${devSlug}`,
          details: JSON.stringify({ id: crypto.randomUUID(), ...f, status: "approved" }),
        },
      });
    }

    // Simulate some contact requests
    for (let i = 0; i < 8; i++) {
      await prisma.activityLog.create({
        data: {
          userId,
          action: "developer_contact_request",
          page: `/developers/${devSlug}`,
          details: JSON.stringify({ developer: developer.name, name: `User ${i + 1}`, phone: "+91-98765432" + i }),
        },
      });
    }

    // Simulate some project leads
    for (let i = 0; i < 12; i++) {
      const actions = ["project_get_price_details", "project_book_site_visit", "project_download_brochure"];
      await prisma.activityLog.create({
        data: {
          userId,
          action: actions[i % 3],
          page: `/projects/${projectSlug}`,
          details: JSON.stringify({ project: project.title, name: `Lead ${i + 1}`, phone: "+91-98765432" + i }),
        },
      });
    }

    console.log(`✓ Developer community: ${devReviews.length} reviews, ${devFeedback.length} feedback, 8 contact requests`);
    console.log(`✓ Project leads: 12 enquiries (price details + site visits + brochures)`);
  }

  console.log("\n═══════════════════════════════════════════");
  console.log("  Demo data seeded successfully!");
  console.log("═══════════════════════════════════════════");
  console.log(`\n  Project page:   /projects/${projectSlug}`);
  console.log(`  Developer page: /developers/${devSlug}`);
  console.log(`  Admin panel:    /admin/developers`);
  console.log(`  Community:      /admin/community\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
