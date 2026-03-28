import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function getSiteContact() {
  try {
    const s = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    return {
      phone: s?.contactPhone || "+91-9990074072",
      email: s?.contactEmail || "propertypointersofficial@gmail.com",
      address: s?.address || "New Delhi",
    };
  } catch {
    return { phone: "+91-9990074072", email: "propertypointersofficial@gmail.com", address: "New Delhi" };
  }
}

function buildFaqResponses(c: { phone: string; email: string; address: string }): Record<string, string> {
  return {
    buy: "Looking to buy a property? Here's how Property Pointers can help:\n\n1. Use the search bar to find properties by city, locality, or project\n2. Filter by budget, BHK, and property type\n3. Check verified listings marked with ✓\n4. Contact owners directly - No brokerage!\n5. Use our EMI Calculator to plan your finances\n\nBrowse properties: /properties?type=sale",
    rent: "Looking for rental properties? We've got you covered!\n\n1. Search by your preferred locality\n2. Filter by budget and furnishing type\n3. Connect directly with property owners\n4. Zero brokerage on direct owner listings\n5. Virtual tours available for select properties\n\nBrowse rentals: /properties?type=rent",
    sell: "Want to sell your property? List it FREE on Property Pointers!\n\n1. Click 'Post Property' in the top menu\n2. Add property details and photos\n3. Get verified badge for faster response\n4. Reach thousands of buyers instantly\n5. Track inquiries from your dashboard\n\nPost your property: /post-property",
    price: "Property prices vary by location, type, and amenities. Here's a general guide for popular areas:\n\n• Noida Sector 150: ₹5,500-8,000/sqft\n• Greater Noida: ₹3,500-6,000/sqft\n• Gurgaon: ₹8,000-15,000/sqft\n• Delhi South: ₹15,000-30,000/sqft\n\nUse our search filters to find properties in your budget range.",
    loan: "Home Loan Information:\n\n• Current interest rates: 8.5% - 9.5% p.a.\n• Most banks offer up to 80% of property value\n• Tenure: Up to 30 years\n• EMI Calculator available on our platform\n\nTry our EMI Calculator: /calculator\n\nDocuments needed: ID proof, income proof, property papers, bank statements.",
    emi: "Use our EMI Calculator to plan your home loan!\n\nVisit: /calculator\n\nQuick estimate:\n• ₹50 Lac loan, 20 years, 8.5% = ~₹43,391/month\n• ₹1 Cr loan, 20 years, 8.5% = ~₹86,782/month\n\nTip: A shorter tenure means higher EMI but less total interest paid.",
    contact: `You can reach Property Pointers through:\n\n📞 Phone: ${c.phone}\n📧 Email: ${c.email}\n📍 Office: ${c.address}\n\nOr use this chat for instant help! Our team is available Mon-Sat, 9 AM - 7 PM.`,
    noida: "Noida is one of the fastest-growing real estate markets in NCR!\n\nPopular sectors for buying:\n• Sector 150 (Expressway) - Premium apartments\n• Sector 75-79 - Mid-range, well-connected\n• Greater Noida West - Budget-friendly\n• Sector 128-137 - Luxury villas\n\nBrowse Noida properties on our platform!",
  };
}

function generateResponse(message: string, faq: Record<string, string>): string {
  const lower = message.toLowerCase();

  for (const [key, response] of Object.entries(faq)) {
    if (lower.includes(key)) return response;
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! Welcome to Property Pointers. How can I help you today?\n\nI can assist with:\n• Finding properties to buy or rent\n• Property pricing information\n• Home loan & EMI details\n• Selling your property\n• Area guides for popular cities";
  }

  if (lower.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with? Feel free to ask about properties, pricing, or home loans.";
  }

  if (lower.includes("commercial") || lower.includes("office") || lower.includes("shop")) {
    return "Looking for commercial property?\n\nWe have listings for:\n• Office spaces\n• Retail shops\n• Commercial land\n• Co-working spaces\n• Warehouses\n\nBrowse commercial properties: /properties?category=commercial";
  }

  if (lower.includes("plot") || lower.includes("land")) {
    return "Interested in plots & land?\n\nWe offer:\n• Residential plots\n• Commercial plots\n• Agricultural land\n• Industrial plots\n\nKey tips:\n• Always verify land title\n• Check for RERA registration\n• Verify development plans\n\nBrowse plots: /properties?category=plot";
  }

  return "I'd be happy to help! Here are some things I can assist with:\n\n1. **Buy Property** - Search verified listings\n2. **Rent Property** - Find rental homes\n3. **Sell Property** - List your property FREE\n4. **Price Trends** - Know market rates\n5. **Home Loans** - EMI calculator & info\n6. **Commercial** - Office & shop listings\n\nPlease ask about any of these topics!";
}

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId = "anonymous" } = await req.json();
    const contact = await getSiteContact();
    const faq = buildFaqResponses(contact);
    const response = generateResponse(message, faq);

    const session = await getSession();

    await prisma.chatMessage.create({
      data: {
        userId: session?.userId || null,
        message,
        response,
        sessionId,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({
      response: "I'm having trouble connecting right now. Please try again in a moment, or contact us via our website.",
    });
  }
}
