import crypto from "crypto";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { customerId } = await request.json();

  if (!customerId) {
    return NextResponse.json({ error: 'Missing customerId' }, { status: 400 });
  }

  const API_KEY = process.env.CHURNKEY_API_KEY || ""; // Your Churnkey API Key
  const userHash = crypto
    .createHmac("sha256", API_KEY)
    .update(customerId)
    .digest("hex");

  return NextResponse.json({ userHash });
}