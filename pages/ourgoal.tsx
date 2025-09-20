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
    <div className={`p-10 rounded-2xl text-center transition-all duration-300 ${
      highlight 
        ? 'bg-green-800 text-white hover:bg-green-900' 
        : 'bg-green-50 hover:bg-green-100 border border-green-200'
    }`}>
      <div className="flex justify-center mb-6">
        <div className={`p-4 rounded-full ${
          highlight ? 'bg-white/20' : 'bg-green-100'
        }`}>
          <div className={highlight ? 'text-white' : 'text-green-700'}>
            {icon}
          </div>
        </div>
      </div>
      <h3 className={`text-2xl font-bold mb-4 ${highlight ? 'text-white' : 'text-green-900'}`}>
        {title}
      </h3>
      <p className={`text-lg leading-relaxed ${highlight ? 'text-green-100' : 'text-gray-700'}`}>
        {description}
      </p>
    </div>
  );

  const ValueCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description: string;
  }> = ({ icon, title, description }) => (
    <div className="bg-white p-10 rounded-2xl border border-green-200 text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <div className="text-green-700">
            {icon}
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-green-900 mb-3">{title}</h3>
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
            className="bg-green-800 text-white px-6 py-2 rounded-xl hover:bg-green-900 transition-colors"
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
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">
              Our Goal
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Building bridges between local businesses and communities through technology that works for everyone
            </p>
          </div>
        </section>

        {/* Main Mission */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-900 mb-6">
                Making Local Shops Visible, Connected & Thriving
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                At YahiPe, our goal is to make local shops visible, connected, and thriving in the digital world. 
                We help small businesses reach more customers, manage daily operations, and grow without complex tech.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <GoalCard
                icon={<Eye className="w-12 h-12" />}
                title="Visible"
                description="We make local shops discoverable online, ensuring customers can easily find them in their neighborhood."
              />
              <GoalCard
                icon={<Handshake className="w-12 h-12" />}
                title="Connected"
                description="We bridge the gap between shops and customers, fostering lasting community relationships."
                highlight={true}
              />
              <GoalCard
                icon={<TrendingUp className="w-12 h-12" />}
                title="Thriving"
                description="We give businesses tools to grow sustainably, adapt, and compete effectively."
              />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-900 mb-6">
                Beyond an App: Building a Better Future
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                We're not just building an app — we’re strengthening local communities, boosting the economy, and promoting sustainable shopping.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <ValueCard
                icon={<Users className="w-10 h-10" />}
                title="Strengthening Communities"
                description="Creating meaningful neighbor-to-shop connections that build resilience."
              />
              <ValueCard
                icon={<DollarSign className="w-10 h-10" />}
                title="Boosting Local Economy"
                description="Keeping money in the community by supporting small businesses."
              />
              <ValueCard
                icon={<Leaf className="w-10 h-10" />}
                title="Sustainable Shopping"
                description="Encouraging eco-friendly consumption by shopping locally."
              />
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 bg-green-800">
          <div className="container mx-auto px-8 text-center max-w-5xl">
            <Globe className="w-16 h-16 text-white mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Our Vision for Tomorrow
            </h2>
            <p className="text-xl text-green-100 max-w-4xl mx-auto">
              A world where technology connects communities, empowers small businesses, and creates sustainable local economies.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-green-900 mb-4">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Be part of the movement that's transforming how communities connect, shop, and thrive together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-green-800 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-green-900 transition-colors"
              >
                Start Your Journey
              </Link>
              <Link 
                to="/how-it-works" 
                className="bg-white text-green-800 border-2 border-green-800 px-8 py-4 rounded-xl text-lg font-medium hover:bg-green-50 transition-colors"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurGoalPage;