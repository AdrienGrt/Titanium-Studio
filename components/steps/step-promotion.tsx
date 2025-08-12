"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface StepPromotionProps {
  data: any
  onUpdate: (data: any) => void
}

export function StepPromotion({ data, onUpdate }: StepPromotionProps) {
  const handleMainPromotionChange = (type: string, checked: boolean) => {
    if (checked) {
      onUpdate({ 
        mainPromotionChoice: type,
        specificPromotionTypes: type === "yes" ? data.specificPromotionTypes : []
      })
    }
  }

  const handleSpecificPromotionChange = (type: string, checked: boolean) => {
    const specificTypes = data.specificPromotionTypes || []
    if (checked) {
      onUpdate({ specificPromotionTypes: [...specificTypes, type] })
    } else {
      onUpdate({ specificPromotionTypes: specificTypes.filter((t: string) => t !== type) })
    }
  }

  const showSubQuestions = data.mainPromotionChoice === "yes"

  return (
    <div className="space-y-8">
      {/* Question principale */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          Souhaites-tu être accompagné dans la stratégie, la diffusion et la promotion de ta musique ?
        </h3>
        <div className="space-y-3">
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <Checkbox
              id="yes"
              checked={data.mainPromotionChoice === "yes"}
              onCheckedChange={(checked) => handleMainPromotionChange("yes", checked as boolean)}
              className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
            />
            <Label htmlFor="yes" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Oui, je veux qu'on m'accompagne sur tout ça
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <Checkbox
              id="no"
              checked={data.mainPromotionChoice === "no"}
              onCheckedChange={(checked) => handleMainPromotionChange("no", checked as boolean)}
              className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
            />
            <Label htmlFor="no" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Non, pas pour l'instant
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <Checkbox
              id="discuss"
              checked={data.mainPromotionChoice === "discuss"}
              onCheckedChange={(checked) => handleMainPromotionChange("discuss", checked as boolean)}
              className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
            />
            <Label htmlFor="discuss" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Je ne sais pas encore, j'aimerais en discuter
            </Label>
          </div>
        </div>
      </div>

      {/* Sous-questions (apparaissent seulement si "Oui" est sélectionné) */}
      {showSubQuestions && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-red-400 rounded-full"></span>
            Quelle partie t'intéresse le plus pour commencer ?
          </h4>
          <div className="space-y-3 ml-4">
            <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
              <Checkbox
                id="strategy"
                checked={data.specificPromotionTypes?.includes("strategy")}
                onCheckedChange={(checked) => handleSpecificPromotionChange("strategy", checked as boolean)}
                className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
              />
              <Label htmlFor="strategy" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                Définir une vraie stratégie et un plan de carrière
              </Label>
            </div>
            <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
              <Checkbox
                id="visual"
                checked={data.specificPromotionTypes?.includes("visual")}
                onCheckedChange={(checked) => handleSpecificPromotionChange("visual", checked as boolean)}
                className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
              />
              <Label htmlFor="visual" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                Créer du contenu visuel pour les réseaux sociaux (photos, mini-clips, montages, motion design)
              </Label>
            </div>
            <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
              <Checkbox
                id="distribution"
                checked={data.specificPromotionTypes?.includes("distribution")}
                onCheckedChange={(checked) => handleSpecificPromotionChange("distribution", checked as boolean)}
                className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
              />
              <Label htmlFor="distribution" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                Être accompagné pour distribuer ma musique sur toutes les plateformes
              </Label>
            </div>
            <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
              <Checkbox
                id="promotion"
                checked={data.specificPromotionTypes?.includes("promotion")}
                onCheckedChange={(checked) => handleSpecificPromotionChange("promotion", checked as boolean)}
                className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
              />
              <Label htmlFor="promotion" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                Mettre en place des actions de promotion efficaces
              </Label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}