import type { SimulatorData, Offer } from "@/types/simulator"
import { offers } from "@/data/offers"

// Interface étendue pour les offres avec prix d'origine
interface EnhancedOffer extends Offer {
  originalPrice?: string
  savings?: string
  isDiscounted?: boolean
}

export function getRecommendedOffers(data: SimulatorData): EnhancedOffer[] {
  // 🎯 FILTRER UNIQUEMENT LES PACKS
  const packOffers = offers.filter(offer => isPack(offer))
  
  const tags = generateTags(data)
  const scoredOffers = packOffers.map((offer) => ({
    ...offer,
    score: calculateScore(offer, tags),
  }))

  // Trier par score et prendre les 6 meilleures
  const topOffers = scoredOffers
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((offer) => {
      const enhanced = enhanceOfferWithPricing(offer, data)
      return {
        ...enhanced,
        recommended: offer.score === Math.max(...scoredOffers.map((o) => o.score)),
      }
    })

  return topOffers
}

// 🏷️ FONCTION POUR IDENTIFIER LES PACKS (inchangée)
function isPack(offer: Offer): boolean {
  if (offer.category === "pack") return true
  if (offer.id.includes("custom-3") || offer.id.includes("custom-5")) return true
  if (offer.id.includes("remake-3") || offer.id.includes("remake-5")) return true
  if (offer.id.includes("mix-classic-3") || offer.id.includes("mix-classic-5")) return true
  if (offer.id.includes("mix-full-3") || offer.id.includes("mix-full-5")) return true
  if (offer.id.includes("flex")) return true
  
  const individualServices = [
    "beats-custom-1", "remake-1", "arrangement",
    "recording-day-1h", "recording-day-4h", "recording-day-8h",
    "recording-night-1h", "recording-night-4h", "recording-night-8h", 
    "mix-classic-1", "mix-full-1", "master-only",
    "writing-coaching-4h", "topline-1h"
  ]
  
  return !individualServices.includes(offer.id)
}

// 🎯 NOUVELLE FONCTION : Calcul du prix théorique vs prix pack
function enhanceOfferWithPricing(offer: Offer, data: SimulatorData): EnhancedOffer {
  const theoreticalPrice = calculateTheoreticalPrice(offer, data)
  const actualPrice = parsePrice(offer.price)
  
  if (theoreticalPrice > actualPrice && actualPrice > 0) {
    const savings = theoreticalPrice - actualPrice
    return {
      ...offer,
      originalPrice: `${theoreticalPrice}€`,
      savings: `${savings}€`,
      isDiscounted: true
    }
  }
  
  return offer
}

// 🧮 CALCUL DU PRIX THÉORIQUE (services individuels)
function calculateTheoreticalPrice(offer: Offer, data: SimulatorData): number {
  let total = 0
  
  // Mapping des prix des services individuels
  const servicePrices = {
    // Beatmaking
    'beats-custom-1': 300,
    'beats-custom-3': 840,
    'beats-custom-5': 1350,
    'remake-1': 250,
    'remake-3': 700,
    'remake-5': 1100,
    
    // Recording (prix jour, +25% pour nuit)
    'recording-1h': 48,
    'recording-4h': 180,
    'recording-8h': 350,
    
    // Mixing
    'mix-classic-1': 120,
    'mix-classic-3': 340,
    'mix-classic-5': 550,
    'mix-full-1': 200,
    'mix-full-3': 510,
    'mix-full-5': 800,
    'master-only': 70,
    
    // Writing
    'writing-coaching-4h': 320,
    'topline-1h': 80
  }
  
  // Pour les packs SINGLE, calculer selon les besoins réels
  if (offer.id === 'single-titanium' || offer.id === 'single-diamond') {
    // Beat custom
    if (data.beatmaking?.needBeats === 'yes') {
      total += servicePrices['beats-custom-1'] || 300
    }
    
    // Recording
    if (data.recording?.needRecording === 'yes') {
      const duration = data.recording.duration || '4h'
      const timePreference = data.recording.timePreference || 'day'
      let recordingPrice = servicePrices[`recording-${duration}`] || 180
      
      if (timePreference === 'night') {
        recordingPrice = Math.round(recordingPrice * 1.25) // +25% pour nuit
      }
      total += recordingPrice
    }
    
    // Mixing
    if (data.mixing?.needMixing === 'yes') {
      const mixType = data.mixing.mixingType || 'stereo'
      if (mixType === 'multitrack') {
        total += servicePrices['mix-full-1'] || 200
      } else {
        total += servicePrices['mix-classic-1'] || 120
      }
    }
    
    // Writing (obligatoire pour débutants ou si demandé)
    const isBeginnerNeedsCoaching = data.profile?.level === 'beginner'
    const needsWriting = data.writing?.needWriting && data.writing.needWriting !== 'no'
    
    if (offer.id === 'single-diamond' || isBeginnerNeedsCoaching || needsWriting) {
      total += servicePrices['writing-coaching-4h'] || 320
    }
  }
  
  // Pour les autres packs, utiliser une logique similaire
  else {
    // Exemple pour pack beats
    if (offer.id.includes('custom-3')) {
      total = servicePrices['beats-custom-1'] * 3 // Prix unitaire x3
    } else if (offer.id.includes('custom-5')) {
      total = servicePrices['beats-custom-1'] * 5 // Prix unitaire x5
    }
    // Ajouter d'autres logiques selon les packs...
  }
  
  return total
}

