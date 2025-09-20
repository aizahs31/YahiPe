
export enum UserRole {
  CONSUMER = 'consumer',
  SHOPKEEPER = 'shopkeeper',
}

export interface User {
  id: string;
  email: string;
  password?: string; // In a real app, this would be a hash
  name: string;
  role: UserRole;
  shopId?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface Staff {
  id: string;
  name: string;
  shift: string; // e.g., "9am - 5pm"
}

export interface Sale {
  date: string; // YYYY-MM-DD
  serviceId: string;
  amount: number;
}

export interface Shop {
  id: string;
  ownerId: string;
  name: string;
  category: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  isOpen: boolean;
  services: Service[];
  staff: Staff[];
  sales: Sale[];
}
