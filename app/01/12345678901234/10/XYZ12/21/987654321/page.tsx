"use client"

import React, { useState, useEffect } from 'react'
import { ShoppingBag, Leaf, Truck, Recycle, PackageCheck ,ChevronDown, ChevronUp, Copy, Tag, Sparkles, Info, Shield, MapPin, Settings, HandHelping, Box, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { MarkerData } from '@/components/MapComponentMarkers'


const MapComponentMarkers = dynamic(() => import('@/components/MapComponentMarkers'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
})

const demoMarkers: MarkerData[] = [
  { position: [62.593341,-101.777344], popupContent: "Wood Origin: Canada", type: 'origin' },
  { position: [60.128162, 18.643501], popupContent: "Steel Origin: Sweden", type: 'origin' },
  { position: [20.593683, 78.962883], popupContent: "Steel Origin: India", type: 'origin' },
  { position: [42.73, 25.48], popupContent: "Manufactured  in Sofia, Bulgaria", type: 'manufacturer'}
  
];

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  pdfLink?: string;
};

const productSteps: Step[] = [
  {
    icon: <ShoppingBag className="h-6 w-6 text-violet-500" />,
    title: 'Product Descrtiption',
    description: 'High-quality leather sofa with premium craftsmanship.',
    details: 'Our leather sofa is made from top-grain leather, featuring a sturdy hardwood frame and high-resilience foam cushions for ultimate comfort and durability.'
  },
  {
    icon: <Tag className="h-6 w-6 text-violet-500" />,
    title: 'Brand Details',
    description: 'Luxury furniture brand with a focus on sustainability.',
    details: 'We have been crafting premium furniture since 1985. We are committed to sustainable practices and ethical sourcing of materials.'
  },
  {
    icon: <Sparkles className="h-6 w-6 text-violet-500" />,
    title: 'Care Instructions',
    description: 'Proper care ensures long-lasting beauty and comfort.',
    details: 'Clean with a soft, dry cloth. For spills, blot immediately with a clean, absorbent cloth. Use leather conditioner every 6-12 months to maintain the leather\'s softness and prevent cracking.'
  },
]

const impactSteps: Step[] = [
  {
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    title: 'Sustainability',
    description: 'Our commitment to environmental responsibility.',
    details: 'We use responsibly sourced materials and implement eco-friendly manufacturing processes to minimize our environmental impact.'
  },
  {
    icon: <Recycle className="h-6 w-6 text-green-600" />,
    title: 'Recycling Program',
    description: 'End-of-life product management.',
    details: 'We offer a comprehensive recycling program for our products, ensuring that materials are properly recycled or repurposed at the end of their lifecycle.'
  }
]

const handlingSteps: Step[] = [
  {
    icon: <Settings className="h-6 w-6 text-blue-600" />,
    title: 'Home Setup',
    description: 'Easy installation in your space.',
    details: 'Our furniture is designed for easy assembly. Detailed instructions are provided, and customer support is available if you need assistance.',
    pdfLink: '/assembly-instructions.pdf'
  },
  {
    icon: <Info className="h-6 w-6 text-blue-600" />,
    title: 'Technical Specifications',
    description: 'Easy installation in your space.',
    details: 'Our furniture is designed for easy assembly. Detailed instructions are provided, and customer support is available if you need assistance.',
    pdfLink: '/assembly-instructions.pdf'
  },
  {
    icon: <PackageCheck className="h-6 w-6 text-blue-600" />,
    title: 'Shipping',
    description: 'Careful packaging and delivery.',
    details: 'Our products are carefully packaged to prevent damage during shipping. We use eco-friendly packaging materials whenever possible.'
  }
]

