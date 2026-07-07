import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const session = await getSession();
    const answerBody = (body.body || body.answer || "").toString().trim();
    if (!answerBody || answerBody.length < 10) return NextResponse.json({ error: "Answer must be at least 10 characters." }, { status: 400 });

    const authorName = session?.name || (body.authorName || body.name || "").toString().trim();
    if (!authorName) return NextResponse.json({ error: "Your name is required." }, { status: 400 });

    const question = await prisma.communityQuestion.findUnique({ where: { id: params.id } });
    if (!question) return NextResponse.json({ error: "Question not found." }, { status: 404 });

    const authorRole = session?.role === "admin" ? "admin" : session?.role === "expert" ? "expert" : "user";

    const answer = await prisma.communityAnswer.create({
      data: {
        questionId: params.id,
        body: answerBody,
        authorId: session?.userId || null,
        authorName,
        authorRole,
        status: authorRole === "admin" || authorRole === "expert" ? "approved" : "pending",
      },
    });

    return NextResponse.json({ success: true, answer }, { status: 201 });
  } catch (err) {
    console.error("[community/questions/[id]/answers POST]", err);
    return NextResponse.json({ error: "Failed to post answer." }, { status: 500 });
  }
}
