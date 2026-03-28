import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.activityLog.deleteMany();
  await prisma.chatMessage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

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
    prisma.user.create({
      data: { name: "Rahul Sharma", email: "user@propertypointers.com", password: hashedUser, phone: "+91-9876543211", role: "user", verified: true, city: "Noida", state: "Uttar Pradesh", latitude: 28.5355, longitude: 77.391 },
    }),
    prisma.user.create({
      data: { name: "Priya Patel", email: "priya@propertypointers.com", password: hashedUser, phone: "+91-9876543212", role: "owner", verified: true, city: "Mumbai", state: "Maharashtra", latitude: 19.076, longitude: 72.8777 },
    }),
    prisma.user.create({
      data: { name: "Amit Kumar", email: "amit@propertypointers.com", password: hashedUser, phone: "+91-9876543213", role: "agent", verified: true, city: "Delhi", state: "Delhi", latitude: 28.6139, longitude: 77.209 },
    }),
    prisma.user.create({
      data: { name: "Sneha Gupta", email: "sneha@propertypointers.com", password: hashedUser, phone: "+91-9876543214", role: "owner", verified: false, city: "Gurgaon", state: "Haryana" },
    }),
    prisma.user.create({
      data: { name: "Vikram Singh", email: "vikram@propertypointers.com", password: hashedUser, phone: "+91-9876543215", role: "user", city: "Bangalore", state: "Karnataka" },
    }),
    prisma.user.create({
      data: { name: "Deepak Verma", email: "deepak@propertypointers.com", password: hashedUser, phone: "+91-9876543216", role: "agent", verified: true, city: "Noida", state: "Uttar Pradesh" },
    }),
    prisma.user.create({
      data: { name: "Meera Reddy", email: "meera@propertypointers.com", password: hashedUser, phone: "+91-9876543217", role: "owner", verified: true, city: "Hyderabad", state: "Telangana" },
    }),
  ]);

  const img = {
    apt: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    house: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    villa: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    ],
    comm: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    plot: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&h=600&fit=crop",
    ],
    shop: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop",
    ],
    pg: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    ],
  };

  const o = (i: number) => users[i % users.length].id;

  const properties: any[] = [
    // ============ APARTMENTS FOR SALE (5) ============
    {
      title: "Luxury 3BHK Apartment in Sector 150, Noida",
      description: "Spacious 3BHK apartment with modern amenities in one of Noida's prime locations. Premium apartment features large balconies with panoramic views, modular kitchen, and 24/7 security. Located near Noida Expressway with excellent connectivity.",
      price: 9500000, type: "sale", category: "apartment", bedrooms: 3, bathrooms: 2, balconies: 2, area: 1450, floor: "12", totalFloors: "24", facing: "East", furnishing: "semi-furnished", age: "1-3 years",
      address: "Gaur City 2, Sector 150", locality: "Sector 150", city: "Noida", state: "Uttar Pradesh", pincode: "201310",
      images: JSON.stringify(img.apt), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "Swimming Pool", "Gym", "Club House", "Garden", "Children Play Area", "CCTV"]),
      verified: true, featured: true, ownerId: o(1), ownerType: "owner", views: 342,
    },
    {
      title: "4BHK Penthouse in Powai, Mumbai",
      description: "Stunning 4BHK penthouse with breathtaking lake view in Powai, Mumbai. Duplex layout with private terrace garden, home theater, and designer interiors.",
      price: 120000000, type: "sale", category: "apartment", bedrooms: 4, bathrooms: 4, balconies: 3, area: 3800, floor: "22", totalFloors: "22", facing: "West", furnishing: "furnished", age: "0-1 years",
      address: "Hiranandani Gardens, Powai", locality: "Powai", city: "Mumbai", state: "Maharashtra", pincode: "400076",
      images: JSON.stringify([img.apt[0], img.villa[0], img.villa[1]]), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "Swimming Pool", "Gym", "Club House", "CCTV", "Fire Safety"]),
      verified: true, featured: true, premium: true, ownerId: o(1), ownerType: "owner", views: 891,
    },
    {
      title: "2BHK Apartment in Baner, Pune",
      description: "New 2BHK apartment in Baner, one of Pune's fastest-growing neighborhoods. Premium society with modern amenities. Close to IT parks and malls.",
      price: 6500000, type: "sale", category: "apartment", bedrooms: 2, bathrooms: 2, balconies: 1, area: 950, floor: "7", totalFloors: "15", facing: "West", furnishing: "semi-furnished", age: "Under Construction",
      address: "Baner Road", locality: "Baner", city: "Pune", state: "Maharashtra", pincode: "411045",
      images: JSON.stringify([img.apt[2], img.apt[0]]), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "Swimming Pool", "Gym", "Garden"]),
      verified: true, featured: false, ownerId: o(1), ownerType: "owner", views: 198,
    },
    {
      title: "3BHK Flat in Gachibowli, Hyderabad",
      description: "Modern 3BHK flat near Financial District, Gachibowli. Close to top IT companies, international schools, and hospitals.",
      price: 8500000, type: "sale", category: "apartment", bedrooms: 3, bathrooms: 2, balconies: 2, area: 1350, floor: "9", totalFloors: "18", facing: "North-East", furnishing: "unfurnished", age: "0-1 years",
      address: "Nanakramguda Road, Gachibowli", locality: "Gachibowli", city: "Hyderabad", state: "Telangana", pincode: "500032",
      images: JSON.stringify([img.apt[0], img.apt[2]]), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "Swimming Pool", "Gym", "CCTV", "Jogging Track"]),
      verified: true, featured: true, ownerId: o(2), ownerType: "agent", views: 315,
    },
    {
      title: "2BHK Premium Apartment in Whitefield, Bangalore",
      description: "Brand new 2BHK apartment in Prestige project, Whitefield. Walking distance to ITPL and metro station. Modern amenities and premium finishes.",
      price: 7200000, type: "sale", category: "apartment", bedrooms: 2, bathrooms: 2, balconies: 1, area: 1100, floor: "14", totalFloors: "20", facing: "South-East", furnishing: "unfurnished", age: "0-1 years",
      address: "ITPL Main Road, Whitefield", locality: "Whitefield", city: "Bangalore", state: "Karnataka", pincode: "560066",
      images: JSON.stringify([img.apt[1], img.apt[2]]), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "Swimming Pool", "Gym", "CCTV"]),
      verified: true, featured: true, ownerId: o(4), ownerType: "owner", views: 256,
    },

    // ============ APARTMENTS FOR RENT (4) ============
    {
      title: "Modern 2BHK Flat for Rent in Indirapuram",
      description: "Well-maintained 2BHK flat for rent in Indirapuram, Ghaziabad. Fully furnished with AC, modular kitchen, and premium fittings. Walking distance to metro.",
      price: 18000, type: "rent", category: "apartment", bedrooms: 2, bathrooms: 2, balconies: 1, area: 1100, floor: "5", totalFloors: "12", facing: "North", furnishing: "furnished", age: "3-5 years",
      address: "Ahinsa Khand 2, Indirapuram", locality: "Indirapuram", city: "Ghaziabad", state: "Uttar Pradesh", pincode: "201014",
      images: JSON.stringify([img.apt[1], img.apt[2]]), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "Gym", "CCTV", "Air Conditioning", "Wi-Fi"]),
      verified: true, featured: true, ownerId: o(0), ownerType: "owner", views: 189,
    },
    {
      title: "1BHK Studio Apartment for Rent in Koramangala",
      description: "Cozy 1BHK fully furnished studio apartment in Koramangala, Bangalore. Perfect for working professionals.",
      price: 22000, type: "rent", category: "apartment", bedrooms: 1, bathrooms: 1, area: 550, floor: "3", totalFloors: "6", facing: "East", furnishing: "furnished", age: "1-3 years",
      address: "5th Block, Koramangala", locality: "Koramangala", city: "Bangalore", state: "Karnataka", pincode: "560095",
      images: JSON.stringify([img.apt[1]]), amenities: JSON.stringify(["Security", "Power Backup", "Lift", "CCTV", "Air Conditioning", "Wi-Fi"]),
      verified: true, featured: true, ownerId: o(0), ownerType: "owner", views: 423,
    },
    {
      title: "3BHK Furnished Flat for Rent in Andheri West, Mumbai",
      description: "Beautifully furnished 3BHK apartment in Andheri West. Close to Lokhandwala market, DN Nagar metro, and entertainment hubs. Sea-facing balcony.",
      price: 65000, type: "rent", category: "apartment", bedrooms: 3, bathrooms: 2, balconies: 2, area: 1400, floor: "16", totalFloors: "22", facing: "West", furnishing: "furnished", age: "3-5 years",
      address: "Lokhandwala Complex, Andheri West", locality: "Andheri West", city: "Mumbai", state: "Maharashtra", pincode: "400053",
      images: JSON.stringify(img.apt), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "Swimming Pool", "Gym", "CCTV", "Air Conditioning"]),
      verified: true, featured: false, ownerId: o(1), ownerType: "owner", views: 287,
    },
    {
      title: "2BHK Apartment for Rent in Sector 62, Noida",
      description: "Semi-furnished 2BHK apartment near Sector 62 metro. Ideal for IT professionals working in Noida. Spacious rooms with good ventilation.",
      price: 15000, type: "rent", category: "apartment", bedrooms: 2, bathrooms: 2, balconies: 1, area: 1000, floor: "4", totalFloors: "10", facing: "North-East", furnishing: "semi-furnished", age: "5-10 years",
      address: "Block A, Sector 62", locality: "Sector 62", city: "Noida", state: "Uttar Pradesh", pincode: "201301",
      images: JSON.stringify([img.apt[2], img.apt[1]]), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "CCTV"]),
      verified: true, featured: false, ownerId: o(5), ownerType: "agent", views: 145,
    },

    // ============ BUILDER FLOORS / HOUSES FOR SALE (4) ============
    {
      title: "3BHK Independent House in Whitefield, Bangalore",
      description: "Spacious 3BHK independent house in Whitefield with garden and car parking. Well-connected to IT corridors and ITPL.",
      price: 15000000, type: "sale", category: "house", bedrooms: 3, bathrooms: 3, balconies: 1, area: 2200, facing: "North", furnishing: "semi-furnished", age: "3-5 years",
      address: "Whitefield Main Road", locality: "Whitefield", city: "Bangalore", state: "Karnataka", pincode: "560066",
      images: JSON.stringify(img.house), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Garden", "CCTV", "Rain Water Harvesting"]),
      verified: true, featured: false, ownerId: o(2), ownerType: "agent", views: 276,
    },
    {
      title: "4BHK Builder Floor in Greater Kailash, Delhi",
      description: "Newly built 4BHK builder floor in GK-1 with modern architecture. Independent entry, rooftop terrace, and Italian marble flooring. South Delhi's prime locality.",
      price: 45000000, type: "sale", category: "house", bedrooms: 4, bathrooms: 4, balconies: 2, area: 2800, floor: "2", totalFloors: "4", facing: "East", furnishing: "semi-furnished", age: "0-1 years",
      address: "M Block, Greater Kailash 1", locality: "Greater Kailash", city: "Delhi", state: "Delhi", pincode: "110048",
      images: JSON.stringify([img.house[1], img.house[2], img.house[0]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Lift", "CCTV", "Modular Kitchen", "Intercom"]),
      verified: true, featured: true, premium: true, ownerId: o(2), ownerType: "agent", views: 487,
    },
    {
      title: "3BHK Builder Floor in Sector 57, Gurgaon",
      description: "Premium 3BHK builder floor in Sector 57, Gurgaon. Ground floor with private garden. Near Golf Course Road and premium malls.",
      price: 18000000, type: "sale", category: "house", bedrooms: 3, bathrooms: 3, balconies: 1, area: 1800, floor: "Ground", totalFloors: "3", facing: "South", furnishing: "unfurnished", age: "1-3 years",
      address: "Sector 57", locality: "Sector 57", city: "Gurgaon", state: "Haryana", pincode: "122011",
      images: JSON.stringify([img.house[0], img.house[2]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Garden", "CCTV"]),
      verified: true, featured: false, ownerId: o(3), ownerType: "owner", views: 198,
    },
    {
      title: "Farmhouse with Land in Chattarpur, Delhi",
      description: "Beautiful farmhouse with 2 acres of land in Chattarpur, South Delhi. Lush green surroundings and private entrance.",
      price: 200000000, type: "sale", category: "house", bedrooms: 4, bathrooms: 4, area: 8000, facing: "South", furnishing: "furnished", age: "5-10 years",
      address: "Chattarpur Enclave", locality: "Chattarpur", city: "Delhi", state: "Delhi", pincode: "110074",
      images: JSON.stringify([img.villa[2], img.house[0], img.house[1]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Swimming Pool", "Garden", "CCTV", "Solar Panels"]),
      verified: true, featured: false, premium: true, ownerId: o(3), ownerType: "owner", views: 654,
    },

    // ============ HOUSES FOR RENT (3) ============
    {
      title: "3BHK Independent House for Rent in Vasant Kunj, Delhi",
      description: "Fully furnished 3BHK independent house in Vasant Kunj with private parking and garden. Near malls, schools, and hospitals.",
      price: 55000, type: "rent", category: "house", bedrooms: 3, bathrooms: 3, balconies: 1, area: 1800, floor: "Ground", totalFloors: "2", facing: "North", furnishing: "furnished", age: "5-10 years",
      address: "C Block, Vasant Kunj", locality: "Vasant Kunj", city: "Delhi", state: "Delhi", pincode: "110070",
      images: JSON.stringify(img.house), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Garden", "CCTV"]),
      verified: true, featured: true, ownerId: o(2), ownerType: "agent", views: 312,
    },
    {
      title: "2BHK Row House for Rent in Hinjawadi, Pune",
      description: "Spacious 2BHK row house with garden in Hinjawadi IT Park area. Ideal for families working in the IT corridor. Gated community with 24/7 security.",
      price: 25000, type: "rent", category: "house", bedrooms: 2, bathrooms: 2, area: 1200, facing: "East", furnishing: "semi-furnished", age: "3-5 years",
      address: "Phase 3, Hinjawadi", locality: "Hinjawadi", city: "Pune", state: "Maharashtra", pincode: "411057",
      images: JSON.stringify([img.house[1], img.house[2]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Garden", "Children Play Area"]),
      verified: true, featured: false, ownerId: o(1), ownerType: "owner", views: 176,
    },
    {
      title: "4BHK Builder Floor for Rent in Sector 50, Noida",
      description: "Premium 4BHK builder floor on first floor in Sector 50. Fully furnished with modular kitchen, wardrobes, and ACs in all rooms.",
      price: 40000, type: "rent", category: "house", bedrooms: 4, bathrooms: 3, balconies: 2, area: 2400, floor: "1", totalFloors: "3", facing: "West", furnishing: "furnished", age: "1-3 years",
      address: "Block C, Sector 50", locality: "Sector 50", city: "Noida", state: "Uttar Pradesh", pincode: "201301",
      images: JSON.stringify([img.house[0], img.house[1]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "CCTV", "Air Conditioning", "Modular Kitchen"]),
      verified: true, featured: false, ownerId: o(5), ownerType: "agent", views: 134,
    },

    // ============ VILLAS FOR SALE (4) ============
    {
      title: "Premium Villa in DLF Phase 5, Gurgaon",
      description: "Exquisite 5BHK independent villa in DLF Phase 5. Spread across 5000 sqft with private garden, modern interiors, and smart home features.",
      price: 85000000, type: "sale", category: "villa", bedrooms: 5, bathrooms: 5, balconies: 3, area: 5000, facing: "South", furnishing: "furnished", age: "0-1 years",
      address: "DLF Phase 5", locality: "DLF Phase 5", city: "Gurgaon", state: "Haryana", pincode: "122002",
      images: JSON.stringify(img.villa), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Swimming Pool", "Garden", "CCTV", "Fire Safety", "Solar Panels", "EV Charging"]),
      verified: true, featured: true, premium: true, ownerId: o(2), ownerType: "agent", views: 567,
    },
    {
      title: "4BHK Luxury Villa in Jubilee Hills, Hyderabad",
      description: "Contemporary 4BHK villa in Jubilee Hills with rooftop infinity pool, home cinema, and landscaped garden. Celebrity neighborhood.",
      price: 65000000, type: "sale", category: "villa", bedrooms: 4, bathrooms: 4, balconies: 2, area: 4200, facing: "East", furnishing: "furnished", age: "1-3 years",
      address: "Road No. 36, Jubilee Hills", locality: "Jubilee Hills", city: "Hyderabad", state: "Telangana", pincode: "500033",
      images: JSON.stringify([img.villa[1], img.villa[2], img.villa[0]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Swimming Pool", "Garden", "Home Theater", "Gym", "CCTV"]),
      verified: true, featured: true, premium: true, ownerId: o(6), ownerType: "owner", views: 723,
    },
    {
      title: "3BHK Villa in Sarjapur Road, Bangalore",
      description: "Elegant 3BHK villa in a gated community on Sarjapur Road. Vastu-compliant design with double-height living room and private terrace.",
      price: 25000000, type: "sale", category: "villa", bedrooms: 3, bathrooms: 3, balconies: 2, area: 2800, facing: "North-East", furnishing: "semi-furnished", age: "0-1 years",
      address: "Rainbow Drive Layout, Sarjapur Road", locality: "Sarjapur Road", city: "Bangalore", state: "Karnataka", pincode: "560035",
      images: JSON.stringify([img.villa[2], img.villa[0]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Swimming Pool", "Garden", "Club House", "Jogging Track"]),
      verified: true, featured: false, ownerId: o(4), ownerType: "owner", views: 389,
    },
    {
      title: "5BHK Beachside Villa in ECR, Chennai",
      description: "Stunning beachside villa on East Coast Road, Chennai. Wake up to ocean views. Private beach access, infinity pool, and tropical garden.",
      price: 95000000, type: "sale", category: "villa", bedrooms: 5, bathrooms: 5, balconies: 4, area: 6000, facing: "East", furnishing: "furnished", age: "3-5 years",
      address: "ECR, Kovalam", locality: "ECR", city: "Chennai", state: "Tamil Nadu", pincode: "603112",
      images: JSON.stringify(img.villa), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Swimming Pool", "Private Beach", "Garden", "CCTV", "Gym"]),
      verified: true, featured: true, premium: true, ownerId: o(2), ownerType: "agent", views: 876,
    },

    // ============ PLOTS / LAND FOR SALE (4) ============
    {
      title: "Residential Plot in Greater Noida West",
      description: "200 sq yard residential plot in a gated community in Greater Noida West. Clear title, RERA registered, with all approvals.",
      price: 3500000, type: "sale", category: "plot", area: 1800, facing: "East",
      address: "Sector 1, Greater Noida West", locality: "Greater Noida West", city: "Greater Noida", state: "Uttar Pradesh", pincode: "201308",
      images: JSON.stringify(img.plot), amenities: JSON.stringify(["Security", "Garden", "Children Play Area", "Jogging Track"]),
      verified: true, featured: false, ownerId: o(3), ownerType: "owner", views: 145,
    },
    {
      title: "Corner Plot in Sector 92, Gurgaon",
      description: "Premium corner plot of 300 sq yards in Sector 92 near Dwarka Expressway. Excellent investment opportunity with rapidly developing infrastructure.",
      price: 12000000, type: "sale", category: "plot", area: 2700, facing: "North-East",
      address: "Sector 92, Near Dwarka Expressway", locality: "Sector 92", city: "Gurgaon", state: "Haryana", pincode: "122505",
      images: JSON.stringify(img.plot), amenities: JSON.stringify(["Security", "Boundary Wall", "Water Connection", "Electricity"]),
      verified: true, featured: true, ownerId: o(3), ownerType: "owner", views: 234,
    },
    {
      title: "NA Plot in Lonavala, Maharashtra",
      description: "Non-agricultural hill-facing plot in Lonavala. Perfect for building a weekend farmhouse or vacation home. Scenic valley views and pleasant weather.",
      price: 8500000, type: "sale", category: "plot", area: 5000, facing: "West",
      address: "Tungarli, Lonavala", locality: "Tungarli", city: "Pune", state: "Maharashtra", pincode: "410401",
      images: JSON.stringify(img.plot), amenities: JSON.stringify(["Road Access", "Water Connection", "Electricity", "Clear Title"]),
      verified: true, featured: false, ownerId: o(1), ownerType: "owner", views: 189,
    },
    {
      title: "Industrial Plot in Manesar, Gurgaon",
      description: "HSIIDC approved industrial plot in Manesar IMT. Ready for construction with all clearances. Near NH-48 and KMP Expressway.",
      price: 25000000, type: "sale", category: "plot", area: 10000, facing: "South",
      address: "Sector 8, IMT Manesar", locality: "Manesar", city: "Gurgaon", state: "Haryana", pincode: "122051",
      images: JSON.stringify(img.plot), amenities: JSON.stringify(["Road Access", "Water Connection", "Electricity", "Drainage", "Security"]),
      verified: true, featured: false, ownerId: o(5), ownerType: "agent", views: 98,
    },

    // ============ OFFICE SPACES (4) ============
    {
      title: "Commercial Office Space in Connaught Place, Delhi",
      description: "Prime commercial office space in the heart of Delhi at Connaught Place. Fully air-conditioned with modular workstations and conference room.",
      price: 250000, type: "rent", category: "office", area: 2500, floor: "3", totalFloors: "8", facing: "North-East", furnishing: "furnished", age: "5-10 years",
      address: "Block A, Connaught Place", locality: "Connaught Place", city: "Delhi", state: "Delhi", pincode: "110001",
      images: JSON.stringify(img.comm), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "CCTV", "Fire Safety", "Air Conditioning", "Wi-Fi"]),
      verified: true, featured: true, ownerId: o(2), ownerType: "agent", views: 234,
    },
    {
      title: "IT Office Space in Sector 62, Noida",
      description: "Modern plug-and-play office space in Noida's IT hub. Furnished with 50 workstations, 2 cabins, conference room, and pantry. Near metro station.",
      price: 120000, type: "rent", category: "office", area: 3000, floor: "6", totalFloors: "12", facing: "North", furnishing: "furnished", age: "1-3 years",
      address: "A Block, Sector 62", locality: "Sector 62", city: "Noida", state: "Uttar Pradesh", pincode: "201301",
      images: JSON.stringify([img.comm[1], img.comm[2]]), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "CCTV", "Air Conditioning", "Cafeteria"]),
      verified: true, featured: false, ownerId: o(5), ownerType: "agent", views: 167,
    },
    {
      title: "Premium Office in BKC, Mumbai",
      description: "Grade-A office space in Bandra-Kurla Complex. Floor plate of 5000 sqft with panoramic city views. Perfect for MNCs and financial firms.",
      price: 500000, type: "rent", category: "office", area: 5000, floor: "15", totalFloors: "25", facing: "West", furnishing: "furnished", age: "0-1 years",
      address: "One BKC, Bandra Kurla Complex", locality: "BKC", city: "Mumbai", state: "Maharashtra", pincode: "400051",
      images: JSON.stringify(img.comm), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "CCTV", "Fire Safety", "Central AC", "Gym", "Cafeteria"]),
      verified: true, featured: true, premium: true, ownerId: o(1), ownerType: "owner", views: 456,
    },
    {
      title: "Office Space for Sale in Cyber City, Gurgaon",
      description: "Freehold office space in DLF Cyber City. Currently leased with 8% annual return. Excellent investment with blue-chip tenant.",
      price: 35000000, type: "sale", category: "office", area: 2000, floor: "8", totalFloors: "18", facing: "South", furnishing: "furnished", age: "3-5 years",
      address: "DLF Cyber City, Phase 3", locality: "Cyber City", city: "Gurgaon", state: "Haryana", pincode: "122002",
      images: JSON.stringify([img.comm[0], img.comm[2]]), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "CCTV", "Central AC"]),
      verified: true, featured: false, ownerId: o(3), ownerType: "owner", views: 289,
    },

    // ============ SHOPS (4) ============
    {
      title: "Retail Shop in Saket, New Delhi",
      description: "Prime location retail shop near Select Citywalk Mall, Saket. Ground floor with excellent footfall and visibility.",
      price: 35000000, type: "sale", category: "shop", area: 800, floor: "Ground", facing: "South", furnishing: "unfurnished", age: "5-10 years",
      address: "Saket District Centre", locality: "Saket", city: "Delhi", state: "Delhi", pincode: "110017",
      images: JSON.stringify(img.shop), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "CCTV", "Fire Safety", "Lift"]),
      verified: false, featured: false, ownerId: o(3), ownerType: "owner", views: 112,
    },
    {
      title: "Shop for Rent in Lajpat Nagar Market, Delhi",
      description: "Ground floor shop in the bustling Lajpat Nagar Central Market. 400 sqft with mezzanine. High footfall commercial area ideal for retail.",
      price: 75000, type: "rent", category: "shop", area: 400, floor: "Ground", facing: "East", furnishing: "unfurnished", age: "10+ years",
      address: "Central Market, Lajpat Nagar", locality: "Lajpat Nagar", city: "Delhi", state: "Delhi", pincode: "110024",
      images: JSON.stringify(img.shop), amenities: JSON.stringify(["Security", "Power Backup", "CCTV"]),
      verified: true, featured: false, ownerId: o(2), ownerType: "agent", views: 345,
    },
    {
      title: "Showroom for Sale in MG Road, Bangalore",
      description: "Double-height showroom on MG Road with premium glass facade. 1500 sqft ideal for luxury brands, auto showroom, or flagship store.",
      price: 45000000, type: "sale", category: "shop", area: 1500, floor: "Ground", totalFloors: "2", facing: "North", furnishing: "unfurnished", age: "5-10 years",
      address: "MG Road", locality: "MG Road", city: "Bangalore", state: "Karnataka", pincode: "560001",
      images: JSON.stringify([img.comm[0], img.shop[0]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "CCTV", "Fire Safety", "Central AC"]),
      verified: true, featured: true, ownerId: o(4), ownerType: "owner", views: 267,
    },
    {
      title: "Shop for Rent in Indiranagar, Bangalore",
      description: "Corner shop space in Indiranagar 100ft Road. Perfect for cafe, restaurant, or boutique. 600 sqft with outdoor seating space.",
      price: 85000, type: "rent", category: "shop", area: 600, floor: "Ground", facing: "North-West", furnishing: "unfurnished", age: "3-5 years",
      address: "100ft Road, Indiranagar", locality: "Indiranagar", city: "Bangalore", state: "Karnataka", pincode: "560038",
      images: JSON.stringify(img.shop), amenities: JSON.stringify(["Parking", "Power Backup", "CCTV", "Water Connection"]),
      verified: true, featured: false, ownerId: o(4), ownerType: "owner", views: 198,
    },

    // ============ COMMERCIAL RENT (3) ============
    {
      title: "Warehouse for Rent in Bhiwandi, Mumbai",
      description: "10,000 sqft warehouse space in Bhiwandi industrial belt. 30ft clear height, loading docks, and 24/7 access. Near Mumbai-Nashik Highway.",
      price: 200000, type: "rent", category: "commercial", area: 10000, facing: "South", furnishing: "unfurnished", age: "5-10 years",
      address: "MIDC, Bhiwandi", locality: "Bhiwandi", city: "Mumbai", state: "Maharashtra", pincode: "421302",
      images: JSON.stringify([img.comm[0]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Loading Dock", "Fire Safety", "24/7 Access"]),
      verified: true, featured: false, ownerId: o(1), ownerType: "owner", views: 87,
    },
    {
      title: "Commercial Space for Rent in Nehru Place, Delhi",
      description: "Commercial showroom space in Asia's largest IT market. 1200 sqft on ground floor with excellent visibility. Ideal for electronics, IT, or services.",
      price: 150000, type: "rent", category: "commercial", area: 1200, floor: "Ground", totalFloors: "6", facing: "East", furnishing: "unfurnished", age: "10+ years",
      address: "Nehru Place Market", locality: "Nehru Place", city: "Delhi", state: "Delhi", pincode: "110019",
      images: JSON.stringify(img.comm), amenities: JSON.stringify(["Parking", "Lift", "Security", "Power Backup", "CCTV"]),
      verified: true, featured: false, ownerId: o(2), ownerType: "agent", views: 156,
    },
    {
      title: "Co-working Space in HSR Layout, Bangalore",
      description: "Fully managed co-working space with 80 seats in HSR Layout. Meeting rooms, high-speed internet, pantry, and relaxation zone included.",
      price: 180000, type: "rent", category: "commercial", area: 2000, floor: "2", totalFloors: "4", facing: "North", furnishing: "furnished", age: "1-3 years",
      address: "27th Main, HSR Layout", locality: "HSR Layout", city: "Bangalore", state: "Karnataka", pincode: "560102",
      images: JSON.stringify([img.comm[1], img.comm[2]]), amenities: JSON.stringify(["Parking", "Security", "Power Backup", "Wi-Fi", "Cafeteria", "Meeting Room", "CCTV"]),
      verified: true, featured: true, ownerId: o(5), ownerType: "agent", views: 234,
    },

    // ============ PG / CO-LIVING (3) ============
    {
      title: "Boys PG in Sector 62, Noida",
      description: "Fully furnished PG accommodation for working professionals in Sector 62, Noida. Includes meals, Wi-Fi, housekeeping, and laundry. Near IT companies and metro.",
      price: 8000, type: "pg", category: "apartment", bedrooms: 1, bathrooms: 1, area: 150, floor: "2", totalFloors: "3", facing: "North", furnishing: "furnished", age: "1-3 years",
      address: "Block J, Sector 62", locality: "Sector 62", city: "Noida", state: "Uttar Pradesh", pincode: "201301",
      images: JSON.stringify(img.pg), amenities: JSON.stringify(["Wi-Fi", "Meals", "Housekeeping", "Laundry", "Power Backup", "CCTV", "Air Conditioning"]),
      verified: true, featured: false, ownerId: o(0), ownerType: "owner", views: 567,
    },
    {
      title: "Girls PG in Koramangala, Bangalore",
      description: "Safe and secure PG for women in Koramangala 4th Block. Home-cooked meals, attached bathroom, and Wi-Fi. Walking distance to offices and cafes.",
      price: 12000, type: "pg", category: "apartment", bedrooms: 1, bathrooms: 1, area: 180, floor: "1", totalFloors: "3", facing: "East", furnishing: "furnished", age: "3-5 years",
      address: "4th Block, Koramangala", locality: "Koramangala", city: "Bangalore", state: "Karnataka", pincode: "560034",
      images: JSON.stringify(img.pg), amenities: JSON.stringify(["Wi-Fi", "Meals", "Housekeeping", "Power Backup", "CCTV", "Geyser", "Security Guard"]),
      verified: true, featured: true, ownerId: o(4), ownerType: "owner", views: 432,
    },
    {
      title: "Co-living Space in Hinjawadi, Pune",
      description: "Modern co-living space for young professionals in Hinjawadi Phase 1. Fully furnished rooms with AC, meals, gym, and community events.",
      price: 10000, type: "pg", category: "apartment", bedrooms: 1, bathrooms: 1, area: 200, floor: "3", totalFloors: "5", facing: "West", furnishing: "furnished", age: "0-1 years",
      address: "Phase 1, Hinjawadi", locality: "Hinjawadi", city: "Pune", state: "Maharashtra", pincode: "411057",
      images: JSON.stringify(img.pg), amenities: JSON.stringify(["Wi-Fi", "Meals", "Gym", "Laundry", "Power Backup", "CCTV", "Air Conditioning", "Community Lounge"]),
      verified: true, featured: false, ownerId: o(1), ownerType: "owner", views: 298,
    },
  ];

  for (const prop of properties) {
    await prisma.property.create({ data: prop });
  }

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

  console.log(`Seeded: ${users.length + 1} users, ${properties.length} properties`);
  console.log("\nLogin credentials:");
  console.log("Admin: admin@propertypointers.com / admin123");
  console.log("User:  user@propertypointers.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
