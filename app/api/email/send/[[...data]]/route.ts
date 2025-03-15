import { NextResponse, NextRequest } from "next/server";
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(request: NextRequest, ) {
  try {
    const { to, subject, message } = await request.json();


    console.log(to, subject, message, "email data");
    // return NextResponse.json({ success: true });

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    } as SMTPTransport.Options);

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to,
      subject,
      text: message,
      html: message.replace(/\n/g, '<br />')
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: String(error) },
      { status: 500 }
    );
  }
}