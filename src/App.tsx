import ContentCards from './components/sections/ContentCards';
import Footer from './components/sections/Footer';
import Hero from './components/sections/Hero';
// import MarqueeDemo from './components/sections/Marquee';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Profile from './components/ui/ProfileSimple';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Profile />
        <ContentCards />
        <Projects />
        {/* <MarqueeDemo /> */}
        <Timeline />
      </div>

      {/* <CallToAction /> */}

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App


