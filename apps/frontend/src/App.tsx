import NavBar from './components/navbar.tsx';
import HeroSection from './components/hero-section.tsx';

const App = () => {
  return (
    <>
      <div className="bg-slate-100 h-screen flex flex-col">
          <NavBar />
          <HeroSection />
      </div>
    </>
  );
};

export default App;
