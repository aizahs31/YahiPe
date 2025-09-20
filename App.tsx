import React, { useState, useContext, createContext, useMemo, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { USERS, SHOPS } from './data';
import { User, UserRole, Shop, Service } from './types';
import ConsumerMap from './components/ConsumerMap';
import { getBusinessInsights } from './services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Map, Users, Store, BarChart2, DollarSign, LogIn, Phone, Home, BrainCircuit, HeartHandshake, Leaf, UserCog, Menu, X, List, Eye } from 'lucide-react';
import HowItWorksPage from './pages/howitworks';
import OurGoalPage from './pages/ourgoal';


// --- AUTH CONTEXT --- //
interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, pass: string) => {
    const foundUser = USERS.find(u => u.email === email && u.password === pass);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- PROTECTED ROUTE --- //
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Link to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

// --- HEADER --- //
const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-green-50">
            <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold text-green-800">YahiPe</Link>
                <div className="hidden md:flex items-center space-x-12">
                    <Link to="/howitworks" className="text-gray-700 hover:text-green-700 font-medium transition-colors">How it Works</Link>
                    <Link to="/ourgoal" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Our goal</Link>
                    {/* <a href="#sdgs" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Our Goal</a> */}
                    <a href="#contact" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Contact</a>
                    <Link to="/login" className="bg-green-800 text-white px-8 py-3 rounded-none hover:bg-green-900 transition-colors font-medium">Login / Sign Up</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6 text-green-800" /> : <Menu className="w-6 h-6 text-green-800" />}
                    </button>
                </div>
            </nav>
            {isOpen && (
                <div className="md:hidden px-8 pt-4 pb-6 space-y-4 bg-white border-t border-green-50">
                    <a href="#how-it-works" className="block text-gray-700 hover:text-green-700 font-medium">How it Works</a>
                    <a href="#benefits" className="block text-gray-700 hover:text-green-700 font-medium">Benefits</a>
                    <a href="#sdgs" className="block text-gray-700 hover:text-green-700 font-medium">Our Goal</a>
                    <a href="#contact" className="block text-gray-700 hover:text-green-700 font-medium">Contact</a>
                    <Link to="/login" className="block w-full text-center bg-green-800 text-white px-8 py-3 rounded-none hover:bg-green-900 transition-colors font-medium">Login / Sign Up</Link>
                </div>
            )}
        </header>
    );
};

// --- FOOTER --- //
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

// --- LANDING PAGE --- //
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
                  <Map className="w-12 h-12 text-white" />
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
      <Footer />
    </div>
  );
};

