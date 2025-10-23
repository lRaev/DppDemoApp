"use client"

import React, { useState, useEffect } from 'react'
import { Coffee,Download, Leaf, Truck, PackageOpen, Puzzle,Zap, ChevronDown, ChevronUp, Copy, Recycle, Droplet, ThermometerSun, Info, Shield, Settings, HandHelping, Box, UserRoundCog, ArrowUp, Factory, Heart, Wrench, TreeDeciduous, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { BarChart, Bar, Cell , XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { MarkerData } from '@/components/MapComponentMarkers'

const MapComponentMarkers = dynamic(() => import('@/components/MapComponentMarkers'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
})

const demoMarkers: MarkerData[] = [
  { position: [42.73, 25.48], popupContent: "Product Origin: Sofia, Bulgaria", type: 'origin' },
  { position: [52.52, 13.40], popupContent: "Distribution Center: Berlin, Germany", type: 'distribution' },
  { position: [48.85, 2.35], popupContent: "Retail Store: Paris, France", type: 'manufacturer' },
  { position: [40.71, -74.01], popupContent: "Retail Store: New York, USA", type: 'manufacturer' },
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
    icon: <Coffee className="h-6 w-6 text-violet-500" />,
    title: 'Product Description',
    description: 'High-quality coffee machine with smart features.',
    details: 'Our coffee machine features precision brewing technology, adjustable settings for various coffee types, and a sleek stainless steel design for durability and style.'
  },
  {
    icon: <Zap className="h-6 w-6 text-violet-500" />,
    title: 'Energy Efficiency',
    description: 'Designed for optimal energy use.',
    details: 'This coffee machine is rated A+++ for energy efficiency, with an auto-shutoff feature and low-power standby mode to minimize electricity consumption.'
  },
  {
    icon: <Settings className="h-6 w-6 text-violet-500" />,
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
  },
  {
    icon: <PackageOpen className="h-6 w-6 text-green-600" />,
    title: 'Packaging Materials',
    description: 'ECO packaging composition.',
    details: 'Our packaging is designed with sustainability in mind, adhering to European Sustainability Product Requirements. We use materials that are easily recyclable and have high recycled content.'
  },
  {
    icon: <Factory className="h-6 w-6 text-green-600" />,
    title: 'Manufacturing & Fair Labor',
    description: 'Ethical production practices.',
    details: 'Our manufacturing process adheres to strict fair labor standards and environmental regulations. We are committed to ensuring safe working conditions and fair wages throughout our supply chain.'
  },
  {
    icon: <Heart className="h-6 w-6 text-green-600" />,
    title: 'Social Impact Initiatives',
    description: 'Supporting communities and workers.',
    details: 'We actively support programs that improve working conditions in coffee-growing regions and invest in local community development projects.'
  },
  {
    icon: <TreeDeciduous className="h-6 w-6 text-green-600" />,
    title: 'Carbon Offset Program',
    description: 'Reducing our carbon footprint.',
    details: 'We participate in verified carbon offset programs to neutralize the environmental impact of our production and shipping processes.'
  }
]

const handlingSteps: Step[] = [
  {
    icon: <UserRoundCog className="h-6 w-6 text-blue-600" />,
    title: 'User Guide',
    description: 'Setup and enjoy your cup of coffee.',
    details: 'Follow the instructions to set up your coffee machine and brew your first cup. Download the user guide for detailed instructions.',
    pdfLink: '/assembly-instructions.pdf'
  },
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
  },
  {
    icon: <Wrench className="h-6 w-6 text-blue-600" />,
    title: 'Repair and Longevity',
    description: 'Built to last, easy to maintain.',
    details: 'Our coffee machine is designed for a lifespan of 7-10 years with proper care. We offer readily available spare parts and comprehensive repair guides to extend its life even further.'
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
        { 
          name: 'Circuit Board', 
          material: 'FR-4', 
          source: 'New Materials',
          subcomponents: [
            { name: 'Copper Traces', material: 'Copper', source: 'Partially Recycled' },
            { name: 'Solder Mask', material: 'Epoxy', source: 'New Materials' }
          ]
        },
        { name: 'Microprocessor', material: 'Silicon', source: 'New Materials' },
        { 
          name: 'Sensors', 
          material: 'Various', 
          source: 'New Materials',
          subcomponents: [
            { name: 'Temperature Sensor', material: 'Thermocouple', source: 'New Materials' },
            { name: 'Pressure Sensor', material: 'Piezoelectric', source: 'New Materials' }
          ]
        },
        { name: 'Wiring', material: 'Copper', source: 'Partially Recycled' },
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
  packagingMaterials: [
    { material: 'Corrugated Cardboard', percentage: 70, recycledContent: 100, recyclability: 'Widely Recyclable' },
    { material: 'Molded Pulp', percentage: 20, recycledContent: 100, recyclability: 'Biodegradable' },
    { material: 'Low-Density Polyethylene (LDPE)', percentage: 10, recycledContent: 30, recyclability: 'Check Locally' }
  ],
  environmentalImpact: {
    carbonFootprint: '15kg CO2e (production and shipping)',
    waterUsage: '100 liters (production)',
    energy: '1000 kWh/year (estimated usage)',
    carbonFootprintSh: '115',
    waterUsageSh: '100',
    energySh: '210'
  },
  certifications: ['Energy Star', 'EPEAT Gold', 'Fair Trade Certified'] as Certification[],
  fairLaborCertifications: ['SA8000', 'BSCI', 'Fair Labor Association'] as FairLaborCertification[],
  energyComparison: [
    { name: 'Our Model', energy: 850 },
    { name: 'Average Model', energy: 1200 },
    { name: 'Inefficient Model', energy: 1500 }
  ],
  waterEfficiency: {
    usagePerCup: 150, // in ml
    industryAverage: 180 // in ml
  },
  carbonOffsetProgram: {
    provider: 'GreenOffset Co.',
    amountOffset: '20kg CO2e per unit sold',
    projectType: 'Reforestation in South America'
  },
  ecoInnovations: [
    { name: 'Smart Energy Saver', description: 'Learns your usage patterns to optimize energy consumption' },
    { name: 'Precision Water Doser', description: 'Reduces water waste by up to 20% compared to standard models' }
  ],
}

type Certification = 'Energy Star' | 'EPEAT Gold' | 'Fair Trade Certified';
type FairLaborCertification = 'SA8000' | 'BSCI' | 'Fair Labor Association';

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
          {sub.subcomponents && (
            <div className="ml-4 mt-1">
              {renderSubcomponents(sub.subcomponents, level + 1)}
            </div>
          )}
        </div>
      </li>
    ))}
  </ul>
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
          <div className="ml-28 mt-2">
            {renderSubcomponents(material.subcomponents)}
          </div>
        </div>
      ))}
      <div className="absolute left-[7rem] top-2 bottom-2 w-px bg-gray-200"></div>
    </div>
  </div>
)

