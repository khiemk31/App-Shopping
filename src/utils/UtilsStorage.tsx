import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode, encode} from './Cryptor';
var md5 = require('md5');

const _encrypt = async (value: string): Promise<string> => {
  const data = await encode(value);

  return data;
};

const _decrypt = async (value: string): Promise<string> => {
  return await decode(value);
};

class UtilsStorage {
  get = async (key: string) => {
    if (key == undefined || key == '') {
      return '';
    } else {
      let encryptKey = await md5(key);
      const value = await AsyncStorage.getItem(encryptKey);
      let decryptValue = await _decrypt(value == undefined ? '' : value);
      return decryptValue;
    }
  };

  set = async (key: string, value: string) => {
    if (key == undefined || key == '') {
      return '';
    } else {
      let encryptKey = await md5(key);
      let encryptValue = await _encrypt(value);
      await AsyncStorage.setItem(encryptKey, encryptValue);
    }
  };

  remove = async (key: string) => {
    if (key == undefined || key == '') {
      return '';
    } else {
      let encryptKey = await md5(key);
      const removeKey = await AsyncStorage.removeItem(encryptKey);
      return removeKey;
    }
  };
}

export default new UtilsStorage();
