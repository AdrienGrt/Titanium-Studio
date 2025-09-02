import type { SimulatorData, Offer } from "@/types/simulator"
import { offers } from "@/data/offers"

export function getRecommendedOffers(data: SimulatorData): Offer[] {
  // 🎯 FILTRER UNIQUEMENT LES PACKS
  const packOffers = offers.filter(offer => isPack(offer))
  
  const tags = generateTags(data)
  const scoredOffers = packOffers.map((offer) => ({
    ...offer,
    score: calculateScore(offer, tags),
  }))

  // Trier par score et prendre les 6 meilleures (plus de choix pour les packs)
  const topOffers = scoredOffers
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((offer) => ({
      ...offer,
      recommended: offer.score === Math.max(...scoredOffers.map((o) => o.score)),
    }))

  return topOffers
}

// 🏷️ FONCTION POUR IDENTIFIER LES PACKS
function isPack(offer: Offer): boolean {
  // Packs Single
  if (offer.category === "pack") return true
  
  // Packs Beats (3 ou 5)
  if (offer.id.includes("custom-3") || offer.id.includes("custom-5")) return true
  if (offer.id.includes("remake-3") || offer.id.includes("remake-5")) return true
  
  // Packs Mix (3 ou 5)  
  if (offer.id.includes("mix-classic-3") || offer.id.includes("mix-classic-5")) return true
  if (offer.id.includes("mix-full-3") || offer.id.includes("mix-full-5")) return true
  
  // Packs Time Flex
  if (offer.id.includes("flex")) return true
  
  // Exclure tous les services individuels
  const individualServices = [
    "beats-custom-1", "remake-1", "arrangement",
    "recording-day-1h", "recording-day-4h", "recording-day-8h",
    "recording-night-1h", "recording-night-4h", "recording-night-8h", 
    "mix-classic-1", "mix-full-1", "master-only",
    "writing-coaching-4h", "topline-1h"
  ]
  
  return !individualServices.includes(offer.id)
}

function generateTags(data: SimulatorData): string[] {
  const tags: string[] = []

  // Tags profil
  if (data.profile.profileType) tags.push(`profile:${data.profile.profileType}`)
  if (data.profile.level) tags.push(`level:${data.profile.level}`)
  if (data.profile.support) tags.push(`support:${data.profile.support}`)

  // Tags beatmaking
  if (data.beatmaking.needBeats === "yes") {
    tags.push("need:beats")
    if (data.beatmaking.beatCount) tags.push(`beats:${data.beatmaking.beatCount}`)
    if (data.beatmaking.beatTypes) {
      data.beatmaking.beatTypes.forEach((type) => tags.push(`beat-type:${type}`))
    }
  }

  // Tags écriture
  if (data.writing.needWriting && data.writing.needWriting !== "no") {
    tags.push("need:writing")
    tags.push(`writing:${data.writing.needWriting}`)
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

function calculateScore(offer: Offer, userTags: string[]): number {
  let score = 0

  offer.tags.forEach((offerTag) => {
    if (userTags.includes(offerTag)) {
      score += 1
    }
  })

  return score
}