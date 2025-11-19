/**
 * Canonical Digital Product Passport (DPP) Schema
 * Version: 2.0 - Multi-industry support with materials registry and production traceability
 */

export interface DigitalProductPassport {
  id: string
  "@type"?: string
  tenantId: string
  createdBy: string
  organizationId?: string
  assignedUsers?: string[]
  dataClassification: "public" | "internal" | "confidential"
  accessLevel: "standard" | "elevated" | "restricted"
  name: string
  description?: string
  type: string
  industryType: "furniture" | "textile" | "electronics"
  gtin: string
  sku?: string
  batchLot: string
  digitalLink?: string
  dateCreated: string
  lastModification: string
  createdAt: string
  updatedAt: string
  passportMetadata: PassportMetadata
  manufacturerInfo: ManufacturerInfo
  materialsRegistry?: Material[]
  productDetails: ProductDetails
  furnitureProperties?: FurnitureProperties
  textileProperties?: TextileProperties
  electronicsProperties?: any
  sustainabilityData?: SustainabilityData
  sustainabilityProfile?: SustainabilityProfile
  certifications: Certification[]
  complianceData?: ComplianceData
  supplyChain: SupplyChainStep[]
  productionSteps: ProductionStepExtended[]
  services: Service[]
  images: Images
  visibility: Visibility
  domainProperties?: DomainProperties
  version: string
  predecessor?: string
}

export type FurnitureProductPassport = DigitalProductPassport

export interface PassportMetadata {
  issueDate: string
  expirationDate?: string
  status: "draft" | "published" | "archived" | "revoked"
  verified: boolean
  passportId: string
  version: string
  registrationId?: string
  economicOperatorId?: string
  backupReference?: string
}

export interface ManufacturerInfo {
  manufacturerId: string
  manufacturerName: string
  manufacturingDate: string
  manufacturerUrl?: string
  address?: Address
  gln?: string
  manufacturerContactEmail?: string
  manufacturerContactPhone?: string
}

export interface Address {
  streetAddress?: string
  city?: string
  country?: string
  postalCode?: string
}

export interface BrandInfo {
  brandName?: string
  subBrandName?: string
  brandDescription?: string
  brandStory?: string
  parentOrganization?: string
  brandWebsite?: string
  brandCountry?: string
  brandEstablished?: string
  brandLogo?: string
  brandImage?: string
  brandCertifications?: string[]
  socialMediaLinks?: {
    website?: string
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
  }
  brandValues?: string[]
}

export interface BrandSpecificDetails {
  productLine?: string
  collection?: string
  season?: string
  targetMarket?: string
  priceRange?: string
  brandCategory?: string
}

export interface ProductDetails {
  color?: string
  size?: string
  weight?: number
  dimensions?: Dimensions
  materials: MaterialRef[]
  components: Component[]
  careInstructions?: CareInstruction[]
  derivedFrom?: string[]
  brandInfo?: BrandInfo
  brandSpecificDetails?: BrandSpecificDetails
}

export interface Dimensions {
  length?: number
  width?: number
  height?: number
  unit?: "mm" | "cm" | "m" | "in" | "ft"
}

export interface Material {
  id: string
  name: string
  category?: string
  origin?: string
  supplier?: string
  percentage?: number
  recycledContent?: number
  sustainabilityInfo?: string | MaterialSustainabilityInfo
  domainAttributes?: DomainAttributes
  batch?: string
  lot?: string
  certificateRef?: string
}

export interface MaterialRef {
  id: string
  name?: string
  percentage?: number
  origin?: string
  recycledContent?: number
  sustainabilityInfo?: string
}

export interface MaterialSustainabilityInfo {
  co2Footprint?: string
  waterUsage?: string
  energyConsumption?: string
  recycledContent?: number
  recyclability?: string
  certifications?: string[]
}

export interface DomainAttributes {
  furniture?: FurnitureAttributes
  textile?: TextileAttributes
  electronics?: Record<string, any>
}

export interface FurnitureAttributes {
  species?: string
  grade?: string
  treatment?: string
  durability?: string
}

