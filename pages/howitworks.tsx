import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  MessageCircle, 
  DollarSign, 
  UserPlus, 
  Clock, 
  Package, 
  Users, 
  Map, 
  Wifi, 
  Star, 
  Gift, 
  CreditCard, 
  ShoppingCart,
  ArrowLeft
} from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const StepCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description: string;
    number: string;
  }> = ({ icon, title, description, number }) => (
    <div className="bg-green-50 p-8 rounded-xl border border-green-100 hover:bg-green-100 transition-colors shadow-sm">
      <div className="flex items-start space-x-4">
        <div className="bg-green-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
          {number}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-green-700">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-green-900">{title}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );

  const FeatureCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description: string;
  }> = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-xl border border-green-200 text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <div className="text-green-700">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-green-900 mb-4">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-green-50 py-6">
        <div className="container mx-auto px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 text-green-800 hover:text-green-900">
            <ArrowLeft className="w-6 h-6" />
            <span className="text-2xl font-bold">YahiPe</span>
          </Link>
          <Link 
            to="/login" 
            className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-900 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-8 text-center max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-8">
              How YahiPe Works
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your complete guide to connecting with local businesses and managing your shop digitally
            </p>
          </div>
        </section>

        {/* For Customers Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-900 mb-4">For Customers</h2>
              <p className="text-xl text-gray-600">Discover, connect, and engage with local businesses effortlessly</p>
            </div>
            
            <div className="space-y-8">
              <StepCard
                number="1"
                icon={<Search className="w-6 h-6" />}
                title="Discover Shops"
                description="Search or browse local shops by category, location, or keywords. Find exactly what you're looking for in your neighborhood with our smart search and filtering system."
              />
              
              <StepCard
                number="2"
                icon={<Eye className="w-6 h-6" />}
                title="Check Live Status"
                description="See which shops are open, which staff are available, and ongoing offers in real-time. Never waste a trip to a closed shop again with our live status updates."
              />
              
              <StepCard
                number="3"
                icon={<MessageCircle className="w-6 h-6" />}
                title="Interact & Book"
                description="Make inquiries, pre-book products or services, and leave reviews. Connect directly with shop owners and secure your preferred time slots in advance."
              />
              
              <StepCard
                number="4"
                icon={<DollarSign className="w-6 h-6" />}
                title="Transparent Pricing"
                description="View service and product prices in real-time with no hidden costs. Compare prices across different shops and make informed decisions before you visit."
              />
            </div>
          </div>
        </section>

        {/* For Shopkeepers Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-900 mb-4">For Shopkeepers</h2>
              <p className="text-xl text-gray-600">Go digital and grow your business with powerful, easy-to-use tools</p>
            </div>
            
            <div className="space-y-8">
              <StepCard
                number="1"
                icon={<UserPlus className="w-6 h-6" />}
                title="Easy Registration"
                description="Sign up with shop details, category, and contact info. Get your business online in minutes with our simple registration process designed for local entrepreneurs."
              />
              
              <StepCard
                number="2"
                icon={<Clock className="w-6 h-6" />}
                title="Manage Shop Status"
                description="Update open/close timings, holidays, and staff shifts in real-time. Keep your customers informed and reduce unnecessary visits during closed hours."
              />
              
              <StepCard
                number="3"
                icon={<Package className="w-6 h-6" />}
                title="Update Products & Services"
                description="Add products, services, and prices easily through our intuitive interface. Keep your offerings current and attract more customers with detailed listings."
              />
              
              <StepCard
                number="4"
                icon={<Users className="w-6 h-6" />}
                title="Engage Customers"
                description="Receive bookings, inquiries, and reviews directly through the platform. Build stronger relationships with your customers and grow through word-of-mouth."
              />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-900 mb-4">Key Features</h2>
              <p className="text-xl text-gray-600">Powerful tools that make local commerce simple and efficient</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Map className="w-8 h-8" />}
                title="Interactive Map"
                description="Visual map with color-coded markers for shop categories, making it easy to find what you need nearby."
              />
              
              <FeatureCard
                icon={<Wifi className="w-8 h-8" />}
                title="Real-Time Updates"
                description="Shop open/close status and staff availability updated instantly to keep everyone informed."
              />
              
              <FeatureCard
                icon={<Star className="w-8 h-8" />}
                title="Customer Interaction"
                description="Reviews, bookings, and pre-booking options that build trust and improve service quality."
              />
              
              <FeatureCard
                icon={<Gift className="w-8 h-8" />}
                title="Loyalty Points"
                description="Reward system that encourages repeat customers and builds long-term relationships."
              />
              
              <FeatureCard
                icon={<CreditCard className="w-8 h-8" />}
                title="Pay-Later System"
                description="Flexible payment options including credit and pay-later systems for customer convenience."
              />
              
              <FeatureCard
                icon={<ShoppingCart className="w-8 h-8" />}
                title="Small Online Orders"
                description="Enable customers to place small orders online for pickup, bridging physical and digital commerce."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-green-800">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Local Experience?
            </h2>
            <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
              Join thousands of customers and shop owners who are already part of the YahiPe community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-white text-green-800 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Start as Customer
              </Link>
              <Link 
                to="/login" 
                className="bg-green-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-green-600 transition-colors"
              >
                Register Your Shop
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorksPage;