import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// The contact form's one endpoint: checks the note, keeps it in Supabase (table "messages"), and lets
// the team know through the Discord webhook when one is set. Answers carry no internal detail.

const LIMIT = { name: 120, email: 254, message: 5000 } as const;
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// A light brake per server instance: a few notes from one address in ten minutes, then a pause.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

let supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient | null {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
    if (!url || !key) return null;
    supabase = createClient(url, key, { auth: { persistSession: false } });
  }
  return supabase;
}

function tooMany(address: string): boolean {
  const now = Date.now();
  const times = (recent.get(address) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_PER_WINDOW) {
    recent.set(address, times);
    return true;
  }
  recent.set(address, [...times, now]);
  if (recent.size > 5000) recent.clear();
  return false;
}

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

function field(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Your message could not be read. Please try again.", 400);
  }
  if (typeof body !== "object" || body === null) return fail("Your message could not be read. Please try again.", 400);
  const input = body as Record<string, unknown>;

  // a field people never see: whatever fills it is thanked and ignored
  if (field(input.website)) return NextResponse.json({ success: true });

  const name = field(input.name);
  const email = field(input.email);
  const message = field(input.message);
  if (!name || name.length > LIMIT.name) return fail("Please add your name.", 400);
  if (!email || email.length > LIMIT.email || !EMAIL_SHAPE.test(email)) return fail("Please add an email address we can reply to.", 400);
  if (message.length < 10) return fail("Please write a short message.", 400);
  if (message.length > LIMIT.message) return fail("Your message is too long. Please keep it under 5,000 characters.", 400);

  const address = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (tooMany(address)) return fail("You have sent several messages just now. Please try again in a few minutes.", 429);

  const db = getSupabase();
  if (!db) {
    console.error("contact: Supabase is not configured");
    return fail("Your message could not be sent. Please try again in a minute.", 503);
  }
  const { error: dbError } = await db.from("messages").insert({ name, email, message });
  if (dbError) {
    console.error("contact: insert failed", dbError.code ?? "", dbError.message);
    return fail("Your message could not be sent. Please try again in a minute.", 500);
  }

  // The webhook URL stays on the server: only this route reads it. Never give it a NEXT_PUBLIC_ name,
  // which Next.js copies into the JavaScript it sends to browsers.
  // Mentions are switched off, so a note cannot ping anyone.
  const webhookUrl = process.env.DISCORD_WEBHOOK;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          allowed_mentions: { parse: [] },
          embeds: [
            {
              title: "New message from akarilabs.io",
              color: 0xebc77f,
              fields: [
                { name: "Name", value: name.slice(0, 256), inline: true },
                { name: "Email", value: email.slice(0, 256), inline: true },
                { name: "Message", value: message.slice(0, 1024) },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      // the note is saved; a missed notification must not fail the visitor
      console.error("contact: Discord webhook failed");
    }
  }

  return NextResponse.json({ success: true });
}
