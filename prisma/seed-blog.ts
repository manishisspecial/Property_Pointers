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
      title: "How to Check if a Project is RERA Approved Before Buying a Property",
      slug: "how-to-check-rera-approved-project-before-buying",
      excerpt: "Buying a home is one of the biggest financial decisions for most people. Learn how to verify RERA registration, protect yourself from fraud, and make informed property investment decisions.",
      content: `Buying a home is one of the biggest financial decisions for most people. To protect homebuyers from fraud, delays, and misleading promises, the Government of India introduced the Real Estate (Regulation and Development) Act, 2016, commonly known as RERA.

RERA was created to bring transparency, accountability, and trust to the real estate sector. Today, every residential or commercial project above a certain size must be registered with the respective state's RERA authority.

Before investing in any property, it is essential to verify whether the project is RERA approved. This ensures that the project complies with legal regulations and that buyers are protected under the law.

## What is a RERA Approved Project?

A RERA-approved project is one that has been officially registered with the state's Real Estate Regulatory Authority.

To obtain RERA registration, developers must submit key project details such as:
- Project layout and approvals
- Construction timeline
- Land ownership documents
- Financial disclosures
- Builder background and track record

Once approved, the project receives a unique RERA registration number, which buyers can verify online.

## Why Checking RERA Approval is Important

Verifying RERA registration helps buyers avoid several common real estate risks.

### 1. Protection Against Project Delays
Builders registered under RERA must follow the committed project timeline.

### 2. Transparency in Project Details
Developers must disclose all important project information including approvals, layout plans, and construction status.

### 3. Financial Accountability
RERA requires builders to deposit 70% of project funds in an escrow account, ensuring the money is used only for that specific project.

### 4. Legal Protection for Buyers
If the builder violates commitments, buyers can file complaints directly with the RERA authority.

## How to Check if a Project is RERA Approved

Verifying RERA approval is simple and can be done online in a few minutes.

### Step 1: Visit the State RERA Website

Each state has its own RERA portal. For example:
- UP RERA for Noida and Greater Noida projects
- Maharashtra RERA (MahaRERA) for projects in Mumbai and Pune
- Haryana RERA for Gurgaon projects

Search for the official website of the respective state's RERA authority.

### Step 2: Go to the Project Registration Section

On the RERA website, look for options such as:
- Registered Projects
- Project Search
- Project Details

These sections allow users to search for projects registered under RERA.

### Step 3: Enter Project or Builder Details

You can search using:
- Project name
- Builder name
- RERA registration number

The portal will display a list of registered projects matching your search.

### Step 4: Verify Project Details

Click on the project to view detailed information, including:
- RERA registration number
- Project completion timeline
- Project location
- Developer information
- Construction progress updates
- Project approvals and documents

If the project appears in the official database, it is registered under RERA.

## Key Details You Should Always Check

Even if the project is registered under RERA, buyers should review the following information carefully.

- **Project Completion Date** — Check the expected completion timeline submitted by the builder.
- **Land Title** — Ensure the developer has clear ownership of the land.
- **Construction Status** — Review the progress reports submitted to the RERA authority.
- **Litigation or Disputes** — Some projects may have pending disputes or complaints.

## When is RERA Registration Mandatory?

Under RERA rules, projects must be registered if they meet the following criteria:
- Land area exceeds 500 square meters, or
- The project has more than 8 apartments

Projects below this threshold may not require RERA registration.

## Warning Signs of a Non-RERA Project

Buyers should be cautious if:
- The builder refuses to provide a RERA number
- The project is missing from the RERA website
- The builder promises unrealistic delivery timelines
- The project approvals are unclear

Such cases may indicate legal or regulatory risks.

## How RERA Has Changed the Indian Real Estate Market

Since its implementation, RERA has significantly improved buyer confidence in the property market.

Some key impacts include:
- Increased transparency in project information
- Greater accountability for developers
- Reduced project delays
- Better protection for homebuyers

Because of these benefits, checking RERA approval has become a standard step in the home-buying process.

## Conclusion

Before buying any property, verifying whether the project is RERA approved is crucial. It ensures that the developer follows regulatory guidelines and provides buyers with legal protection.

By simply checking the project details on the official RERA website, buyers can make more informed decisions and reduce the risks associated with real estate investments.

Property platforms like Property Pointers also help simplify the research process by listing verified projects, builder details, and user reviews, allowing homebuyers to explore reliable property options in one place.

## Frequently Asked Questions (FAQs)

### What is a RERA registration number?
A RERA registration number is a unique identification number issued to real estate projects registered with the Real Estate Regulatory Authority.

### Can a builder sell property without RERA approval?
For projects that meet the registration criteria, selling property without RERA approval is illegal and punishable under the law.

### Is RERA approval mandatory for all projects?
No. Projects with less than 8 apartments or land below 500 square meters may be exempt from RERA registration.

### How can buyers verify RERA registration online?
Buyers can visit the official state RERA website, search for the project name or builder, and verify the registration details.

### What should buyers do if a builder violates RERA rules?
Buyers can file a complaint with the respective state RERA authority, which can investigate the issue and take action against the developer.`,
      coverImage: "/blog/rera-check-project.png",
      category: "legal",
      byline: "Gaurav Chopra",
      tags: JSON.stringify(["RERA", "property buying", "real estate law", "home buyer guide", "RERA verification", "legal protection"]),
      published: true,
      views: 0,
      authorId: admin.id,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.create({ data: post });
  }

  console.log(`Seeded ${posts.length} blog post(s)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
