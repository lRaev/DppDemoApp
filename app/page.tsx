"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Loader2, CheckCircle, ArrowRight } from "lucide-react"
import { CookieConsent } from "@/components/cookie-consent"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"

const OfficeMapComponent = dynamic(() => import("@/components/OfficeMapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-500">Loading map...</span>
    </div>
  ),
})

// Cloudflare Turnstile Site Key - replace with your actual key
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
    website: "", // Honeypot field - should remain empty
    timestamp: Date.now(), // Time-based bot detection
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }))
    if (errors.interest) {
      setErrors((prev) => ({ ...prev, interest: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.company.trim()) newErrors.company = "Company is required"
    if (!formData.interest) newErrors.interest = "Please select an interest"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    if (!turnstileToken) newErrors.form = "Please complete the security check"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        setErrors({ form: "Failed to send message. Please try again." })
      }
    } catch {
      setErrors({ form: "Failed to send message. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "demo", turnstileToken }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        setErrors({ form: "Failed to send request. Please try again." })
      }
    } catch {
      setErrors({ form: "Failed to send request. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setFormData({
      name: "",
      email: "",
      company: "",
      interest: "",
      message: "",
      website: "",
      timestamp: Date.now(), // Reset timestamp for new submission
    })
    setTurnstileToken(null)
    turnstileRef.current?.reset()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CookieConsent />

      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6 relative">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">DP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">DigiPP</span>
            <span className="hidden text-xs text-gray-500 sm:inline-block">by SoftGroup</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex absolute left-1/2 -translate-x-1/2">
            <a href="#demos" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Demos
            </a>
            <a href="#features" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Features
            </a>
            <a href="#contact" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="relative w-full overflow-hidden py-8 md:py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
        <div className="container mx-auto relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
              </span>
              <span className="uppercase tracking-wider bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent font-bold">Launching Soon</span>
            </div>
            <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Digital Product
              <span className="block text-blue-600">Passport</span>
            </h1>
            <div className="mx-auto mb-4 max-w-2xl text-pretty text-base text-gray-600 md:text-lg space-y-2">
              <p className="font-semibold">A new <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">DigiPP</span> experience is on the way.</p>
              <p>We&apos;re getting ready to reveal our new look.</p>
              <p>
                Our team is working behind the scenes to deliver a next-generation Digital Product Passport platform —
                bringing full DPP compliance and beyond, <span className="font-bold text-blue-600">powered by exciting upcoming partnerships.</span>
              </p>
              <p className="font-semibold">The new <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">DigiPP</span> website is coming soon.</p>
              <p>During this time, don&apos;t hesitate to contact us — we&apos;re here for you.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="default" className="bg-blue-600 text-white hover:bg-blue-700" asChild>
                <a href="#contact">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="border-gray-300 text-gray-900 hover:bg-gray-100 bg-transparent"
                asChild
              >
                <a href="#demos">View DPP Demos</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="demos" className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">DPP Demo Examples</h2>
            <p className="text-base text-gray-600">
              Explore the future of product digital personality. Scan our demo passports to see how <span className="font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">DigiPP</span> elevates
              product data into an interactive, compliant digital experience.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group border-gray-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-900">Scan to Explore </CardTitle>
                <CardDescription className="text-gray-500">100% Upcycled Cushion</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <Image
                    src="/qr-code-3.png"
                    alt="Electronics DPP QR Code"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="group border-gray-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-900">Scan to Explore</CardTitle>
                <CardDescription className="text-gray-500">Fashion and textile product passport</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <Image
                    src="/qr-code-4.png"
                    alt="Textile DPP QR Code"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="group border-gray-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-900">Scan to Explore</CardTitle>
                <CardDescription className="text-gray-500">Sustainable packaging passport</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <Image
                    src="/qr-code-2.png"
                    alt="Packaging DPP QR Code"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">DigiPP</span>?</h2>
            <p className="text-lg text-gray-600">
              Empowering businesses and consumers with essential sustainability, compliance, and circularity
              information.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                badge: "ESPR",
                title: "ESPR and Beyond Compliance",
                description: "Full compliance with the Ecodesign for Sustainable Products Regulation requirements.",
              },
              {
                badge: "SCT",
                title: "Supply Chain Transparency",
                description:
                  "Track and trace products from raw materials through manufacturing to end-of-life recycling.",
              },
              {
                badge: "ECO",
                title: "Sustainability Focus",
                description: "Enable circular economy practices with comprehensive environmental impact data.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group border-gray-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-200">
                    <span className="text-sm font-bold text-blue-600">{feature.badge}</span>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="w-full bg-gray-50 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div className="flex flex-col">
              <h2 className="mb-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in Touch</h2>
              <p className="mb-2 text-lg text-gray-600">
                Have questions about <span className="font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">DigiPP</span>? We&apos;d love to hear from you and help you get started.
              </p>
              <div className="space-y-4">
                <Card className="border-gray-200 bg-white transition-all duration-300 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-bold text-blue-600">HQ</span>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Our Offices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-semibold text-gray-900">Sofia Office</p>
                        <p> Business Park Sofia </p>
                        <p> str., building 8B, floor 7</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Plovdiv Office</p>
                        <p>str. Stefan Verkovich 5</p>
                        <p>4000, Plovdiv</p>
                      </div>
                    </div>
                    <OfficeMapComponent />
                  </CardContent>
                </Card>
                <Card className="border-gray-200 bg-white transition-all duration-300 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                      <span className="text-xs font-bold text-orange-600">@</span>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Email Us</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-[4.5rem]">
                    <CardDescription className="text-base">
                      <a href="mailto:info@digitalproductspassport.eu" className="text-blue-600 hover:underline">
                        info@digitalproductspassport.eu
                      </a>
                      <br />
                      <span className="text-gray-600">We respond within 24 hours</span>
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="border-gray-200 bg-white transition-all duration-300 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-xs font-bold text-blue-600">TEL</span>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Call Us</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-[4.5rem]">
                    <div className="text-base space-y-1">
                      <div>
                        <a href="tel:++359888002313" className="text-blue-600 hover:underline">
                          +359 88 8002313
                        </a>
                      </div>
                      <div>
                        <a href="tel:+359889911104" className="text-blue-600 hover:underline">
                          +359 88 9911104
                        </a>
                      </div>
                      <span className="text-gray-600">Mon-Fri 9:00 - 18:00 CET</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <h3 className="text-4xl font-bold text-gray-900">Send us a Message</h3>
                <p className="mt-2 text-gray-600">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2 bg-gray-100">
                  <TabsTrigger value="contact" className="data-[state=active]:bg-white">
                    Contact
                  </TabsTrigger>
                  <TabsTrigger value="demo" className="data-[state=active]:bg-white">
                    Request Demo
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="contact">
                  {isSuccess ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Thank You!</h3>
                      <p className="mx-auto mt-2 max-w-md text-gray-600">
                        Your message has been sent successfully. We&apos;ll get back to you soon.
                      </p>
                      <Button onClick={resetForm} variant="outline" className="mt-4 bg-transparent border-gray-300">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
                      {/* Honeypot field - hidden from users, bots will fill it */}
                      <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`bg-white ${errors.name ? "border-red-500" : "border-gray-300"}`}
                          disabled={isLoading}
                        />
                        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="your@email.com"
                          className={`bg-white ${errors.email ? "border-red-500" : "border-gray-300"}`}
                          disabled={isLoading}
                        />
                        {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-gray-900">
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company"
                          className={`bg-white ${errors.company ? "border-red-500" : "border-gray-300"}`}
                          disabled={isLoading}
                        />
                        {errors.company && <p className="text-xs text-red-600">{errors.company}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interest" className="text-gray-900">
                          Area of Interest
                        </Label>
                        <Select value={formData.interest} onValueChange={handleSelectChange} disabled={isLoading}>
                          <SelectTrigger
                            id="interest"
                            className={`bg-white ${errors.interest ? "border-red-500" : "border-gray-300"}`}
                          >
                            <SelectValue placeholder="Select your interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="platform">DigiPP Platform</SelectItem>
                            <SelectItem value="compliance">ESPR Compliance</SelectItem>
                            <SelectItem value="implementation">Implementation Support</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.interest && <p className="text-xs text-red-600">{errors.interest}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-900">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className={`min-h-[120px] bg-white ${errors.message ? "border-red-500" : "border-gray-300"}`}
                          disabled={isLoading}
                        />
                        {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
                      </div>
                      <div className="flex justify-center">
                        <Turnstile
                          ref={turnstileRef}
                          siteKey={TURNSTILE_SITE_KEY}
                          onSuccess={(token) => setTurnstileToken(token)}
                          onError={() => setTurnstileToken(null)}
                          onExpire={() => setTurnstileToken(null)}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        disabled={isLoading || !turnstileToken}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </TabsContent>

                <TabsContent value="demo">
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Demo Request Received!</h3>
                      <p className="max-w-md text-gray-600">
                        Thank you for your interest. Our team will contact you shortly to schedule your demo.
                      </p>
                      <Button onClick={resetForm} variant="outline" className="mt-4 bg-transparent border-gray-300">
                        Submit Another Request
                      </Button>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleDemoRequest}>
                      {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
                      {/* Honeypot field - hidden from users, bots will fill it */}
                      <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="demo-name" className="text-gray-900">
                          Name
                        </Label>
                        <Input
                          id="demo-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`bg-white ${errors.name ? "border-red-500" : "border-gray-300"}`}
                          disabled={isLoading}
                        />
                        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="demo-email" className="text-gray-900">
                          Email
                        </Label>
                        <Input
                          id="demo-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="your@email.com"
                          className={`bg-white ${errors.email ? "border-red-500" : "border-gray-300"}`}
                          disabled={isLoading}
                        />
                        {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="demo-company" className="text-gray-900">
                          Company
                        </Label>
                        <Input
                          id="demo-company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company"
                          className={`bg-white ${errors.company ? "border-red-500" : "border-gray-300"}`}
                          disabled={isLoading}
                        />
                        {errors.company && <p className="text-xs text-red-600">{errors.company}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="demo-interest" className="text-gray-900">
                          Area of Interest
                        </Label>
                        <Select value={formData.interest} onValueChange={handleSelectChange} disabled={isLoading}>
                          <SelectTrigger
                            id="demo-interest"
                            className={`bg-white ${errors.interest ? "border-red-500" : "border-gray-300"}`}
                          >
                            <SelectValue placeholder="Select your interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="platform">DigiPP Platform Demo</SelectItem>
                            <SelectItem value="compliance">Compliance Features</SelectItem>
                            <SelectItem value="integration">Integration Options</SelectItem>
                            <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.interest && <p className="text-xs text-red-600">{errors.interest}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="demo-message" className="text-gray-900">
                          Additional Information
                        </Label>
                        <Textarea
                          id="demo-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your needs and preferred demo time..."
                          className={`min-h-[120px] bg-white ${errors.message ? "border-red-500" : "border-gray-300"}`}
                          disabled={isLoading}
                        />
                        {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
                      </div>
                      <div className="flex justify-center">
                        <Turnstile
                          ref={turnstileRef}
                          siteKey={TURNSTILE_SITE_KEY}
                          onSuccess={(token) => setTurnstileToken(token)}
                          onError={() => setTurnstileToken(null)}
                          onExpire={() => setTurnstileToken(null)}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        disabled={isLoading || !turnstileToken}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Request Demo"
                        )}
                      </Button>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-sm font-bold text-white">DP</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">DigiPP</span>
            </div>
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} <span className="font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">DigiPP</span> by SoftGroup. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
