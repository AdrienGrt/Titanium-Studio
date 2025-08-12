"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface StepWritingProps {
  data: any
  onUpdate: (data: any) => void
}

export function StepWriting({ data, onUpdate }: StepWritingProps) {
  return (
    <div className="space-y-8">
      {/* Aide pour l'écriture */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          As-tu besoin d'aide pour l'écriture ou la topline ?
        </h3>
        <RadioGroup 
          value={data.needWriting} 
          onValueChange={(value) => onUpdate({ needWriting: value })}
          className="space-y-3"
        >
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="no" id="writing-no" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="writing-no" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Non, j'ai déjà tout écrit
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="improvement" id="writing-improvement" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="writing-improvement" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Oui, j'ai mon texte mais j'aimerais le perfectionner
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="complete" id="writing-complete" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="writing-complete" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            J'aimerais qu'on m'aide à écrire une chanson de A à Z
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}