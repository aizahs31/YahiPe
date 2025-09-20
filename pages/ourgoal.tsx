import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  Users, 
  Smartphone, 
  TrendingUp, 
  Heart, 
  MapPin, 
  Clock, 
  Search,
  ArrowLeft,
  Target,
  Handshake,
  Leaf,
  DollarSign,
  Globe,
  Home,
  Eye
} from 'lucide-react';

const OurGoalPage: React.FC = () => {
  const GoalCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description: string;
    highlight?: boolean;
  }> = ({ icon, title, description, highlight = false }) => (
    <div className={`p-12 rounded-none text-center transition-all duration-300 ${
      highlight 
        ? 'bg-green-800 text-white hover:bg-green-900' 
        : 'bg-green-50 hover:bg-green-100 border border-green-100'
    }`}>
      <div className="flex justify-center mb-8">
        <div className={`p-4 rounded-full ${
          highlight 
            ? 'bg-white/20' 
            : 'bg-green-100'
        }`}>
          <div className={highlight ? 'text-white' : 'text-green-700'}>
            {icon}
          </div>
        </div>
      </div>
      <h3 className={`text-2xl font-bold mb-6 ${
        highlight ? 'text-white' : 'text-green-900'
      }`}>
        {title}
      </h3>
      <p className={`text-lg leading-relaxed ${
        highlight ? 'text-green-100' : 'text-gray-700'
      }`}>
        {description}
      </p>
    </div>
  );

  const ValueCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description: string;
  }> = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-none border border-green-200 text-center hover:shadow-lg transition-shadow">
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
            className="bg-green-800 text-white px-6 py-2 rounded-none hover:bg-green-900 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-8 text-center max-w-4xl">
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 p-6 rounded-full">
                <Target className="w-12 h-12 text-green-700" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-8">
              Our Goal
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Building bridges between local businesses and communities through technology that works for everyone
            </p>
          </div>
        </section>

        {/* Main Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-900 mb-8">
                Making Local Shops Visible, Connected & Thriving
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                At YahiPe, our goal is to make local shops visible, connected, and thriving in the digital world. 
                We want to help small businesses reach more customers, manage their daily operations easily, and stay competitive without needing complex technology.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <GoalCard
                icon={<Eye className="w-12 h-12" />}
                title="Visible"
                description="We make local shops discoverable through digital presence, ensuring every business in your neighborhood can be found when customers need them most."
              />
              
              <GoalCard
                icon={<Handshake className="w-12 h-12" />}
                title="Connected"
                description="We bridge the gap between shops and customers, creating meaningful relationships that go beyond simple transactions to build lasting community bonds."
                highlight={true}
              />
              
              <GoalCard
                icon={<TrendingUp className="w-12 h-12" />}
                title="Thriving"
                description="We provide tools and insights that help local businesses grow sustainably, compete effectively, and adapt to changing customer needs without technical complexity."
              />
            </div>
          </div>
        </section>

        {/* Customer Focus Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-900 mb-8">
                Bringing Your Neighborhood to Your Fingertips
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                For customers, we aim to bring the neighborhood to your fingertips — so you can quickly find what you need, 
                support local businesses, and discover services around you in real-time.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-green-50 p-12 rounded-none border border-green-100">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-green-700 p-3 rounded-full">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">Quick Discovery</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Find exactly what you need in your neighborhood within seconds, not hours of searching or calling around.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Real-time shop availability</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Service and product information</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Location-based recommendations</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-12 rounded-none border border-green-100">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-green-700 p-3 rounded-full">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">Community Support</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Every purchase you make through YahiPe directly supports local entrepreneurs and strengthens your community.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Support local entrepreneurs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Build community connections</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Discover hidden gems nearby</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-900 mb-8">
                Beyond an App: Building a Better Future
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                By doing this, we're not just building an app; we're strengthening local communities, 
                boosting the economy, and promoting responsible, sustainable shopping.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <ValueCard
                icon={<Users className="w-10 h-10" />}
                title="Strengthening Communities"
                description="We create connections between neighbors, fostering relationships that make communities more resilient and supportive."
              />
              
              <ValueCard
                icon={<DollarSign className="w-10 h-10" />}
                title="Boosting Local Economy"
                description="Every transaction through YahiPe keeps money in the local economy, creating jobs and supporting entrepreneurship."
              />
              
              <ValueCard
                icon={<Leaf className="w-10 h-10" />}
                title="Sustainable Shopping"
                description="By promoting local businesses, we reduce transportation needs and encourage environmentally responsible consumption patterns."
              />
            </div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-20 bg-green-800">
          <div className="container mx-auto px-8 text-center max-w-5xl">
            <div className="mb-12">
              <Globe className="w-16 h-16 text-white mx-auto mb-8" />
              <h2 className="text-4xl font-bold text-white mb-8">
                Our Vision for Tomorrow
              </h2>
              <p className="text-xl text-green-100 leading-relaxed">
                We envision a world where technology serves humanity by connecting communities, 
                empowering small businesses, and creating sustainable local economies that thrive in harmony with digital innovation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <div className="text-left">
                <Home className="w-8 h-8 text-green-300 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">For Communities</h3>
                <p className="text-green-100 leading-relaxed">
                  Neighborhoods where residents know their local businesses, support grows organically, 
                  and digital tools enhance rather than replace human connections.
                </p>
              </div>
              
              <div className="text-left">
                <Store className="w-8 h-8 text-green-300 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">For Businesses</h3>
                <p className="text-green-100 leading-relaxed">
                  A future where every local entrepreneur has access to digital tools that help them compete, 
                  grow, and serve their community more effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-green-900 mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Be part of the movement that's transforming how communities connect, shop, and thrive together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-green-800 text-white px-8 py-4 rounded-none text-lg font-medium hover:bg-green-900 transition-colors"
              >
                Start Your Journey
              </Link>
              <Link 
                to="/how-it-works" 
                className="bg-white text-green-800 border-2 border-green-800 px-8 py-4 rounded-none text-lg font-medium hover:bg-green-50 transition-colors"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-8 text-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-green-200 transition-colors">
            YahiPe
          </Link>
          <p className="mt-4 text-green-200">Connecting communities, one service at a time.</p>
          <p className="mt-6 text-green-300 text-sm">&copy; 2024 YahiPe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OurGoalPage;