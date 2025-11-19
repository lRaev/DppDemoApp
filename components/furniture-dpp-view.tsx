"use client"

import type React from "react"
import type { DigitalProductPassport } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTemplateConfig } from "@/lib/template-config-2"
import { ShoppingBag, ArrowUp, Leaf, Truck, ChevronDown, ChevronUp, Copy, Tag, Sparkles, Info, Shield, Recycle, HandHelping, Droplet, Zap, ChevronLeft, ChevronRight, CheckCircle, XCircle, Factory, Calendar, Award, Building, ExternalLink, HelpCircle, Footprints, Star, Wrench, MapPin } from 'lucide-react'
import Image from "next/image"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { CollectionMap } from "./collection-map"

interface MobileDppViewProps {
  product: DigitalProductPassport
  fieldVisibility?: Record<string, boolean>
  selectedFont?: string
  templateTheme?: string
  showQRCode?: boolean
}

type Step = {
  icon: React.ReactNode
  title: string
  description: string
  details: string | React.ReactNode
  pdfLink?: string
}

export function MobileDppView({
  product,
  fieldVisibility = {},
  selectedFont = "inter",
  templateTheme = "default",
  showQRCode = false,
}: MobileDppViewProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("product")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const couponCode = "ECODPP15"

  useEffect(() => {
    const templateConfig = getTemplateConfig(templateTheme)
    const fontConfig = getFontConfig(selectedFont)

    const root = document.documentElement
    Object.entries(templateConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--template-${key}`, value)
    })

    root.style.setProperty("--template-font-family", fontConfig.fontFamily)
    root.style.setProperty("--template-font-weight", fontConfig.fontWeight)
  }, [templateTheme, selectedFont])

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

  const isFieldVisible = (fieldId: string) => {
    return fieldVisibility[fieldId] !== false
  }

  const getFontConfig = (font: string) => {
    const fontConfigs = {
      inter: { fontFamily: "Inter, sans-serif", fontWeight: "400" },
      roboto: { fontFamily: "Roboto, sans-serif", fontWeight: "400" },
      "open-sans": { fontFamily: "Open Sans, sans-serif", fontWeight: "400" },
      lato: { fontFamily: "Lato, sans-serif", fontWeight: "400" },
      poppins: { fontFamily: "Poppins, sans-serif", fontWeight: "400" },
      montserrat: { fontFamily: "Montserrat, sans-serif", fontWeight: "400" },
      "source-sans": { fontFamily: "Source Sans Pro, sans-serif", fontWeight: "400" },
      nunito: { fontFamily: "Nunito, sans-serif", fontWeight: "400" },
    }
    return fontConfigs[font as keyof typeof fontConfigs] || fontConfigs.inter
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const productImages = product.images?.productImages?.length
    ? product.images.productImages.map((img) => ({
        src: img.url || "/placeholder.svg",
        alt: img.alt || img.caption || product.name,
      }))
    : [{ src: "/placeholder.svg", alt: product.name }]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === productImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? productImages.length - 1 : prevIndex - 1))
  }

  const copyToClipboard = () => {
    if (isBrowser) {
      navigator.clipboard.writeText(couponCode).then(() => {
        toast(
          <div>
            <strong>Coupon code copied</strong>
            <p>Use for a 15% discount on your next purchase.</p>
          </div>
        )
      })
    }
  }

  const productSteps: Step[] = [
    ...(isFieldVisible("description")
      ? [
          {
            icon: <ShoppingBag className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Product Description",
            description: product.description?.substring(0, 50) + "..." || "Product information and details.",
            details: product.description || "No description available.",
          },
        ]
      : []),
    ...(isFieldVisible("brandInfo") && product.productDetails?.brandInfo
      ? [
          {
            icon: <Tag className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Brand Details",
            description: `${product.productDetails.brandInfo?.brandName || "Brand"} - Quality and craftsmanship.`,
            details: (
              <div className="space-y-2">
                {product.productDetails.brandInfo?.brandName && (
                  <p>
                    <strong>Brand:</strong> {product.productDetails.brandInfo.brandName}
                  </p>
                )}
                {product.productDetails.brandInfo?.subBrandName && (
                  <p>
                    <strong>Sub-brand:</strong> {product.productDetails.brandInfo.subBrandName}
                  </p>
                )}
                {product.productDetails.brandInfo?.brandDescription && (
                  <p style={{ color: "var(--template-muted-foreground)" }}>
                    {product.productDetails.brandInfo.brandDescription}
                  </p>
                )}
                {product.productDetails.brandInfo?.parentOrganization && (
                  <p>
                    <strong>Parent Organization:</strong> {product.productDetails.brandInfo.parentOrganization}
                  </p>
                )}
                {product.productDetails.brandInfo?.brandValues &&
                  product.productDetails.brandInfo.brandValues.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.productDetails.brandInfo.brandValues.map((value, i) => (
                        <Badge key={i} variant="secondary">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  )}
              </div>
            ),
          },
        ]
      : []),
    ...(isFieldVisible("manufacturerInfo")
      ? [
          {
            icon: <Factory className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Manufacturer",
            description: `${product.manufacturerInfo.manufacturerName} - Manufacturing details.`,
            details: (
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {product.manufacturerInfo.manufacturerName}
                </p>
                <p>
                  <strong>Manufacturing Date:</strong>{" "}
                  {new Date(product.manufacturerInfo.manufacturingDate).toLocaleDateString()}
                </p>
                {product.manufacturerInfo.manufacturerUrl && (
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href={product.manufacturerInfo.manufacturerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: "var(--template-primary)" }}
                    >
                      {product.manufacturerInfo.manufacturerUrl}
                    </a>
                  </p>
                )}
                {product.manufacturerInfo.address && (
                  <p>
                    <strong>Address:</strong>{" "}
                    {[
                      product.manufacturerInfo.address.streetAddress,
                      product.manufacturerInfo.address.city,
                      product.manufacturerInfo.address.postalCode,
                      product.manufacturerInfo.address.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
            ),
          },
        ]
      : []),
    ...(isFieldVisible("materials") && product.productDetails?.materials?.length
      ? [
          {
            icon: <Recycle className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Materials",
            description: `${product.productDetails.materials.length} materials used in production.`,
            details: (
              <div className="space-y-4">
                {product.productDetails.materials.map((material) => {
                  const fullMaterial = product.materialsRegistry?.find((m) => m.id === material.id)
                  return (
                    <div key={material.id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-lg">{material.name}</h4>
                        {material.percentage && <Badge variant="secondary">{material.percentage}%</Badge>}
                      </div>
                      
                      {fullMaterial && (
                        <div className="space-y-3">
                          {/* Basic Material Info */}
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {fullMaterial.origin && (
                              <div>
                                <p className="text-muted-foreground text-xs">Origin</p>
                                <p className="font-medium">{fullMaterial.origin}</p>
                              </div>
                            )}
                            {fullMaterial.category && (
                              <div>
                                <p className="text-muted-foreground text-xs">Category</p>
                                <p className="font-medium">{fullMaterial.category}</p>
                              </div>
                            )}
                            {fullMaterial.supplier && (
                              <div className="col-span-2">
                                <p className="text-muted-foreground text-xs">Supplier</p>
                                <p className="font-medium">{fullMaterial.supplier}</p>
                              </div>
                            )}
                            {fullMaterial.recycledContent !== undefined && (
                              <div>
                                <p className="text-muted-foreground text-xs">Recycled</p>
                                <p className="font-medium">{fullMaterial.recycledContent}%</p>
                              </div>
                            )}
                            {fullMaterial.batch && (
                              <div>
                                <p className="text-muted-foreground text-xs">Batch</p>
                                <p className="font-medium text-xs">{fullMaterial.batch}</p>
                              </div>
                            )}
                          </div>

                          {/* Furniture-Specific Properties */}
                          {fullMaterial.domainAttributes?.furniture && (
                            <div className="mt-3 p-3 bg-muted/30 rounded-md">
                              <p className="font-semibold text-sm mb-2">Furniture Properties</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {fullMaterial.domainAttributes.furniture.species && (
                                  <div>
                                    <p className="text-muted-foreground text-xs">Species</p>
                                    <p className="font-medium">{fullMaterial.domainAttributes.furniture.species}</p>
                                  </div>
                                )}
                                {fullMaterial.domainAttributes.furniture.grade && (
                                  <div>
                                    <p className="text-muted-foreground text-xs">Grade</p>
                                    <p className="font-medium">{fullMaterial.domainAttributes.furniture.grade}</p>
                                  </div>
                                )}
                                {fullMaterial.domainAttributes.furniture.treatment && (
                                  <div className="col-span-2">
                                    <p className="text-muted-foreground text-xs">Treatment</p>
                                    <p className="font-medium">{fullMaterial.domainAttributes.furniture.treatment}</p>
                                  </div>
                                )}
                                {fullMaterial.domainAttributes.furniture.durability && (
                                  <div>
                                    <p className="text-muted-foreground text-xs">Durability</p>
                                    <p className="font-medium">{fullMaterial.domainAttributes.furniture.durability}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {fullMaterial.sustainabilityInfo && typeof fullMaterial.sustainabilityInfo === 'object' && (
                            <div className="mt-3 p-3 bg-green-50 rounded-md border border-green-200">
                              <p className="font-semibold text-sm mb-3 text-green-900">Sustainability</p>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                {fullMaterial.sustainabilityInfo.co2Footprint && (
                                  <div className="flex flex-col items-center p-2 bg-white rounded">
                                    <Footprints className="h-4 w-4 mb-1 text-orange-600" />
                                    <p className="font-semibold text-center">{fullMaterial.sustainabilityInfo.co2Footprint}</p>
                                  </div>
                                )}
                                {fullMaterial.sustainabilityInfo.waterUsage && (
                                  <div className="flex flex-col items-center p-2 bg-white rounded">
                                    <Droplet className="h-4 w-4 mb-1 text-blue-600" />
                                    <p className="font-semibold text-center">{fullMaterial.sustainabilityInfo.waterUsage}</p>
                                  </div>
                                )}
                                {fullMaterial.sustainabilityInfo.energyConsumption && (
                                  <div className="flex flex-col items-center p-2 bg-white rounded">
                                    <Zap className="h-4 w-4 mb-1 text-amber-600" />
                                    <p className="font-semibold text-center">{fullMaterial.sustainabilityInfo.energyConsumption}</p>
                                  </div>
                                )}
                              </div>
                              
                              {fullMaterial.sustainabilityInfo.recyclability && (
                                <div className="mt-2 flex items-center gap-2">
                                  <p className="text-xs text-green-800">Recyclability:</p>
                                  <Badge variant="outline" className="text-xs bg-white">
                                    <Recycle className="h-3 w-3 mr-1 text-green-600" />
                                    {fullMaterial.sustainabilityInfo.recyclability.replace(/_/g, ' ')}
                                  </Badge>
                                </div>
                              )}

                              {/* Certifications */}
                              {fullMaterial.sustainabilityInfo.certifications && fullMaterial.sustainabilityInfo.certifications.length > 0 && (
                                <div className="mt-2">
                                  <div className="flex flex-wrap gap-1">
                                    {fullMaterial.sustainabilityInfo.certifications.map((cert, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs bg-white">
                                        <Award className="h-3 w-3 mr-1 text-amber-600" />
                                        {cert}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Badges */}
                          <div className="flex gap-2 mt-2">
                            {typeof fullMaterial.sustainabilityInfo === 'object' &&
                             fullMaterial.sustainabilityInfo?.recyclability && (
                              <Badge variant="outline" className="text-xs">
                                <Recycle className="h-3 w-3 mr-1" />
                                Recyclable
                              </Badge>
                            )}
                          </div>

                          {/* Used in Components */}
                          <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--template-border)" }}>
                            <p className="font-semibold text-xs text-muted-foreground mb-2">Used in Components:</p>
                            <div className="flex flex-wrap gap-1">
                              {product.productDetails.components
                                .filter((comp) => {
                                  if (!Array.isArray(comp.materials)) return false
                                  return comp.materials.some((matRef) => 
                                    typeof matRef === 'object' && matRef.id === material.id
                                  )
                                })
                                .map((comp) => (
                                  <Badge key={comp.id} variant="secondary" className="text-xs">
                                    {comp.name}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ),
          },
        ]
      : []),
    ...(isFieldVisible("components") && product.productDetails?.components?.length
      ? [
          {
            icon: <Sparkles className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Product Components",
            description: `${product.productDetails.components.length} components with detailed material composition.`,
            details: (
              <div className="space-y-3">
                {product.productDetails.components.map((component) => (
                  <div key={component.id} className="border rounded-lg p-3" style={{ borderColor: "var(--template-border)" }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{component.name}</h4>
                        {component.description && <p className="text-xs text-muted-foreground mt-1">{component.description}</p>}
                      </div>
                      {component.weight && (
                        <Badge variant="outline" className="text-xs">
                          {component.weight} kg
                        </Badge>
                      )}
                    </div>

                    {component.materials && component.materials.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Material Composition:</p>
                        <div className="space-y-2">
                          {component.materials.map((materialRef, idx) => {
                            const fullMaterial = product.materialsRegistry?.find((m) => m.id === materialRef.id)
                            return (
                              <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs">
                                <div className="flex-1">
                                  <p className="font-medium">{materialRef.name || fullMaterial?.name}</p>
                                  {fullMaterial?.category && <p className="text-muted-foreground text-xs">{fullMaterial.category}</p>}
                                </div>
                                {materialRef.percentage && (
                                  <Badge variant="secondary" className="text-xs ml-2">
                                    {materialRef.percentage}%
                                  </Badge>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
  ]

  const impactSteps: Step[] = [
    ...(product.sustainabilityData
      ? [
          {
            icon: <Footprints className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Carbon Footprint",
            description: `${product.sustainabilityData.carbonFootprint || product.sustainabilityData.co2Footprint} total emissions`,
            details: (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <Footprints className="h-5 w-5 text-green-600 mb-2" />
                    <p className="text-xs text-muted-foreground">CO₂ Footprint</p>
                    <p className="font-semibold text-green-700">{product.sustainabilityData.carbonFootprint || product.sustainabilityData.co2Footprint}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Droplet className="h-5 w-5 text-blue-600 mb-2" />
                    <p className="text-xs text-muted-foreground">Water Usage</p>
                    <p className="font-semibold text-blue-700">{product.sustainabilityData.waterUsage}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <Zap className="h-5 w-5 text-amber-600 mb-2" />
                    <p className="text-xs text-muted-foreground">Energy</p>
                    <p className="font-semibold text-amber-700">{product.sustainabilityData.energyConsumption}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <Star className="h-5 w-5 text-purple-600 mb-2" />
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="font-semibold text-purple-700">{product.sustainabilityData.sustainabilityScore}/10</p>
                  </div>
                </div>
                {product.sustainabilityData.energySource && (
                  <div className="mt-3 p-3 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Energy Source</p>
                    <p className="font-medium capitalize">{product.sustainabilityData.energySource.replace(/_/g, ' ')}</p>
                  </div>
                )}
              </div>
            ),
          },
        ]
      : []),
    ...(product.sustainabilityData?.recyclability || product.sustainabilityData?.recycledContentPercentage
      ? [
          {
            icon: <Recycle className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Circularity",
            description: `${product.sustainabilityData.recycledContentPercentage}% recycled content - ${product.sustainabilityData.recyclability?.replace(/_/g, ' ')}`,
            details: (
              <div className="space-y-3">
                {product.sustainabilityData.recycledContentPercentage !== undefined && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Recycled Content</span>
                      <span className="text-sm font-semibold">{product.sustainabilityData.recycledContentPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${product.sustainabilityData.recycledContentPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
                {product.sustainabilityData.recyclability && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Recyclability</p>
                    <Badge variant="outline" className="bg-white">
                      <Recycle className="h-3 w-3 mr-1 text-green-600" />
                      {product.sustainabilityData.recyclability.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                )}
                {product.sustainabilityData.repairability && (
                  <div className="p-3 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground mb-1">Repairability</p>
                    <p className="font-medium">{product.sustainabilityData.repairability}</p>
                  </div>
                )}
                {product.sustainabilityData.expectedLifespan && (
                  <div className="p-3 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground mb-1">Expected Lifespan</p>
                    <p className="font-medium">{product.sustainabilityData.expectedLifespan}</p>
                  </div>
                )}
              </div>
            ),
          },
        ]
      : []),
    ...(product.certifications && product.certifications.length > 0
      ? [
          {
            icon: <Award className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Certifications",
            description: `${product.certifications.length} environmental certifications`,
            details: (
              <div className="space-y-3">
                {product.certifications.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-3" style={{ borderColor: "var(--template-border)" }}>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-amber-500 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{cert.issuingBody}</p>
                        {cert.certificateNumber && (
                          <p className="text-xs mt-1">
                            <span className="text-muted-foreground">Certificate: </span>
                            <span className="font-mono">{cert.certificateNumber}</span>
                          </p>
                        )}
                        {cert.validUntil && (
                          <p className="text-xs mt-1">
                            <span className="text-muted-foreground">Valid until: </span>
                            {new Date(cert.validUntil).toLocaleDateString()}
                          </p>
                        )}
                        {cert.scope && cert.scope.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {cert.scope.map((s, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
    ...((product as any).sustainabilityData?.collectionPoints
      ? [
          {
            icon: <MapPin className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Textile Collection Points",
            description: `${(product as any).sustainabilityData.collectionPoints.length} collection points in Sofia for textile recycling`,
            details: (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Return your used textiles to any of these collection points in Sofia. All collected materials are processed by Texcycle Bulgaria for recycling into new products.
                </p>
                <CollectionMap points={(product as any).sustainabilityData.collectionPoints} />
              </div>
            ),
          },
        ]
      : []),
  ]

  const handlingSteps: Step[] = [
    ...(product.productDetails?.careInstructions && product.productDetails.careInstructions.length > 0
      ? [
          {
            icon: <Wrench className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Care Instructions",
            description: `${product.productDetails.careInstructions.length} care guidelines for longevity`,
            details: (
              <div className="space-y-3">
                {product.productDetails.careInstructions.map((instruction, idx) => (
                  <div key={idx} className="border rounded-lg p-3" style={{ borderColor: "var(--template-border)" }}>
                    <div className="flex items-start gap-2 mb-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {instruction.type}
                      </Badge>
                      {instruction.frequency && (
                        <Badge variant="secondary" className="text-xs">
                          {instruction.frequency}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{instruction.instruction}</p>
                    {instruction.products && instruction.products.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">Recommended products:</p>
                        <div className="flex flex-wrap gap-1">
                          {instruction.products.map((product, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
    ...(product.furnitureProperties?.assembly
      ? [
          {
            icon: <Sparkles className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Assembly",
            description: product.furnitureProperties.assembly.assemblyRequired
              ? `Required - ${product.furnitureProperties.assembly.estimatedTime} mins`
              : "No assembly required",
            details: (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground">Assembly Required</p>
                    <p className="font-medium">{product.furnitureProperties.assembly.assemblyRequired ? "Yes" : "No"}</p>
                  </div>
                  {product.furnitureProperties.assembly.estimatedTime && (
                    <div className="p-3 bg-muted/30 rounded">
                      <p className="text-xs text-muted-foreground">Estimated Time</p>
                      <p className="font-medium">{product.furnitureProperties.assembly.estimatedTime} minutes</p>
                    </div>
                  )}
                  {product.furnitureProperties.assembly.difficultyLevel && (
                    <div className="p-3 bg-muted/30 rounded">
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <p className="font-medium capitalize">{product.furnitureProperties.assembly.difficultyLevel}</p>
                    </div>
                  )}
                </div>
                {product.furnitureProperties.assembly.toolsRequired && product.furnitureProperties.assembly.toolsRequired.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold mb-2">Tools Required:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {product.furnitureProperties.assembly.toolsRequired.map((tool, idx) => (
                        <li key={idx}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.furnitureProperties.assembly.videoGuideAvailable && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-900">Video guide available</p>
                  </div>
                )}
              </div>
            ),
          },
        ]
      : []),
    ...(product.furnitureProperties?.warranty
      ? [
          {
            icon: <Shield className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Warranty",
            description: `${product.furnitureProperties.warranty.duration} years coverage`,
            details: (
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-semibold text-green-900">{product.furnitureProperties.warranty.duration} years</p>
                </div>
                {product.furnitureProperties.warranty.coverage && product.furnitureProperties.warranty.coverage.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2">Coverage includes:</p>
                    <ul className="space-y-1">
                      {product.furnitureProperties.warranty.coverage.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.furnitureProperties.warranty.limitations && product.furnitureProperties.warranty.limitations.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2">Limitations:</p>
                    <ul className="space-y-1">
                      {product.furnitureProperties.warranty.limitations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.furnitureProperties.warranty.claimProcess && (
                  <div className="p-3 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground mb-1">Claim Process</p>
                    <p className="text-sm">{product.furnitureProperties.warranty.claimProcess}</p>
                  </div>
                )}
              </div>
            ),
          },
        ]
      : []),
    ...(product.services && product.services.length > 0
      ? [
          {
            icon: <HandHelping className="h-6 w-6" style={{ color: "var(--template-primary)" }} />,
            title: "Available Services",
            description: `${product.services.length} services available for this product`,
            details: (
              <div className="space-y-3">
                {product.services.map((service, idx) => (
                  <div key={idx} className="border rounded-lg p-3" style={{ borderColor: "var(--template-border)" }}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{service.name}</h4>
                      <Badge variant="outline" className="text-xs capitalize">
                        {service.serviceType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
  ]

  const renderSteps = (steps: Step[]) => (
    <div className="space-y-4 mx-auto">
      {steps.map((step, index) => (
        <Collapsible key={index} open={expandedStep === index} onOpenChange={() => setExpandedStep(expandedStep === index ? null : index)}>
          <Card className="border-none shadow-sm" style={{ borderColor: "var(--template-border)" }}>
            <CardContent className="p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center w-full">
                  <div className="mr-4 p-2 rounded-full" style={{ backgroundColor: "var(--template-muted)" }}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-center" style={{ color: "var(--template-foreground)" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-center" style={{ color: "var(--template-muted-foreground)" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedStep === index ? (
                    <ChevronUp className="h-5 w-5" style={{ color: "var(--template-muted-foreground)" }} />
                  ) : (
                    <ChevronDown className="h-5 w-5" style={{ color: "var(--template-muted-foreground)" }} />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                {typeof step.details === "string" ? <p style={{ color: "var(--template-muted-foreground)" }}>{step.details}</p> : step.details}
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  )

  return (
    <Card
      className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden"
      style={{
        backgroundColor: "var(--template-background)",
        color: "var(--template-foreground)",
        fontFamily: "var(--template-font-family)",
        fontWeight: "var(--template-font-weight)",
      }}
    >
      <CardContent className="p-0">
        <div
          className="text-white p-2 relative overflow-hidden"
          style={{
            background: `linear-gradient(to right, var(--template-primary), var(--template-secondary))`,
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-0">
              <Image src="/images/TC-logo-bs.png" alt="DigiPP Logo" width={100} height={100} />
              <span className="text-2xl font-bold"></span>
            </div>
            <div className="text-xs">© 2025 By SoftGroup</div>
          </div>
          <h2 className="text-xl font-semibold text-center">Discover Your Furniture's Journey</h2>
        </div>

        <div className="p-3">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--template-foreground)" }}>
            {product.name}
          </h2>

          <div className="relative w-full mb-4 rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-[4/3] w-full">
              <Image src={productImages[currentImageIndex].src || "/placeholder.svg"} alt={productImages[currentImageIndex].alt} fill className="object-cover" />
            </div>

            {productImages.length > 1 && (
              <>
                <Button variant="secondary" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md" onClick={prevImage}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full shadow-md" onClick={nextImage}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-1 w-full rounded-lg p-1" style={{ backgroundColor: "var(--template-muted)" }}>
            <Button
              variant="ghost"
              className={`w-full ${activeSection === "product" ? "shadow-sm" : ""} h-12 rounded-md`}
              onClick={() => setActiveSection("product")}
              style={{
                backgroundColor: activeSection === "product" ? "var(--template-background)" : "transparent",
                color: activeSection === "product" ? "var(--template-primary)" : "var(--template-muted-foreground)",
              }}
            >
              <div className="flex flex-col items-center">
                <ShoppingBag className="h-4 w-4 mb-1" />
                <span className="text-xs font-medium">Product</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${activeSection === "impact" ? "shadow-sm" : ""} h-12 rounded-md`}
              onClick={() => setActiveSection("impact")}
              style={{
                backgroundColor: activeSection === "impact" ? "var(--template-background)" : "transparent",
                color: activeSection === "impact" ? "var(--template-primary)" : "var(--template-muted-foreground)",
              }}
            >
              <div className="flex flex-col items-center">
                <Leaf className="h-4 w-4 mb-1" />
                <span className="text-xs font-medium">Impact</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${activeSection === "handling" ? "shadow-sm" : ""} h-12 rounded-md`}
              onClick={() => setActiveSection("handling")}
              style={{
                backgroundColor: activeSection === "handling" ? "var(--template-background)" : "transparent",
                color: activeSection === "handling" ? "var(--template-primary)" : "var(--template-muted-foreground)",
              }}
            >
              <div className="flex flex-col items-center">
                <HandHelping className="h-4 w-4 mb-1" />
                <span className="text-xs font-medium">Handling</span>
              </div>
            </Button>
          </div>

          <div className="py-4 mb-6 border-b" style={{ borderColor: "var(--template-border)" }}>
            <h3 className="text-2xl font-semibold" style={{ color: "var(--template-primary)" }}>
              {activeSection === "product" ? "Product Information" : activeSection === "impact" ? "Environmental Impact" : "Handling and Care"}
            </h3>
          </div>

          {activeSection === "product" && renderSteps(productSteps)}
          {activeSection === "impact" && renderSteps(impactSteps)}
          {activeSection === "handling" && renderSteps(handlingSteps)}
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
          className="fixed bottom-4 right-4 rounded-full shadow-md"
          onClick={scrollToTop}
          style={{
            backgroundColor: "var(--template-background)",
            borderColor: "var(--template-border)",
          }}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}

      
    </Card>
  )
}

export { MobileDppView as FurnitureDPPView }
