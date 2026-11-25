import SmoothScrollProvider from '../components/SmoothScrollProvider';
import Nav from '../components/Nav';
import Hero from '../sections/Hero';
import StackBand from '../sections/StackBand';
import Manifesto from '../sections/Manifesto';
import Capabilities from '../sections/Capabilities';
import CreativeLab from '../sections/CreativeLab';
import Process from '../sections/Process';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main>
        <Hero />
        <StackBand />
        <Manifesto />
        <Capabilities />
        <CreativeLab />
        <Process />
      </main>
      <Contact />
    </SmoothScrollProvider>
  );
}
