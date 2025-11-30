function HeroSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Background Image/Video - Por ahora un gradiente como placeholder */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Logo placeholder */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-2">
            Ortomediq
          </h1>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>

        {/* Título principal */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Tu bienestar es nuestra prioridad
        </h2>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-3xl mx-auto">
          Especialistas en aparatos ortopédicos en Torreón, Coahuila
        </p>

        {/* Scroll indicator */}
        <div className="mb-8">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/productos"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg text-lg"
          >
            Ver Productos
          </a>
          <button 
            onClick={() => scrollToSection('contacto')}
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 text-lg"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

