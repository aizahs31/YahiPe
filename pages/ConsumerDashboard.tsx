import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConsumerMap from '../components/ConsumerMap';
import { Shop } from '../types';
import { SHOPS } from '@/data';

interface Appointment {
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
}

const ConsumerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [shops, setShops] = useState<Shop[]>(SHOPS);
  const [filteredShops, setFilteredShops] = useState<Shop[]>(SHOPS);
  const [category, setCategory] = useState('All');
  const [openNow, setOpenNow] = useState(false);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const categories = ['All', ...Array.from(new Set(shops.map(s => s.category)))];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    let result = shops;
    if (category !== 'All') result = result.filter(s => s.category === category);
    if (openNow) result = result.filter(s => s.isOpen);
    setFilteredShops(result);
  }, [category, openNow, shops]);

  const handleBookAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const serviceId = (form.elements.namedItem('service') as HTMLSelectElement).value;
    const staffId = (form.elements.namedItem('staff') as HTMLSelectElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const time = (form.elements.namedItem('time') as HTMLInputElement).value;

    const newAppointment: Appointment = { serviceId, staffId, date, time };
    setAppointments([...appointments, newAppointment]);
    alert('Appointment booked successfully!');
    form.reset();
    setSelectedShop(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white p-4 space-y-6 flex flex-col shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-green-800">YahiPe</h1>
          <p className="text-sm text-gray-600">Welcome, {user?.name}!</p>
        </div>

        <div className="flex-grow space-y-4">
          <h2 className="font-semibold text-gray-800">Filters</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center">
            <input
              id="open-now"
              type="checkbox"
              checked={openNow}
              onChange={e => setOpenNow(e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="open-now" className="ml-2 block text-sm text-gray-900">Open Now</label>
          </div>

          <div className="flex items-center space-x-2 bg-gray-200 rounded-md p-1">
            <button
              onClick={() => setView('map')}
              className={`w-full py-1 rounded-md text-sm font-medium ${view === 'map' ? 'bg-white shadow' : 'text-gray-600'}`}
            >
              Map View
            </button>
            <button
              onClick={() => setView('list')}
              className={`w-full py-1 rounded-md text-sm font-medium ${view === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}
            >
              List View
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 h-screen overflow-y-auto">
        {view === 'map' ? (
          <div className="h-full w-full rounded-lg overflow-hidden">
            <ConsumerMap shops={filteredShops} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map(shop => (
              <div
                key={shop.id}
                className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition-shadow"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{shop.name}</h3>
                  <p className="text-sm text-gray-500">{shop.category}</p>
                  <p className={`mt-1 text-sm font-semibold ${shop.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    {shop.isOpen ? 'Open' : 'Closed'}
                  </p>
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                  <button
                    onClick={() => setSelectedShop(shop)}
                    className="bg-green-800 text-white py-2 rounded-md hover:bg-green-900 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Shop Details & Booking */}
        {selectedShop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedShop(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{selectedShop.name}</h2>
              <p className="text-gray-500 mt-1">{selectedShop.category}</p>
              <p className="text-gray-600 mt-2"><span className="font-semibold">Address:</span> {selectedShop.address}</p>
              <p className={`mt-1 font-semibold ${selectedShop.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                {selectedShop.isOpen ? 'Open Now' : 'Closed'}
              </p>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Services</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedShop.services.map(service => (
                    <li key={service.id}>
                      {service.name} - ₹{service.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Staff</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedShop.staff.map(member => (
                    <li key={member.id}>{member.name} ({member.shift})</li>
                  ))}
                </ul>
              </div>

              {/* Book Appointment Form */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Book Appointment</h3>
                <form onSubmit={handleBookAppointment} className="space-y-3">
                  <select
                    name="service"
                    className="w-full border p-2 rounded-md"
                    required
                  >
                    <option value="">Select Service</option>
                    {selectedShop.services.map(s => (
                      <option key={s.id} value={s.id}>{s.name} - ₹{s.price}</option>
                    ))}
                  </select>

                  <select
                    name="staff"
                    className="w-full border p-2 rounded-md"
                    required
                  >
                    <option value="">Select Staff</option>
                    {selectedShop.staff.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.shift})</option>
                    ))}
                  </select>

                  <input
                    type="date"
                    name="date"
                    className="w-full border p-2 rounded-md"
                    required
                  />

                  <input
                    type="time"
                    name="time"
                    className="w-full border p-2 rounded-md"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-900 transition-colors"
                  >
                    Book Appointment
                  </button>
                </form>
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={() => setSelectedShop(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConsumerDashboard;
