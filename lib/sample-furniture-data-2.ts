import type { DigitalProductPassport } from "./types"

export const sampleFurnitureProduct: DigitalProductPassport = {
  id: "DPP-FU-001",
  "@type": "DigitalProductPassport",
  tenantId: "tenant-123",
  createdBy: "manufacturer-user",
  organizationId: "org-456",
  assignedUsers: ["user-1", "user-2"],

  dataClassification: "public",
  accessLevel: "standard",

  name: "EcoChair Premium Oak",
  description:
    "A beautifully crafted dining chair made from sustainable oak wood. Features ergonomic design with cushioned seating and elegant finish. Perfect for modern and traditional dining spaces.",
  type: "CHAIR-OAK-001",
  industryType: "furniture",
  gtin: "5901234123457",
  sku: "ECO-CHAIR-001",
  batchLot: "BATCH-2024-001",
  digitalLink: "https://id.gs1.org/01/5901234123457",

  dateCreated: "2024-01-15T08:00:00Z",
  lastModification: "2024-11-10T14:30:00Z",
  createdAt: "2024-01-15T08:00:00Z",
  updatedAt: "2024-11-10T14:30:00Z",

  passportMetadata: {
    issueDate: "2024-01-15",
    expirationDate: "2029-01-15",
    status: "published",
    verified: true,
    passportId: "PASS-FU-001",
    version: "2.0",
    registrationId: "REG-123456",
    economicOperatorId: "EO-789",
  },

  manufacturerInfo: {
    manufacturerId: "MFR-001",
    manufacturerName: "EcoWood Furniture Co.",
    name: "EcoWood Furniture Co.",
    manufacturingDate: "2024-01-10",
    manufacturerUrl: "https://ecowood-furniture.example",
    address: {
      streetAddress: "123 Timber Lane",
      city: "Sofia",
      country: "Bulgaria",
      postalCode: "1000",
    },
    gln: "5901234567890",
    manufacturerContactEmail: "contact@ecowood.example",
    manufacturerContactPhone: "+359 2 123 4567",
  },

  materialsRegistry: [
    {
      id: "MAT-001",
      name: "Oak Wood",
      category: "Wood",
      origin: "Bulgaria",
      supplier: "Sustainable Timber Ltd.",
      percentage: 75,
      recycledContent: 0,
      sustainabilityInfo: {
        co2Footprint: "8.5 kg CO2e",
        waterUsage: "120 L",
        energyConsumption: "45 kWh",
        recycledContent: 0,
        recyclability: "fully_recyclable",
        certifications: ["FSC", "PEFC"],
      },
      domainAttributes: {
        furniture: {
          species: "European Oak",
          grade: "Grade A",
          treatment: "Natural Oil Finish",
          durability: "High",
        },
      },
      batch: "WOOD-2024-001",
      certificateRef: "FSC-C123456",
    },
    {
      id: "MAT-002",
      name: "Recycled Fabric",
      category: "Textile",
      origin: "Germany",
      supplier: "GreenTextile GmbH",
      percentage: 15,
      recycledContent: 80,
      sustainabilityInfo: {
        co2Footprint: "2.1 kg CO2e",
        waterUsage: "35 L",
        energyConsumption: "12 kWh",
        recycledContent: 80,
        recyclability: "recyclable",
        certifications: ["GOTS", "OEKO-TEX"],
      },
      batch: "FAB-2024-045",
    },
    {
      id: "MAT-003",
      name: "Steel Frame",
      category: "Metal",
      origin: "Italy",
      supplier: "MetalWorks Italia",
      percentage: 10,
      recycledContent: 60,
      sustainabilityInfo: {
        co2Footprint: "3.2 kg CO2e",
        waterUsage: "25 L",
        energyConsumption: "18 kWh",
        recycledContent: 60,
        recyclability: "fully_recyclable",
      },
      batch: "STEEL-2024-012",
    },
  ],

  productDetails: {
    color: "Natural Oak",
    size: "Standard",
    weight: 6.5,
    dimensions: {
      length: 45,
      width: 50,
      height: 90,
      unit: "cm",
    },
    materials: [
      {
        id: "MAT-001",
        name: "Oak Wood",
        percentage: 75,
        origin: "Bulgaria",
        recycledContent: 0,
      },
      {
        id: "MAT-002",
        name: "Recycled Fabric",
        percentage: 15,
        origin: "Germany",
        recycledContent: 80,
      },
      {
        id: "MAT-003",
        name: "Steel Frame",
        percentage: 10,
        origin: "Italy",
        recycledContent: 60,
      },
    ],
    components: [
      {
        id: "COMP-001",
        name: "Seat Frame",
        description: "Structural frame made from oak",
        materials: [
          {
            id: "MAT-001",
            name: "Oak Wood",
            percentage: 100,
          },
        ],
        weight: 3.5,
        recyclable: true,
      },
      {
        id: "COMP-002",
        name: "Cushion",
        description: "Padded seat cushion",
        materials: [
          {
            id: "MAT-002",
            name: "Recycled Fabric",
            percentage: 100,
          },
        ],
        weight: 1.5,
        recyclable: true,
      },
      {
        id: "COMP-003",
        name: "Support Bars",
        description: "Metal reinforcement bars",
        materials: [
          {
            id: "MAT-003",
            name: "Steel Frame",
            percentage: 100,
          },
        ],
        weight: 1.5,
        recyclable: true,
      },
    ],
    careInstructions: [
      {
        type: "cleaning",
        instruction: "Wipe with damp cloth. Use mild soap for stubborn stains.",
        frequency: "Weekly",
      },
      {
        type: "maintenance",
        instruction: "Apply natural oil finish every 6 months to maintain wood quality.",
        frequency: "Bi-annual",
      },
    ],
    brandInfo: {
      brandName: "EcoWood Premium",
      subBrandName: "Heritage Collection",
      brandDescription: "Sustainably crafted furniture for modern living",
      brandStory:
        "Founded in 2010, EcoWood Premium is committed to sustainable furniture manufacturing using locally sourced materials.",
      parentOrganization: "EcoWood Furniture Co.",
      brandWebsite: "https://ecowood-premium.example",
      brandCountry: "Bulgaria",
      brandEstablished: "2010",
      brandValues: ["Sustainability", "Quality", "Craftsmanship"],
    },
  },

  furnitureProperties: {
    furnitureType: "Dining Chair",
    style: "Modern Minimalist",
    dimensions: {
      length: 45,
      width: 50,
      height: 90,
      seatHeight: 46,
      depth: 50,
    },
    weight: 6.5,
    materials: [
      {
        materialId: "MAT-001",
        species: "European Oak",
        grade: "Grade A",
        treatment: "Natural Oil Finish",
      },
    ],
    finishes: [
      {
        type: "oil",
        color: "Natural",
        sheen: "matte",
        durability: "High resistance to wear",
        maintenanceRequirements: "Reapply every 6 months",
        vocContent: 5,
      },
    ],
    assembly: {
      assemblyRequired: true,
      estimatedTime: 15,
      toolsRequired: ["Allen key (included)", "Screwdriver"],
      difficultyLevel: "easy",
      instructionsIncluded: true,
      videoGuideAvailable: true,
    },
    certifications: [
      {
        id: "CERT-001",
        name: "FSC",
        issuingBody: "Forest Stewardship Council",
        validUntil: "2026-12-31",
        certificateNumber: "FSC-C123456",
        scope: ["Wood sourcing"],
        level: "Gold",
        issueDate: "2024-01-01",
        status: "valid",
      },
      {
        id: "CERT-002",
        name: "GREENGUARD Gold",
        issuingBody: "UL Environment",
        validUntil: "2025-12-31",
        certificateNumber: "GG-78901",
        scope: ["Indoor air quality"],
        issueDate: "2024-01-01",
        status: "valid",
      },
    ],
    durabilityRating: 9,
    loadCapacity: 150,
    fireResistance: {
      standard: "BS 5852",
      rating: "Medium",
      testDate: "2024-01-05",
    },
    formaldehyde: {
      level: "E1",
      testMethod: "EN 717-1",
      value: 0.05,
      testDate: "2024-01-05",
    },
    careInstructions: [
      {
        type: "cleaning",
        instruction: "Wipe with damp cloth. Use mild soap for stubborn stains.",
        frequency: "Weekly",
      },
      {
        type: "maintenance",
        instruction: "Apply natural oil finish every 6 months to maintain wood quality.",
        frequency: "Bi-annual",
        products: ["Natural Wood Oil", "Soft Cloth"],
      },
      {
        type: "storage",
        instruction: "Store in dry place away from direct sunlight and heat sources.",
        frequency: "As needed",
      },
    ],
    warranty: {
      duration: 5,
      coverage: ["Manufacturing defects", "Structural integrity"],
      limitations: ["Normal wear and tear", "Damage from misuse", "Outdoor use"],
      claimProcess: "Contact customer service with proof of purchase and photos of defect.",
    },
    packaging: {
      packageCount: 1,
      totalWeight: 8.5,
      dimensions: [
        {
          length: 95,
          width: 55,
          height: 15,
          unit: "cm",
        },
      ],
      materials: ["Recycled cardboard", "Biodegradable wrap"],
      recyclable: true,
    },
  },

  sustainabilityData: {
    co2Footprint: "13.8 kg CO2e",
    carbonFootprint: "13.8 kg CO2e",
    waterUsage: "180 L",
    energyConsumption: "75 kWh",
    energySource: "renewable_mix",
    sustainabilityScore: 8.5,
    recycledContentPercentage: 25,
    recyclability: "fully_recyclable",
    repairability: "9/10 - Easy to repair with standard tools",
    expectedLifespan: "15-20 years",
    chemicalsUsed: ["Natural oil", "Water-based adhesive"],
    socialCompliance: {
      fairLaborPractices: true,
      workersRights: true,
      communityImpact: "Supports local timber communities",
    },
  },

  certifications: [
    {
      id: "CERT-001",
      name: "FSC",
      issuingBody: "Forest Stewardship Council",
      validUntil: "2026-12-31",
      certificateNumber: "FSC-C123456",
      scope: ["Wood sourcing"],
      level: "Gold",
      issueDate: "2024-01-01",
      status: "valid",
      documentUrl: "https://certificates.example/fsc-c123456",
    },
    {
      id: "CERT-002",
      name: "GREENGUARD Gold",
      issuingBody: "UL Environment",
      validUntil: "2025-12-31",
      certificateNumber: "GG-78901",
      scope: ["Indoor air quality"],
      issueDate: "2024-01-01",
      status: "valid",
      documentUrl: "https://certificates.example/gg-78901",
    },
  ],

  complianceData: {
    regulations: [
      {
        name: "EU Timber Regulation",
        jurisdiction: "European Union",
        status: "compliant",
        lastChecked: "2024-01-10",
      },
    ],
  },

  supplyChain: [
    {
      id: "SC-001",
      name: "Timber Supplier",
      organizationName: "Sustainable Timber Ltd.",
      role: "raw_material_supplier",
      location: "Rila Mountains, Bulgaria",
      address: {
        city: "Samokov",
        country: "Bulgaria",
      },
      certifications: ["FSC", "PEFC"],
      gln: "5901234567891",
    },
    {
      id: "SC-002",
      name: "Manufacturing Plant",
      organizationName: "EcoWood Furniture Co.",
      role: "manufacturer",
      location: "Sofia, Bulgaria",
      address: {
        streetAddress: "123 Timber Lane",
        city: "Sofia",
        country: "Bulgaria",
        postalCode: "1000",
      },
      gln: "5901234567890",
    },
  ],

  productionSteps: [
    {
      id: "PROD-001",
      stepType: "production",
      organizationName: "EcoWood Furniture Co.",
      description: "Wood cutting and preparation",
      date: "2024-01-10T09:00:00Z",
      location: "Sofia, Bulgaria",
      inputRefs: ["MAT-001"],
      outputRefs: ["COMP-001"],
      sustainabilityData: {
        co2Total: "5.2 kg CO2e",
        waterUsageTotal: "80 L",
        energyConsumptionTotal: "35 kWh",
      },
    },
    {
      id: "PROD-002",
      stepType: "finishing",
      organizationName: "EcoWood Furniture Co.",
      description: "Applying natural oil finish",
      date: "2024-01-11T14:00:00Z",
      location: "Sofia, Bulgaria",
      inputRefs: ["COMP-001"],
      sustainabilityData: {
        co2Total: "2.1 kg CO2e",
        waterUsageTotal: "20 L",
        energyConsumptionTotal: "15 kWh",
      },
    },
    {
      id: "PROD-003",
      stepType: "assembly",
      organizationName: "EcoWood Furniture Co.",
      description: "Final assembly and quality check",
      date: "2024-01-12T10:00:00Z",
      location: "Sofia, Bulgaria",
      inputRefs: ["COMP-001", "COMP-002", "COMP-003"],
      outputRefs: ["DPP-FU-001"],
      sustainabilityData: {
        co2Total: "6.5 kg CO2e",
        waterUsageTotal: "80 L",
        energyConsumptionTotal: "25 kWh",
      },
    },
  ],

  services: [
    {
      name: "Professional Cleaning",
      serviceType: "maintenance",
      description: "Expert furniture cleaning service",
    },
    {
      name: "Repair Service",
      serviceType: "repair",
      description: "Professional repair and restoration",
    },
    {
      name: "Recycling Program",
      serviceType: "recycling",
      description: "Responsible end-of-life furniture recycling",
    },
  ],

  images: {
    productImages: [
      {
        id: "IMG-001",
        url: "/premium-oak-dining-chair-natural-finish.jpg",
        alt: "EcoChair Premium Oak - Front View",
        caption: "Front view of the EcoChair showing natural oak finish",
        isPrimary: true,
      },
      {
        id: "IMG-002",
        url: "/dining-chair-side-view-oak-wood.jpg",
        alt: "EcoChair Premium Oak - Side View",
        caption: "Side profile highlighting ergonomic design",
        isPrimary: false,
      },
    ],
  },

  visibility: {
    isPublic: true,
    allowedRoles: ["consumer", "retailer"],
  },

  version: "2.0",
}
