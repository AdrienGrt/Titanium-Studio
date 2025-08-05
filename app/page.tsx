import { SimulatorWizard } from "@/components/simulator-wizard"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background avec effet studio */}
      <div className="absolute inset-0 bg-black">
        {/* Gradient subtil rouge */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />
        
        {/* Pattern de grille pour effet studio */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(0deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[size:50px_50px]" />
        </div>
        
        {/* Effet de lumière rouge animé */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-400 text-sm font-medium">Studio Professionnel</span>
          </div>

          {/* Titre principal avec effet */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              <span className="block">TITANIUM STUDIO</span>
              <span className="block text-3xl md:text-5xl bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                
              </span>
            </h1>
            
            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez les offres parfaites pour votre projet musical
            </p>
            
            {/* Description supplémentaire */}
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              Simulez votre séance, calculez votre budget et réservez votre temps studio en quelques clics
            </p>
          </div>

          {/* Stats ou features */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Mixage Pro</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Enregistrement HD</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Disponible 7j/7</span>
            </div>
          </div>
        </div>

        {/* Wizard avec effet de carte */}
        <div className="relative">
          {/* Glow effect derrière la carte */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-600/20 blur-3xl opacity-50" />
          
          {/* Card container avec bordure rouge subtile */}
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-1">
            <div className="bg-gradient-to-br from-gray-950/90 to-black/90 rounded-xl">
              <SimulatorWizard />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Besoin d'aide ? Contactez-nous au{" "}
            <a href="tel:+33123456789" className="text-red-400 hover:text-red-300 transition-colors">
              01 23 45 67 89
            </a>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
    </div>
  )
}