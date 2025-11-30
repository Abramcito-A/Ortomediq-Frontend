import Navbar from '../components/Navbar'
import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import ProductosDestacados from '../components/home/ProductosDestacados'
import WhyChooseUs from '../components/home/WhyChooseUs'
import ContactSection from '../components/home/ContactSection'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar - Navegación principal */}
      <Navbar />

      {/* Hero Section - Imagen/video principal con CTA */}
      <HeroSection />

      {/* ¿Quiénes Somos? */}
      <AboutSection />

      {/* Productos Destacados */}
      <ProductosDestacados />

      {/* ¿Por qué elegirnos? */}
      <WhyChooseUs />

      {/* Ubicación y Contacto */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Botón flotante de WhatsApp */}
      <WhatsAppButton />
    </div>
  )
}

export default Home

