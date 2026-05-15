import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir, appendFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const CSV_DIR = path.join(process.cwd(), "data");
const CSV_FILE = path.join(CSV_DIR, "newsletter_subscribers.csv");

async function ensureCsvExists() {
  if (!existsSync(CSV_DIR)) {
    await mkdir(CSV_DIR, { recursive: true });
  }

  if (!existsSync(CSV_FILE)) {
    const header = "ID,Email,Name,Source,Status,Created At,Updated At\n";
    await writeFile(CSV_FILE, header, "utf-8");
  }
}

async function appendToCsv(subscriber: any) {
  const csvRow = `${subscriber.id},"${subscriber.email}","${subscriber.name || ''}","${subscriber.source || ''}","${subscriber.status}","${subscriber.createdAt.toISOString()}","${subscriber.updatedAt.toISOString()}"\n`;
  await appendFile(CSV_FILE, csvRow, "utf-8");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        source: source || "website",
        status: "active",
      },
    });

    await ensureCsvExists();
    await appendToCsv(subscriber);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        subscriber: {
          email: subscriber.email,
          name: subscriber.name,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "export") {
      const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
      });

      const csvContent = [
        "ID,Email,Name,Source,Status,Created At,Updated At",
        ...subscribers.map(
          (sub) =>
            `${sub.id},"${sub.email}","${sub.name || ''}","${sub.source || ''}","${sub.status}","${sub.createdAt.toISOString()}","${sub.updatedAt.toISOString()}"`
        ),
      ].join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error: any) {
    console.error("Newsletter fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: "Subscriber updated successfully",
      subscriber,
    });
  } catch (error: any) {
    console.error("Newsletter update error:", error);
    return NextResponse.json(
      { error: "Failed to update subscriber" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await prisma.newsletterSubscriber.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error: any) {
    console.error("Newsletter delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
