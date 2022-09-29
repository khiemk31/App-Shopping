import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export interface NotificationApp extends FirebaseMessagingTypes.RemoteMessage {}

export interface Category {
  title: any;
  id: number;
  name: string;
  slug?: string;
  description?: string;
  parent_id?: number;
  image?: string;
}
export interface Product {
  id: number;
  name: any;
  image: string;
  price: number;
  quantity: number;
}
export interface Bill {
  id: any;
  created_at: Date;
  address: string;
  fullName: string;
  phoneNumber: string;
  listProduct: Product[];
  totalPrice: number;
  payment: string;
}
