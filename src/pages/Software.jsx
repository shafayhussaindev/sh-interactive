import SmoothScrollProvider from '../components/SmoothScrollProvider';
import Nav from '../components/Nav';
import Contact from '../sections/Contact';
import ChaosHero from '../sections/software/ChaosHero';
import StoryScroll from '../sections/software/StoryScroll';
import SoftwareBento from '../sections/software/SoftwareBento';

// Scrollytelling: the chaos of paper registers, one system morphing through three jobs, then the four offers.
export default function Software() {
  return (
    <SmoothScrollProvider>
      <div className="software-theme">
        <Nav />
        <main>
          <ChaosHero />
          <StoryScroll />
          <SoftwareBento />
        </main>
        <Contact />
      </div>
    </SmoothScrollProvider>
  );
}
