"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface StepBeatmakingProps {
  data: any
  onUpdate: (data: any) => void
}

export function StepBeatmaking({ data, onUpdate }: StepBeatmakingProps) {
  return (
    <div className="space-y-8">
      {/* Besoin d'instrumentales */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          Avez-vous besoin d'instrumentales ?
        </h3>
        <RadioGroup 
          value={data.needBeats} 
          onValueChange={(value) => onUpdate({ needBeats: value })}
          className="space-y-3"
        >
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="yes" id="beats-yes" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="beats-yes" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Oui
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="no" id="beats-no" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="beats-no" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Non
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.needBeats === "yes" && (
        <>
          {/* Nombre d'instrumentales */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Combien d'instrumentales ?
            </h3>
            <RadioGroup 
              value={data.beatCount} 
              onValueChange={(value) => onUpdate({ beatCount: value })}
              className="space-y-3"
            >
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="1" id="beat-1" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="beat-1" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  1 instrumental
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="3" id="beat-3" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="beat-3" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  3 instrumentales
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="5" id="beat-5" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="beat-5" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  5 instrumentales
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Type d'instrumental */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Type d'instrumental
            </h3>
            <div className="space-y-3">
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <Checkbox
                  id="remake"
                  checked={data.beatTypes?.includes("remake")}
                  onCheckedChange={(checked) => {
                    const types = data.beatTypes || []
                    if (checked) {
                      onUpdate({ beatTypes: [...types, "remake"] })
                    } else {
                      onUpdate({ beatTypes: types.filter((t: string) => t !== "remake") })
                    }
                  }}
                  className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
                />
                <Label htmlFor="remake" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Remake (reproduction d'un morceau existant)
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <Checkbox
                  id="custom"
                  checked={data.beatTypes?.includes("custom")}
                  onCheckedChange={(checked) => {
                    const types = data.beatTypes || []
                    if (checked) {
                      onUpdate({ beatTypes: [...types, "custom"] })
                    } else {
                      onUpdate({ beatTypes: types.filter((t: string) => t !== "custom") })
                    }
                  }}
                  className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
                />
                <Label htmlFor="custom" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Sur mesure (création originale)
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <Checkbox
                  id="arrangement"
                  checked={data.beatTypes?.includes("arrangement")}
                  onCheckedChange={(checked) => {
                    const types = data.beatTypes || []
                    if (checked) {
                      onUpdate({ beatTypes: [...types, "arrangement"] })
                    } else {
                      onUpdate({ beatTypes: types.filter((t: string) => t !== "arrangement") })
                    }
                  }}
                  className="border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white focus:ring-red-500 focus:ring-offset-0"
                />
                <Label htmlFor="arrangement" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Arrangement
                </Label>
              </div>
            </div>
          </div>
        </>
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
    animation: fadeIn 0.3s ease-out;
  }
`}</style>