export interface TextileAttributes {
  fiberType?: string
  fiberLength?: string
  strength?: string
  elasticity?: string
}

export interface Component {
  id: string
  name: string
  description?: string
  materials: MaterialRef[]
  weight?: number
  recyclable?: boolean
  derivedFrom?: string[]
  productionStepRef?: string
}

export interface CareInstruction {
  type: "cleaning" | "maintenance" | "storage"
  instruction: string
  frequency: string
  products?: string[]
}

export interface FurnitureProperties {
  furnitureType: string
  style: string
  dimensions: FurnitureDimensions
  weight: number
  materials: FurnitureMaterial[]
  finishes: FurnitureFinish[]
  assembly: AssemblyInfo
  certifications: FurnitureCertification[]
  durabilityRating: number
  loadCapacity?: number
  fireResistance?: FireResistanceRating
  formaldehyde?: FormaldehydeEmission
  careInstructions: FurnitureCareInstruction[]
  warranty: WarrantyInfo
  packaging: PackagingInfo
}

export interface FurnitureDimensions {
  length: number
  width: number
  height: number
  seatHeight?: number
  armHeight?: number
  depth?: number
}

export interface FurnitureMaterial {
  materialId: string
  species?: string
  grade?: string
  treatment?: string
}

export interface MaterialWithDetails extends Material {
  furnitureDetails?: FurnitureMaterial
}

export interface FurnitureFinish {
  type: string
  color: string
  sheen?: string
  durability: string
  maintenanceRequirements: string
  vocContent?: number
}

export interface AssemblyInfo {
  assemblyRequired: boolean
  estimatedTime?: number
  toolsRequired: string[]
  difficultyLevel: "easy" | "medium" | "hard"
  instructionsIncluded: boolean
  videoGuideAvailable?: boolean
}

export interface Certification {
  id?: string
  name: string
  issuingBody: string
  validUntil: string
  certificateNumber: string
  scope: string[]
  level?: string
  issueDate?: string
  status?: "valid" | "expired" | "revoked"
  documentUrl?: string
}

export type FurnitureCertification = Certification

export interface FireResistanceRating {
  standard: string
  rating: string
  testDate: string
}

export interface FormaldehydeEmission {
  level: string
  testMethod: string
  value: number
  testDate: string
}

export interface FurnitureCareInstruction {
  type: "cleaning" | "maintenance" | "storage"
  instruction: string
  frequency: string
  products?: string[]
}

export interface WarrantyInfo {
  duration: number
  coverage: string[]
  limitations: string[]
  claimProcess: string
}

export interface PackagingInfo {
  packageCount: number
  totalWeight: number
  dimensions: Dimensions[]
  materials: string[]
  recyclable: boolean
}

export interface SustainabilityData {
  co2Footprint?: string
  carbonFootprint?: string
  waterUsage?: string
  energyConsumption?: string
  energySource?: string
  sustainabilityScore?: number
  recycledContentPercentage?: number
  recyclability?: string
  repairability?: string
  expectedLifespan?: string
  chemicalsUsed?: string[]
  socialCompliance?: {
    fairLaborPractices?: boolean
    workersRights?: boolean
    communityImpact?: string
  }
}

export interface SustainabilityDataSummary {
  co2Total?: string
  waterUsageTotal?: string
  energyConsumptionTotal?: string
  wasteGenerated?: string
}

export interface SustainabilityProfile {
  co2Total?: string
  waterUsageTotal?: string
  recyclabilityScore?: string
  complianceStandards?: string[]
  certifications?: string[]
  socialImpact?: string
}

export interface ComplianceData {
  regulations?: Regulation[]
  testReports?: TestReport[]
  declarations?: Declaration[]
}

export interface Regulation {
  name: string
  jurisdiction: string
  status: "compliant" | "non_compliant" | "pending"
  lastChecked: string
}

export interface TestReport {
  testType: string
  testingLab: string
  reportNumber: string
  testDate: string
  results: string
  documentUrl?: string
}

export interface Declaration {
  type: string
  content: string
  declarationDate: string
  declarant: string
}

