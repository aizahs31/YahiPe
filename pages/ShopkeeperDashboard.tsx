import React, { useState, useCallback, useEffect } from "react";
import { BarChart2, List, Users, BrainCircuit, X } from "lucide-react";
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

// Mock data for demonstration
const mockShop = {
  id: "shop1",
  name: "Green Salon",
  isOpen: true,
  services: [
    { id: "srv1", name: "Haircut", price: 300, type: "Hair", demoPhotos: [] },
    {
      id: "srv2",
      name: "Beard Trim",
      price: 150,
      type: "Grooming",
      demoPhotos: [],
    },
    { id: "srv3", name: "Hair Wash", price: 100, type: "Hair", demoPhotos: [] },
  ],
  staff: [
    {
      id: "stf1",
      name: "Ravi Kumar",
      shift: "Morning",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      demoPhotos: [],
    },
    {
      id: "stf2",
      name: "Suresh Patel",
      shift: "Evening",
      photo: "https://randomuser.me/api/portraits/men/2.jpg",
      demoPhotos: [],
    },
  ],
  sales: [
    { id: "sale1", serviceId: "srv1", amount: 300, date: "2025-09-21" },
    { id: "sale2", serviceId: "srv2", amount: 150, date: "2025-09-21" },
    { id: "sale3", serviceId: "srv1", amount: 300, date: "2025-09-20" },
    { id: "sale4", serviceId: "srv3", amount: 100, date: "2025-09-20" },
    { id: "sale5", serviceId: "srv2", amount: 150, date: "2025-09-19" },
  ],
};

const mockUser = {
  name: "Shop Owner",
  shopId: "shop1",
};

