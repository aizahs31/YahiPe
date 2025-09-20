import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Eye, Store, Users, UserCog, DollarSign, Home, HeartHandshake, Map as MapIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-green-50 p-12 rounded-none text-center transform hover:bg-green-100 transition-colors border border-green-100">
      <div className="flex justify-center mb-8">{icon}</div>
      <h3 className="text-2xl font-bold mb-6 text-green-900">{title}</h3>
      <p className="text-gray-700 text-lg leading-relaxed">{children}</p>
    </div>
  );

  return (
    <div className="bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-32 md:py-48 bg-white">
          <div className="container mx-auto px-8 text-center max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-bold text-green-900 leading-tight mb-8">
              Your Neighborhood, <br /><span className="text-green-700">At Your Fingertips.</span>
            </h1>
            <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-16">
              Discover and connect with local shops and service providers right in your area. YahiPe makes local easy.
            </p>
            <Link to="/login" className="inline-block bg-green-800 text-white px-12 py-4 rounded-none text-xl font-medium hover:bg-green-900 transition-colors">
              Get Started
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 bg-gray-50">
          <div className="container mx-auto px-8 max-w-7xl">
            <h2 className="text-4xl font-bold text-center text-green-900 mb-20">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-16 text-center">
              <div className="flex flex-col items-center space-y-8">
                <div className="bg-green-800 p-8 rounded-full">
                  <MapIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">1. Discover Local Shops</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm">Use our map to find services near you, from salons to repair shops.</p>
              </div>
              <div className="flex flex-col items-center space-y-8">
                <div className="bg-green-800 p-8 rounded-full">
                  <Eye className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">2. View Details</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm">Check shop status, services, prices, and available staff instantly.</p>
              </div>
              <div className="flex flex-col items-center space-y-8">
                <div className="bg-green-800 p-8 rounded-full">
                  <Store className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">3. Connect & Transact</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm">Directly connect with the shop to avail services. Simple and fast.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-32 bg-white">
          <div className="container mx-auto px-8 max-w-7xl">
            <h2 className="text-4xl font-bold text-center text-green-900 mb-20">Why Choose YahiPe?</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <FeatureCard icon={<Users className="w-16 h-16 text-green-700" />} title="For Customers">
                Find exactly what you need, when you need it. Save time, support local businesses, and enjoy the convenience of a connected neighborhood.
              </FeatureCard>
              <FeatureCard icon={<UserCog className="w-16 h-16 text-green-700" />} title="For Shopkeepers">
                Go digital effortlessly. Manage your shop, track your performance, and reach more local customers without any technical hassle.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* UN SDGs Section */}
        <section id="sdgs" className="py-32 bg-gray-50">
          <div className="container mx-auto px-8 text-center max-w-7xl">
            <h2 className="text-4xl font-bold text-green-900 mb-8">Our Commitment to a Better Future</h2>
            <p className="text-gray-600 mb-20 max-w-4xl mx-auto text-xl leading-relaxed">
              We're passionate about more than just business. We're aligned with the UN Sustainable Development Goals to create a positive impact.
            </p>
            <div className="grid md:grid-cols-3 gap-16">
                <FeatureCard icon={<DollarSign className="w-16 h-16 text-green-700" />} title="Goal 8: Decent Work & Economic Growth">
                    By empowering local entrepreneurs, we help create sustainable livelihoods and boost local economies.
                </FeatureCard>
                <FeatureCard icon={<Home className="w-16 h-16 text-green-700" />} title="Goal 11: Sustainable Cities & Communities">
                    We strengthen local communities by making them more self-sufficient and reducing the need for long-distance travel for basic services.
                </FeatureCard>
                 <FeatureCard icon={<HeartHandshake className="w-16 h-16 text-green-700" />} title="Goal 10: Reduced Inequalities">
                    Our easy-to-use platform provides digital access to small business owners, bridging the technology gap.
                </FeatureCard>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
