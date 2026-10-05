import { NextResponse } from "next/server";

// Reçoit le formulaire de rendez-vous et l'ajoute à une Google Sheet via un
// script Google Apps Script publié en "application Web" (voir README).
// Variable d'environnement requise : GOOGLE_SHEETS_WEBHOOK_URL

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Champ piège rempli = robot : on répond OK sans rien enregistrer.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const entry = {
    date: new Date().toISOString(),
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    service: clean(body.service, 120),
    message: clean(body.message, 2000),
  };

  if (!entry.name || !entry.phone || body.consent !== "on") {
    return NextResponse.json({ error: "missing" }, { status: 422 });
  }

  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[rdv] GOOGLE_SHEETS_WEBHOOK_URL absent, demande reçue :", entry);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "not-configured" }, { status: 500 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });

  return NextResponse.json({ ok: true });
}