export interface SupplyChainStep {
  id: string
  name: string
  organizationName?: string
  role: "raw_material_supplier" | "manufacturer" | "distributor" | "retailer"
  location?: string
  address?: Address
  certifications?: string[]
  gln?: string
  oar?: string
}

export interface ProductionStepExtended {
  id: string
  stepType: "production" | "finishing" | "assembly" | "quality_check"
  organizationName: string
  address?: Address
  gln?: string
  oar?: string
  description?: string
  date?: string
  location?: string
  inputRefs?: string[]
  outputRefs?: string[]
  sustainabilityData?: SustainabilityData | SustainabilityDataSummary
}

export type ProductionStep = ProductionStepExtended

export interface Service {
  name: string
  serviceType:
    | "repair"
    | "maintenance"
    | "recycling"
    | "refurbishment"
    | "warranty"
    | "installation"
    | "resell"
    | "recycle"
    | "upcycle"
    | "rental"
    | "other"
  description?: string
  withNested?: boolean
}

export interface Images {
  productImages?: ImageItem[]
  careImages?: ImageItem[]
  sustainabilityImages?: ImageItem[]
  productionImage?: string
  certificationImages?: ImageItem[]
}

export interface ImageItem {
  id: string
  url: string
  alt?: string
  caption?: string
  isPrimary?: boolean
}

export interface Visibility {
  isPublic: boolean
  allowedRoles?: string[]
  allowedUsers?: string[]
  restrictedFields?: string[]
}

export interface TextileProperties {
  fabricType?: string
  fiberContent?: FiberContent[]
  careInstructions?: TextileCareInstruction[]
  dyeingProcess?: string
  finishingTreatments?: string[]
  certifications?: Certification[]
  waterConsumption?: number
  microplasticRelease?: number
  colorFastness?: ColorFastness
  garmentMeasurements?: GarmentMeasurements
  fabricWeight?: number
  threadCount?: number
  shrinkageRate?: number
  breathability?: string
  uvProtection?: string
  antimicrobialTreatment?: boolean
}

export interface FiberContent {
  fiberType: string
  percentage: number
  origin: string
  recycledContent?: number
  organicContent?: number
  certifiedSource?: string
}

export interface TextileCareInstruction {
  type: "washing" | "drying" | "ironing" | "bleaching" | "drycleaning"
  instruction: string
  icon?: string
  temperature?: number
}

export interface ColorFastness {
  washing?: number
  rubbing?: number
  lightExposure?: number
  perspiration?: number
}

export interface GarmentMeasurements {
  sizeLabel?: string
  chest?: number
  waist?: number
  hip?: number
  inseam?: number
  sleeve?: number
  length?: number
  shoulderWidth?: number
}

export interface DomainProperties {
  furniture?: Record<string, any>
  textile?: Record<string, any>
  electronics?: Record<string, any>
}

export interface CreateDPPRequest {
  tenantId?: string
  createdBy?: string
  organizationId?: string
  gtin: string
  batchLot: string
  name: string
  description?: string
  type: string
  industryType: "furniture" | "textile" | "electronics"
  sku?: string
  digitalLink?: string
  "@type"?: string
  passportMetadata: PassportMetadata
  manufacturerInfo: ManufacturerInfo
  materialsRegistry?: Material[]
  productDetails: ProductDetails
  furnitureProperties?: FurnitureProperties
  textileProperties?: TextileProperties
  sustainabilityData?: SustainabilityData
  sustainabilityProfile?: SustainabilityProfile
  certifications?: Certification[]
  complianceData?: ComplianceData
  supplyChain?: SupplyChainStep[]
  productionSteps?: ProductionStepExtended[]
  services?: Service[]
  images?: Images
  visibility?: Visibility
  domainProperties?: DomainProperties
  dataClassification?: "public" | "internal" | "confidential"
  accessLevel?: "standard" | "elevated" | "restricted"
  assignedUsers?: string[]
}

export interface UpdateDPPRequest extends Partial<CreateDPPRequest> {
  id: string
  version: string
}

export type CreateFurnitureProductRequest = CreateDPPRequest
export type UpdateFurnitureProductRequest = UpdateDPPRequest
