import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import HeroBanner from '../components/HeroBanner';
import DealsSection from '../components/DealsSection';
import HomeOutdoorSection from '../components/HomeOutdoorSection';
import ConsumerElectronicsSection from '../components/ConsumerElectronicsSection';
import SupplierSection from '../components/SupplierSection';
import RecommendedItems from '../components/RecommendedItems';
import ExtraServices from '../components/ExtraServices';
import SuppliersByRegion from '../components/SuppliersByRegion';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

// Import all styles
import '../styles/navbar.css';
import '../styles/hero.css';
import '../styles/sections.css';
import '../styles/responsive.css';
import '../styles/cards.css';
import '../styles/footer.css';

// Future: cartCount and user will come from Context (CartContext, AuthContext)
function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Desktop nav */}
      <Navbar />
      {/* Mobile nav */}
      <MobileNavbar />

      <main>
        <HeroBanner />
        <DealsSection />
        <HomeOutdoorSection />
        <ConsumerElectronicsSection />
        <SupplierSection />
        <RecommendedItems />
        <ExtraServices />
        <SuppliersByRegion />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default Home;