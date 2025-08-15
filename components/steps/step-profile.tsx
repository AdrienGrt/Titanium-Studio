"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface StepProfileProps {
  data: any
  onUpdate: (data: any) => void
}

export function StepProfile({ data, onUpdate }: StepProfileProps) {
  return (
    <div className="space-y-8">
      {/* Type de profil */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          Vous êtes ?        </h3>
        <RadioGroup 
          value={data.profileType} 
          onValueChange={(value) => onUpdate({ profileType: value })}
          className="space-y-3"
        >
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="solo" id="solo" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="solo" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Artiste solo
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="group" id="group" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="group" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Groupe
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="manager" id="manager" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="manager" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Manager / Producteur
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Niveau d'expérience */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          Quel est ton niveau ?
        </h3>
        <RadioGroup 
          value={data.level} 
          onValueChange={(value) => onUpdate({ level: value })}
          className="space-y-3"
        >
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="beginner" id="beginner" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="beginner" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Débutant : c'est ma première fois en studio
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="intermediate" id="intermediate" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="intermediate" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Intermédiaire : j'ai déjà enregistré plusieurs morceaux            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="pro" id="pro" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="pro" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Professionnel : c'est mon métier
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Type d'accompagnement */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          Quel type d'accompagnement recherches-tu ?
        </h3>
        <RadioGroup 
          value={data.support} 
          onValueChange={(value) => onUpdate({ support: value })}
          className="space-y-3"
        >
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="autonomous" id="autonomous" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="autonomous" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Autonome : je sais ce que je veux, j'avance seul
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="coached" id="coached" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="coached" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Accompagnement simple : j'aimerais un peu de coaching
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="guided" id="guided" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="guided" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
            Accompagnement + : j'aimerais être guidé à chaque étape

            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}