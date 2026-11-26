import SmoothScrollProvider from '../components/SmoothScrollProvider';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ContactSection from '../sections/Contact';

// The contact page: the project form, plus email, phone, WhatsApp and profiles.
export default function Contact() {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main id="top">
        <ContactSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
