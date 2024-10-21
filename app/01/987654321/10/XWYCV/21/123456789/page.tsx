"use client"

import React, { useState, useEffect } from 'react'
import { Coffee, Leaf, Zap, ChevronDown, ChevronUp, Copy, Recycle, Droplet, ThermometerSun, Info, Shield, Settings, HandHelping, Box } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse" />
})

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  pdfLink?: string;
};

const productSteps: Step[] = [
  { 
    icon: <Coffee className="h-6 w-6 text-primary" />,
    title: 'Product Details', 
    description: 'High-quality coffee machine with smart features.',
    details: 'Our coffee machine features precision brewing technology, adjustable settings for various coffee types, and a sleek stainless steel design for durability and style.'
  },
  { 
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Energy Efficiency', 
    description: 'Designed for optimal energy use.',
    details: 'This coffee machine is rated A+++ for energy efficiency, with an auto-shutoff feature and low-power standby mode to minimize electricity consumption.'
  },
  { 
    icon: <Settings className="h-6 w-6 text-primary" />,
    title: 'Maintenance', 
    description: 'Easy care for long-lasting performance.',
    details: 'Regular cleaning and descaling ensure optimal performance. The machine has a self-cleaning function and removable parts for easy maintenance.'
  },
]

const impactSteps: Step[] = [
  {
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    title: 'Sustainability',
    description: 'Our commitment to environmental responsibility.',
    details: 'We use recycled materials in packaging and some internal components. The machine is designed for easy disassembly and recycling at end-of-life.'
  },
  {
    icon: <Recycle className="h-6 w-6 text-green-600" />,
    title: 'Recycling Program',
    description: 'End-of-life product management.',
    details: 'We offer a comprehensive recycling program. Return your old machine to us or any participating retailer for proper recycling and receive a discount on your next purchase.'
  }
]

const handlingSteps: Step[] = [
  {
    icon: <Droplet className="h-6 w-6 text-blue-600" />,
    title: 'Water Management',
    description: 'Efficient water usage and filtration.',
    details: 'The machine includes a water filtration system to improve taste and reduce scale buildup. It also features a water-saving mode for more efficient brewing.'
  },
  {
    icon: <ThermometerSun className="h-6 w-6 text-blue-600" />,
    title: 'Temperature Control',
    description: 'Precise heating for perfect brewing.',
    details: 'Advanced temperature control ensures water is heated to the optimal range of 92°C to 96°C for extracting the best flavor from your coffee beans.'
  }
]

const productDetails = {
  id: 'CM5000X',
  manufacturer: 'EcoBrew Technologies',
  materialComposition: [
    {
      materialType: 'Stainless Steel',
      source: 'Recycled Steel',
      sustainabilityCertification: 'ISO 14001',
      percentage: 60,
      subcomponents: [
        { name: 'Body', material: 'Stainless Steel', source: 'Recycled' },
        { name: 'Water Tank', material: 'Stainless Steel', source: 'Recycled' },
      ]
    },
    {
      materialType: 'Plastic',
      source: 'Partially Recycled ABS',
      sustainabilityCertification: 'EPEAT',
      percentage: 30,
      subcomponents: [
        { name: 'Control Panel', material: 'ABS', source: 'Partially Recycled' },
        { name: 'Internal Components', material: 'ABS', source: 'Partially Recycled' },
      ]
    },
    {
      materialType: 'Electronics',
      source: 'Various',
      sustainabilityCertification: 'RoHS Compliant',
      percentage: 10,
      subcomponents: [
        { name: 'Circuit Board', material: 'Various', source: 'New Materials' },
        { name: 'Sensors', material: 'Various', source: 'New Materials' },
      ]
    },
  ],
  healthAndSafety: {
    chemicalUse: 'BPA-free plastics, lead-free solder',
    safetyCertifications: ['CE', 'UL', 'NSF Certified'],
    allergenInformation: 'Produced in a facility that processes milk products'
  },
  consumerInformation: {
    careInstructions: 'Clean after each use. Descale monthly or as indicated by the machine. Use filtered water for best results.',
    assemblyInstructions: 'https://example.com/coffee-machine-setup.pdf',
    warranty: '2-year limited warranty covering manufacturing defects',
    disassemblyInstructions: 'https://example.com/coffee-machine-recycling.pdf',
    repairServices: 'Contact our customer service for authorized repair centers in your area'
  },
  sustainabilityAndCircularEconomy: {
    recyclability: '85%',
    recycledContent: '40%',
    reusePotential: 'Components can be repurposed. See our guide for ideas: https://example.com/upcycling-guide',
    repairabilityScore: '7/10',
    endOfLifeInstructions: 'Disassemble for electronics and metal recycling. Plastic components can be recycled where facilities exist.',
    takeback: 'Available in all regions. Visit our website for details on our appliance take-back program.'
  },
  environmentalImpact: {
    carbonFootprint: '15kg CO2e (production and shipping)',
    waterUsage: '100 liters (production)',
    energy: '1000 kWh/year (estimated usage)'
  },
  certifications: ['Energy Star', 'EPEAT Gold', 'Fair Trade Certified']
}

