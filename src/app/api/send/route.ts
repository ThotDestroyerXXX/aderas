import {
  EmailTemplateProps,
  EmailTemplate,
} from "@/vendor/resend/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

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
