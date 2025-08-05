"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface StepRecordingProps {
  data: any
  onUpdate: (data: any) => void
}

export function StepRecording({ data, onUpdate }: StepRecordingProps) {
  return (
    <div className="space-y-8">
      {/* Enregistrement en studio */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          Souhaitez-vous enregistrer en studio ?
        </h3>
        <RadioGroup 
          value={data.needRecording} 
          onValueChange={(value) => onUpdate({ needRecording: value })}
          className="space-y-3"
        >
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="yes" id="recording-yes" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="recording-yes" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Oui
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="no" id="recording-no" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="recording-no" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Non
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.needRecording === "yes" && (
        <>
          {/* Nombre de morceaux */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Combien de morceaux ?
            </h3>
            <RadioGroup 
              value={data.trackCount} 
              onValueChange={(value) => onUpdate({ trackCount: value })}
              className="space-y-3"
            >
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="1" id="track-1" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="track-1" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  1 morceau
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="3" id="track-3" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="track-3" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  3 morceaux
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="5" id="track-5" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="track-5" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  5 morceaux ou plus
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Durée d'enregistrement */}
          <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Durée d'enregistrement estimée
            </h3>
            <RadioGroup 
              value={data.duration} 
              onValueChange={(value) => onUpdate({ duration: value })}
              className="space-y-3"
            >
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="1h" id="duration-1h" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="duration-1h" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  1 heure
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="4h" id="duration-4h" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="duration-4h" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  4 heures
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="8h" id="duration-8h" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="duration-8h" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  8 heures
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="flex" id="duration-flex" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="duration-flex" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Pack Time Flex (10h ou 20h)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Préférence horaire */}
          <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Préférence horaire
            </h3>
            <RadioGroup 
              value={data.timePreference} 
              onValueChange={(value) => onUpdate({ timePreference: value })}
              className="space-y-3"
            >
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="day" id="time-day" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="time-day" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Jour
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="night" id="time-night" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="time-night" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Nuit
                </Label>
              </div>
            </RadioGroup>
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
    animation: fadeIn 0.3s ease-out forwards;
    opacity: 0;
  }
`}</style>