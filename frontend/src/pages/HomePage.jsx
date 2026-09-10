import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Gallery />
        <Reviews />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
