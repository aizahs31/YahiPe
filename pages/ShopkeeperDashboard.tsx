import React, { useState, useCallback } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { getBusinessInsights } from "../services/geminiService";
import { SHOPS } from "../data"; 
import { Shop } from "../types"; 
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

  // Dynamic today's date
  const today = new Date().toISOString().split("T")[0];

  // Weekly sales data
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

  // Services chart
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
      className={`flex items-center space-x-3 p-3 rounded-md w-full text-left ${
        activeTab === tabName
          ? "bg-green-100 text-green-700"
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
      <aside className="w-64 bg-white p-4 space-y-4 flex-col hidden md:flex">
        <h1 className="text-2xl font-bold text-green-800 px-2">YahiPe</h1>
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
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
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
                className={`capitalize shrink-0 px-3 py-2 font-medium text-sm rounded-t-lg ${
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
          <div className="space-y-6">
            <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <span className="text-gray-700 font-medium">Shop Status:</span>
              <button
                onClick={toggleShopStatus}
                className={`px-4 py-2 rounded-full text-white font-bold ${
                  shop.isOpen ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {shop.isOpen ? "Open" : "Closed"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Today's Sales</h3>
                <p className="text-3xl font-bold text-gray-800">
                  ₹
                  {shop.sales
                    .filter((s) => s.date === today)
                    .reduce((acc, s) => acc + s.amount, 0)}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Services Sold Today</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {shop.sales.filter((s) => s.date === today).length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500">Active Staff</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {shop.staff.length}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Weekly Sales</h3>
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
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Popular Services</h3>
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Manage Services</h3>
            <div className="space-y-3">
              {shop.services.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center p-3 border rounded-md"
                >
                  <p className="text-gray-800">{service.name}</p>
                  <p className="font-semibold text-gray-600">₹{service.price}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900">
              Add New Service
            </button>
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === "staff" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Manage Staff</h3>
            <div className="space-y-3">
              {shop.staff.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center p-3 border rounded-md"
                >
                  <p className="text-gray-800">{member.name}</p>
                  <p className="font-semibold text-gray-600">{member.shift}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900">
              Add New Staff
            </button>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === "insights" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <BrainCircuit className="w-6 h-6 mr-2 text-green-800" />
              AI-Powered Business Insights
            </h3>
            <p className="text-gray-600 mb-4">
              Get personalized suggestions to grow your business based on your
              sales data.
            </p>
            <button
              onClick={fetchInsights}
              disabled={isLoadingInsights}
              className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 disabled:bg-green-300"
            >
              {isLoadingInsights ? "Thinking..." : "Get Suggestions"}
            </button>
            {isLoadingInsights && (
              <p className="mt-4 text-gray-600">
                Our AI is analyzing your data. This might take a moment...
              </p>
            )}
            {insights && (
              <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Here are some ideas for you:
                </h4>
                <div className="whitespace-pre-wrap text-gray-700 space-y-2">
                  {insights
                    .split("\n")
                    .map(
                      (line, i) => line.trim() && <p key={i}>{line}</p>
                    )}
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