const productDetails = {
  id: '123456789',
  manufacturer: 'GreenFurniture Co.',
  materialComposition: [
    {
      materialType: 'Wood',
      source: 'FSC-certified Oak',
      sustainabilityCertification: 'FSC',
      percentage: 70,
      subcomponents: [
        { name: 'Frame', material: 'Oak', source: 'FSC-certified' },
        { name: 'Legs', material: 'Oak', source: 'FSC-certified' },
      ]
    },
    {
      materialType: 'Metal',
      source: 'Recycled Steel',
      sustainabilityCertification: 'ISO 14001',
      percentage: 20,
      subcomponents: [
        { name: 'Screws', material: 'Steel', source: 'Recycled' },
        { name: 'Hinges', material: 'Steel', source: 'Recycled' },
      ]
    },
    {
      materialType: 'Textile',
      source: 'Natural Fibers',
      sustainabilityCertification: 'GOTS',
      percentage: 10,
      subcomponents: [
        { name: 'Cushion Cover', material: 'Cotton', source: 'Organic' },
        { name: 'Padding', material: 'Wool', source: 'Organic' },
      ]
    },
  ],
  healthAndSafety: {
    chemicalUse: 'Water-based, low-VOC finishes and adhesives',
    safetyCertifications: ['CE marking', 'EN 1021 (Furniture - Assessment of the ignitability of upholstered furniture)'],
    allergenInformation: 'May contain natural latex in cushioning'
  },
  consumerInformation: {
    careInstructions: 'Vacuum regularly. Spot clean with mild soap and water. Professional cleaning recommended for stubborn stains.',
    assemblyInstructions: 'https://example.com/assembly-guide.pdf',
    warranty: '5-year limited warranty covering manufacturing defects',
    disassemblyInstructions: 'https://example.com/disassembly-guide.pdf',
    repairServices: 'Contact our customer service for authorized repair centers in your area'
  },
  sustainabilityAndCircularEconomy: {
    recyclability: '90%',
    recycledContent: '25%',
    reusePotential: 'High. Can be refurbished or repurposed. See our guide for ideas: https://example.com/reuse-guide',
    repairabilityScore: '8/10',
    endOfLifeInstructions: 'Disassemble for wood and metal recycling at certified centers. Textile components can be composted or recycled depending on local facilities.',
    takeback: 'Available in select regions. Visit our website for details on our furniture take-back program.'
  },
  environmentalImpact: {
    carbonFootprint: '30kg CO2',
    waterUsage: '50 liters',
    energy: '200 kWh'
  },
  certifications: ['FSC', 'ISO 14001', 'GOTS']
}