const ShopkeeperDashboard = () => {
  const [shop, setShop] = useState(mockShop);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [insights, setInsights] = useState("");
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  // Add Service Modal state
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    type: "",
    demoPhotos: [],
  });

  // Add Staff Modal state
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    shift: "",
    photo: "",
    demoPhotos: [],
  });

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const toggleShopStatus = () => {
    setShop({ ...shop, isOpen: !shop.isOpen });
  };

  const fetchInsights = useCallback(async () => {
    setIsLoadingInsights(true);
    setInsights("");
    // Simulate API call
    setTimeout(() => {
      setInsights(`Based on your sales data, here are some suggestions:
• Your most popular service is Haircut - consider offering package deals
• Evening sales are lower - try promotional offers during evening hours
• Hair services are performing well - consider expanding hair care options
• Staff utilization could be optimized with better scheduling`);
      setIsLoadingInsights(false);
    }, 2000);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const salesByDay = shop.sales.reduce((acc, sale) => {
    const day = new Date(sale.date).toLocaleDateString("en-US", {
      weekday: "short",
    });
    acc[day] = (acc[day] || 0) + sale.amount;
    return acc;
  }, {});

  const chartData = Object.entries(salesByDay).map(([name, sales]) => ({
    name,
    sales,
  }));

  const salesByService = shop.sales.reduce((acc, sale) => {
    const serviceName =
      shop.services.find((s) => s.id === sale.serviceId)?.name || "Unknown";
    acc[serviceName] = (acc[serviceName] || 0) + 1;
    return acc;
  }, {});

  const serviceChartData = Object.entries(salesByService).map(
    ([name, count]) => ({ name, count })
  );

  const TabButton = ({ tabName, icon, children }) => (
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

  // Add Service handler
  const handleAddService = (e) => {
    e.preventDefault();
    if (!shop) return;
    const id = "srv_" + Date.now();
    const service = {
      id,
      name: newService.name,
      price: Number(newService.price),
      type: newService.type,
      demoPhotos: newService.demoPhotos,
    };
    setShop({
      ...shop,
      services: [...shop.services, service],
    });
    setShowAddService(false);
    setNewService({ name: "", price: "", type: "", demoPhotos: [] });
  };

  // Add Staff handler
  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!shop) return;
    const id = "stf_" + Date.now();
    const staff = {
      id,
      name: newStaff.name,
      shift: newStaff.shift,
      photo: newStaff.photo,
      demoPhotos: newStaff.demoPhotos,
    };
    setShop({
      ...shop,
      staff: [...shop.staff, staff],
    });
    setShowAddStaff(false);
    setNewStaff({ name: "", shift: "", photo: "", demoPhotos: [] });
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowAddService(false);
        setShowAddStaff(false);
      }
      if (e.key === "1" && !showAddService && !showAddStaff)
        setActiveTab("dashboard");
      if (e.key === "2" && !showAddService && !showAddStaff)
        setActiveTab("services");
      if (e.key === "3" && !showAddService && !showAddStaff)
        setActiveTab("staff");
      if (e.key === "4" && !showAddService && !showAddStaff)
        setActiveTab("insights");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setActiveTab]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 space-y-5 flex-col hidden md:flex shadow-md">
        <h1 className="text-3xl font-extrabold text-green-800 px-2">YahiPe</h1>
        <nav className="flex-grow space-y-2">
          <TabButton
            tabName="dashboard"
            icon={<BarChart2 className="w-5 h-5" />}
          >
            Dashboard
          </TabButton>
          <TabButton tabName="services" icon={<List className="w-5 h-5" />}>
            Services
          </TabButton>
          <TabButton tabName="staff" icon={<Users className="w-5 h-5" />}>
            Staff
          </TabButton>
          <TabButton
            tabName="insights"
            icon={<BrainCircuit className="w-5 h-5" />}
          >
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
              Hello, {mockUser?.name}!
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
                <h3 className="font-semibold mb-4 text-gray-800">
                  Weekly Sales
                </h3>
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
                  <h4 className="text-lg font-semibold text-gray-800">
                    {service.name}
                  </h4>

                  {/* Service type badge */}
                  <span className="inline-block mt-1 mb-2 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    {service.type || "General"}
                  </span>

                  {/* Price */}
                  <p className="text-xl font-bold text-green-700 mb-4">
                    ₹{service.price}
                  </p>

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

                  {/* Delete button */}
                  <div className="flex justify-end mt-auto">
                    <button
                      onClick={() => {
                        setShop({
                          ...shop,
                          services: shop.services.filter(
                            (s) => s.id !== service.id
                          ),
                        });
                      }}
                      className="bg-red-600 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-red-700 transition"
                    >
                      Delete service
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                className="bg-green-800 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => {
                  console.log("Add Service button clicked");
                  setShowAddService(true);
                }}
              >
                + Add New Service
              </button>
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
                      src={
                        member.photo ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {member.name}
                      </h4>
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
                  <button
                    onClick={() => {
                      setShop({
                        ...shop,
                        staff: shop.staff.filter((s) => s.id !== member.id),
                      });
                    }}
                    className="mt-4 bg-red-600 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-red-700 transition w-full"
                  >
                    Remove Staff
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                className="bg-green-900 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={() => {
                  console.log("Add Staff button clicked");
                  setShowAddStaff(true);
                }}
              >
                + Add New Staff
              </button>
            </div>
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
              className="bg-green-800 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 z-10"
              onClick={() => {
                console.log("Closing service modal");
                setShowAddService(false);
              }}
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-green-800">
              Add New Service
            </h3>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={newService.name}
                  onChange={(e) =>
                    setNewService((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Premium Haircut"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={newService.price}
                  onChange={(e) =>
                    setNewService((s) => ({ ...s, price: e.target.value }))
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  value={newService.type}
                  onChange={(e) =>
                    setNewService((s) => ({ ...s, type: e.target.value }))
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Hair, Grooming, Spa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Demo Photo URLs (comma separated)
                </label>
                <input
                  type="text"
                  value={newService.demoPhotos.join(",")}
                  onChange={(e) =>
                    setNewService((s) => ({
                      ...s,
                      demoPhotos: e.target.value
                        .split(",")
                        .map((v) => v.trim())
                        .filter(Boolean),
                    }))
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddService(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {[
            {
              name: "dashboard",
              icon: <BarChart2 className="w-5 h-5" />,
              label: "Dashboard",
            },
            {
              name: "services",
              icon: <List className="w-5 h-5" />,
              label: "Services",
            },
            {
              name: "staff",
              icon: <Users className="w-5 h-5" />,
              label: "Staff",
            },
            {
              name: "insights",
              icon: <BrainCircuit className="w-5 h-5" />,
              label: "Insights",
            },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                activeTab === tab.name
                  ? "bg-green-100 text-green-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon}
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Status Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center">
          <span className="mr-2 text-sm font-medium text-gray-700">
            Status:
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={shop.isOpen}
              onChange={toggleShopStatus}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            <span className="ml-2 text-xs font-medium text-gray-900">
              {shop.isOpen ? "Open" : "Closed"}
            </span>
          </label>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoadingInsights && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl p-6 shadow-xl flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span className="text-gray-700 font-medium">
              Generating insights...
            </span>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {(showAddService === false && newService.name === "") ||
      (showAddStaff === false && newStaff.name === "") ? null : (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {/* This would be for success notifications - you can implement a proper toast system */}
        </div>
      )}

      {/* Keyboard Shortcuts Helper (Hidden by default, can be toggled) */}
      <div className="hidden">
        <div className="fixed bottom-20 right-4 bg-gray-800 text-white rounded-lg p-3 text-xs">
          <div className="font-semibold mb-2">Keyboard Shortcuts:</div>
          <div>1 - Dashboard</div>
          <div>2 - Services</div>
          <div>3 - Staff</div>
          <div>4 - Insights</div>
          <div>Esc - Close Modals</div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
