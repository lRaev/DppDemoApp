"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  ArrowUp ,
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
  MapPin,
  Settings,
  HandHelping,
  Box,
  Droplet,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MarkerData } from "@/components/MapComponentMarkers";

const MapComponentMarkers = dynamic(
  () => import("@/components/MapComponentMarkers"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
    ),
  }
);

const demoMarkers: MarkerData[] = [
  {
    position: [31.791702, -7.09262],
    popupContent: "Cotton Origin: Morocco",
    type: "origin",
  },
  {
    position: [23.424076, 53.847818],
    popupContent: "Polyester Origin: United Arab Emirates",
    type: "origin",
  },
  {
    position: [41.902784, 12.496366],
    popupContent: "Manufactured in Rome, Italy",
    type: "manufacturer",
  },
];

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string | React.ReactNode;
  pdfLink?: string;
};

const productSteps: Step[] = [
  {
    icon: <ShoppingBag className="h-6 w-6 text-violet-500" />,
    title: "Product Description",
    description: "High-quality work jacket with durable construction.",
    details:
      "Our work jacket is made from a blend of cotton and polyester, featuring reinforced seams and multiple pockets for ultimate functionality and durability in demanding work environments.",
  },
  {
    icon: <Tag className="h-6 w-6 text-violet-500" />,
    title: "Brand Details",
    description: "Workwear brand focused on durability and comfort.",
    details:
      "We have been crafting premium workwear since 1990. We are committed to providing high-quality, long-lasting work apparel that meets the needs of various industries.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-violet-500" />,
    title: "Care Instructions",
    description: "Proper care ensures long-lasting performance.",
    details:
      "Machine wash cold with like colors. Do not bleach. Tumble dry low. Cool iron if needed. Do not dry clean. For tough stains, pre-treat before washing.",
  },
];

const handlingSteps: Step[] = [
  {
    icon: <Truck className="h-6 w-6 text-blue-600" />,
    title: "Shipping",
    description: "Efficient and eco-friendly delivery.",
    details:
      "We use minimal packaging made from recycled materials. Our shipping partners are chosen based on their commitment to reducing carbon emissions.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-blue-600" />,
    title: "Usage Tips",
    description: "Get the most out of your work jacket.",
    details:
      "Break in your jacket for maximum comfort. Utilize all pockets for efficient tool organization. For extreme weather, consider layering underneath.",
    pdfLink: "/usage-guide.pdf"
  }
];

const productDetails = {
  id: "WJ789012",
  manufacturer: "DuraTex Workwear",
  materialComposition: [
    {
      materialType: "Cotton",
      source: "Organic Cotton",
      sustainabilityCertification: "GOTS",
      percentage: 65,
      subcomponents: [
        { name: "Outer Shell", material: "Cotton", source: "Organic" },
        { name: "Lining", material: "Cotton", source: "Organic" },
      ],
    },
    {
      materialType: "Polyester",
      source: "Recycled PET",
      sustainabilityCertification: "GRS",
      percentage: 35,
      subcomponents: [
        { name: "Insulation", material: "Polyester", source: "Recycled" },
        { name: "Reinforcements", material: "Polyester", source: "Recycled" },
      ],
    },
  ],
  healthAndSafety: {
    chemicalUse:
      "OEKO-TEX Standard 100 certified, free from harmful substances",
    safetyCertifications: [
      "EN ISO 13688:2013 (Protective clothing - General requirements)",
      "EN 343 (Protection against rain)",
    ],
    allergenInformation: "Nickel-free zippers and buttons",
  },
  consumerInformation: {
    careInstructions:
      "Machine wash cold. Tumble dry low. Do not bleach. Cool iron if needed.",
    sizeGuide: "/usage-guide.pdf",
    warranty: "2-year warranty against manufacturing defects",
    repairServices:
      "Free repairs for the first year, discounted repairs thereafter",
  },
  sustainabilityAndCircularEconomy: {
    recyclability: "95%",
    recycledContent: "35%",
    repairabilityScore: "9/10",
    endOfLifeInstructions:
      "Return to any of our stores for recycling, or use our mail-in recycling program.",
  },
  packagingMaterials: [
    { material: 'Corrugated Cardboard', percentage: 70, recycledContent: 100, recyclability: 'Widely Recyclable' },
    { material: 'Molded Pulp', percentage: 20, recycledContent: 100, recyclability: 'Biodegradable' },
    { material: 'Low-Density Polyethylene (LDPE)', percentage: 10, recycledContent: 30, recyclability: 'Check Locally' }
  ],
  environmentalImpact: {
    carbonFootprint: "3.5",
    waterUsage: "87",
    energy: "18",
  },
  certifications: [
    "GOTS",
    "GRS",
    "OEKO-TEX Standard 100",
    "EU Ecolabel",
    "Bluesign",
  ],
  fairLaborCertifications: ['SA8000', 'BSCI', 'Fair Labor Association'] as FairLaborCertification[],
};
type FairLaborCertification = 'SA8000' | 'BSCI' | 'Fair Labor Association';