export default function ProductJourney() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('product')
  const couponCode = 'LOYALTY15'
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

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
                  {expandedStep === index ?
                    <ChevronUp className="h-5 w-5 text-gray-500" /> :
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <p className="text-gray-700 text-center">{step.details}</p>
                {step.pdfLink && (
                  <div className="flex justify-center mt-2">
                    <Button variant="outline" asChild>
                      <a href={step.pdfLink} target="_blank" rel="noopener noreferrer">
                        Download PDF Guide
                      </a>
                    </Button>
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
          <CollapsibleContent className="pt-4">
            {content}
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  )

  const copyToClipboard = () => {
    if (isBrowser) {
      navigator.clipboard.writeText(couponCode).then(() => {
        toast(
          <div>
            <strong>Coupon code copied</strong>
            <p>Use for a 15% discount.</p>
          </div>
        )
      })
    }
  }


  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden bg-white text-gray-900">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-600/90 to-blue-800/90 backdrop-blur-md text-white p-2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNMTUgMTVMMjAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxjaXJjbGUgY3g9IjQ1IiBjeT0iNDUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNNDUgNDVMNDAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxjaXJjbGUgY3g9IjQ1IiBjeT0iMTUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNNDUgMTVMNDAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-0 transition-transform duration-300 hover:scale-105">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Furnitures-aBYqzHe2jKqqfnnzrmOSolTeYZ1muS.png"
                alt="DigiPP Logo" width={60} height={60}
              />
              <span className="text-2xl  font-bold">DigiPP</span>
            </div>
            <div className="text-xs">
              © 2024 By SoftGroup
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center">Discover Your Sofa's Journey</h2>
        </div>

        <div className="p-4">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Explore your</h2>
          <h1 className="text-4xl font-bold mb-6 text-primary">Sofa's Story</h1>

          <div className="relative w-full mb-6 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mjEAzcEcSHx_HiSyGmIZT_788eb4cd2ecc45b2bf60495927b125a6-poXYOMB78R8Mv2HchIzWj3JbHlsIRA.png"
              alt="Brown leather sofa"
              width={800}
              height={600}
              layout="responsive"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex justify-center space-x-1 w-full bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              className={`flex-1 ${activeSection === 'product' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}  h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection('product')}
            >
              <div className="flex flex-col items-center">
                <ShoppingBag className={`h-4 w-4 mb-1 ${activeSection === 'product' ? 'text-violet-500' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium ${activeSection === 'product' ? 'text-violet-500' : 'text-gray-600'}`}>Product</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 ${activeSection === 'impact' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}  h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection('impact')}
            >
              <div className="flex flex-col items-center">
                <Leaf className={`h-4 w-4 mb-1 ${activeSection === 'impact' ? 'text-green-600' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium ${activeSection === 'impact' ? 'text-green-600' : 'text-gray-600'}`}>Impact</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 ${activeSection === 'handling' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}  h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection('handling')}
            >
              <div className="flex flex-col items-center">
                <HandHelping className={`h-4 w-4 mb-1 ${activeSection === 'handling' ? 'text-blue-600' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium ${activeSection === 'handling' ? 'text-blue-600' : 'text-gray-600'}`}>Handling</span>
              </div>
            </Button>
          </div>

          <div className="sticky top-16 bg-white z-10 py-4 mb-6 border-b border-gray-200">
            <h3 className="text-2xl font-semibold text-primary">
              {activeSection === 'product' ? 'Product Information' :
                activeSection === 'impact' ? 'Environmental Impact' :
                  'Handling and Care'}
            </h3>
          </div>

          {activeSection === 'product' && (
            <>
              {renderSteps(productSteps)}
              <div className="mt-8 space-y-4">
                {renderDetailSection(
                  "Product Details",
                  <Info className="h-6 w-6 text-violet-500" />,
                  "Comprehensive information about the product's composition and features",
                  <Tabs defaultValue="composition" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="composition">Composition</TabsTrigger>
                      <TabsTrigger value="consumer">Consumer Info</TabsTrigger>
                      <TabsTrigger value="location">Location</TabsTrigger>
                    </TabsList>
                    <TabsContent value="composition">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <dt className="font-semibold">Product ID:</dt>
                        <dd>{productDetails.id}</dd>
                        <dt className="font-semibold">Manufacturer:</dt>
                        <dd>{productDetails.manufacturer}</dd>

                        {productDetails.materialComposition.map((material, index) => (
                          <React.Fragment key={index}>
                            <dt className="font-semibold col-span-2 mt-2">{material.materialType} ({material.percentage}%):</dt>
                            <dt className="font-semibold ml-2">Source:</dt>
                            <dd>{material.source}</dd>
                            <dt className="font-semibold ml-2">Certification:</dt>
                            <dd>{material.sustainabilityCertification}</dd>
                            <dt className="font-semibold ml-2">Subcomponents:</dt>
                            <dd>
                              {material.subcomponents.map((sub, subIndex) => (
                                <div key={subIndex}>{sub.name}: {sub.material} ({sub.source})</div>
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
                        <dt className="font-semibold">Assembly Guide:</dt>
                        <dd>
                          <a href={productDetails.consumerInformation.assemblyInstructions} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            Download PDF
                          </a>
                        </dd>
                        <dt className="font-semibold">Warranty:</dt>
                        <dd>{productDetails.consumerInformation.warranty}</dd>
                        <dt className="font-semibold">Disassembly Guide:</dt>
                        <dd>
                          <a href={productDetails.consumerInformation.disassemblyInstructions} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            Download PDF
                          </a>
                        </dd>
                        <dt className="font-semibold">Repair Services:</dt>
                        <dd>{productDetails.consumerInformation.repairServices}</dd>
                      </dl>
                    </TabsContent>
                    <TabsContent value="location">
                      <div className="h-64 w-full">
                        {isBrowser && <MapComponentMarkers markers={demoMarkers} />}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
                {renderDetailSection(
                  "Health & Safety",
                  <Shield className="h-6 w-6 text-violet-500" />,
                  "Important information about product safety and potential health impacts",
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <dt className="font-semibold">Chemical Use:</dt>
                    <dd>{productDetails.healthAndSafety.chemicalUse}</dd>
                    <dt className="font-semibold">Safety Certifications:</dt>
                    <dd>{productDetails.healthAndSafety.safetyCertifications.join(', ')}</dd>
                    <dt className="font-semibold">Allergen Information:</dt>
                    <dd>{productDetails.healthAndSafety.allergenInformation}</dd>
                  </dl>
                )}
              </div>
            </>
          )}
          {activeSection === 'impact' && renderSteps(impactSteps)}
          {activeSection === 'handling' && renderSteps(handlingSteps)}

          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary">Loyalty Rewards</h3>
                  <p className="text-xs text-gray-600">15% off next purchase</p>
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
                  <h3 className="text-lg font-semibold text-primary">Special Offer</h3>
                  <p className="text-xs text-gray-700">50% off matching ottoman</p>
                </div>
                <Button variant="secondary" size="sm">Shop Now</Button>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}