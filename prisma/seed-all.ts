import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("=== Full Database Seed (MongoDB) ===\n");

  console.log("Clearing existing data...");
  await prisma.activityLog.deleteMany();
  await prisma.chatMessage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.property.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.city.deleteMany();
  console.log("  Done.\n");

  // ===================== CITIES =====================
  console.log("Seeding cities...");
  const citiesData = [
    { name: "Delhi", slug: "delhi", state: "Delhi", isPopular: true, latitude: 28.6139, longitude: 77.2090, imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop", displayOrder: 1, isServiceable: true },
    { name: "Noida", slug: "noida", state: "Uttar Pradesh", isPopular: true, latitude: 28.5355, longitude: 77.3910, imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop", displayOrder: 2, isServiceable: true },
    { name: "Greater Noida", slug: "greater-noida", state: "Uttar Pradesh", isPopular: true, latitude: 28.4744, longitude: 77.5040, imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop", displayOrder: 3, isServiceable: true },
    { name: "Gurugram", slug: "gurugram", state: "Haryana", isPopular: true, latitude: 28.4595, longitude: 77.0266, imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop", displayOrder: 4, isServiceable: true },
    { name: "Ghaziabad", slug: "ghaziabad", state: "Uttar Pradesh", isPopular: true, latitude: 28.6692, longitude: 77.4538, imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", displayOrder: 5, isServiceable: true },
    { name: "Jaipur", slug: "jaipur", state: "Rajasthan", isPopular: true, latitude: 26.9124, longitude: 75.7873, imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop", displayOrder: 6, isServiceable: true },
    { name: "Pune", slug: "pune", state: "Maharashtra", isPopular: true, latitude: 18.5204, longitude: 73.8567, imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop", displayOrder: 7, isServiceable: true },
  ];
  for (const city of citiesData) {
    await prisma.city.create({ data: city });
  }
  console.log(`  Created ${citiesData.length} cities.\n`);

  // ===================== USERS =====================
  console.log("Seeding users...");
  const hashedAdmin = await bcrypt.hash("admin123", 12);
  const hashedUser = await bcrypt.hash("user123", 12);

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@propertypointers.com",
      password: hashedAdmin,
      phone: "+91-9876543210",
      role: "admin",
      verified: true,
      city: "Noida",
      state: "Uttar Pradesh",
    },
  });

  const users = await Promise.all([
    prisma.user.create({ data: { name: "Rahul Sharma", email: "user@propertypointers.com", password: hashedUser, phone: "+91-9876543211", role: "user", verified: true, city: "Noida", state: "Uttar Pradesh" } }),
    prisma.user.create({ data: { name: "Priya Patel", email: "priya@propertypointers.com", password: hashedUser, phone: "+91-9876543212", role: "owner", verified: true, city: "Mumbai", state: "Maharashtra" } }),
    prisma.user.create({ data: { name: "Amit Kumar", email: "amit@propertypointers.com", password: hashedUser, phone: "+91-9876543213", role: "agent", verified: true, city: "Delhi", state: "Delhi" } }),
    prisma.user.create({ data: { name: "Sneha Gupta", email: "sneha@propertypointers.com", password: hashedUser, phone: "+91-9876543214", role: "owner", verified: false, city: "Gurugram", state: "Haryana" } }),
    prisma.user.create({ data: { name: "Vikram Singh", email: "vikram@propertypointers.com", password: hashedUser, phone: "+91-9876543215", role: "user", city: "Bangalore", state: "Karnataka" } }),
    prisma.user.create({ data: { name: "Deepak Verma", email: "deepak@propertypointers.com", password: hashedUser, phone: "+91-9876543216", role: "agent", verified: true, city: "Noida", state: "Uttar Pradesh" } }),
    prisma.user.create({ data: { name: "Meera Reddy", email: "meera@propertypointers.com", password: hashedUser, phone: "+91-9876543217", role: "owner", verified: true, city: "Hyderabad", state: "Telangana" } }),
  ]);
  console.log(`  Created ${users.length + 1} users.\n`);

  // ===================== PROPERTIES =====================
  console.log("Seeding properties...");
  const img = {
    apt: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"],
    house: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"],
    villa: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"],
    comm: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"],
    plot: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&h=600&fit=crop"],
    shop: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop"],
    pg: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"],
  };
  const o = (i: number) => users[i % users.length].id;

  const cityData: Record<string, { state: string; localities: string[]; pincodes: string[] }> = {
    Noida: { state: "Uttar Pradesh", localities: ["Sector 150", "Sector 62", "Sector 78", "Sector 44", "Sector 137"], pincodes: ["201310", "201301", "201301", "201303", "201305"] },
    Delhi: { state: "Delhi", localities: ["Greater Kailash", "Dwarka", "Rohini", "Lajpat Nagar", "Vasant Kunj"], pincodes: ["110048", "110075", "110085", "110024", "110070"] },
    Gurugram: { state: "Haryana", localities: ["DLF Phase 5", "Sector 57", "Sector 56", "Sohna Road", "Golf Course Road"], pincodes: ["122002", "122011", "122011", "122018", "122002"] },
    Ghaziabad: { state: "Uttar Pradesh", localities: ["Indirapuram", "Vaishali", "Raj Nagar Extension", "Crossing Republik", "Kaushambi"], pincodes: ["201014", "201010", "201017", "201016", "201010"] },
    "Greater Noida": { state: "Uttar Pradesh", localities: ["Techzone 4", "Pari Chowk", "Sector 1", "Alpha 2", "Omega 1"], pincodes: ["201306", "201310", "201308", "201310", "201306"] },
    Jaipur: { state: "Rajasthan", localities: ["Mansarovar", "Vaishali Nagar", "C-Scheme", "Malviya Nagar", "Jagatpura"], pincodes: ["302020", "302021", "302001", "302017", "302017"] },
    Pune: { state: "Maharashtra", localities: ["Baner", "Kharadi", "Viman Nagar", "Hinjawadi", "Wakad"], pincodes: ["411045", "411014", "411014", "411057", "411057"] },
  };

  const categories = ["apartment", "house", "villa", "commercial", "plot"] as const;
  const types = ["sale", "rent"] as const;
  const facings = ["East", "West", "North", "South", "North-East", "South-West"];
  const furnishings = ["furnished", "semi-furnished", "unfurnished"];
  const ages = ["0-1 years", "1-3 years", "3-5 years", "5-10 years"];

  type CatConfig = {
    images: string[];
    salePriceRange: [number, number];
    rentPriceRange: [number, number];
    areaRange: [number, number];
    bedrooms: number[];
    amenities: string[][];
    titleTemplates: { sale: string[]; rent: string[] };
    descriptions: { sale: string[]; rent: string[] };
  };

  const catConfig: Record<string, CatConfig> = {
    apartment: {
      images: img.apt,
      salePriceRange: [4500000, 25000000],
      rentPriceRange: [12000, 65000],
      areaRange: [800, 2200],
      bedrooms: [1, 2, 3, 4],
      amenities: [
        ["Parking", "Lift", "Security", "Power Backup", "Swimming Pool", "Gym"],
        ["Parking", "Lift", "Security", "Club House", "Jogging Track"],
        ["Parking", "Lift", "Security", "Wi-Fi", "Power Backup", "Gym"],
      ],
      titleTemplates: {
        sale: ["BHK Apartment in LOCALITY", "BHK Flat in LOCALITY", "BHK Premium Apartment in LOCALITY"],
        rent: ["BHK Apartment for Rent in LOCALITY", "BHK Flat for Rent in LOCALITY", "BHK Furnished Flat in LOCALITY"],
      },
      descriptions: {
        sale: ["Modern apartment with premium amenities and excellent connectivity.", "Spacious flat in a gated society with world-class facilities.", "Well-designed apartment with park-facing balcony and covered parking."],
        rent: ["Fully maintained flat available for immediate move-in.", "Well-furnished apartment near metro station with modern amenities.", "Bright and airy flat with excellent cross-ventilation and amenities."],
      },
    },
    house: {
      images: img.house,
      salePriceRange: [8000000, 50000000],
      rentPriceRange: [20000, 85000],
      areaRange: [1500, 3500],
      bedrooms: [2, 3, 4],
      amenities: [
        ["Parking", "Security", "Power Backup", "Garden"],
        ["Parking", "Security", "Garden", "Lift"],
        ["Parking", "Security", "Power Backup", "Garden", "Servant Room"],
      ],
      titleTemplates: {
        sale: ["BHK Builder Floor in LOCALITY", "BHK Independent House in LOCALITY", "BHK Duplex House in LOCALITY"],
        rent: ["BHK House for Rent in LOCALITY", "BHK Independent Floor for Rent in LOCALITY", "BHK Builder Floor for Rent in LOCALITY"],
      },
      descriptions: {
        sale: ["Newly built house with modern architecture and private parking.", "Spacious independent house with garden and terrace.", "Premium builder floor with vastu-compliant design and covered parking."],
        rent: ["Well-maintained house with dedicated parking and lawn. Ideal for families.", "Spacious independent floor in a quiet neighbourhood with all amenities.", "Beautiful builder floor near market, park, and schools."],
      },
    },
    villa: {
      images: img.villa,
      salePriceRange: [15000000, 95000000],
      rentPriceRange: [50000, 200000],
      areaRange: [2500, 6000],
      bedrooms: [3, 4, 5],
      amenities: [
        ["Parking", "Security", "Swimming Pool", "Garden", "Gym"],
        ["Parking", "Security", "Swimming Pool", "Home Theater", "Club House"],
        ["Parking", "Security", "Swimming Pool", "Garden", "EV Charging", "Spa"],
      ],
      titleTemplates: {
        sale: ["BHK Luxury Villa in LOCALITY", "BHK Independent Villa in LOCALITY", "BHK Premium Villa in LOCALITY"],
        rent: ["BHK Villa for Rent in LOCALITY", "BHK Furnished Villa in LOCALITY", "BHK Luxury Villa for Rent in LOCALITY"],
      },
      descriptions: {
        sale: ["Luxurious villa in a gated community with world-class amenities.", "Premium independent villa with rooftop garden and private pool.", "Exquisite villa with smart home features and landscaped garden."],
        rent: ["Stunning furnished villa with private garden and pool access.", "Spacious villa ideal for expat families and corporate leasing.", "Beautifully maintained villa in an upscale neighbourhood."],
      },
    },
    commercial: {
      images: img.comm,
      salePriceRange: [10000000, 80000000],
      rentPriceRange: [40000, 300000],
      areaRange: [800, 5000],
      bedrooms: [],
      amenities: [
        ["Parking", "Lift", "Security", "AC", "Wi-Fi"],
        ["Parking", "Lift", "Security", "Cafeteria", "Power Backup"],
        ["Parking", "Lift", "Security", "Central AC", "CCTV"],
      ],
      titleTemplates: {
        sale: ["Commercial Office Space in LOCALITY", "Premium Office for Sale in LOCALITY", "Commercial Space in LOCALITY"],
        rent: ["Office Space for Rent in LOCALITY", "Commercial Space for Rent in LOCALITY", "Premium Office for Rent in LOCALITY"],
      },
      descriptions: {
        sale: ["Prime commercial space in a high-visibility business district.", "Grade-A office space with modern infrastructure and parking.", "Well-designed commercial unit ideal for offices or retail."],
        rent: ["Plug-and-play office space with all modern amenities.", "Prime commercial space in a high-footfall area.", "Fully furnished office ready for immediate occupancy."],
      },
    },
    plot: {
      images: img.plot,
      salePriceRange: [2500000, 25000000],
      rentPriceRange: [15000, 60000],
      areaRange: [1200, 5000],
      bedrooms: [],
      amenities: [
        ["Security", "Boundary Wall", "Park"],
        ["Security", "Garden", "Wide Roads"],
        ["Security", "Boundary Wall", "Underground Electricity"],
      ],
      titleTemplates: {
        sale: ["Residential Plot in LOCALITY", "Corner Plot in LOCALITY", "Premium Plot in LOCALITY"],
        rent: ["Land for Lease in LOCALITY", "Plot for Rent in LOCALITY", "Open Land for Rent in LOCALITY"],
      },
      descriptions: {
        sale: ["Well-located residential plot in a gated community.", "Premium corner plot with excellent frontage and connectivity.", "Freehold plot with clear title in a developing sector."],
        rent: ["Open plot available for lease, ideal for storage or temporary setup.", "Land parcel available for rent with boundary wall and security.", "Flat plot on main road suitable for commercial or residential use."],
      },
    },
  };

  function randBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function roundPrice(n: number, type: string): number {
    if (type === "rent") return Math.round(n / 1000) * 1000;
    return Math.round(n / 100000) * 100000;
  }

  const properties: any[] = [];
  let viewCounter = 100;

  for (const city of Object.keys(cityData)) {
    const cd = cityData[city];
    for (const type of types) {
      for (const category of categories) {
        const cfg = catConfig[category];
        const priceRange = type === "sale" ? cfg.salePriceRange : cfg.rentPriceRange;
        const count = 3;

        for (let i = 0; i < count; i++) {
          const localityIdx = (categories.indexOf(category) * count + i) % cd.localities.length;
          const locality = cd.localities[localityIdx];
          const pincode = cd.pincodes[localityIdx];
          const bedrooms = cfg.bedrooms.length > 0 ? cfg.bedrooms[i % cfg.bedrooms.length] : undefined;
          const titleTpl = cfg.titleTemplates[type][i % cfg.titleTemplates[type].length];
          const title = (bedrooms ? `${bedrooms}` : "") + titleTpl.replace("LOCALITY", locality) + `, ${city}`;
          const description = cfg.descriptions[type][i % cfg.descriptions[type].length];
          const price = roundPrice(randBetween(priceRange[0], priceRange[1]), type);
          const area = randBetween(cfg.areaRange[0], cfg.areaRange[1]);
          const facing = facings[i % facings.length];
          const furnishing = furnishings[i % furnishings.length];
          const age = ages[i % ages.length];
          const amenities = cfg.amenities[i % cfg.amenities.length];
          const isFeatured = i === 0;
          viewCounter += randBetween(20, 150);

          const prop: any = {
            title,
            description,
            price,
            type,
            category,
            area,
            facing,
            furnishing,
            age,
            address: `${locality}, ${city}`,
            locality,
            city,
            state: cd.state,
            pincode,
            images: JSON.stringify(cfg.images.slice(0, 2 + (i % 2))),
            amenities: JSON.stringify(amenities),
            verified: true,
            featured: isFeatured,
            ownerId: o(viewCounter),
            ownerType: i % 2 === 0 ? "owner" : "agent",
            views: viewCounter,
          };

          if (bedrooms) {
            prop.bedrooms = bedrooms;
            prop.bathrooms = Math.max(1, bedrooms - 1 + (i % 2));
            prop.balconies = Math.min(bedrooms, 1 + (i % 2));
          }

          if (category !== "plot") {
            prop.floor = String(randBetween(1, 15));
            prop.totalFloors = String(randBetween(Number(prop.floor) + 2, 25));
          }

          properties.push(prop);
        }
      }
    }
  }

  for (const prop of properties) {
    await prisma.property.create({ data: prop });
  }
  console.log(`  Created ${properties.length} properties.\n`);

  // ===================== BLOG POST =====================
  console.log("Seeding blog post...");
  await prisma.blogPost.create({
    data: {
      title: "How to Check if a Project is RERA Approved Before Buying a Property",
      slug: "how-to-check-rera-approved-project-before-buying",
      excerpt: "Buying a home is one of the biggest financial decisions. Learn how to verify RERA registration and protect yourself from fraud.",
      content: `Buying a home is one of the biggest financial decisions for most people. To protect homebuyers from fraud, delays, and misleading promises, the Government of India introduced the Real Estate (Regulation and Development) Act, 2016, commonly known as RERA.\n\nRERA was created to bring transparency, accountability, and trust to the real estate sector. Today, every residential or commercial project above a certain size must be registered with the respective state's RERA authority.\n\n## What is a RERA Approved Project?\n\nA RERA-approved project is one that has been officially registered with the state's Real Estate Regulatory Authority.\n\nTo obtain RERA registration, developers must submit key project details such as:\n- Project layout and approvals\n- Construction timeline\n- Land ownership documents\n- Financial disclosures\n\n## Why Checking RERA Approval is Important\n\n### 1. Protection Against Project Delays\nBuilders registered under RERA must follow the committed project timeline.\n\n### 2. Transparency in Project Details\nDevelopers must disclose all important project information.\n\n### 3. Financial Accountability\nRERA requires builders to deposit 70% of project funds in an escrow account.\n\n### 4. Legal Protection for Buyers\nBuyers can file complaints directly with the RERA authority.\n\n## How to Check if a Project is RERA Approved\n\n### Step 1: Visit the State RERA Website\nEach state has its own RERA portal.\n\n### Step 2: Go to the Project Registration Section\nLook for "Registered Projects" or "Project Search".\n\n### Step 3: Enter Project or Builder Details\nSearch using project name, builder name, or RERA number.\n\n### Step 4: Verify Project Details\nReview the RERA registration number, timeline, and approvals.\n\n## Conclusion\nBefore buying any property, verifying RERA approval is crucial. Property platforms like Property Pointers list verified projects to help homebuyers make informed decisions.`,
      coverImage: "/blog/rera-check-project.png",
      category: "legal",
      byline: "Gaurav Chopra",
      tags: JSON.stringify(["RERA", "property buying", "real estate law", "home buyer guide"]),
      published: true,
      views: 0,
      authorId: admin.id,
    },
  });
  console.log("  Created 1 blog post.\n");

  // ===================== PROJECTS =====================
  console.log("Seeding projects...");
  const projects = [
    { title: "Devika Vibe Sector 110", slug: "devika-vibe-sector-110", description: "Premium Hub in Sector 110, Noida. 75,000 sq. ft. of luxury retail, vibrant dining, and immersive experiences.", highlights: JSON.stringify(["Possession Soon", "50K+ Families Catchment", "State-of-the-Art Design", "Seamless Connectivity", "Low Maintenance", "4 Entry & Exit Points"]), builderName: "Devika Group", location: "Sector 110, Noida", city: "Noida", state: "Uttar Pradesh", reraNumber: "UPRERAPRJ9275", projectStatus: "under-construction", possessionDate: "December 2025", startingPrice: 60, priceUnit: "Lac", propertyType: "commercial", configurations: JSON.stringify(["Retail Shops", "Food Court", "Kiosks"]), totalArea: "1.25 Acres", totalUnits: 280, images: JSON.stringify(["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"]), amenities: JSON.stringify(["Power Backup", "Lift", "Security", "Visitor Parking", "Gymnasium", "Rain Water Harvesting", "Air Conditioned", "Kids Play Area", "Fire Fighting", "CCTV", "Cafeteria", "Grand Lobby"]), locationAdvantages: JSON.stringify([{ place: "Yamuna Expressway", distance: "15 min" }, { place: "Metro Station", distance: "7 min" }, { place: "Yatharth Hospital", distance: "2 min" }]), floorPlans: JSON.stringify([]), brochureUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", featured: true, verified: true },
    { title: "M3M The Cullinan Sector 94", slug: "m3m-the-cullinan-sector-94", description: "Ultra-luxury residential and commercial project with panoramic views of F1 track and golf course.", highlights: JSON.stringify(["3/4/5 BHK Apartments", "F1 Track & Golf Views", "Infinity Pool", "Smart Home Automation", "Italian Marble Flooring"]), builderName: "M3M Group", location: "Sector 94, Noida", city: "Noida", state: "Uttar Pradesh", reraNumber: "UPRERAPRJ442214", projectStatus: "under-construction", possessionDate: "April 2028", startingPrice: 4.5, priceUnit: "Cr", propertyType: "mixed", configurations: JSON.stringify(["3 BHK", "4 BHK", "5 BHK", "Penthouse"]), totalArea: "12 Acres", totalUnits: 400, images: JSON.stringify(["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"]), amenities: JSON.stringify(["Swimming Pool", "Gymnasium", "Club House", "Spa", "Tennis Court", "Jogging Track", "Kids Play Area", "24/7 Security", "EV Charging", "Concierge Service"]), locationAdvantages: JSON.stringify([{ place: "F1 Circuit", distance: "10 min" }, { place: "Noida Expressway", distance: "5 min" }, { place: "DND Flyway", distance: "15 min" }]), floorPlans: JSON.stringify([]), featured: true, verified: true },
    { title: "DLF The Arbour Sector 63", slug: "dlf-the-arbour-sector-63", description: "Ultra-luxury 4 BHK apartments across 25 acres of lush greens with low density living.", highlights: JSON.stringify(["Only 280 Apartments", "25 Acres Landscape", "Private Lobbies", "Designed by Hafeez Contractor", "Golf Cart Service"]), builderName: "DLF Limited", location: "Sector 63, Gurugram", city: "Gurugram", state: "Haryana", reraNumber: "RC/HARERA/GGM/2023/101", projectStatus: "under-construction", possessionDate: "March 2027", startingPrice: 7, priceUnit: "Cr", propertyType: "residential", configurations: JSON.stringify(["4 BHK", "4.5 BHK", "Penthouse"]), totalArea: "25 Acres", totalUnits: 280, images: JSON.stringify(["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"]), amenities: JSON.stringify(["Swimming Pool", "Gymnasium", "Club House", "Tennis Court", "Squash Court", "Mini Theater", "Yoga Room", "Jogging Track"]), locationAdvantages: JSON.stringify([{ place: "Golf Course Road", distance: "5 min" }, { place: "Rapid Metro", distance: "10 min" }, { place: "Cyber City", distance: "12 min" }, { place: "IGI Airport", distance: "25 min" }]), floorPlans: JSON.stringify([]), featured: true, verified: true },
    { title: "Godrej Tropical Isle Sector 146", slug: "godrej-tropical-isle-sector-146", description: "Resort-style living with tropical architecture, water features, and lagoon pool.", highlights: JSON.stringify(["Tropical Architecture", "3-Side Open Apartments", "Lagoon Pool", "International Landscaping"]), builderName: "Godrej Properties", location: "Sector 146, Noida", city: "Noida", state: "Uttar Pradesh", reraNumber: "UPRERAPRJ585234", projectStatus: "under-construction", possessionDate: "June 2028", startingPrice: 2.5, priceUnit: "Cr", propertyType: "residential", configurations: JSON.stringify(["2 BHK", "3 BHK", "4 BHK"]), totalArea: "10 Acres", totalUnits: 500, images: JSON.stringify(["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800", "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800"]), amenities: JSON.stringify(["Lagoon Pool", "Gymnasium", "Club House", "Tropical Gardens", "Kids Play Area", "Amphitheater", "24/7 Security"]), locationAdvantages: JSON.stringify([{ place: "FNG Expressway", distance: "3 min" }, { place: "Noida Expressway", distance: "5 min" }]), floorPlans: JSON.stringify([]), featured: false, verified: true },
    { title: "Paras Avenue Sector 129", slug: "paras-avenue-sector-129", description: "Premium commercial project on Noida Expressway with direct visibility and excellent connectivity.", highlights: JSON.stringify(["High-Street Retail", "Direct Expressway Visibility", "500+ Vehicle Parking", "Entertainment Zone"]), builderName: "Paras Buildtech", location: "Sector 129, Noida", city: "Noida", state: "Uttar Pradesh", reraNumber: "UPRERAPRJ297873", projectStatus: "under-construction", possessionDate: "September 2027", startingPrice: 55, priceUnit: "Lac", propertyType: "commercial", configurations: JSON.stringify(["Retail Shops", "Food Court", "Anchor Stores"]), totalArea: "3 Acres", totalUnits: 350, images: JSON.stringify(["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"]), amenities: JSON.stringify(["Power Backup", "Lift", "Escalators", "Security", "Fire Safety", "Central AC"]), locationAdvantages: JSON.stringify([{ place: "Noida Expressway", distance: "On Expressway" }, { place: "Sector 137 Metro", distance: "5 min" }]), floorPlans: JSON.stringify([]), featured: false, verified: true },
    { title: "Prestige Lakeside Habitat", slug: "prestige-lakeside-habitat", description: "80-acre township with 5-acre central lake, apartments, and villas in Whitefield, Bangalore.", highlights: JSON.stringify(["80-Acre Township", "5-Acre Natural Lake", "Ready to Move", "Schools & Shopping Within"]), builderName: "Prestige Group", location: "Whitefield, Bangalore", city: "Bangalore", state: "Karnataka", reraNumber: "PRM/KA/RERA/2020/003", projectStatus: "ready-to-move", possessionDate: "Ready to Move", startingPrice: 85, priceUnit: "Lac", propertyType: "residential", configurations: JSON.stringify(["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa"]), totalArea: "80 Acres", totalUnits: 3000, images: JSON.stringify(["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"]), amenities: JSON.stringify(["Swimming Pool", "Gymnasium", "Club House", "Tennis Court", "Basketball Court", "Jogging Track", "Kids Play Area", "24/7 Security"]), locationAdvantages: JSON.stringify([{ place: "ITPL Tech Park", distance: "10 min" }, { place: "Bangalore Airport", distance: "40 min" }]), floorPlans: JSON.stringify([]), featured: true, verified: true },
    { title: "Smartworld Elie Saab Noida", slug: "smartworld-elie-saab-noida", description: "Ultra-luxury project by fashion icon Elie Saab with bespoke interiors.", highlights: JSON.stringify(["Designed by Elie Saab", "Bespoke Interiors", "Rooftop Infinity Pool", "Valet & Concierge"]), builderName: "Smartworld Developers", location: "Sector 98, Noida", city: "Noida", state: "Uttar Pradesh", reraNumber: "UPRERAPRJ300532", projectStatus: "upcoming", possessionDate: "October 2030", startingPrice: 6, priceUnit: "Cr", propertyType: "residential", configurations: JSON.stringify(["3 BHK", "4 BHK", "5 BHK", "Penthouse"]), totalArea: "15 Acres", totalUnits: 350, images: JSON.stringify(["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"]), amenities: JSON.stringify(["Infinity Pool", "Private Gym", "Spa", "Concierge", "Private Theater", "Rooftop Garden"]), locationAdvantages: JSON.stringify([{ place: "Noida Expressway", distance: "2 min" }, { place: "DND Flyway", distance: "15 min" }]), floorPlans: JSON.stringify([]), featured: true, verified: true },
    { title: "Lodha The Park Worli", slug: "lodha-the-park-worli", description: "Sea-facing luxury in Worli with amenities by Trump Organization and Armani/Casa interiors.", highlights: JSON.stringify(["Sea-Facing in Worli", "Trump Organization Amenities", "Private Elevator", "Armani/Casa Interiors"]), builderName: "Lodha Group", location: "Worli, Mumbai", city: "Mumbai", state: "Maharashtra", reraNumber: "P51800001234", projectStatus: "ready-to-move", possessionDate: "Ready to Move", startingPrice: 8, priceUnit: "Cr", propertyType: "residential", configurations: JSON.stringify(["3 BHK", "4 BHK", "5 BHK", "Duplex Penthouse"]), totalArea: "17 Acres", totalUnits: 600, images: JSON.stringify(["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]), amenities: JSON.stringify(["Infinity Pool", "Private Beach Club", "Spa", "Golf Simulator", "Tennis Court", "Concierge", "Valet Parking"]), locationAdvantages: JSON.stringify([{ place: "Sea Link", distance: "5 min" }, { place: "BKC", distance: "10 min" }, { place: "Airport", distance: "25 min" }]), floorPlans: JSON.stringify([]), featured: true, verified: true },
    { title: "BPTP Amstoria Plots Sector 102", slug: "bptp-amstoria-plots-sector-102", description: "Premium residential plots on Dwarka Expressway in gated community.", highlights: JSON.stringify(["Gated Community", "On Dwarka Expressway", "Well-Planned Infrastructure", "Near Diplomatic Enclave"]), builderName: "BPTP Limited", location: "Sector 102, Gurugram", city: "Gurugram", state: "Haryana", reraNumber: "RC/HARERA/GGM/2022/78", projectStatus: "ready-to-move", possessionDate: "Ready to Move", startingPrice: 2, priceUnit: "Cr", propertyType: "plots", configurations: JSON.stringify(["200 Sq Yd", "300 Sq Yd", "500 Sq Yd"]), totalArea: "200 Acres", totalUnits: 1200, images: JSON.stringify(["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800"]), amenities: JSON.stringify(["Gated Community", "Wide Roads", "Underground Electricity", "Parks", "24/7 Security"]), locationAdvantages: JSON.stringify([{ place: "Dwarka Expressway", distance: "On Expressway" }, { place: "IGI Airport", distance: "20 min" }]), floorPlans: JSON.stringify([]), featured: false, verified: true },
    { title: "Mahindra World City Jaipur", slug: "mahindra-world-city-jaipur", description: "Integrated township with residential plots, villas, and world-class infrastructure near Jaipur.", highlights: JSON.stringify(["3000+ Acre Township", "SEZ Zone", "International School", "Hospital Within"]), builderName: "Mahindra Lifespaces", location: "Kalwara Road, Jaipur", city: "Jaipur", state: "Rajasthan", reraNumber: "RAJ/P/2020/123", projectStatus: "ready-to-move", possessionDate: "Ready to Move", startingPrice: 35, priceUnit: "Lac", propertyType: "plots", configurations: JSON.stringify(["200 Sq Yd", "300 Sq Yd", "500 Sq Yd", "Villa"]), totalArea: "3000 Acres", totalUnits: 5000, images: JSON.stringify(["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800"]), amenities: JSON.stringify(["Wide Roads", "Underground Electricity", "Parks", "Shopping Complex", "24/7 Security", "Schools", "Hospital"]), locationAdvantages: JSON.stringify([{ place: "Jaipur Airport", distance: "30 min" }, { place: "NH-8", distance: "5 min" }]), floorPlans: JSON.stringify([]), featured: true, verified: true },
    { title: "Siddharth Vihar Ghaziabad", slug: "siddharth-vihar-ghaziabad", description: "Premium residential project in Ghaziabad with excellent metro connectivity and modern amenities.", highlights: JSON.stringify(["Metro Connectivity", "Gated Community", "Sports Complex", "Near NH-24"]), builderName: "Gaur Group", location: "Siddharth Vihar, Ghaziabad", city: "Ghaziabad", state: "Uttar Pradesh", reraNumber: "UPRERAPRJ113344", projectStatus: "under-construction", possessionDate: "March 2027", startingPrice: 55, priceUnit: "Lac", propertyType: "residential", configurations: JSON.stringify(["2 BHK", "3 BHK", "4 BHK"]), totalArea: "15 Acres", totalUnits: 800, images: JSON.stringify(["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"]), amenities: JSON.stringify(["Swimming Pool", "Gymnasium", "Club House", "Kids Play Area", "Jogging Track", "24/7 Security"]), locationAdvantages: JSON.stringify([{ place: "NH-24", distance: "5 min" }, { place: "Vaishali Metro", distance: "10 min" }]), floorPlans: JSON.stringify([]), featured: true, verified: true },
    { title: "Devika VIBE | Panache Bazaar", slug: "devika-vibe-panache-bazaar", description: "Devika Vibe Panache Bazaar features high-street retail shops strategically located in Sector 110 Noida with promising high footfall. Located in a high population density area with competitive rental yields. Close proximity to premium residential properties like ATS One Hamlet, Parx Laureate, Lotus Panache. Offers complete ownership of lockable retail shops with seamless connectivity to Yamuna Expressway and ISBT Noida.", highlights: JSON.stringify(["High-end Hospitality Real Estate Project", "One of its kind Lockable Shops in Noida", "Numerous Options in Amenities & Facilities", "Strategic Location in Sector 110, Noida", "Located in Densely Populated Area", "Complete Ownership of Retail Shops", "Seamless Connectivity to Expressways & ISBT", "Close Proximity to Premium Residential Societies"]), builderName: "Devika Group", location: "Sector 110, Noida", city: "Noida", state: "Uttar Pradesh", reraNumber: "UPRERAPRJ9275", projectStatus: "under-construction", possessionDate: "December 2024", startingPrice: 65, priceUnit: "Lac", propertyType: "commercial", configurations: JSON.stringify(["Lockable Retail Shops", "Food Street", "Kiosks"]), totalArea: "1.25 Acres", totalUnits: 280, images: JSON.stringify(["https://res.cloudinary.com/dqajkpsks/image/upload/v1774879292/projects/devika-vibe-panache-bazaar/pfeh7iwwlx5f0li3bxb6.jpg", "https://res.cloudinary.com/dqajkpsks/image/upload/v1774879295/projects/devika-vibe-panache-bazaar/pnl0l3j1xuyxensn98fs.jpg", "https://res.cloudinary.com/dqajkpsks/image/upload/v1774879298/projects/devika-vibe-panache-bazaar/rp5xzxmpvjidyv8dgufa.jpg"]), amenities: JSON.stringify(["Cafeteria/Food Court", "Power Backup", "Lift", "Security", "Service/Good Lift", "Visitor Parking", "Gymnasium", "Rain Water Harvesting", "Air Conditioned", "Earthquake Resistant", "Tier 3 Security System", "Large Open Space", "Grand Entrance Lobby", "Kid Play Area", "Event Space & Amphitheatre", "Fire Fighting Equipment"]), locationAdvantages: JSON.stringify([{ place: "Yamuna Expressway", distance: "15 min" }, { place: "Mahamaya Flyover", distance: "5 min" }, { place: "Metro Station", distance: "7 min" }, { place: "Noida - Greater Noida Expressway", distance: "6 min" }, { place: "Yatharth Hospital", distance: "2 min" }, { place: "Akshardham Temple", distance: "15 min" }, { place: "Connaught Place", distance: "20 min" }, { place: "New Delhi Railway Station", distance: "25 min" }, { place: "Indira Gandhi International Airport", distance: "60 min" }]), floorPlans: JSON.stringify([{ name: "Lockable Retail Shops", size: "134 Sq Ft" }]), brochureUrl: "/brochures/devika-vibe-panache-bazaar.pdf", featured: true, verified: true },
    { title: "Max Estate 128 Noida", slug: "max-estate-128-noida", description: "Grade A+ commercial towers with LEED Gold certification on Noida Expressway.", highlights: JSON.stringify(["Grade A+ Office Space", "LEED Gold Certified", "Smart Building Management", "Co-working Spaces"]), builderName: "Max Estates", location: "Sector 128, Noida", city: "Noida", state: "Uttar Pradesh", reraNumber: "UPRERAPRJ671234", projectStatus: "under-construction", possessionDate: "December 2026", startingPrice: 1.2, priceUnit: "Cr", propertyType: "commercial", configurations: JSON.stringify(["Office Suites", "Co-working", "Retail"]), totalArea: "8 Acres", totalUnits: 200, images: JSON.stringify(["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"]), amenities: JSON.stringify(["Central AC", "High-Speed Elevators", "Food Court", "Business Lounge", "EV Charging"]), locationAdvantages: JSON.stringify([{ place: "Noida Expressway", distance: "On Expressway" }, { place: "Sector 137 Metro", distance: "8 min" }]), floorPlans: JSON.stringify([]), featured: false, verified: true },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`  Created ${projects.length} projects.\n`);

  await prisma.developer.upsert({
    where: { slug: "devika-group" },
    create: {
      name: "Devika Group",
      slug: "devika-group",
      establishedYear: 1954,
      verified: true,
    },
    update: { name: "Devika Group", establishedYear: 1954 },
  });
  console.log("  Upserted Developer: Devika Group (est. 1954).\n");

  // ===================== SITE SETTINGS =====================
  console.log("Setting up site settings...");
  const siteContact = {
    contactEmail: "propertypointersofficial@gmail.com",
    contactPhone: "+91-9990074072",
    address: "701, GDITL NorthEx, Netaji Subhash Place, New Delhi - 110034",
    facebook: "https://www.facebook.com/share/1CQ4czxaZu/?mibextid=wwXIfr",
    linkedin: "https://www.linkedin.com/company/propertypointersofficial/",
  };
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...siteContact },
    update: siteContact,
  });
  console.log("  Done.\n");

  console.log("=== Seed Complete ===");
  console.log("\nLogin credentials:");
  console.log("  Admin: admin@propertypointers.com / admin123");
  console.log("  User:  user@propertypointers.com / user123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