export default function CoffeeMachinePassport() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('product')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const couponCode = 'ECOCOFFEE20'

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      toast(
        <div>
          <strong>Coupon code copied</strong>
          <p>Use for a 20% discount on eco-friendly coffee pods.</p>
        </div>
      )
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      toast(
        <div>
          <strong>Failed to copy</strong>
          <p>Please try again or copy the code manually.</p>
        </div>
      )
    });
  }

  const renderSteps = (steps: Step[]) => (
    <div className="space-y-4 w-full max-w-sm mx-auto flex flex-col items-center">
      {steps.map((step, index) => (
        <Collapsible
          key={index}
          open={expandedStep === index}
          onOpenChange={() => setExpandedStep(expandedStep === index ? null : index)}
          className="w-full"
        >
          <Card className="border-none shadow-sm w-full">
            <CardContent className="p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center w-full">
                  <div className="mr-4 p-2 bg-gray-100 rounded-full flex-shrink-0">{step.icon}</div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {expandedStep === index ?
                    <ChevronUp className="h-5 w-5 text-gray-500" /> :
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="pl-14">
                  <p className="text-gray-700">{step.details}</p>
                  {step.title === 'Packaging Materials' && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Packaging Composition:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {productDetails.packagingMaterials.map((material, index) => (
                          <li key={index}>
                            <span  className="font-medium">{material.material}</span>: {material.percentage}%
                            <ul className="list-none pl-4 mt-1">
                              <li>Recycled Content: {material.recycledContent}%</li>
                              <li>Recyclability: {material.recyclability}</li>
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {step.title === 'Manufacturing & Fair Labor' && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Fair Labor Certifications:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {productDetails.fairLaborCertifications.map((cert, index) => (
                          <li key={index}>
                            <a
                              href={`https://example.com/fair-labor/${cert.toLowerCase().replace(/\s+/g, '-')}`}
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
                  {step.title === 'Energy Efficiency' && (
                    <div className="mt-4">
                    <h4 className="font-semibold mb-2">Energy Consumption Comparison:</h4>
                    <div className="flex justify-start">
                      <ResponsiveContainer width="70%" height={200}>
                        <BarChart data={productDetails.energyComparison}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="energy" fill="#8884d8">
                      
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Energy consumption in kWh/year</p>
                  </div>
                  )}
                  {step.title === 'Water Management' && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Water Efficiency:</h4>
                      <p>Water usage per cup: {productDetails.waterEfficiency.usagePerCup}ml</p>
                      <p>Industry average: {productDetails.waterEfficiency.industryAverage}ml</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Our machine uses {((1 - productDetails.waterEfficiency.usagePerCup / productDetails.waterEfficiency.industryAverage) * 100).toFixed(1)}% less water than the industry average.
                      </p>
                    </div>
                  )}
                  {step.pdfLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => window.open(step.pdfLink, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download User Guide PDF
                    </Button>
                  )}
                  {step.title === 'Carbon Offset Program' && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Carbon Offset Details:</h4>
                      <p>Provider: {productDetails.carbonOffsetProgram.provider}</p>
                      <p>Amount Offset: {productDetails.carbonOffsetProgram.amountOffset}</p>
                      <p>Project Type: {productDetails.carbonOffsetProgram.projectType}</p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  )

  const renderEcoCertificates = () => (
    <div className="space-y-4 mt-6 w-full max-w-sm mx-auto text-center">
      <h4 className="text-m font-semibold">Eco Certificates</h4>
      <div className="flex flex-wrap justify-center gap-2">
        {productDetails.certifications.map((cert, index) => (
          <a
            key={index}
            href={`https://example.com/certificates/${cert.toLowerCase().replace(/\s+/g, '-')}`}
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

  const renderEnvironmentalImpact = () => (
    <div className="space-y-4 w-full max-w-sm mx-auto text-center">
      <h4 className="text-lg font-semibold">Environmental Impact</h4>
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 flex flex-col items-center">
          <Truck className="h-8 w-8 text-blue-500 mb-2" />
         
          <span className="text-m font-bold">
            {productDetails.environmentalImpact.carbonFootprintSh} kg
          </span>
          <span className="text-sm font-medium">CO2 </span>
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <Droplet className="h-8 w-8 text-blue-500 mb-2" />
          
          <span className="text-m font-bold">
            {productDetails.environmentalImpact.waterUsageSh} L
          </span>
          <span className="text-xs font-medium">Water Usage</span>
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <Zap className="h-8 w-8 text-yellow-500 mb-2" />
          
          <span className="text-m font-bold">
            {productDetails.environmentalImpact.energySh} kWh
          </span>
          <span className="text-xs font-medium">Energy</span>
        </Card>
      </div>
    </div>
  )

  const renderDetailSection = (title: string, icon: React.ReactNode, description: string, content: React.ReactNode) => (
    <Collapsible className="mt-4 w-full  max-w-sm mx-auto">
      <Card className="border-none shadow-sm w-full">
        <CardContent className="p-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center w-full">
              <div className="mr-4 p-2 bg-gray-100 rounded-full flex-shrink-0">{icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            {content}
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  )

  const renderEcoInnovations = () => (
    <div className="mt-6 w-full max-w-sm mx-auto">
      <h4 className="text-lg font-semibold mb-4">Eco-Innovations</h4>
      {productDetails.ecoInnovations.map((innovation, index) => (
        <div key={index} className="mb-4">
          <h5 className="font-semibold">{innovation.name}</h5>
          <p className="text-sm text-gray-600">{innovation.description}</p>
        </div>
      ))}
    </div>
  )

  


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
              © 2025 By SoftGroup
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mt-2">Discover Your Coffee Machine's Journey</h2>
        </div>

        <div className="p-4">
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

          <div className="flex justify-center space-x-1 w-full max-w-full bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              className={`flex-1 ${activeSection === 'product' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'} h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection('product')}
            >
              <div className="flex flex-col items-center">
                <Coffee className={`h-4 w-4 mb-1 ${activeSection === 'product' ? 'text-violet-500' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium ${activeSection === 'product' ? 'text-violet-500' : 'text-gray-600'}`}>Product</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 ${activeSection === 'impact' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'} h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection('impact')}
            >
              <div className="flex flex-col items-center">
                <Leaf className={`h-4 w-4 mb-1 ${activeSection === 'impact' ? 'text-green-600' : 'text-gray-600'}`} />
                <span className={`text-xs font-medium ${activeSection === 'impact' ? 'text-green-600' : 'text-gray-600'}`}>Impact</span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 ${activeSection === 'handling' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'} h-12 rounded-md transition-all duration-200`}
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
              <div className="mt-2 space-y-2">
                {renderDetailSection(
                  "Product Details",
                  <Info className="h-6 w-6 text-violet-500" />,
                  "Comprehensive information about the coffee machine's composition and features",
                  <Tabs defaultValue="composition" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      
                      <TabsTrigger value="consumer">Consumer Info</TabsTrigger>
                      <TabsTrigger value="location">Location</TabsTrigger>
                    </TabsList>
                    <TabsContent value="composition">
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full">
                          <h4 className="text-lg font-semibold">Material Composition</h4>
                          <ChevronDown className="h-5 w-5" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4">
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
                                  {renderSubcomponents(material.subcomponents)}
                                </dd>
                              </React.Fragment>
                            ))}
                          </dl>
                        </CollapsibleContent>
                      </Collapsible>
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
                        <MapComponentMarkers markers={demoMarkers} />
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
                {renderDetailSection(
                  "Health & Safety",
                  <Shield className="h-5 w-5 text-violet-500" />,
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
                {renderDetailSection(
                  "Material Composition",
                  <Puzzle className="h-6 w-6 text-violet-500" />,
                  "The materials used to craft your coffee machine",
                  renderMaterialSourceTimeline()
                )}
                  
              </div>
           
            </>
          )}

          {activeSection === "impact" && (
            <>
              {renderSteps(impactSteps)}
              <div className="mt-8">
                {renderEnvironmentalImpact()}
                {renderEcoCertificates()}
                
              </div>
            </>
          )}

          {activeSection === 'handling' && renderSteps(handlingSteps)}

          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary">Eco Rewards</h3>
                  <p className="text-xs text-gray-600">Enjoy 20% off eco-friendly <br />coffee pods</p>
                </div>
                <div className="flex items-center">
                  <Input
                    value={couponCode}
                    readOnly
                    className="w-28 mr-2 text-xs bg-white/50 border border-primary/20 focus:border-primary text-center"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/50 border border-primary/20 hover:bg-primary/10 hover:border-primary transition-colors"
                    aria-label="Copy coupon code"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/5 p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary">Special Offer</h3>
                <p className="text-xs text-gray-700">Limited time offer: Get a set of reusable coffee filters at 50% off with your machine purchase!</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => console.log('Shop Now clicked')}>Shop Now</Button>
            </div>
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