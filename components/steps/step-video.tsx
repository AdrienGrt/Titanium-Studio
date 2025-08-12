"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface StepVideoProps {
  data: any
  onUpdate: (data: any) => void
}

export function StepVideo({ data, onUpdate }: StepVideoProps) {
  return (
    <div className="space-y-8">
      {/* Clip vidéo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          As-tu besoin de faire un clip vidéo avec nous ?
        </h3>
        <RadioGroup 
          value={data.needVideo} 
          onValueChange={(value) => onUpdate({ needVideo: value })}
          className="space-y-3"
        >
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="yes" id="video-yes" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="video-yes" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Oui, je veux réaliser un clip vidéo avec vous
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="no" id="video-no" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="video-no" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Non, pas pour l'instant
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="maybe" id="video-yes" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="video-yes" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Je ne sais pas encore, j'aimerais en discuter
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.needVideo === "yes" && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
            Quel est ton budget pour ton clip ?
          </h3>
          <RadioGroup 
            value={data.videoBudget} 
            onValueChange={(value) => onUpdate({ videoBudget: value })}
            className="space-y-3"
          >
            <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
              <RadioGroupItem value="low" id="budget-low" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
              <Label htmlFor="budget-low" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Environ 300 €
              </Label>
            </div>
            <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
              <RadioGroupItem value="medium" id="budget-medium" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
              <Label htmlFor="budget-medium" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Environ 600 €
              </Label>
            </div>
            <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
              <RadioGroupItem value="high" id="budget-high" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
              <Label htmlFor="budget-high" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Environ 900 €
              </Label>
            </div>
            <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
              <RadioGroupItem value="very-high" id="budget-high" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
              <Label htmlFor="budget-very-high" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Plus de 1600 €
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  )
}

<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
    opacity: 0;
  }
`}</style>