export default function WorkJacketJourney() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("product");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const couponCode = "WORKWEAR20";
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

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
  const renderPackageInfo = () => {
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
                }

  const renderEnvironmentalImpact = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 flex flex-col items-center">
          <Truck className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-xs font-medium">CO2 </span>
          <span className="text-m font-bold">
            {productDetails.environmentalImpact.carbonFootprint} kg
          </span>
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <Droplet className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-xs font-medium">Water Usage</span>
          <span className="text-m font-bold">
            {productDetails.environmentalImpact.waterUsage} L
          </span>
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <Zap className="h-8 w-8 text-yellow-500 mb-2" />
          <span className="text-xs font-medium">Energy</span>
          <span className="text-m font-bold">
            {productDetails.environmentalImpact.energy} kWh
          </span>
        </Card>
      </div>
    </div>
  );

  const renderEcoCertificates = () => (
    <div className="space-y-4 mt-6">
      <h4 className="text-lg font-semibold">Eco Certificates</h4>
      <div className="flex flex-wrap gap-2">
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
  );

  const impactSteps: Step[] = [
    {
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      title: "Sustainability",
      description: "Our commitment to environmental responsibility.",
      details:
        "We use organic cotton and recycled polyester in our jackets. Our manufacturing process is designed to minimize water usage and reduce chemical waste.",
    },
    {
      icon: <Recycle className="h-6 w-6 text-green-600" />,
      title: "Recycling Program",
      description: "End-of-life product management.",
      details:
        "We offer a take-back program for our work jackets. Returned jackets are either refurbished for donation or recycled into new materials.",
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
      title: 'Packaging Materials',
      description: 'ECO packaging composition.',
      details: 'Our packaging is designed with sustainability in mind, adhering to European Sustainability Product Requirements.'
    },{
      icon: <Factory className="h-6 w-6 text-green-600" />,
      title: 'Manufacturing & Fair Labor',
      description: 'Ethical production practices.',
      details: 'Our manufacturing process adheres to strict fair labor standards and environmental regulations. We are committed to ensuring safe working conditions and fair wages throughout our supply chain.'
    }
  ];

  const renderSteps = (steps: Step[]) => (
    <div className="space-y-4 mx-auto">
      {steps.map((step, index) => (
        <Collapsible
          key={index}
          open={expandedStep === index}
          onOpenChange={() =>
            setExpandedStep(expandedStep === index ? null : index)
          }
        >
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center w-full">
                  <div className="mr-4 p-2 bg-gray-100 rounded-full">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {step.description}
                    </p>
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
                {typeof step.details === "string" ? (
                  <p className="text-gray-700 ">{step.details}</p>
                ) : (
                  step.details
                )}
                {step.pdfLink && (
                  <div className="flex justify-center mt-2">
                    <Button variant="outline" asChild>
                      <a
                        href={step.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF Guide
                      </a>
                    </Button>
                  </div>
                )}
                {step.title === 'Packaging Materials' && (
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
                {step.title === 'Manufacturing & Fair Labor' && (
                    <div className="mt-4">
                      <h4 className="font-semibold pl-10 mb-2">Fair Labor Certifications:</h4>
                      <ul className="list-disc pl-20 space-y-2">
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
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );

  const renderDetailSection = (
    title: string,
    icon: React.ReactNode,
    description: string,
    content: React.ReactNode
  ) => (
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
  );

  const copyToClipboard = () => {
    if (isBrowser) {
      navigator.clipboard.writeText(couponCode).then(() => {
        toast(
          <div>
            <strong>Coupon code copied</strong>
            <p>Use for a 20% discount on workwear.</p>
          </div>
        );
      });
    }
  };

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
            <div className="text-xs">© 2024 By SoftGroup</div>
          </div>
          <h2 className="text-xl font-semibold text-center">
            Discover Your Work Jacket's Journey
          </h2>
        </div>

        <div className="p-4">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Explore your
          </h2>
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Work Jacket's Story
          </h1>

          <div className="relative w-full mb-6 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9875-cd8kC4zWcIW3B9CknYz86oFTuqs6XN.PNG"
              alt="Durable work jacket"
              width={800}
              height={600}
              layout="responsive"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="grid grid-cols-3 gap-1 w-full bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              className={`w-full ${
                activeSection === "product"
                  ? "bg-white shadow-sm"
                  : "hover:bg-gray-200"
              } h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection("product")}
            >
              <div className="flex flex-col items-center">
                <ShoppingBag
                  className={`h-4 w-4 mb-1 ${
                    activeSection === "product"
                      ? "text-violet-500"
                      : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    activeSection === "product"
                      ? "text-violet-500"
                      : "text-gray-600"
                  }`}
                >
                  Product
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${
                activeSection === "impact"
                  ? "bg-white shadow-sm"
                  : "hover:bg-gray-200"
              } h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection("impact")}
            >
              <div className="flex flex-col items-center">
                <Leaf
                  className={`h-4 w-4 mb-1 ${
                    activeSection === "impact"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    activeSection === "impact"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  Impact
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${
                activeSection === "handling"
                  ? "bg-white shadow-sm"
                  : "hover:bg-gray-200"
              } h-12 rounded-md transition-all duration-200`}
              onClick={() => setActiveSection("handling")}
            >
              <div className="flex flex-col items-center">
                <HandHelping
                  className={`h-4 w-4 mb-1 ${
                    activeSection === "handling"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    activeSection === "handling"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
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
              <div className="mt-8 space-y-4">
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

                        {productDetails.materialComposition.map(
                          (material, index) => (
                            <React.Fragment key={index}>
                              <dt className="font-semibold col-span-2 mt-2">
                                {material.materialType} ({material.percentage}
                                %):
                              </dt>
                              <dt className="font-semibold ml-2">Source:</dt>
                              <dd>{material.source}</dd>
                              <dt className="font-semibold ml-2">
                                Certification:
                              </dt>
                              <dd>{material.sustainabilityCertification}</dd>
                              <dt className="font-semibold ml-2">
                                Subcomponents:
                              </dt>
                              <dd>
                                {material.subcomponents.map((sub, subIndex) => (
                                  <div key={subIndex}>
                                    {sub.name}: {sub.material} ({sub.source})
                                  </div>
                                ))}
                              </dd>
                            </React.Fragment>
                          )
                        )}
                      </dl>
                    </TabsContent>
                    <TabsContent value="consumer">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <dt className="font-semibold">Care Instructions:</dt>
                        <dd>
                          {productDetails.consumerInformation.careInstructions}
                        </dd>
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
                        <dd>
                          {productDetails.consumerInformation.repairServices}
                        </dd>
                      </dl>
                    </TabsContent>
                    <TabsContent value="location">
                      <div className="h-64 w-full">
                        {isBrowser && (
                          <MapComponentMarkers markers={demoMarkers} />
                        )}
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
                    <dd>
                      {productDetails.healthAndSafety.safetyCertifications.join(
                        ", "
                      )}
                    </dd>
                    <dt className="font-semibold">Allergen Information:</dt>
                    <dd>
                      {productDetails.healthAndSafety.allergenInformation}
                    </dd>
                  </dl>
                )}
          
              </div>
            </>
          )}
          {activeSection === "impact" && (
            <>
              {renderSteps(impactSteps)}
              {renderPackageInfo}
            </>
          )}
          {activeSection === "handling" && renderSteps(handlingSteps)}

          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    Workwear Discount
                  </h3>
                  <p className="text-xs text-gray-600">
                    20% off your next purchase
                  </p>
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
                  <h3 className="text-lg font-semibold text-primary">
                    Bundle Offer
                  </h3>
                  <p className="text-xs text-gray-700">
                    30% off when you buy 3+ work jackets
                  </p>
                </div>
                <Button variant="secondary" size="sm" className="w-full mt-2">
                  Shop Now
                </Button>
              </div>
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
  );
}
