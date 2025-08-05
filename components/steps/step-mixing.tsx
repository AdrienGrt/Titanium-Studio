"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface StepMixingProps {
  data: any
  onUpdate: (data: any) => void
}

export function StepMixing({ data, onUpdate }: StepMixingProps) {
  return (
    <div className="space-y-8">
      {/* Mixage/Mastering */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-red-500 rounded-full"></span>
          Souhaitez-vous faire mixer/masteriser vos morceaux ?
        </h3>
        <RadioGroup 
          value={data.needMixing} 
          onValueChange={(value) => onUpdate({ needMixing: value })}
          className="space-y-3"
        >
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="yes" id="mixing-yes" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="mixing-yes" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Oui
            </Label>
          </div>
          <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
            <RadioGroupItem value="no" id="mixing-no" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
            <Label htmlFor="mixing-no" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
              Non
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.needMixing === "yes" && (
        <>
          {/* Type de mixage */}
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Type de mixage
            </h3>
            <RadioGroup 
              value={data.mixingType} 
              onValueChange={(value) => onUpdate({ mixingType: value })}
              className="space-y-3"
            >
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="stereo" id="mix-stereo" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="mix-stereo" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Mix stéréo (1 piste)
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="multitrack" id="mix-multitrack" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="mix-multitrack" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Mix multipistes
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="master-only" id="mix-master" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="mix-master" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  Master seul
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Nombre de morceaux */}
          <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Nombre de morceaux à mixer
            </h3>
            <RadioGroup 
              value={data.mixCount} 
              onValueChange={(value) => onUpdate({ mixCount: value })}
              className="space-y-3"
            >
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="1" id="mix-1" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="mix-1" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  1 morceau
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="3" id="mix-3" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="mix-3" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  3 morceaux
                </Label>
              </div>
              <div className="group relative flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-red-600/10 hover:border-red-600/30 transition-all duration-300 cursor-pointer">
                <RadioGroupItem value="5" id="mix-5" className="border-white/30 text-red-500 focus:ring-red-500 focus:ring-offset-0" />
                <Label htmlFor="mix-5" className="text-gray-200 group-hover:text-white transition-colors cursor-pointer flex-1">
                  5 morceaux
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