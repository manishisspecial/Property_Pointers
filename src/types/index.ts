export interface PropertyType {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "sale" | "rent" | "pg";
  category: string;
  status: string;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  area: number;
  areaUnit: string;
  floor: string | null;
  totalFloors: string | null;
  facing: string | null;
  furnishing: string | null;
  age: string | null;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number | null;
  longitude: number | null;
  images: string;
  amenities: string;
  verified: boolean;
  featured: boolean;
  premium: boolean;
  views: number;
  ownerId: string;
  ownerType: string;
  owner: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: string;
  verified: boolean;
  city: string | null;
  state: string | null;
  createdAt: string;
}

export interface InquiryType {
  id: string;
  message: string;
  status: string;
  propertyId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string | null;
  property?: PropertyType;
  user?: UserType;
  createdAt: string;
}

export interface ActivityLogType {
  id: string;
  userId: string | null;
  action: string;
  details: string | null;
  ip: string | null;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  page: string | null;
  user?: UserType | null;
  createdAt: string;
}

export interface ChatMessageType {
  id?: string;
  message: string;
  response: string;
  createdAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProperties: number;
  totalInquiries: number;
  activeListings: number;
  totalViews: number;
  newUsersToday: number;
  newPropertiesToday: number;
  newInquiriesToday: number;
}
