# YahiPe 🗺️  
**The Digital Map of Your Neighborhood Economy**  

YahiPe is a **hyperlocal marketplace and digital infrastructure layer** for small shops, giving them **real-time online visibility** and enabling customers to explore their neighborhood commerce like a **live map** instead of a static listing site.  

Think of it as **Google Maps + Swiggy + Justdial**, but built for **local neighborhood shops**.  

---

## 🚀 Core Features  

### 🗺️ Interactive Map UI (USP)  
- Greyed-out residences, highlighted shop pins.  
- Color-coded status:  
  - 🟢 Open  
  - 🔴 Closed  
  - 🟡 Staff shift active  
- Hover/Click → Shop mini-card with quick info & CTA.  
- Toggle between **Map View** and **List View**.  

### 🕒 Real-time Shop Status  
- Shop owners can set: **Open / Closed / Holiday / Staff on shift**.  
- Customers see **live updates**.  

### 👨‍👩‍👧 Staff Management  
- Staff profiles: Name, role, schedule.  
- Customers know *“Who’s available now”* (e.g., a barber on duty).  

### 🔍 Customer Discovery  
- Search by category (groceries, salons, tailors, kirana).  
- Location-based browsing.  
- Filters: **Open now, Cheapest, Top rated**.  

### 💰 Pricing Transparency  
- Real-time pricing for services/products.  
- Builds trust → No vague *“call for price”*.  

### 📅 Lightweight Interaction  
- Simple booking (salon slot, doctor appointment).  
- Enquiry/WhatsApp integration → no extra learning curve.  

---

## 🎯 Competitive Differentiators  
- **Live commerce status** (open/closed + staff shifts).  
- **Neighborhood focus** → only your local shops.  
- **Transparent pricing** (unlike competitors).  
- **Low-tech onboarding** → OTP login + minimal form for shopkeepers.  

---

## 🛠️ Tech Stack  

**Frontend**  
- React + Vite  
- Leaflet / Mapbox (interactive maps)  
- TailwindCSS (UI styling)  

**Backend**  
- Node.js + Express  
- MongoDB Atlas (flexible schemas: shops, staff, schedules)  

**Other Key Tools**  
- Real-time updates: Socket.io  
- Authentication: OTP (Firebase Auth or Twilio)  
- Shop Owner App: Mobile-first PWA  

---

## 📱 Essential Pages  

### Customer Side  
1. **Home / Map Page** → Interactive map with shop pins.  
2. **Shop Profile** → Pricing, staff, booking, contact, reviews.  
3. **Search & Discovery** → Category search, filters.  
4. **User Profile (optional)** → Saved shops, reviews, bookings.  

### Shop Owner Side  
1. **Onboarding** → OTP login + shop details.  
2. **Dashboard** → Status toggle, staff shifts, edit pricing.  
3. **Profile Settings** → Update info, manage staff, set hours.  

---

## 🌍 SDG Positioning  
- **SDG 8: Decent Work & Economic Growth** → Keep local shops competitive.  
- **SDG 9: Industry, Innovation & Infrastructure** → Digital infrastructure for small businesses.  
- **SDG 11: Sustainable Cities & Communities** → Strengthen local economies vs. e-commerce giants.  

---

## 📈 Growth Strategy  
- Start with **one neighborhood**, onboard 20–30 shops.  
- Focus on **daily-need stores** (kirana, salons, electricians).  
- Shopkeeper pitch: *“More visibility = more customers.”*  

---

## 💰 Revenue Model  
- Free listing for all shops.  
- Premium visibility → highlighted shops, promotions.  
- Booking/Order commission.  
- SaaS subscription → analytics, customer insights.  

---

## 🔮 Future Add-ons  
- **Loyalty Programs** → Points & discounts for supporting local shops.  
- **Payments & Orders** → UPI/Paytm, pre-book groceries & services.  
- **AI Assistance** → *“Barber open under ₹200 near me?”*  

---

## ⚡ Quick Start  

### 1. Clone Repository  
```bash
git clone https://github.com/your-username/yahipe.git
cd yahipe
2. Install Dependencies
bash
Copy code
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
3. Environment Setup
Create .env files:

Frontend (frontend/.env)

env
Copy code
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_API_BASE=http://localhost:5000
Backend (backend/.env)

env
Copy code
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
FIREBASE_API_KEY=your_firebase_key
4. Run Dev Servers
bash
Copy code
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev