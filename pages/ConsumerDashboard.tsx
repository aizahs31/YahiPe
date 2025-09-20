import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConsumerMap from '../components/ConsumerMap';
import { Shop} from '../types';
import { SHOPS } from '@/data';


const ConsumerDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [shops, setShops] = useState<Shop[]>(SHOPS);
    const [filteredShops, setFilteredShops] = useState<Shop[]>(SHOPS);
    const [category, setCategory] = useState('All');
    const [openNow, setOpenNow] = useState(false);
    const [view, setView] = useState<'map' | 'list'>('map');

    const categories = ['All', ...Array.from(new Set(shops.map(s => s.category)))];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        let result = shops;
        if(category !== 'All') {
            result = result.filter(s => s.category === category);
        }
        if(openNow) {
            result = result.filter(s => s.isOpen);
        }
        setFilteredShops(result);
    }, [category, openNow, shops]);

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-full md:w-80 bg-white p-4 space-y-6 flex flex-col shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold text-green-800">YahiPe</h1>
                    <p className="text-sm text-gray-600">Welcome, {user?.name}!</p>
                </div>
                
                <div className="flex-grow space-y-4">
                    <h2 className="font-semibold text-gray-800">Filters</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                           {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input id="open-now" type="checkbox" checked={openNow} onChange={e => setOpenNow(e.target.checked)} className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <label htmlFor="open-now" className="ml-2 block text-sm text-gray-900">Open Now</label>
                    </div>

                    <div className="flex items-center space-x-2 bg-gray-200 rounded-md p-1">
                        <button onClick={() => setView('map')} className={`w-full py-1 rounded-md text-sm font-medium ${view === 'map' ? 'bg-white shadow' : 'text-gray-600'}`}>Map View</button>
                        <button onClick={() => setView('list')} className={`w-full py-1 rounded-md text-sm font-medium ${view === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}>List View</button>
                    </div>
                </div>

                <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">Logout</button>
            </aside>
            <main className="flex-1 p-4 h-screen">
                {view === 'map' ? (
                     <div className="h-full w-full rounded-lg overflow-hidden">
                        <ConsumerMap shops={filteredShops} />
                     </div>
                ) : (
                    <div className="h-full overflow-y-auto space-y-4">
                        {filteredShops.map(shop => (
                             <div key={shop.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{shop.name}</h3>
                                    <p className="text-sm text-gray-600">{shop.category}</p>
                                    <p className={`text-sm font-semibold ${shop.isOpen ? 'text-green-600' : 'text-red-600'}`}>{shop.isOpen ? 'Open' : 'Closed'}</p>
                                </div>
                                <button className="bg-green-800 text-white px-4 py-2 rounded-md text-sm hover:bg-green-900">View Details</button>
                             </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ConsumerDashboard;
