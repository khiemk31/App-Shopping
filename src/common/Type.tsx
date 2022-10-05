import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export interface NotificationApp extends FirebaseMessagingTypes.RemoteMessage {}

export interface Category {
  id: number;
  name: string;
  image: any;
}
