import React from 'react';
import { Phone } from 'lucide-react';

const Footer: React.FC = () => (
  <footer id="contact" className="bg-green-900 text-white py-20">
    <div className="container mx-auto px-8 text-center max-w-2xl">
      <h3 className="text-3xl font-bold mb-6">YahiPe</h3>
      <p className="mb-8 text-green-100 text-lg">Connecting communities, one service at a time.</p>
      <div className="flex justify-center items-center space-x-4 mb-12">
        <Phone className="w-6 h-6 text-green-300" />
        <span className="text-green-100 text-lg">+91 12345 67890</span>
      </div>
      <div className="border-t border-green-700 pt-8">
        <p className="text-green-300">&copy; 2024 YahiPe. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
