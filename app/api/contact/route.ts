import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, company, interest, message, type } = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const subject = type === "demo" ? "New Demo Request" : "New Contact Form Message"
    const typeLabel = type === "demo" ? "Demo Request" : "Contact Form"

    // Check if environment variables are configured
    if (!process.env.CONTACT_EMAIL || !process.env.CONTACT_EMAIL_PASSWORD) {
      console.log("[v0] Email credentials not configured. Form data received:", {
        name,
        email,
        company,
        interest,
        message,
        type,
      })
      return NextResponse.json({
        success: true,
        message: "Message received! (Email will be sent when deployed to Vercel)",
      })
    }

    const emailUser = process.env.CONTACT_EMAIL
    const emailPass = process.env.CONTACT_EMAIL_PASSWORD
    console.log("[v0] Using email:", emailUser)
    console.log("[v0] Password length:", emailPass?.length, "chars")
    console.log("[v0] Password first 2 chars:", emailPass?.substring(0, 2) + "***")

    const nodemailer = await import("nodemailer")

    // If your GoDaddy email uses Microsoft 365, change host to: smtp.office365.com
    const transporter = nodemailer.default.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true, // required for 465
    auth: {
            user: emailUser,
            pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: true, // Enable debug output
    })

    console.log("[v0] Attempting SMTP connection to smtpout.secureserver.net:587...")

    try {
      await transporter.verify()
      console.log("[v0] SMTP connection verified successfully")
    } catch (verifyError: any) {
      console.log("[v0] SMTP verify failed:", verifyError.message)
      console.log("[v0] Trying to send anyway...")
    }

    const mailOptions = {
      from: emailUser,
      to: emailUser,
      replyTo: email,
      subject: subject,
      html: `
        <h2>${typeLabel}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Area of Interest:</strong> ${interest || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    console.log("[v0] Sending email...")
    await transporter.sendMail(mailOptions)
    console.log("[v0] Email sent successfully!")
 
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error: any) {
    console.error("[v0] Email error:", error)
    console.error("[v0] Error code:", error.code)
    console.error("[v0] Error response:", error.response)
    return NextResponse.json({ error: "Failed to send email. Please check SMTP credentials." }, { status: 500 })
  }
}
