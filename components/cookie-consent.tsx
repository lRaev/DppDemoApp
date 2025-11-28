"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-4 shadow-lg md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 pr-8">
            <h3 className="mb-1 text-lg font-semibold text-card-foreground">We value your privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
              By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
              <a href="/privacy" className="text-primary underline hover:no-underline">
                Read our Cookie Policy
              </a>
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={acceptEssential}
              className="border-border bg-transparent text-foreground hover:bg-muted"
            >
              Essential Only
            </Button>
            <Button onClick={acceptAll} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Accept All
            </Button>
          </div>
          <button
            onClick={acceptEssential}
            className="absolute right-6 top-4 text-muted-foreground transition-colors hover:text-foreground md:right-8 md:top-6"
            aria-label="Close cookie consent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
