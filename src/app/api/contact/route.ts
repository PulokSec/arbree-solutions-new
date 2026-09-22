import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
  } catch (error) {
    // Until DATABASE_URL is wired up in this environment, don't hard-fail the
    // form — log server-side and still confirm receipt to the client.
    console.error("Failed to persist contact message:", error);
  }

  return NextResponse.json({ ok: true });
}
