"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface StepPromotionProps {
  data: any
  onUpdate: (data: any) => void
}

export function StepPromotion({ data, onUpdate }: StepPromotionProps) {
  const handlePromotionChange = (type: string, checked: boolean) => {
    const promotionTypes = data.promotionTypes || []
    if (checked) {
      onUpdate({ promotionTypes: [...promotionTypes, type] })
    } else {
      onUpdate({ promotionTypes: promotionTypes.filter((t: string) => t !== type) })
    }
  }

  return (
    <div className="space-y-8">
      {/* Accompagnement promotion */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          Avez-vous besoin d'accompagnement pour la promotion ?
        </h3>
        <div className="space-y-3">
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <Checkbox
              id="strategy"
              checked={data.promotionTypes?.includes("strategy")}
              onCheckedChange={(checked) => handlePromotionChange("strategy", checked as boolean)}
              className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
            />
            <Label htmlFor="strategy" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Accompagnement stratégique
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <Checkbox
              id="visual"
              checked={data.promotionTypes?.includes("visual")}
              onCheckedChange={(checked) => handlePromotionChange("visual", checked as boolean)}
              className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
            />
            <Label htmlFor="visual" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Création visuelle (pochettes, visuels)
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <Checkbox
              id="distribution"
              checked={data.promotionTypes?.includes("distribution")}
              onCheckedChange={(checked) => handlePromotionChange("distribution", checked as boolean)}
              className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
            />
            <Label htmlFor="distribution" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Distribution digitale
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <Checkbox
              id="none"
              checked={data.promotionTypes?.includes("none")}
              onCheckedChange={(checked) => handlePromotionChange("none", checked as boolean)}
              className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
            />
            <Label htmlFor="none" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Aucun accompagnement nécessaire
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}