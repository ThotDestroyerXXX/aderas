import {
  EmailTemplateProps,
  EmailTemplate,
} from "@/vendor/resend/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is not set.");
}

if (!INTERNAL_API_SECRET) {
  throw new Error("INTERNAL_API_SECRET environment variable is not set.");
}

const resend = new Resend(RESEND_API_KEY);

const sendEmailSchema = z
  .object({
    email: z.string().email(),
    subject: z.string().min(1),
    type: z
      .object({
        kind: z.string().min(1),
      })
      .passthrough(),
  })
  .superRefine(({ type }, ctx) => {
    if (
      type.kind === "OTP" &&
      (typeof type.otpCode !== "string" || type.otpCode.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["type", "otpCode"],
        message: "otpCode is required when type.kind is OTP.",
      });
    }
  });

export async function POST(request: NextRequest) {
  if (request.headers.get("x-internal-secret") !== INTERNAL_API_SECRET) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const parsedPayload = sendEmailSchema.safeParse(await request.json());

    if (!parsedPayload.success) {
      return Response.json(
        {
          error: "Invalid request body.",
          details: parsedPayload.error.flatten(),
        },
        { status: 400 },
      );
    }

    const payload = parsedPayload.data as EmailTemplateProps;
    const { type, email, subject } = payload;
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL ?? "Acme <onboarding@resend.dev>",
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
