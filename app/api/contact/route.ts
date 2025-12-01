import { NextResponse } from "next/server"
import validator from "validator"

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 3 // Max 3 requests per minute per IP

interface ContactFormData {
  name: string
  email: string
  company: string
  interest: string
  message: string
  website?: string
  timestamp: number
  turnstileToken?: string
  type?: string
}

interface SanitizedFormData {
  name: string
  email: string
  company: string
  interest: string
  message: string
  type?: string
}

// Sanitize and validate input
function sanitizeAndValidate(data: ContactFormData): {
  valid: boolean
  errors: Record<string, string>
  sanitized?: SanitizedFormData
} {
  const errors: Record<string, string> = {}

  // 1. Validate name first, then sanitize
  const rawName = data.name?.trim() || ''

  if (!rawName) {
    errors.name = 'Name is required'
  } else if (rawName.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else if (rawName.length > 100) {
    errors.name = 'Name is too long'
  } else if (!/^[a-zA-Z\s'-]+$/.test(rawName)) {
    errors.name = 'Name contains invalid characters'
  }

  // Escape after validation
  const name = validator.escape(rawName)

  // 2. Validate email first, then sanitize
  const rawEmail = data.email?.trim().toLowerCase() || ''

  if (!rawEmail) {
    errors.email = 'Email is required'
  } else if (!validator.isEmail(rawEmail)) {
    errors.email = 'Invalid email format'
  } else if (rawEmail.length > 254) {
    errors.email = 'Email is too long'
  }

  // Normalize and escape after validation
  const email = validator.escape(validator.normalizeEmail(rawEmail) || rawEmail)

  // 3. Validate company first, then sanitize
  const rawCompany = data.company?.trim() || ''

  if (rawCompany && rawCompany.length > 200) {
    errors.company = 'Company name is too long'
  }

  const company = validator.escape(rawCompany)

  // 4. Validate interest
  const validInterests = [
    'platform',
    'compliance', 
    'implementation',
    'integration',
    'enterprise',
    'other'
  ]
  
  const interest = data.interest?.trim() || ''
  
  if (interest && !validInterests.includes(interest)) {
    errors.interest = 'Invalid interest selection'
  }

  // 5. Validate message first, then sanitize
  const rawMessage = data.message?.trim() || ''

  if (!rawMessage) {
    errors.message = 'Message is required'
  } else if (rawMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters'
  } else if (rawMessage.length > 5000) {
    errors.message = 'Message is too long'
  }

  const message = validator.escape(rawMessage)

  // Return validation result
  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      name,
      email,
      company,
      interest,
      message,
      type: data.type
    }
  }
}

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

    const body = await req.json() as ContactFormData

    // Honeypot check - if 'website' field is filled, it's likely a bot
    if (body.website && body.website.trim() !== '') {
      // Silently reject but return success to confuse bots
      console.log(`Bot detected (honeypot): IP ${ip}`)
      return NextResponse.json({ success: true, message: "Message sent successfully!" })
    }

    // Time-based check - reject if submitted too quickly (< 3 seconds)
    if (body.timestamp && Date.now() - body.timestamp < 3000) {
      // Silently reject but return success to confuse bots
      console.log(`Bot detected (too fast): IP ${ip}`)
      return NextResponse.json({ success: true, message: "Message sent successfully!" })
    }

    // Verify Cloudflare Turnstile token
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!body.turnstileToken) {
        return NextResponse.json({ error: "Security verification required" }, { status: 400 })
      }

      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: body.turnstileToken,
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

    // ✅ SANITIZE AND VALIDATE INPUT
    const validation = sanitizeAndValidate(body)

    if (!validation.valid) {
      console.log("Validation failed:", validation.errors)
      return NextResponse.json(
        { error: "Validation failed", errors: validation.errors },
        { status: 400 }
      )
    }

    // ✅ USE SANITIZED DATA FROM HERE ON
    const sanitizedData = validation.sanitized!
    const { name, email, company, interest, message, type } = sanitizedData

    const subject = type === "demo" ? "New Demo Request" : "New Contact Form Message"
    const typeLabel = type === "demo" ? "Demo Request" : "Contact Form"

    // Check if environment variables are configured
    if (!process.env.CONTACT_EMAIL || !process.env.CONTACT_EMAIL_PASSWORD) {
      console.log("  Email credentials not configured. Sanitized form data received:", {
        name,
        email,
        company,
        interest,
        message: message.substring(0, 50) + '...',
        type,
      })
      return NextResponse.json({
        success: true,
        message: "Message received! (Email will be sent when deployed to Vercel)",
      })
    }

    const emailUser = process.env.CONTACT_EMAIL
    const emailPass = process.env.CONTACT_EMAIL_PASSWORD
    console.log("  Using email:", emailUser)
    console.log("  Password configured:", !!emailPass)

    const nodemailer = await import("nodemailer")

    const transporter = nodemailer.default.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: process.env.NODE_ENV === 'development', // Only debug in dev
    })

    console.log("  Attempting SMTP connection to smtpout.secureserver.net:465...")

    try {
      await transporter.verify()
      console.log("  SMTP connection verified successfully")
    } catch (verifyError: any) {
      console.log("  SMTP verify failed:", verifyError.message)
      console.log("  Trying to send anyway...")
    }

    // ✅ Email content is now safe (already sanitized)
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
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted: ${new Date().toISOString()}</small></p>
        <p><small>IP: ${ip}</small></p>
      `,
    }

    console.log("  Sending email...")
    await transporter.sendMail(mailOptions)
    console.log("  Email sent successfully!")
 
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error: any) {
    console.error("  Email error:", error)
    console.error("  Error code:", error.code)
    console.error("  Error response:", error.response)
    return NextResponse.json({ 
      error: "Failed to send message. Please try again later." 
    }, { status: 500 })
  }
}
