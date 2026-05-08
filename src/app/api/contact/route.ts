import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabase() {
    if (!_supabase) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
        _supabase = createClient(url, key);
    }
    return _supabase;
}

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { error: dbError } = await getSupabase()
            .from("messages")
            .insert({ name, email, subject, message });

        if (dbError) {
            console.error("Supabase insert error:", dbError);
            return NextResponse.json(
                { error: "Failed to save message." },
                { status: 500 }
            );
        }

        // Send Discord webhook notification (server-side only — URL never exposed to client)
        const webhookUrl = process.env.DISCORD_WEBHOOK;
        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        embeds: [
                            {
                                title: `📩 New message: ${subject}`,
                                color: 0xf5a623,
                                fields: [
                                    { name: "Name", value: name, inline: true },
                                    { name: "Email", value: email, inline: true },
                                    { name: "Message", value: message.slice(0, 1024) },
                                ],
                                timestamp: new Date().toISOString(),
                            },
                        ],
                    }),
                });
            } catch {
                // Webhook failure shouldn't block success
                console.error("Discord webhook failed");
            }
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Invalid request." },
            { status: 400 }
        );
    }
}
