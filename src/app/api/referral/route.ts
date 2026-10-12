import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const referralSchema = z.object({ email: z.string().trim().email().max(254) });

/** "Get Referral Link" requests from the CTA banner land in the admin Messages inbox so the
 * partner tracking link can be sent back by hand. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = referralSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: "Referral link request",
        email: parsed.data.email,
        message: "Requested a partner referral tracking link from the CTA banner.",
      },
    });
  } catch (error) {
    console.error("Failed to persist referral request:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
