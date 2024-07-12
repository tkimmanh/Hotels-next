export type SuccessResponse = {
  message: string;
  status: number;
  data?: any;
} | null;

export interface UserType {
  _id: string;
  name: string;
  email: string;
  clerkUserId: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type HotelType = {
  address: string;
  email: string;
  name: string;
  owner: string;
  phone: string;
  media: File | any;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};
