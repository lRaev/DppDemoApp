import { FurnitureDPPView } from "@/components/furniture-dpp-view"
import { cushionProduct } from "@/lib/cushion-product-data"

export default function CushionPage() {
  return (
    <div className="min-h-screen bg-background">
      <FurnitureDPPView product={cushionProduct} />
    </div>
  )
}
