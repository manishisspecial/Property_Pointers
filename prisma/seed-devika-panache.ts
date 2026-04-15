import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slug = "devika-vibe-panache-bazaar";

  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) {
    console.log(`Project "${slug}" already exists. Updating...`);
    await prisma.project.update({
      where: { slug },
      data: buildProjectData(),
    });
    console.log("Updated successfully.");
  } else {
    await prisma.project.create({ data: { slug, ...buildProjectData() } });
    console.log("Created successfully.");
  }

  const project = await prisma.project.findUnique({ where: { slug } });
  console.log(`\nProject: ${project?.title}`);
  console.log(`Slug:    ${project?.slug}`);
  console.log(`Link:    /projects/${project?.slug}`);

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
  console.log("Developer: Devika Group — Since 1954 (developers/devika-group)");
}

function buildProjectData() {
  return {
    title: "Devika VIBE | Panache Bazaar",
    description: `Devika Vibe Panache Bazaar features high-street retail shops strategically located in the heart of the city, Sector 110 Noida, which boasts a promising high footfall. This commercial property in Noida is located in a high population density area and hence provides competitive rental yields with minimal maintenance.

Devika Vibe features close proximity to various premium residential properties like ATS One Hamlet, Parx Laureate, Lotus Panache etc., making its location one of the busiest hubs in Noida and consequently emerging as the promising real estate investment in India.

Panache Bazaar in Sector 110 Noida offers one of its lockable retail shops in the closely packed area with numerous commuters going round the locality. Branded under the reputed real estate developer in India, Devika Group, Panache Bazaar offers complete ownership of high-street retail shops along with promising capital appreciation and assured returns.

Devika Vibe Panache Bazaar offers seamless connectivity with Yamuna Expressway and ISBT Noida and emerges as the top commercial property in Noida with an array of benefits like high capital appreciation, favourable rental yields, complete ownership of lockable retail shops, and regular retail footfall.

This commercial property in Noida is located in the bustling residential sector of Noida featuring high-street, standalone commercial outlets, along with integrated malls and features a promising real estate investment in India.`,

    highlights: JSON.stringify([
      "High-end Hospitality Real Estate Project",
      "One of its kind Lockable Shops in Noida",
      "Numerous Options in Amenities & Facilities",
      "Strategic Location in Sector 110, Noida",
      "Located in Densely Populated Area",
      "Complete Ownership of Retail Shops",
      "Seamless Connectivity to Expressways & ISBT",
      "Close Proximity to Premium Residential Societies",
    ]),

    builderName: "Devika Group",
    builderLogo: null,
    location: "Sector 110, Noida",
    city: "Noida",
    state: "Uttar Pradesh",

    reraNumber: "UPRERAPRJ9275",
    projectStatus: "under-construction",
    possessionDate: "December 2024",

    startingPrice: 65,
    priceUnit: "Lac",
    propertyType: "commercial",

    configurations: JSON.stringify([
      "Lockable Retail Shops",
      "Food Street",
      "Kiosks",
    ]),

    totalArea: "1.25 Acres",
    totalUnits: 280,

    images: JSON.stringify([
      "https://res.cloudinary.com/dqajkpsks/image/upload/v1774879292/projects/devika-vibe-panache-bazaar/pfeh7iwwlx5f0li3bxb6.jpg",
      "https://res.cloudinary.com/dqajkpsks/image/upload/v1774879295/projects/devika-vibe-panache-bazaar/pnl0l3j1xuyxensn98fs.jpg",
      "https://res.cloudinary.com/dqajkpsks/image/upload/v1774879298/projects/devika-vibe-panache-bazaar/rp5xzxmpvjidyv8dgufa.jpg",
    ]),

    amenities: JSON.stringify([
      "Cafeteria/Food Court",
      "Power Backup",
      "Lift",
      "Security",
      "Service/Good Lift",
      "Visitor Parking",
      "Gymnasium",
      "Rain Water Harvesting",
      "Air Conditioned",
      "Earthquake Resistant",
      "Tier 3 Security System",
      "Large Open Space",
      "Grand Entrance Lobby",
      "Kid Play Area",
      "Event Space & Amphitheatre",
      "Fire Fighting Equipment",
    ]),

    floorPlans: JSON.stringify([
      {
        name: "Lockable Retail Shops",
        size: "134 Sq Ft",
      },
    ]),

    locationAdvantages: JSON.stringify([
      { place: "Yamuna Expressway", distance: "15 min" },
      { place: "Mahamaya Flyover", distance: "5 min" },
      { place: "Metro Station", distance: "7 min" },
      { place: "Noida - Greater Noida Expressway", distance: "6 min" },
      { place: "Yatharth Hospital", distance: "2 min" },
      { place: "Akshardham Temple", distance: "15 min" },
      { place: "Connaught Place", distance: "20 min" },
      { place: "New Delhi Railway Station", distance: "25 min" },
      { place: "Indira Gandhi International Airport", distance: "60 min" },
    ]),

    paymentPlans: JSON.stringify([
      {
        title: "Lockable Retail Shops",
        detail: "134 Sq Ft | Starting from ₹65 Lac+",
      },
    ]),

    brochureUrl: "/brochures/devika-vibe-panache-bazaar.pdf",
    featured: true,
    verified: true,
  };
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