export default function CoffeeMachinePassport() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('product')
  const couponCode = 'ECOCOFFEE20'
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const renderSteps = (steps: Step[]) => (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      {steps.map((step, index) => (
        <Collapsible 
          key={index}
          open={expandedStep === index}
          onOpenChange={() => setExpandedStep(expandedStep === index ? null : index)}
        >
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <CollapsibleTrigger className="flex items-start justify-between w-full">
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-gray-100 rounded-full">{step.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="ml-4 mt-2">
                  {expandedStep === index ? 
                    <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <p className="text-gray-700">{step.details}</p>
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
    <Collapsible className="mt-4 w-full max-w-sm mx-auto">
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
            <p>Use for a 20% discount on eco-friendly coffee pods.</p>
          </div>
        )
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden bg-white text-gray-900">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-green-600/90 to-green-800/90 backdrop-blur-md text-white p-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-25 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNMTUgMTVMMjAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxjaXJjbGUgY3g9IjQ1IiBjeT0iNDUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNNDUgNDVMNDAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxjaXJjbGUgY3g9IjQ1IiBjeT0iMTUiIHI9IjQiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNNDUgMTVMNDAgMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
              <Coffee className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold">EcoBrew</span>
            </div>
            <div className="text-xs">
              © 2024 EcoBrew Tech
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mt-2">Discover Your Coffee Machine's Journey</h2>
        </div>
        
        <div className="flex justify-center items-center p-2 bg-gray-50 sticky top-0 z-10 shadow-md w-full">
          <div className="flex justify-center space-x-1 w-full max-w-sm bg-gray-100 rounded-lg p-1">
            <Button 
              variant="ghost"
              className={`flex-1 ${activeSection === 'product' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'} rounded-md transition-all duration-200`}
              onClick={() => setActiveSection('product')}
            >
              <div className="flex flex-col items-center">
                <Coffee className={`h-4 w-4 mb-1 ${activeSection === 'product' ? 'text-primary' : 'text-gray-600'}`} />
                <span  className={`text-xs font-medium ${activeSection === 'product' ? 'text-primary' : 'text-gray-600'}`}>Product</span>
              </div>
            </Button>
            <Button 
              variant="ghost"
              className={`flex-1 ${activeSection === 'impact' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'} rounded-md transition-all duration-200`}
              onClick={() => setActiveSection('impact')}
            >
              <div className="flex flex-col items-center">
                <Leaf className={`h-4 w-4 mb-1 ${activeSection === 'impact' ? 'text-green-600' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium ${activeSection === 'impact' ? 'text-green-600' : 'text-gray-600'}`}>Impact</span>
              </div>
            </Button>
            <Button 
              variant="ghost"
              className={`flex-1 ${activeSection === 'handling' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'} rounded-md transition-all duration-200`}
              onClick={() => setActiveSection('handling')}
            >
              <div className="flex flex-col items-center">
                <HandHelping className={`h-4 w-4 mb-1 ${activeSection === 'handling' ? 'text-blue-600' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium ${activeSection === 'handling' ? 'text-blue-600' : 'text-gray-600'}`}>Handling</span>
              </div>
            </Button>
          </div>
        </div>
        
        <div className="p-4 w-full max-w-sm mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Explore your</h2>
          <h1 className="text-4xl font-bold mb-6 text-primary">Coffee Machine's Story</h1>
          
          <div className="relative w-full mb-6 rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yo6oX3eq1tgaZsF3oGYzu_e42a410015ab42168d266a5aff589069-4a8Jst7p1N3uv146ZTM0rC0URkPAtQ.png" 
              alt="Modern stainless steel coffee machine"
              width={800}
              height={600}
              layout="responsive"
              className="transition-transform duration-300 hover:scale-105"
            />
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
                  <Info className="h-5 w-5 text-primary" />,
                  "Comprehensive information about the coffee machine's composition and features",
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
                        <dt className="font-semibold">Setup Guide:</dt>
                        <dd>
                          <a href={productDetails.consumerInformation.assemblyInstructions} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            Download PDF
                          </a>
                        </dd>
                        <dt className="font-semibold">Warranty:</dt>
                        <dd>{productDetails.consumerInformation.warranty}</dd>
                        <dt className="font-semibold">Recycling Guide:</dt>
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
                        {isBrowser && <MapComponent />}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
                {renderDetailSection(
                  "Health & Safety",
                  <Shield className="h-5 w-5 text-primary" />,
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
          
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold text-primary mb-2">Eco Rewards</h3>
                <p className="text-sm text-gray-600">Enjoy 20% off eco-friendly coffee pods</p>
              </div>
              <div className="flex items-center">
                <Input 
                  value={couponCode} 
                  readOnly 
                  className="w-32 mr-2 bg-white/50 border border-primary/20 focus:border-primary text-center"
                />
                <Button 
                  onClick={copyToClipboard} 
                  variant="outline" 
                  size="icon" 
                  className="bg-white/50 border border-primary/20 hover:bg-primary/10 hover:border-primary transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-secondary/5 p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-3 text-primary">Special Offer</h3>
            <p className="mb-4 text-gray-700">Limited time offer: Get a set of reusable coffee filters at 50% off with your machine purchase!</p>
            <Button variant="secondary" className="w-full">Shop Now</Button>
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}