// --- LOGIN PAGE --- //
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const loggedIn = login(email, password);
        if (loggedIn) {
            const user = USERS.find(u => u.email === email);
            if (user?.role === UserRole.CONSUMER) {
                navigate('/dashboard/consumer');
            } else if (user?.role === UserRole.SHOPKEEPER) {
                navigate('/dashboard/shopkeeper');
            }
        } else {
            setError('Invalid email or password.');
        }
    };
    
    const setCredentials = (role: 'consumer' | 'shopkeeper') => {
        const user = USERS.find(u => u.role === role);
        if (user) {
            setEmail(user.email);
            setPassword(user.password || '');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            <Link to="/" className="text-3xl font-bold text-green-800 mb-8">YahiPe</Link>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input 
                            type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input 
                            type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-900 transition-colors">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>Use dummy credentials:</p>
                    <div className="flex justify-center gap-2 mt-2">
                        <button onClick={() => setCredentials('consumer')} className="text-green-800 hover:underline">Consumer</button>
                        <span>|</span>
                        <button onClick={() => setCredentials('shopkeeper')} className="text-green-800 hover:underline">Shopkeeper</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- CONSUMER DASHBOARD --- //
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

// --- SHOPKEEPER DASHBOARD --- //
const ShopkeeperDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [shop, setShop] = useState<Shop | null>(SHOPS.find(s => s.id === user?.shopId) || null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [insights, setInsights] = useState('');
    const [isLoadingInsights, setIsLoadingInsights] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleShopStatus = () => {
        if (shop) {
            setShop({ ...shop, isOpen: !shop.isOpen });
        }
    };
    
    const fetchInsights = useCallback(async () => {
        if(!shop) return;
        setIsLoadingInsights(true);
        setInsights('');
        const result = await getBusinessInsights(shop);
        setInsights(result);
        setIsLoadingInsights(false);
    }, [shop]);

    if (!shop) return <div>Loading shop data...</div>;

    const salesByDay = shop.sales.reduce((acc, sale) => {
        const day = new Date(sale.date).toLocaleDateString('en-US', { weekday: 'short' });
        acc[day] = (acc[day] || 0) + sale.amount;
        return acc;
    }, {} as Record<string, number>);
    const chartData = Object.entries(salesByDay).map(([name, sales]) => ({ name, sales }));

    const salesByService = shop.sales.reduce((acc, sale) => {
        const serviceName = shop.services.find(s => s.id === sale.serviceId)?.name || 'Unknown';
        acc[serviceName] = (acc[serviceName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const serviceChartData = Object.entries(salesByService).map(([name, count]) => ({ name, count }));

    const TabButton: React.FC<{ tabName: string, icon: React.ReactNode, children: React.ReactNode }> = ({ tabName, icon, children }) => (
        <button onClick={() => setActiveTab(tabName)} className={`flex items-center space-x-3 p-3 rounded-md w-full text-left ${activeTab === tabName ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            {icon}<span>{children}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white p-4 space-y-4 flex-col hidden md:flex">
                <h1 className="text-2xl font-bold text-green-800 px-2">YahiPe</h1>
                <nav className="flex-grow space-y-2">
                    <TabButton tabName="dashboard" icon={<BarChart2 className="w-5 h-5"/>}>Dashboard</TabButton>
                    <TabButton tabName="services" icon={<List className="w-5 h-5"/>}>Services</TabButton>
                    <TabButton tabName="staff" icon={<Users className="w-5 h-5"/>}>Staff</TabButton>
                    <TabButton tabName="insights" icon={<BrainCircuit className="w-5 h-5"/>}>AI Insights</TabButton>
                </nav>
                <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">Logout</button>
            </aside>
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Hello, {user?.name}!</h2>
                        <p className="text-gray-600">Here's what's happening at {shop.name} today.</p>
                    </div>
                     <div className="items-center hidden md:flex">
                        <span className="mr-3 text-gray-700 font-medium">Shop Status:</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={shop.isOpen} onChange={toggleShopStatus} className="sr-only peer" />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900">{shop.isOpen ? 'Open' : 'Closed'}</span>
                        </label>
                    </div>
                </div>

                {/* Mobile Tab Navigation */}
                <div className="md:hidden border-b border-gray-200 mb-4">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        {['dashboard', 'services', 'staff', 'insights'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`capitalize shrink-0 px-3 py-2 font-medium text-sm rounded-t-lg ${activeTab === tab ? 'border-b-2 border-green-500 text-green-600' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'}`}>
                            {tab}
                        </button>
                        ))}
                    </nav>
                </div>

                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-lg shadow">
                            <span className="text-gray-700 font-medium">Shop Status:</span>
                            <button onClick={toggleShopStatus} className={`px-4 py-2 rounded-full text-white font-bold ${shop.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                                {shop.isOpen ? 'Open' : 'Closed'}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-500">Today's Sales</h3><p className="text-3xl font-bold text-gray-800">₹{shop.sales.filter(s => s.date === '2023-10-07').reduce((acc, s) => acc + s.amount, 0)}</p></div>
                            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-500">Services Sold Today</h3><p className="text-3xl font-bold text-gray-800">{shop.sales.filter(s => s.date === '2023-10-07').length}</p></div>
                            <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-500">Active Staff</h3><p className="text-3xl font-bold text-gray-800">{shop.staff.length}</p></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="font-semibold mb-4">Weekly Sales</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={chartData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Legend/><Line type="monotone" dataKey="sales" stroke="#166534" strokeWidth={2}/></LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="font-semibold mb-4">Popular Services</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={serviceChartData} layout="vertical"><CartesianGrid strokeDasharray="3 3"/><XAxis type="number"/><YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}}/><Tooltip/><Legend/><Bar dataKey="count" fill="#15803d"/></BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                     <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4">Manage Services</h3>
                        <div className="space-y-3">
                            {shop.services.map(service => (
                                <div key={service.id} className="flex justify-between items-center p-3 border rounded-md">
                                    <p className="text-gray-800">{service.name}</p>
                                    <p className="font-semibold text-gray-600">₹{service.price}</p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900">Add New Service</button>
                    </div>
                )}
                
                {activeTab === 'staff' && (
                     <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4">Manage Staff</h3>
                         <div className="space-y-3">
                            {shop.staff.map(member => (
                                <div key={member.id} className="flex justify-between items-center p-3 border rounded-md">
                                    <p className="text-gray-800">{member.name}</p>
                                    <p className="font-semibold text-gray-600">{member.shift}</p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900">Add New Staff</button>
                    </div>
                )}

                {activeTab === 'insights' && (
                     <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4 flex items-center"><BrainCircuit className="w-6 h-6 mr-2 text-green-800"/>AI-Powered Business Insights</h3>
                        <p className="text-gray-600 mb-4">Get personalized suggestions to grow your business based on your sales data.</p>
                        <button onClick={fetchInsights} disabled={isLoadingInsights} className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 disabled:bg-green-300">
                           {isLoadingInsights ? 'Thinking...' : 'Get Suggestions'}
                        </button>
                        {isLoadingInsights && <p className="mt-4 text-gray-600">Our AI is analyzing your data. This might take a moment...</p>}
                        {insights && (
                            <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
                                <h4 className="font-semibold text-gray-800 mb-2">Here are some ideas for you:</h4>
                                <div className="whitespace-pre-wrap text-gray-700 space-y-2">
                                    {insights.split('\n').map((line, i) => line.trim() && <p key={i}>{line}</p>)}
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </main>
        </div>
    );
};

// --- APP --- //
export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
       <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/howitworks" element={<HowItWorksPage />} />
  <Route path="/ourgoal" element={<OurGoalPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route 
    path="/dashboard/consumer" 
    element={<ProtectedRoute><ConsumerDashboard /></ProtectedRoute>} 
  />
  <Route 
    path="/dashboard/shopkeeper" 
    element={<ProtectedRoute><ShopkeeperDashboard /></ProtectedRoute>} 
  />
  {/* Optional: fallback 404 page */}
  <Route path="*" element={<LandingPage />} />
</Routes>

      </HashRouter>
    </AuthProvider>
  );
}
