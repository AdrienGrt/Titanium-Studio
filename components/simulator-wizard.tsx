"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Music, Mic2, Edit3, Disc, SlidersHorizontal, Video, Megaphone, User } from "lucide-react"
import { StepProfile } from "./steps/step-profile"
import { StepBeatmaking } from "./steps/step-beatmaking"
import { StepWriting } from "./steps/step-writing"
import { StepRecording } from "./steps/step-recording"
import { StepMixing } from "./steps/step-mixing"
import { StepVideo } from "./steps/step-video"
import { StepPromotion } from "./steps/step-promotion"
import { StepContact } from "./steps/step-contact"
import { Results } from "./results"
import type { SimulatorData } from "@/types/simulator"

const STEPS = [
  { id: "profile", title: "IDENTIFICATION DE LA CIBLE", component: StepProfile, icon: Music },
  { id: "beatmaking", title: "INSTRUMENTAL / BEATMAKING", component: StepBeatmaking, icon: Disc },
  { id: "writing", title: "ÉCRITURE / TOPLINE", component: StepWriting, icon: Edit3 },
  { id: "recording", title: "ENREGISTREMENT STUDIO", component: StepRecording, icon: Mic2 },
  { id: "mixing", title: "MIXAGE / MASTERING", component: StepMixing, icon: SlidersHorizontal },
  { id: "video", title: "CLIP VIDÉO", component: StepVideo, icon: Video },
  { id: "promotion", title: "PROMOTION / STRATÉGIE ARTISTIQUE", component: StepPromotion, icon: Megaphone },
  { id: "contact", title: "VOS COORDONNÉES", component: StepContact, icon: User },
]

export function SimulatorWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<SimulatorData>({
    profile: {},
    beatmaking: {},
    writing: {},
    recording: {},
    mixing: {},
    video: {},
    promotion: {},
    contact: {},
    tags: [],
  })
  const [showResults, setShowResults] = useState(false)

  const updateData = (stepData: any) => {
    const stepKey = STEPS[currentStep].id as keyof SimulatorData
    setData((prev) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...stepData },
    }))
  }

  // Validation des champs requis pour l'étape contact
  const isContactStepValid = () => {
    if (currentStep !== STEPS.length - 1) return true // Pas l'étape contact
    
    const contactData = data.contact
    return contactData?.name && contactData?.email && 
           contactData.name.trim() !== "" && 
           contactData.email.trim() !== "" &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email) // Validation email basique
  }

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      if (isContactStepValid()) {
        setShowResults(true)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetSimulator = () => {
    setCurrentStep(0)
    setShowResults(false)
    setData({
      profile: {},
      beatmaking: {},
      writing: {},
      recording: {},
      mixing: {},
      video: {},
      promotion: {},
      contact: {},
      tags: [],
    })
  }

  if (showResults) {
    return <Results data={data} onReset={resetSimulator} />
  }

  const CurrentStepComponent = STEPS[currentStep].component
  const CurrentIcon = STEPS[currentStep].icon
  const progress = ((currentStep + 1) / STEPS.length) * 100
  const isLastStep = currentStep === STEPS.length - 1
  const canProceed = isContactStepValid()

  return (
    <div className="relative">
      {/* Effet de glow derrière la carte */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-red-600/10 blur-3xl" />
      
      <Card className="relative max-w-4xl mx-auto bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Pattern de fond subtil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>
        
        <CardHeader className="relative text-center space-y-6 pb-8">
          {/* Progress bar améliorée */}
          <div className="space-y-3">
            <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Effet de brillance animé */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
            
            {/* Steps indicators */}
            <div className="flex justify-between items-center px-2">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "bg-red-600 text-white scale-110 shadow-lg shadow-red-600/50"
                      : index < currentStep
                      ? "bg-red-600/30 text-white/70"
                      : "bg-white/10 text-white/30"
                  }`}
                >
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-400">
              Étape <span className="text-red-400 font-semibold">{currentStep + 1}</span> sur {STEPS.length}
            </p>
          </div>
          
          {/* Titre avec icône */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="p-3 bg-red-600/20 rounded-xl border border-red-600/30">
                <CurrentIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              {STEPS[currentStep].title}
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="relative space-y-8 px-8 pb-8">
          {/* Zone de contenu avec style uniforme */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <CurrentStepComponent 
              data={data[STEPS[currentStep].id as keyof SimulatorData]} 
              onUpdate={updateData} 
            />
          </div>

          {/* Message de validation pour l'étape contact */}
          {isLastStep && !canProceed && (
            <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Veuillez remplir les champs obligatoires (nom et email valide)
              </div>
            </div>
          )}

          {/* Navigation buttons avec nouveau style */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`
                group relative px-6 py-3 
                bg-transparent border-2 border-white/20 
                text-white hover:border-red-600/50 
                hover:bg-red-600/10 
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-all duration-300
                ${currentStep === 0 ? '' : 'hover:scale-105'}
              `}
            >
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Précédent
            </Button>

            <Button 
              onClick={nextStep} 
              disabled={isLastStep && !canProceed}
              className={`
                group relative px-8 py-3 
                bg-gradient-to-r from-red-600 to-red-700 
                hover:from-red-700 hover:to-red-800 
                text-white font-semibold
                border border-red-500/50
                shadow-lg shadow-red-600/25
                hover:shadow-xl hover:shadow-red-600/30
                hover:scale-105
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100
              `}
            >
              <span className="relative z-10">
                {isLastStep ? "Voir mes offres" : "Suivant"}
              </span>
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </div>
        </CardContent>
        
        {/* Ligne décorative en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      </Card>
    </div>
  )
}