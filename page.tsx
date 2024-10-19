"use client"



import React, { useState } from 'react'
import { ShoppingBag, Leaf, Truck, ChevronDown, ChevronUp, Copy, Tag, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { toast } from 'sonner'
import MapComponent from '@/components/MapComponent'

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  pdfLink?: string;
};

const productSteps: Step[] = [
  { 
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
    title: 'Product Details', 
    description: 'High-quality leather sofa with premium craftsmanship.',
    details: 'Our leather sofa is made from top-grain leather, featuring a sturdy hardwood frame and high-resilience foam cushions for ultimate comfort and durability.'
  },
  { 
    icon: <Tag className="h-6 w-6 text-primary" />,
    title: 'Brand Details', 
    description: 'Luxury furniture brand with a focus on sustainability.',
    details: 'We have been crafting premium furniture since 1985. We are committed to sustainable practices and ethical sourcing of materials.'
  },
  { 
    icon: <Sparkles className="h-6 w-6 text-primary" />,
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
    icon: <Sparkles className="h-6 w-6 text-green-600" />,
    title: 'Recycling Program',
    description: 'End-of-life product management.',
    details: 'We offer a comprehensive recycling program for our products, ensuring that materials are properly recycled or repurposed at the end of their lifecycle.'
  }
]

const handlingSteps: Step[] = [
  {
    icon: <Truck className="h-6 w-6 text-blue-600" />,
    title: 'Shipping',
    description: 'Careful packaging and delivery.',
    details: 'Our products are carefully packaged to prevent damage during shipping. We use eco-friendly packaging materials whenever possible.'
  },
  {
    icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
    title: 'Home Setup',
    description: 'Easy installation in your space.',
    details: 'Our furniture is designed for easy assembly. Detailed instructions are provided, and customer support is available if you need assistance. You can also download our step-by-step PDF guide for offline reference.',
    pdfLink: '/assembly-instructions.pdf'
  }
]

/*
interface ProductJourneyProps {
  gtin?: string;
  batch?: string;
  serialNumber?: string;
}
*/
export default function ProductJourney() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('product')
  const couponCode = 'LOYALTY15'

  /*const renderSteps = (steps: Step[]) => (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Collapsible 
          key={index}
          open={expandedStep === index}
          onOpenChange={() => setExpandedStep(expandedStep === index ? null : index)}
        >
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-gray-100 rounded-full">{step.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                {expandedStep === index ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <p className="text-gray-700">{step.details}</p>
                {step.pdfLink && (
                  <Button variant="outline" className="mt-2" asChild>
                    <a href={step.pdfLink} target="_blank" rel="noopener noreferrer">
                      Download PDF Guide
                    </a>
                  </Button>
                )}
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  )
  */
  const renderSteps = (steps: Step[]) => (
    <div className="space-y-4 max-w-sm mx-auto"> {/* Added max-w-sm and mx-auto */}
      {steps.map((step, index) => (
        <Collapsible 
          key={index}
          open={expandedStep === index}
          onOpenChange={() => setExpandedStep(expandedStep === index ? null : index)}
        >
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center w-full"> {/* Added w-full */}
                  <div className="mr-4 p-2 bg-gray-100 rounded-full">{step.icon}</div>
                  <div className="flex-1"> {/* Added flex-1 */}
                    <h3 className="text-lg font-semibold text-center">{step.title}</h3> {/* Added text-center */}
                    <p className="text-sm text-gray-600 text-center">{step.description}</p> {/* Added text-center */}
                  </div>
                </div>
                <div className="ml-4"> {/* Added ml-4 for spacing */}
                  {expandedStep === index ? 
                    <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <p className="text-gray-700 text-center">{step.details}</p> {/* Added text-center */}
                {step.pdfLink && (
                  <div className="flex justify-center mt-2"> {/* Added flex and justify-center */}
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
const title = {
  text: 'Coupon code copied',
  description: 'Use for a 15% discount.'
};
const copyToClipboard = () => {
  // Ensure title is a string or a valid React element
  navigator.clipboard.writeText(couponCode).then(() => {
  toast(<div>
    <strong>{title.text}</strong>
    <p>{title.description}</p>
  </div>); // Use a property of the object
  // or
  // toast(<div>{title.text}</div>); // Use a React element
})};

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="relative h-64">
        <MapComponent />
      </div>
      <CardContent className="p-0">
        <div className="flex justify-around p-2 bg-gray-50">
          <Button 
            variant="ghost"
            className={`relative overflow-hidden group px-4 py-2 ${activeSection === 'product' ? 'text-primary' : 'text-gray-600'}`}
            onClick={() => setActiveSection('product')}
          >
            <div className="flex flex-col items-center z-10">
              <ShoppingBag className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Product</span>
            </div>
            <div className={`absolute inset-0 bg-primary transition-all duration-300 ${activeSection === 'product' ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ${activeSection === 'product' ? 'opacity-100' : 'opacity-0'}`}></div>
          </Button>
          <Button 
            variant="ghost"
            className={`relative overflow-hidden group px-4 py-2 ${activeSection === 'impact' ? 'text-green-600' : 'text-gray-600'}`}
            onClick={() => setActiveSection('impact')}
          >
            <div className="flex flex-col items-center z-10">
              <Leaf className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Impact</span>
            </div>
            <div className={`absolute inset-0 bg-green-600 transition-all duration-300 ${activeSection === 'impact' ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 transition-all duration-300 ${activeSection === 'impact' ? 'opacity-100' : 'opacity-0'}`}></div>
          </Button>
          <Button 
            variant="ghost"
            className={`relative overflow-hidden group px-4 py-2 ${activeSection === 'handling' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveSection('handling')}
          >
            <div className="flex flex-col items-center z-10">
              <Truck className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Handling</span>
            </div>
            <div className={`absolute inset-0 bg-blue-600 transition-all duration-300 ${activeSection === 'handling' ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'handling' ? 'opacity-100' : 'opacity-0'}`}></div>
          </Button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Discover your</h2>
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Product's Journey</h1>
          
        
          
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mjEAzcEcSHx_HiSyGmIZT_788eb4cd2ecc45b2bf60495927b125a6-poXYOMB78R8Mv2HchIzWj3JbHlsIRA.png" 
            alt="Brown leather sofa" 
            className="w-full h-auto mb-6 rounded-lg shadow-md"
          />
          
          {activeSection === 'product' && renderSteps(productSteps)}
          {activeSection === 'impact' && renderSteps(impactSteps)}
          {activeSection === 'handling' && renderSteps(handlingSteps)}
          
          <div className="mt-12 bg-primary/5 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-3 text-primary">Loyalty Program</h3>
            <p className="mb-4 text-gray-700">As a valued customer, enjoy 15% off your next purchase!</p>
            <div className="flex items-center">
              <Input 
                value={couponCode} 
                readOnly 
                className="mr-2 bg-white border-2 border-primary/20 focus:border-primary"
              />
              <Button onClick={copyToClipboard} variant="outline" size="icon" className="border-2 border-primary/20 hover:border-primary">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-8 bg-secondary/5 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-secondary">Special Offer</h3>
            <p className="mb-4 text-gray-700">Limited time offer: Get a matching ottoman at 50% off with your sofa purchase!</p>
            <Button variant="secondary" className="w-full">Shop Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}