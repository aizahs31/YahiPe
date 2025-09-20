
import { User, Shop, UserRole } from './types';

export const USERS: User[] = [
  {
    id: 'user-1',
    email: 'customer@yahipe.com',
    password: 'password123',
    name: 'Ravi Kumar',
    role: UserRole.CONSUMER,
  },
  {
    id: 'user-2',
    email: 'shopkeeper@yahipe.com',
    password: 'password123',
    name: 'Sita Devi',
    role: UserRole.SHOPKEEPER,
    shopId: 'shop-1',
  },
];

export const SHOPS: Shop[] = [
  {
    id: 'shop-1',
    ownerId: 'user-2',
    name: "Sita's Salon",
    category: 'Beauty & Salon',
    address: '123, Main Market, Delhi',
    location: { lat: 28.6139, lng: 77.2090 },
    isOpen: true,
    services: [
      { id: 's1-1', name: 'Haircut - Men', price: 150 },
      { id: 's1-2', name: 'Haircut - Women', price: 300 },
      { id: 's1-3', name: 'Shaving', price: 80 },
      { id: 's1-4', name: 'Facial', price: 800 },
      { id: 's1-5', name: 'Manicure', price: 400 },
    ],
    staff: [
      { id: 'st1-1', name: 'Geeta', shift: '9 AM - 6 PM' },
      { id: 'st1-2', name: 'Ramesh', shift: '10 AM - 7 PM' },
    ],
    sales: [
        { date: '2023-10-01', serviceId: 's1-1', amount: 150 },
        { date: '2023-10-01', serviceId: 's1-2', amount: 300 },
        { date: '2023-10-02', serviceId: 's1-4', amount: 800 },
        { date: '2023-10-03', serviceId: 's1-1', amount: 150 },
        { date: '2023-10-03', serviceId: 's1-3', amount: 80 },
        { date: '2023-10-04', serviceId: 's1-5', amount: 400 },
        { date: '2023-10-05', serviceId: 's1-2', amount: 300 },
        { date: '2023-10-05', serviceId: 's1-1', amount: 150 },
        { date: '2023-10-06', serviceId: 's1-4', amount: 800 },
        { date: '2023-10-07', serviceId: 's1-1', amount: 150 },
    ],
  },
  {
    id: 'shop-2',
    ownerId: 'user-3',
    name: "Raju's Repair Shop",
    category: 'Electronics Repair',
    address: '45, Tech Lane, Delhi',
    location: { lat: 28.6150, lng: 77.2105 },
    isOpen: false,
    services: [
      { id: 's2-1', name: 'Mobile Screen Repair', price: 1200 },
      { id: 's2-2', name: 'Laptop Servicing', price: 700 },
      { id: 's2-3', name: 'Speaker Repair', price: 500 },
    ],
    staff: [{ id: 'st2-1', name: 'Raju', shift: '10 AM - 8 PM' }],
    sales: [],
  },
  {
    id: 'shop-3',
    ownerId: 'user-4',
    name: 'Gupta Kirana',
    category: 'Grocery',
    address: '78, Bazaar Street, Delhi',
    location: { lat: 28.6125, lng: 77.2080 },
    isOpen: true,
    services: [
      { id: 's3-1', name: 'Home Delivery', price: 50 },
    ],
    staff: [{ id: 'st3-1', name: 'Mr. Gupta', shift: '8 AM - 9 PM' }],
    sales: [],
  },
];
