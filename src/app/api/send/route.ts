import {
  EmailTemplateProps,
  EmailTemplate,
} from "@/vendor/resend/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as EmailTemplateProps;
    const { type, email, subject } = payload;

    if (!type || !email || !subject) {
      return Response.json(
        { error: "Missing type, email, or subject in request body." },
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
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
