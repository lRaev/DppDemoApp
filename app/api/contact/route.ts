import { NextResponse } from "next/server"

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 3 // Max 3 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ||
               req.headers.get("x-real-ip") ||
               "unknown"

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const { name, email, company, interest, message, type, website, timestamp, turnstileToken } = await req.json()

    // Honeypot check - if 'website' field is filled, it's likely a bot
    if (website && website.trim() !== '') {
      // Silently reject but return success to confuse bots
      return NextResponse.json({ success: true, message: "Message sent successfully!" })
    }

    // Time-based check - reject if submitted too quickly (< 3 seconds)
    // Real users take time to fill forms, bots submit instantly
    if (timestamp && Date.now() - timestamp < 3000) {
      // Silently reject but return success to confuse bots
      return NextResponse.json({ success: true, message: "Message sent successfully!" })
    }

    // Verify Cloudflare Turnstile token
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json({ error: "Security verification required" }, { status: 400 })
      }

      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
          }),
        }
      )

      const turnstileResult = await turnstileResponse.json()

      if (!turnstileResult.success) {
        console.log("Turnstile verification failed:", turnstileResult)
        return NextResponse.json({ error: "Security verification failed" }, { status: 400 })
      }

      console.log("Turnstile verification passed")
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Basic content validation (prevent very long messages)
    if (message.length > 5000 || name.length > 100) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 })
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
