import NavBar from './navbar'
import HeroSection from './hero-section'

const LandingPage = () => {
  return (
    <div className="bg-slate-100 h-screen flex flex-col">
        <NavBar />
        <HeroSection />
    </div>
  )
}

export default LandingPage