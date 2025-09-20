import React, { useState, useCallback } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { getBusinessInsights } from "../services/geminiService";
import { SHOPS } from "../data";
import { Shop } from "../types";
import { FaCut, FaSpa, FaPaintBrush, FaUserTie } from "react-icons/fa";
import { GiRazor, GiFamas } from "react-icons/gi";
import { X } from "lucide-react"; // For popup close button
// Removed duplicate import of React and useState

// Service logos mapping
const serviceLogos: Record<string, React.ReactNode> = {
  Haircut: <FaCut size={32} color="#15803d" />,
  Shaving: <GiRazor size={32} color="#15803d" />,
  Spa: <FaSpa size={32} color="#15803d" />,
  Makeup: <FaPaintBrush size={32} color="#15803d" />,
  Massage: <FaSpa size={32} color="#15803d" />,
  Facial: <GiFamas size={32} color="#15803d" />,
  Default: <FaUserTie size={32} color="#15803d" />,
};
import { BarChart2, List, Users, BrainCircuit } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

const ShopkeeperDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [shop, setShop] = useState<Shop | null>(
    SHOPS.find((s) => s.id === user?.shopId) || null
  );
  const [activeTab, setActiveTab] = useState("dashboard");
  const [insights, setInsights] = useState("");
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [selectedService, setSelectedService] = useState<Shop["services"][number] | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleShopStatus = () => {
    if (shop) {
      setShop({ ...shop, isOpen: !shop.isOpen });
    }
  };

  const fetchInsights = useCallback(async () => {
    if (!shop) return;
    setIsLoadingInsights(true);
    setInsights("");
    const result = await getBusinessInsights(shop);
    setInsights(result);
    setIsLoadingInsights(false);
  }, [shop]);

  if (!shop) return <div>Loading shop data...</div>;

  const today = new Date().toISOString().split("T")[0];

  const salesByDay = shop.sales.reduce((acc, sale) => {
    const day = new Date(sale.date).toLocaleDateString("en-US", {
      weekday: "short",
    });
    acc[day] = (acc[day] || 0) + sale.amount;
    return acc;
  }, {} as Record<string, number>);
  const chartData = Object.entries(salesByDay).map(([name, sales]) => ({
    name,
    sales,
  }));

  const salesByService = shop.sales.reduce((acc, sale) => {
    const serviceName =
      shop.services.find((s) => s.id === sale.serviceId)?.name || "Unknown";
    acc[serviceName] = (acc[serviceName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const serviceChartData = Object.entries(salesByService).map(
    ([name, count]) => ({ name, count })
  );

  const TabButton: React.FC<{
    tabName: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ tabName, icon, children }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left font-medium transition-all ${
        activeTab === tabName
          ? "bg-green-100 text-green-700 shadow-sm"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 space-y-5 flex-col hidden md:flex shadow-md">
        <h1 className="text-3xl font-extrabold text-green-800 px-2">YahiPe</h1>
        <nav className="flex-grow space-y-2">
          <TabButton tabName="dashboard" icon={<BarChart2 className="w-5 h-5" />}>
            Dashboard
          </TabButton>
          <TabButton tabName="services" icon={<List className="w-5 h-5" />}>
            Services
          </TabButton>
          <TabButton tabName="staff" icon={<Users className="w-5 h-5" />}>
            Staff
          </TabButton>
          <TabButton tabName="insights" icon={<BrainCircuit className="w-5 h-5" />}>
            AI Insights
          </TabButton>
        </nav>
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:shadow-md hover:scale-[1.02] transition-all"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Hello, {user?.name}!
            </h2>
            <p className="text-gray-600">
              Here's what's happening at {shop.name} today.
            </p>
          </div>
          <div className="items-center hidden md:flex">
            <span className="mr-3 text-gray-700 font-medium">Shop Status:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={shop.isOpen}
                onChange={toggleShopStatus}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {shop.isOpen ? "Open" : "Closed"}
              </span>
            </label>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden border-b border-gray-200 mb-4">
          <nav className="flex space-x-4" aria-label="Tabs">
            {["dashboard", "services", "staff", "insights"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize shrink-0 px-3 py-2 font-medium text-sm rounded-t-lg transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-green-500 text-green-600"
                    : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <h3 className="text-gray-500">Today's Sales</h3>
                <p className="text-4xl font-extrabold text-green-800">
                  ₹
                  {shop.sales
                    .filter((s) => s.date === today)
                    .reduce((acc, s) => acc + s.amount, 0)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <h3 className="text-gray-500">Services Sold Today</h3>
                <p className="text-4xl font-extrabold text-green-800">
                  {shop.sales.filter((s) => s.date === today).length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <h3 className="text-gray-500">Active Staff</h3>
                <p className="text-4xl font-extrabold text-green-800">
                  {shop.staff.length}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4 text-gray-800">Weekly Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#166534"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4 text-gray-800">
                  Popular Services
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#15803d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

{/* Services Tab */}
{activeTab === "services" && (
  <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg">
    <h3 className="text-2xl font-extrabold mb-6 text-green-800 flex items-center gap-2">
      <List className="w-6 h-6" /> Manage Services
    </h3>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {shop.services.map((service) => (
        <div
          key={service.id}
          className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-5 border border-gray-100 flex flex-col"
        >

          <h4 className="text-lg font-semibold text-gray-800">{service.name}</h4>

          {/* Service type badge */}
          <span className="inline-block mt-1 mb-2 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            {service.type || "General"}
          </span>

          {/* Price */}
          <p className="text-xl font-bold text-green-700 mb-4">₹{service.price}</p>

          {/* Demo pictures if available */}
          {service.demoPhotos && service.demoPhotos.length > 0 && (
            <div className="flex space-x-2 mt-auto mb-4">
              {service.demoPhotos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt="demo"
                  className="w-14 h-14 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Book button bottom-right */}
          <div className="flex justify-end mt-auto">
            <button
              onClick={() => setSelectedService(service)}
              className="bg-green-800 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-green-700 transition"
            >
              Book Slot
            </button>
          </div>
        </div>
      ))}
    </div>

    <button className="mt-6 bg-green-800 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
      + Add New Service
    </button>
  </div>
)}

{/* Booking Popup Modal */}
{selectedService && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
      <h3 className="text-xl font-bold mb-4 text-green-800">
        Book Slot for {selectedService.name}
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Booking confirmed ✅");
          setSelectedService(null);
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Time Available
          </label>
          <input
            type="time"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-3">
          <button
            type="button"
            onClick={() => setSelectedService(null)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  </div>
)}



        {/* Staff Tab */}
        {activeTab === "staff" && (
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-extrabold mb-6 text-green-800 flex items-center gap-2">
              <Users className="w-6 h-6" /> Manage Staff
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shop.staff.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-5 border border-gray-100"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={member.photo || "https://randomuser.me/api/portraits/lego/1.jpg"}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.shift}</p>
                      <p className="text-xs text-gray-400">ID: {member.id}</p>
                    </div>
                  </div>
                  {member.demoPhotos && member.demoPhotos.length > 0 && (
                    <div className="flex space-x-3">
                      {member.demoPhotos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt="Demo"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="mt-6 bg-green-900 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
              + Add New Staff
            </button>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === "insights" && (
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-extrabold mb-6 flex items-center text-green-800 gap-2">
              <BrainCircuit className="w-7 h-7" /> AI-Powered Business Insights
            </h3>
            <p className="text-gray-600 mb-4">
              Get personalized suggestions to grow your business based on your
              sales data.
            </p>
            <button
              onClick={fetchInsights}
              disabled={isLoadingInsights}
              className="bg-green-800 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:from-green-300 disabled:to-green-300"
            >
              {isLoadingInsights ? "Thinking..." : "Get Suggestions"}
            </button>
            {isLoadingInsights && (
              <p className="mt-4 text-gray-600 animate-pulse">
                Our AI is analyzing your data. This might take a moment...
              </p>
            )}
            {insights && (
              <div className="mt-6 p-5 bg-green-50 rounded-xl border border-green-200 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Here are some ideas for you:
                </h4>
                <div className="whitespace-pre-wrap text-gray-700 space-y-2">
                  {insights
                    .split("\n")
                    .map((line, i) => line.trim() && <p key={i}>• {line}</p>)}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopkeeperDashboard;
