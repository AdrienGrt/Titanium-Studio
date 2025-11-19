"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface StepContactProps {
  data: any
  onUpdate: (data: any) => void
  onSubmit?: () => void // Optionnel si vous gérez la soumission ailleurs
}

export function StepContact({ data, onUpdate, onSubmit }: StepContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value })
  }

  const handleSubmit = async () => {
    // Validation basique
    if (!data.name || !data.email) {
      alert('Merci de remplir les champs obligatoires (Nom et Email)')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        if (onSubmit) onSubmit() // Appelle la fonction parent si elle existe
        // Optionnel : réinitialiser le formulaire
        // onUpdate({})
      } else {
        setSubmitStatus('error')
        alert('Erreur lors de l\'envoi. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setSubmitStatus('error')
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="text-center space-y-3 mb-8">
        <h3 className="text-xl font-semibold text-white">
          Parfait ! Une dernière étape...
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto">
          Pour vous proposer les meilleures offres et vous accompagner dans votre projet, 
          laissez-nous vos coordonnées. Nous vous recontacterons rapidement !
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div className="space-y-3">
          <Label htmlFor="name" className="text-white font-medium flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full"></span>
            Nom *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Votre nom"
            value={data.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:ring-offset-0 h-12"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-white font-medium flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full"></span>
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={data.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:ring-offset-0 h-12"
            required
          />
        </div>

        {/* Téléphone */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-white font-medium flex items-center gap-2">
            <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
            Téléphone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            value={data.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:ring-offset-0 h-12"
          />
        </div>

        {/* Nom d'artiste/Projet */}
        <div className="space-y-3">
          <Label htmlFor="artistName" className="text-white font-medium flex items-center gap-2">
            <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
            Nom d'artiste / Projet
          </Label>
          <Input
            id="artistName"
            type="text"
            placeholder="Votre nom de scène"
            value={data.artistName || ""}
            onChange={(e) => handleInputChange("artistName", e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:ring-offset-0 h-12"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-3">
        <Label htmlFor="message" className="text-white font-medium flex items-center gap-2">
          <span className="w-1 h-4 bg-gray-500 rounded-full"></span>
          Message (optionnel)
        </Label>
        <Textarea
          id="message"
          placeholder="Parlez-nous de votre projet, vos attentes, vos questions..."
          value={data.message || ""}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 focus:ring-offset-0 min-h-[120px] resize-none"
          rows={5}
        />
      </div>

      {/* RGPD */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <p className="text-green-300 text-sm font-medium mb-1">
              Vos données sont protégées
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Nous utilisons vos informations uniquement pour vous recontacter concernant votre projet musical. 
              Vos données ne seront jamais partagées avec des tiers et vous pouvez les supprimer à tout moment.
            </p>
          </div>
        </div>
      </div>

      {/* Bouton d'envoi */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !data.name || !data.email}
          className="bg-red-500 hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isSubmitting ? 'Envoi en cours...' : '📩 Envoyer ma demande'}
        </button>
      </div>

      {/* Message de succès/erreur */}
      {submitStatus === 'success' && (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
          <p className="text-green-300 font-medium">
            ✅ Merci ! Nous avons bien reçu votre demande et vous recontacterons rapidement.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
          <p className="text-red-300 font-medium">
            ❌ Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.
          </p>
        </div>
      )}

      {/* Info contact */}
      <div className="text-center space-y-2">
        <p className="text-gray-300 text-sm">
          ⚡ <strong>Réponse sous 2h en moyenne</strong>
        </p>
        <p className="text-gray-400 text-xs">
          Ou appelez directement : <a href="tel:+33605885812" className="text-red-400 hover:text-red-300 transition-colors">06 05 88 58 12</a>
        </p>
      </div>
    </div>
  )
}