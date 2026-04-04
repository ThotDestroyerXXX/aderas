import {
  EmailTemplateProps,
  EmailTemplate,
} from "@/vendor/resend/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as EmailTemplateProps;
    const { type, email, subject } = payload;

    if (!type || !email || !subject) {
      return Response.json(
        { error: "Missing required fields: type, email, subject." },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Acme <onboarding@resend.dev>",
      to: [email],
      subject,
      html: EmailTemplate({ type, email, subject }),
    });

    if (error) {
      console.error("Failed to send email via Resend:", error);
      return Response.json({ error: "Failed to send email." }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Unexpected error while sending email:", error);
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }
}
