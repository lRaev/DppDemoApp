"use client"

import React, { useState, useEffect } from "react"
import {
  ShoppingBag,
  ArrowUp,
  Leaf,
  Factory,
  PackageOpen,
  Truck,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Copy,
  Tag,
  Sparkles,
  Info,
  Shield,
  Recycle,
  HandHelping,
  Droplet,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import Image from "next/image"
import dynamic from "next/dynamic"
import type { MarkerData } from "@/components/MapComponentMarkers"

const MapComponentMarkers = dynamic(() => import("@/components/MapComponentMarkers"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-200 animate-pulse"></div>,
})

const demoMarkers: MarkerData[] = [
  {
    position: [31.791702, -7.09262],
    popupContent: "Cotton Origin: Morocco",
    type: "origin",
  },
  {
    position: [23.424076, 53.847818],
    popupContent: "Wool Origin: United Arab Emirates",
    type: "origin",
  },
  {
    position: [42.6977, 23.3119],
    popupContent: "Manufactured in Sofia, Bulgaria",
    type: "manufacturer",
  },
]

type Step = {
  icon: React.ReactNode
  title: string
  description: string
  details: string | React.ReactNode
  pdfLink?: string
}

const productSteps: Step[] = [
  {
    icon: <ShoppingBag className="h-6 w-6 text-violet-500" />,
    title: "Product Description",
    description: "Eco-friendly mittens with stylish design.",
    details:
      "Our designer mittens are crafted from recycled wool and upcycled leather, featuring a unique design that combines comfort with contemporary style. Each pair is handmade with attention to detail and sustainability.",
  },
  {
    icon: <Tag className="h-6 w-6 text-violet-500" />,
    title: "Brand Details",
    description: "Sustainable fashion brand focused on eco-conscious accessories.",
    details:
      "GARDEROB is a designer atelier and apparel brand based in Sofia, Bulgaria, founded in 2006. The brand has since grown into a small, dedicated team of like-minded professionals who share the same love, passion and enthusiasm for minimalism. Our fabrics are carefully selected and although we prefer to work with flax, wool and silk, we do offer items made from easy to care materials. All our cotton is sourced from an OEKO-TEX® certified supplier. Ultimately, our aim is to create high-quality clothes that stand the test of time and make the woman who wears GARDEROB feel confident and brave.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-violet-500" />,
    title: "Care Instructions",
    description: "Proper care ensures long-lasting performance.",
    details:
      "Spot clean with mild soap and cold water. Air dry flat. Do not machine wash or tumble dry. Store in a cool, dry place when not in use. With proper care, these mittens will last for many seasons.",
  },
]

const handlingSteps: Step[] = [
  {
    icon: <Truck className="h-6 w-6 text-blue-600" />,
    title: "Shipping",
    description: "Carbon-neutral delivery worldwide.",
    details:
      "We ship using plastic-free packaging made from recycled cardboard. All shipping emissions are offset through our partnership with climate action organizations. Standard delivery takes 1-2 business days.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-blue-600" />,
    title: "Usage Tips",
    description: "Get the most out of your mittens.",
    details:
      "These mittens are designed for everyday use in cold weather. For extreme cold, consider wearing a thin liner glove underneath.",
    pdfLink: "/care-guide.pdf",
  },
]

const productDetails = {
  id: "MM456789",
  manufacturer: "Garderob Design",
  materialComposition: [
    {
      materialType: "Wool",
      source: "Upcycled Wool Scraps",
      sustainabilityCertification: "GRS",
      percentage: 45,
      subcomponents: [
        { name: "Outer Shell", material: "Wool", source: "Upcycled" },
        { name: "Lining", material: "Wool", source: "Upcycled" },
      ],
    },
    {
      materialType: "Cotton",
      source: "Reclaimed Cotton Textiles",
      sustainabilityCertification: "OCS",
      percentage: 30,
      subcomponents: [
        { name: "Inner Lining", material: "Cotton", source: "Upcycled" },
        { name: "Trim", material: "Cotton", source: "Upcycled" },
      ],
    },
    {
      materialType: "Leather",
      source: "Upcycled Leather Scraps",
      sustainabilityCertification: "LWG",
      percentage: 25,
      subcomponents: [
        { name: "Palm", material: "Leather", source: "Upcycled" },
        { name: "Thumb", material: "Leather", source: "Upcycled" },
      ],
    },
  ],
  healthAndSafety: {
    chemicalUse: "OEKO-TEX Standard 100 certified, free from harmful substances",
    safetyCertifications: [
      "REACH compliant (EU regulation for chemical safety)",
      "Vegan-friendly leather alternatives available",
    ],
    allergenInformation: "May contain traces of natural wool lanolin",
  },
  consumerInformation: {
    careInstructions: "Spot clean only. Air dry flat. Do not machine wash.",
    sizeGuide: "/size-guide.pdf",
    warranty: "1-year warranty against manufacturing defects",
    repairServices: "Free repair service for the first 6 months",
  },
  sustainabilityAndCircularEconomy: {
    recyclability: "100%",
    recycledContent: "85%",
    repairabilityScore: "9/10",
    endOfLifeInstructions:
      "Return to any of our stores for recycling, or use our mail-in recycling program for 15% off your next purchase.",
  },
  packagingMaterials: [
    { material: "Recycled Cardboard", percentage: 90, recycledContent: 100, recyclability: "Widely Recyclable" },
    { material: "Seed Paper", percentage: 10, recycledContent: 80, recyclability: "Plantable" },
  ],
  environmentalImpact: {
    carbonFootprint: "0.8",
    waterUsage: "12",
    energy: "5",
  },
  certifications: [
    "GRS (Global Recycled Standard)",
    "OEKO-TEX Standard 100",
    "B Corp Certified",
    "Climate Neutral",
    "1% For The Planet",
  ],
  fairLaborCertifications: ["Fair Trade Certified", "WRAP", "SA8000"] as FairLaborCertification[],
}
type FairLaborCertification = "Fair Trade Certified" | "WRAP" | "SA8000"

// Product images array
const productImages = [
  {
    src: "/images/Garderob051343_small.jpg ",
    alt: "Gray and silver mittens with metallic palm detail",
  },
  {
    src: "/images/nowastelab.jpg",
    alt: "Pair of gray wool mittens with silver accents on tan leather chair",
  },
  {
    src: "/images/Garderob050892_small.jpg",
    alt: "Black and silver mitten with contrasting materials",
  },
  {
    src: "/images/Garderob051349_small.jpg",
    alt: "Gray wool mittens with silver metallic palm detail",
  },
  {
    src: "/images/Garderob050893_small.jpg",
    alt: "Gray wool mittens with silver metallic palm detail",
  },
]

export default function WorkJacketJourney() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("product")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const couponCode = "ECOMITTENS"
  const [isBrowser, setIsBrowser] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === productImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? productImages.length - 1 : prevIndex - 1))
  }

  const renderSubcomponents = (subcomponents: any[], level = 0) => (
    <ul className="list-none space-y-2">
      {subcomponents.map((sub, subIndex) => (
        <li key={subIndex} className="flex items-start">
          <div className="flex items-center">
            <div className={`w-${3 + level} h-px bg-gray-300 mr-2`}></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
          </div>
          <div>
            <span className="text-sm text-gray-600">
              {sub.name}: {sub.material} ({sub.source})
            </span>
            {sub.subcomponents && <div className="ml-4 mt-1">{renderSubcomponents(sub.subcomponents, level + 1)}</div>}
          </div>
        </li>
      ))}
    </ul>
  )

  const renderEnvironmentalImpact = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 flex flex-col items-center">
          <Truck className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-m font-bold">{productDetails.environmentalImpact.carbonFootprint} kg</span>
          <span className="text-xs font-medium">CO2 </span>
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <Droplet className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-m font-bold">{productDetails.environmentalImpact.waterUsage} L</span>
          <span className="text-xs font-medium">Water Usage</span>
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <Zap className="h-8 w-8 text-yellow-500 mb-2" />
          <span className="text-m font-bold">{productDetails.environmentalImpact.energy} kWh</span>
          <span className="text-xs font-medium">Energy</span>
        </Card>
      </div>
    </div>
  )

  const renderEcoCertificates = () => (
    <div className="space-y-4 mt-6">
      <h4 className="text-lg font-semibold">Eco Certificates</h4>
      <div className="flex flex-wrap gap-2">
        {productDetails.certifications.map((cert, index) => (
          <a
            key={index}
            href={`https://example.com/certificates/${cert.toLowerCase().replace(/\s+/g, "-")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors duration-200"
          >
            {cert}
          </a>
        ))}
      </div>
    </div>
  )

  const impactSteps: Step[] = [
    {
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      title: "Sustainability",
      description: "Our commitment to environmental responsibility.",
      details:
        "By using recycled wool and upcycled leather, each pair of mittens diverts approximately 500g of textile waste from landfills. Our zero-waste pattern cutting ensures minimal material waste during production.",
    },
    {
      icon: <Recycle className="h-6 w-6 text-green-600" />,
      title: "Recycling Program",
      description: "End-of-life product management.",
      details:
        "When your mittens reach the end of their life, send them back to us. We'll disassemble them and recycle the materials into new products. In return, you'll receive 15% off your next purchase.",
    },
    {
      icon: <Info className="h-6 w-6 text-green-600" />,
      title: "Environmental Impact",
      description: "Detailed breakdown of our product's footprint.",
      details: renderEnvironmentalImpact(),
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Certifications",
      description: "Our eco-friendly certifications.",
      details: renderEcoCertificates(),
    },
    {
      icon: <PackageOpen className="h-6 w-6 text-green-600" />,
      title: "Packaging Materials",
      description: "ECO packaging composition.",
      details:
        "Our packaging is made from 100% recycled materials and includes seed paper that can be planted to grow wildflowers, supporting local pollinators.",
    },
    {
      icon: <Factory className="h-6 w-6 text-green-600" />,
      title: "Manufacturing & Fair Labor",
      description: "Ethical production practices.",
      details:
        "Our mittens are handcrafted in small batches by skilled artisans earning fair wages. We maintain transparent supply chains and regularly audit our manufacturing partners to ensure ethical working conditions.",
    },
  ]

  const renderSteps = (steps: Step[]) => (
    <div className="space-y-4 mx-auto">
      {steps.map((step, index) => (
        <Collapsible
          key={index}
          open={expandedStep === index}
          onOpenChange={() => setExpandedStep(expandedStep === index ? null : index)}
        >
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center w-full">
                  <div className="mr-4 p-2 bg-gray-100 rounded-full">{step.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-center">{step.title}</h3>
                    <p className="text-sm text-gray-600 text-center">{step.description}</p>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedStep === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                {typeof step.details === "string" ? <p className="text-gray-700 ">{step.details}</p> : step.details}
                {step.pdfLink && (
                  <div className="flex justify-center mt-2">
                    <Button variant="outline" asChild>
                      <a href={step.pdfLink} target="_blank" rel="noopener noreferrer">
                        Download PDF Guide
                      </a>
                    </Button>
                  </div>
                )}
                {step.title === "Packaging Materials" && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Packaging Composition:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {productDetails.packagingMaterials.map((material, index) => (
                        <li key={index}>
                          <span className="font-medium">{material.material}</span>: {material.percentage}%
                          <ul className="list-none pl-4 mt-1">
                            <li>Recycled Content: {material.recycledContent}%</li>
                            <li>Recyclability: {material.recyclability}</li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.title === "Manufacturing & Fair Labor" && (
                  <div className="mt-4">
                    <h4 className="font-semibold pl-10 mb-2">Fair Labor Certifications:</h4>
                    <ul className="list-disc pl-20 space-y-2">
                      {productDetails.fairLaborCertifications.map((cert, index) => (
                        <li key={index}>
                          <a
                            href={`https://example.com/fair-labor/${cert.toLowerCase().replace(/\s+/g, "-")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {cert}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  )

  const renderDetailSection = (title: string, icon: React.ReactNode, description: string, content: React.ReactNode) => (
    <Collapsible className="mt-4 w-full mx-auto">
      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center w-full">
              <div className="mr-4 p-2 bg-gray-100 rounded-full">{icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">{content}</CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  )

  const renderMaterialSourceTimeline = () => (
    <div className="w-full">
      <div className="relative">
        {productDetails.materialComposition.map((material, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center">
              <div className="w-24 text-right mr-4 text-sm font-semibold">{material.materialType}</div>
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{material.source}</p>
                  <p className="text-sm font-semibold text-primary">{material.percentage}%</p>
                </div>
                <p className="text-sm text-gray-600">{material.sustainabilityCertification}</p>
              </div>
            </div>
            <div className="ml-28 mt-2">{renderSubcomponents(material.subcomponents)}</div>
          </div>
        ))}
        <div className="absolute left-[7rem] top-2 bottom-2 w-px bg-gray-200"></div>
      </div>
    </div>
  )
  const copyToClipboard = () => {
    if (isBrowser) {
      navigator.clipboard.writeText(couponCode).then(() => {
        toast(
          <div>
            <strong>Coupon code copied</strong>
            <p>Use for a 20% discount on No Waste Lab products.</p>
          </div>,
        )
      })
    }
  }

  const renderPackageInfo = () => (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Packaging Composition:</h4>
      <ul className="list-disc pl-5 space-y-2">
        {productDetails.packagingMaterials.map((material, index) => (
          <li key={index}>
            <span className="font-medium">{material.material}</span>: {material.percentage}%
            <ul className="list-none pl-4 mt-1">
              <li>Recycled Content: {material.recycledContent}%</li>
              <li>Recyclability: {material.recyclability}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden bg-white text-gray-900">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-orange-600/90 to-blue-800/90 backdrop-blur-md text-white p-2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10  bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNMTUgMTVMMjAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxjaXJjbGUgY3g9IjQ1IiBjeT0iNDUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNNDUgNDVMNDAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxjaXJjbGUgY3g9IjQ1IiBjeT0iMTUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNNDUgMTVMNDAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-0 transition-transform duration-300 hover:scale-105">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Furnitures-aBYqzHe2jKqqfnnzrmOSolTeYZ1muS.png"
                alt="DigiPP Logo"
                width={60}
                height={60}
              />
              <span className="text-2xl font-bold">DigiPP</span>
            </div>
            <div className="text-xs">© 2025 By SoftGroup</div>
          </div>
          <h2 className="text-xl font-semibold text-center">Discover Your Mittens's Journey</h2>
        </div>

        <div className="p-3">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">NO WASTE LAB</h2>
          <h1 className="text-m font-bold mb-2 text-primary">by GARDEROB</h1>

          {/* Image Gallery */}
          <div className="relative w-full mb-4 rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={productImages[currentImageIndex].src || "/placeholder.svg"}
                alt={productImages[currentImageIndex].alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-100"
              />
              {/* Logo Overlay */}
              <div className="absolute bottom-4 right-4 z-10">
                <Image
                  src="/images/garderob-design-logo@2x.png"
                  alt="GARDEROB Logo"
                  width={120}
                  height={30}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Image indicators */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${currentImageIndex === index ? "bg-primary" : "bg-white/70"}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail gallery */}
          <div className="flex justify-center gap-2 mb-2 overflow-x-auto pb-2 px-1 w-full">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                  currentImageIndex === index ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className={`object-cover object-center ${currentImageIndex !== index ? "opacity-80" : ""}`} />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-1 w-full bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              className={`w-full ${
                activeSection === "product" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              } h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection("product")}
            >
              <div className="flex flex-col items-center">
                <ShoppingBag
                  className={`h-4 w-4 mb-1 ${activeSection === "product" ? "text-violet-500" : "text-gray-600"}`}
                />
                <span
                  className={`text-xs font-medium ${activeSection === "product" ? "text-violet-500" : "text-gray-600"}`}
                >
                  Product
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${
                activeSection === "impact" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              } h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection("impact")}
            >
              <div className="flex flex-col items-center">
                <Leaf className={`h-4 w-4 mb-1 ${activeSection === "impact" ? "text-green-600" : "text-gray-600"}`} />
                <span
                  className={`text-xs font-medium ${activeSection === "impact" ? "text-green-600" : "text-gray-600"}`}
                >
                  Impact
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${
                activeSection === "handling" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              } h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection("handling")}
            >
              <div className="flex flex-col items-center">
                <HandHelping
                  className={`h-4 w-4 mb-1 ${activeSection === "handling" ? "text-blue-600" : "text-gray-600"}`}
                />
                <span
                  className={`text-xs font-medium ${activeSection === "handling" ? "text-blue-600" : "text-gray-600"}`}
                >
                  Handling
                </span>
              </div>
            </Button>
          </div>

          <div className="sticky top-16 bg-white z-10 py-4 mb-6 border-b border-gray-200">
            <h3 className="text-2xl font-semibold text-primary">
              {activeSection === "product"
                ? "Product Information"
                : activeSection === "impact"
                  ? "Environmental Impact"
                  : "Handling and Care"}
            </h3>
          </div>

          {activeSection === "product" && (
            <>
              {renderSteps(productSteps)}
              <div className="mt-2 space-y-2">
                {renderDetailSection(
                  "Product Details",
                  <Info className="h-6 w-6 text-violet-500" />,
                  "Comprehensive information about the product's composition and features",
                  <Tabs defaultValue="composition" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="composition">Composition</TabsTrigger>
                      <TabsTrigger value="consumer">Consumer Info</TabsTrigger>
                      <TabsTrigger value="location">Locations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="composition">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <dt className="font-semibold">Product ID:</dt>
                        <dd>{productDetails.id}</dd>
                        <dt className="font-semibold">Manufacturer:</dt>
                        <dd>{productDetails.manufacturer}</dd>

                        {productDetails.materialComposition.map((material, index) => (
                          <React.Fragment key={index}>
                            <dt className="font-semibold col-span-2 mt-2">
                              {material.materialType} ({material.percentage}
                              %):
                            </dt>
                            <dt className="font-semibold ml-2">Source:</dt>
                            <dd>{material.source}</dd>
                            <dt className="font-semibold ml-2">Certification:</dt>
                            <dd>{material.sustainabilityCertification}</dd>
                            <dt className="font-semibold ml-2">Subcomponents:</dt>
                            <dd>
                              {material.subcomponents.map((sub, subIndex) => (
                                <div key={subIndex}>
                                  {sub.name}: {sub.material} ({sub.source})
                                </div>
                              ))}
                            </dd>
                          </React.Fragment>
                        ))}
                      </dl>
                    </TabsContent>
                    <TabsContent value="consumer">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <dt className="font-semibold">Care Instructions:</dt>
                        <dd>{productDetails.consumerInformation.careInstructions}</dd>
                        <dt className="font-semibold">Size Guide:</dt>
                        <dd>
                          <a
                            href={productDetails.consumerInformation.sizeGuide}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download PDF
                          </a>
                        </dd>
                        <dt className="font-semibold">Warranty:</dt>
                        <dd>{productDetails.consumerInformation.warranty}</dd>
                        <dt className="font-semibold">Repair Services:</dt>
                        <dd>{productDetails.consumerInformation.repairServices}</dd>
                      </dl>
                    </TabsContent>
                    <TabsContent value="location">
                      <div className="h-64 w-full">{isBrowser && <MapComponentMarkers markers={demoMarkers} />}</div>
                    </TabsContent>
                  </Tabs>,
                )}
                {renderDetailSection(
                  "Health & Safety",
                  <Shield className="h-6 w-6 text-violet-500" />,
                  "Important information about product safety and potential health impacts",
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <dt className="font-semibold">Chemical Use:</dt>
                    <dd>{productDetails.healthAndSafety.chemicalUse}</dd>
                    <dt className="font-semibold">Safety Certifications:</dt>
                    <dd>{productDetails.healthAndSafety.safetyCertifications.join(", ")}</dd>
                    <dt className="font-semibold">Allergen Information:</dt>
                    <dd>{productDetails.healthAndSafety.allergenInformation}</dd>
                  </dl>,
                )}
              </div>
            </>
          )}
          {activeSection === "impact" && (
            <>
              {renderSteps(impactSteps)}
              
            </>
          )}
          {activeSection === "handling" && renderSteps(handlingSteps)}

          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary">Eco-Mittens Discount</h3>
                  <p className="text-xs text-gray-600">15% off your next purchase</p>
                </div>
                <div className="flex items-center">
                  <Input
                    value={couponCode}
                    readOnly
                    className="w-24 mr-2 text-xs bg-white/50 border border-primary/20 focus:border-primary text-center"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/50 border border-primary/20 hover:bg-primary/10 hover:border-primary transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary">Bundle Offer</h3>
                  <p className="text-xs text-gray-700">25% off when you buy 2+ pairs of mittens</p>
                </div>
                <Button variant="secondary" size="sm" className="self-end px-6 hover:shadow-md transition-all" asChild>
                  <a href="https://garderobdesign.com" target="_blank" rel="noopener noreferrer">
                    Shop Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center justify-center space-x-4">
                <a
                href="https://www.gs1bg.org/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="/images/gs1_logo.svg"
                  alt="GS1 Bulgaria"
                  width={80}
                  height={44}
                  className="h-11 w-auto"
                />
              </a>
            
              <div className="h-8 border-l border-gray-300"></div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-700">The Global Language of Business</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-1"></p>
          </div>
        </div>
      </CardContent>
      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-md bg-white hover:bg-gray-100 transition-all duration-300"
          onClick={scrollToTop}
          aria-label="Return to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </Card>
  )
}

