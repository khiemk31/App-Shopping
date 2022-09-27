export const APi_KEY_YOUTUBE = 'AIzaSyCDyCjCuHtGfz1p5pF7pF608y3IoxpZNyQ';
// thời gian tự động enable button, khi không có response từ socket là 5 giây.
export const TIME_ENABLE_BUTTON = 5000; // đơn vị ms
// Giới hạn tổng dung lượng file có thể upload lên server
export const MAX_TOTAL_IMAGE_SIZE = 50 * 1024 * 1024; // 50 MB
export const EMIT_APP_PAUSE = 'EMIT_APP_PAUSE';
export const EMIT_APP_RESUME = 'EMIT_APP_RESUME';
export const KEY_STATUS_SUCCESS = 200;
export enum Language {
  VIETNAMESE = 'vi',
  ENGLISH = 'en',
}
export enum SettingKey {
  LOGIN_BY_BIOMETIC = 'loginByBiometic',
  LOGIN_ALERT = 'loginAlert',
  APP_LANGUAGE = 'appLanguage',
}
export const PICTURE_MIME_TYPES: string[] = [
  'image/gif',
  'image/heic',
  'image/jpeg',
  'image/png', // For image
  'audio/mpeg',
  'audio/wav',
  'audio/ogg', // For audio
  'video/ogg',
  'video/mpeg',
  'video/quicktime',
  'video/mp4', // For video
];

export const ANDROID_PICTURE_MIME_TYPES: string[] = [
  'image/gif',
  'image/jpeg',
  'image/png', // For image
  'audio/mpeg',
  'audio/wav',
  'audio/ogg', // For audio
  'video/ogg',
  'video/mpeg',
  'video/quicktime',
  'video/mp4', // For video
];
export const DEEP_LINK = {
  APP_LINK: 'pet://',
};
