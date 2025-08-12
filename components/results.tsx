"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, RotateCcw, Star, CheckCircle2, Sparkles, Headphones } from "lucide-react"
import type { SimulatorData } from "@/types/simulator"
import { getRecommendedOffers } from "@/lib/simulator-engine"
import { offers } from "@/data/offers"

interface ResultsProps {
  data: SimulatorData
  onReset: () => void
}

// Composant RecapSection
function RecapSection({ data }: { data: SimulatorData }) {
  // Fonction pour trouver le prix d'un service selon les tags générés
  const findServicePrice = (neededTags: string[]) => {
    return offers.find(offer => 
      neededTags.every(tag => offer.tags.includes(tag))
    )
  }

  // Analyser les choix de l'utilisateur et trouver les prix correspondants
  const getPriceDetails = () => {
    const details = []
    
    // 1. Analyse des besoins instrumentaux
    if (data.beatmaking?.needBeats === "yes") {
      const beatCount = data.beatmaking.beatCount || "1"
      const beatTypes = data.beatmaking.beatTypes || ["custom"]
      
      beatTypes.forEach(beatType => {
        const tags = ["need:beats", `beats:${beatCount}`, `beat-type:${beatType}`]
        const service = findServicePrice(tags)
        
        if (service) {
          details.push({
            category: "Instrumental",
            service: service.title,
            price: service.price,
            description: service.description,
            choice: `${beatCount} ${beatType === "custom" ? "sur mesure" : "remake"}`
          })
        }
      })
    }

    // 2. Analyse des besoins d'écriture
    if (data.writing?.needWriting && data.writing.needWriting !== "no") {
      const tags = ["need:writing", `writing:${data.writing.needWriting}`]
      const service = findServicePrice(tags)
      
      if (service) {
        details.push({
          category: "Écriture",
          service: service.title,
          price: service.price,
          description: service.description,
          choice: data.writing.needWriting === "improvement" ? "Perfectionnement" : "Écriture complète"
        })
      }
    }

    // 3. Analyse des besoins d'enregistrement
    if (data.recording?.needRecording === "yes") {
      const duration = data.recording.duration || "4h"
      const trackCount = data.recording.trackCount || "1"
      
      const tags = ["need:recording", `duration:${duration}`]
      const service = findServicePrice(tags)
      
      if (service) {
        details.push({
          category: "Enregistrement",
          service: service.title,
          price: service.price,
          description: service.description,
          choice: `${duration} - ${trackCount} piste(s)`
        })
      }
    }

    // 4. Analyse des besoins de mixage
    if (data.mixing?.needMixing === "yes") {
      const mixingType = data.mixing.mixingType || "stereo"
      const mixCount = data.mixing.mixCount || "1"
      
      const tags = ["need:mixing", `mix-type:${mixingType}`]
      const service = findServicePrice(tags)
      
      if (service) {
        details.push({
          category: "Mixage",
          service: service.title,
          price: service.price,
          description: service.description,
          choice: `${mixingType === "stereo" ? "Stéréo" : "Multipistes"} - ${mixCount} mix`
        })
      }
    }

    // 5. Analyse des besoins vidéo
    if (data.video?.needVideo === "yes") {
      details.push({
        category: "Vidéo",
        service: "Clip vidéo professionnel",
        price: "Sur devis",
        description: "Production vidéo selon votre budget",
        choice: `Budget: ${data.video.videoBudget || "À définir"}`
      })
    }

    // 6. Analyse des besoins promotion
    if (data.promotion?.promotionTypes && data.promotion.promotionTypes.length > 0 && !data.promotion.promotionTypes.includes("none")) {
      details.push({
        category: "Promotion", 
        service: "Stratégie promotionnelle",
        price: "Sur devis",
        description: "Accompagnement marketing personnalisé",
        choice: data.promotion.promotionTypes.join(", ")
      })
    }

    return details
  }

  const priceDetails = getPriceDetails()
  const totalPrice = priceDetails.reduce((sum, item) => {
    const price = item.price.replace('€', '').replace('Sur devis', '0')
    return sum + parseInt(price || '0')
  }, 0)

  if (priceDetails.length === 0) return null

  return (
    <Card className="bg-black/60 backdrop-blur-xl border border-white/10 mb-8">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-red-500" />
          Récapitulatif de votre projet
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Détail des services sélectionnés avec les prix unitaires correspondants
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Liste des services */}
        <div className="space-y-3">
          {priceDetails.map((detail, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-red-600/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs text-red-400 border-red-400/50">
                      {detail.category}
                    </Badge>
                  </div>
                  <h4 className="text-white font-medium text-lg">{detail.service}</h4>
                  <p className="text-gray-400 text-sm mb-2">{detail.description}</p>
                  <p className="text-red-300 text-sm font-medium">
                    Votre choix: {detail.choice}
                  </p>
                </div>
                <div className="text-red-400 font-bold text-xl ml-4">
                  {detail.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Séparateur */}
        <Separator className="bg-white/10" />
        
        {/* Total */}
        {totalPrice > 0 && (
          <div className="flex items-center justify-between p-4 bg-red-600/10 rounded-lg border border-red-600/30">
            <div>
              <h3 className="text-white font-bold text-lg">Total services individuels</h3>
              <p className="text-red-400 text-sm">Prix si achetés séparément</p>
            </div>
            <div className="text-red-400 font-bold text-2xl">
              {totalPrice}€
            </div>
          </div>
        )}
        
        {/* Message d'économie pour les packs */}
        <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-600/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-medium text-sm">💡 Conseil d'expert</span>
          </div>
          <p className="text-green-300 text-sm leading-relaxed">
            {totalPrice > 530 ? (
              <>
                <strong>Économisez jusqu'à {totalPrice - 530}€</strong> avec nos packs SINGLE TITANIUM ou DIAMOND ! 
                En plus des services, vous bénéficiez d'un accompagnement personnalisé et d'une coordination optimale de votre projet.
              </>
            ) : (
              <>
                Nos packs SINGLE TITANIUM et DIAMOND incluent un accompagnement personnalisé 
                et une coordination optimale de votre projet pour un résultat professionnel garanti !
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function Results({ data, onReset }: ResultsProps) {
  const recommendedOffers = getRecommendedOffers(data)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header avec animation */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full backdrop-blur-sm mb-4">
          <Sparkles className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm font-medium">Résultats personnalisés</span>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4">
          Vos offres <span className="text-red-500">sur mesure</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Basées sur vos réponses, voici les offres qui correspondent parfaitement à votre projet musical
        </p>
        
        <Button
          variant="outline"
          onClick={onReset}
          className="group px-6 py-3 bg-transparent border-2 border-white/20 text-white hover:border-red-600/50 hover:bg-red-600/10 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Refaire le simulateur
        </Button>
      </div>

      {/* NOUVEAU : Section récapitulatif */}
      <RecapSection data={data} />

      {/* Grille des offres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedOffers.map((offer, index) => (
          <div key={index} className="relative group">
            {/* Effet de glow au hover */}
            <div className="absolute -inset-1 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
            
            <Card className="relative bg-black/80 backdrop-blur-md border border-white/10 hover:border-red-600/30 transition-all duration-300 h-full flex flex-col overflow-visible">
              {/* Badge recommandé */}
              {offer.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-4 py-2 shadow-xl shadow-red-600/40 border border-red-500/30">
                    <Star className="w-4 h-4 mr-1.5 fill-current" />
                    Recommandé
                  </Badge>
                </div>
              )}
              
              {/* Indicateur de popularité (optionnel) */}
              {offer.recommended && (
                <div className="absolute top-4 right-4">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                </div>
              )}
              
              <CardHeader className="space-y-3 pt-8">
                <CardTitle className="text-white text-xl lg:text-2xl font-bold tracking-tight">
                  {offer.title}
                </CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                    {offer.price}
                  </span>
                  {offer.originalPrice && (
                    <span className="text-gray-500 line-through text-base lg:text-lg">
                      {offer.originalPrice}
                    </span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-grow flex flex-col">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {offer.description}
                </p>

                {offer.includes && (
                  <div className="flex-grow space-y-2">
                    <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                      Inclus dans l'offre
                    </h4>
                    <ul className="text-gray-300 text-xs lg:text-sm space-y-1.5">
                      {offer.includes.map((item, i) => (
                        <li key={i} className="flex items-start group/item">
                          <span className="text-red-500 mr-2 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform">✓</span>
                          <span className="group-hover/item:text-white transition-colors break-words">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="flex flex-col gap-3 pt-4 mt-auto">
                  <Button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 transition-all duration-300">
                    <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Réserver cette offre
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-2 border-white/20 text-white hover:border-red-600/50 hover:bg-red-600/10 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Être rappelé
                  </Button>
                </div>
              </CardContent>
              
              {/* Ligne décorative en bas */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </div>
        ))}
      </div>

      {/* CTA Section améliorée */}
      <div className="relative mt-12">
        {/* Effet de glow derrière */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-red-600/5 to-red-600/10 blur-3xl" />
        
        <Card className="relative bg-black/60 backdrop-blur-xl border border-white/10 max-w-2xl mx-auto overflow-hidden">
          {/* Pattern de fond */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>
          
          <CardContent className="relative p-8 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-600/20 rounded-xl border border-red-600/30">
                <Headphones className="w-8 h-8 text-red-500" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white">
              Besoin d'un conseil <span className="text-red-500">personnalisé</span> ?
            </h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Nos experts sont là pour vous accompagner dans votre projet musical et répondre à toutes vos questions
            </p>
            
            {/* Horaires disponibles */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 border border-green-600/30 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-sm">Disponible maintenant</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button className="group px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 transition-all duration-300">
                <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                01 23 45 67 89
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-3 bg-transparent border-2 border-white/20 text-white hover:border-red-600/50 hover:bg-red-600/10 transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                Envoyer un message
              </Button>
            </div>
          </CardContent>
          
          {/* Ligne décorative */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
        </Card>
      </div>
    </div>
  )
}