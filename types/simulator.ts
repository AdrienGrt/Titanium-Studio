export interface SimulatorData {
  profile: {
    profileType?: string
    level?: string
    support?: string
  }
  beatmaking: {
    needBeats?: string
    beatCount?: string
    beatTypes?: string[]
  }
  writing: {
    needWriting?: string
  }
  recording: {
    needRecording?: string
    trackCount?: string
    duration?: string
    timePreference?: string
  }
  mixing: {
    needMixing?: string
    mixingType?: string
    mixCount?: string
  }
  video: {
    needVideo?: string
    videoBudget?: string
  }
  promotion: {
    promotionTypes?: string[]
  }
  tags: string[]
}

export interface Offer {
  id: string
  title: string
  price: string
  description: string
  includes?: string[]
  tags: string[]
  category: string
  recommended?: boolean
}