// 🏷️ GÉNÉRATION DE TAGS AMÉLIORÉE avec logique métier
function generateTags(data: SimulatorData): string[] {
  const tags: string[] = []

  // Tags profil
  if (data.profile.profileType) tags.push(`profile:${data.profile.profileType}`)
  if (data.profile.level) tags.push(`level:${data.profile.level}`)
  if (data.profile.support) tags.push(`support:${data.profile.support}`)

  // 🎯 LOGIQUE MÉTIER : Débutant = coaching obligatoire
  if (data.profile.level === 'beginner') {
    tags.push('need:writing') // Force le coaching pour débutants
    tags.push('support:coached')
  }

  // 🎯 LOGIQUE MÉTIER : Artiste autonome vs accompagné
  if (data.profile.support === 'autonomous') {
    // Artiste autonome : privilégier les packs sans coaching
    tags.push('level:intermediate')
  } else if (data.profile.support === 'coached') {
    // Artiste qui veut être accompagné : privilégier les packs avec coaching
    tags.push('need:writing')
    tags.push('level:pro')
  }

  // Tags beatmaking
  if (data.beatmaking.needBeats === "yes") {
    tags.push("need:beats")
    if (data.beatmaking.beatCount) tags.push(`beats:${data.beatmaking.beatCount}`)
    if (data.beatmaking.beatTypes) {
      data.beatmaking.beatTypes.forEach((type) => tags.push(`beat-type:${type}`))
    }
  }

  // Tags écriture avec logique améliorée
  if (data.writing.needWriting && data.writing.needWriting !== "no") {
    tags.push("need:writing")
    tags.push(`writing:${data.writing.needWriting}`)
    
    // Si besoin d'amélioration = coaching recommandé
    if (data.writing.needWriting === 'improvement') {
      tags.push('support:coached')
    }
  }

  // Tags enregistrement
  if (data.recording.needRecording === "yes") {
    tags.push("need:recording")
    if (data.recording.trackCount) tags.push(`tracks:${data.recording.trackCount}`)
    if (data.recording.duration) tags.push(`duration:${data.recording.duration}`)
    if (data.recording.timePreference) tags.push(`time:${data.recording.timePreference}`)
  }

  // Tags mixage
  if (data.mixing.needMixing === "yes") {
    tags.push("need:mixing")
    if (data.mixing.mixingType) tags.push(`mix-type:${data.mixing.mixingType}`)
    if (data.mixing.mixCount) tags.push(`mix-count:${data.mixing.mixCount}`)
  }

  // Tags vidéo
  if (data.video.needVideo === "yes") {
    tags.push("need:video")
    if (data.video.videoBudget) tags.push(`video-budget:${data.video.videoBudget}`)
  }

  // Tags promotion
  if (data.promotion.promotionTypes && data.promotion.promotionTypes.length > 0) {
    if (!data.promotion.promotionTypes.includes("none")) {
      tags.push("need:promotion")
      data.promotion.promotionTypes.forEach((type) => tags.push(`promo:${type}`))
    }
  }

  return tags
}

// 🧮 CALCUL DE SCORE AMÉLIORÉ avec bonus/malus
function calculateScore(offer: Offer, userTags: string[]): number {
  let score = 0

  // Score de base : tags correspondants
  offer.tags.forEach((offerTag) => {
    if (userTags.includes(offerTag)) {
      score += 1
    }
  })

  // 🎯 BONUS/MALUS selon la logique métier
  
  // Bonus pour Single Diamond si débutant ou besoin coaching
  if (offer.id === 'single-diamond') {
    if (userTags.includes('level:beginner') || userTags.includes('support:coached') || userTags.includes('need:writing')) {
      score += 3 // Bonus important
    }
  }
  
  // Bonus pour Single Titanium si autonome et intermédiaire
  if (offer.id === 'single-titanium') {
    if (userTags.includes('support:autonomous') && userTags.includes('level:intermediate')) {
      score += 2
    }
  }
  
  // Malus pour offres inadaptées au niveau
  if (userTags.includes('level:beginner')) {
    // Débutant : éviter les offres sans coaching
    if (offer.id === 'single-titanium' || !offer.tags.includes('support:coached')) {
      score -= 1
    }
  }
  
  // Bonus pour packs multi-titres si gros projet
  if (userTags.includes('beats:5') || userTags.includes('mix-count:5')) {
    if (offer.id.includes('-5')) {
      score += 2
    }
  }

  return score
}

// 🔧 UTILITAIRE : Parser le prix
function parsePrice(price: string): number {
  const match = price.match(/(\d+)/)
  return match ? parseInt(match[1]) : 0
}