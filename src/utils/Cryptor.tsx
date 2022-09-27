var CryptoJS = require('crypto-js');
//@ts-ignore
const password = 'canh7antt8a@123#';
export const encode = async (input: string) => {
  try {
    // Encrypt
    var ciphertext = await CryptoJS.AES.encrypt(input, password).toString();
    return ciphertext;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const decode = async (input: string) => {
  try {
    // Decrypt
    var bytes = await CryptoJS.AES.decrypt(input, password);
    var originalText = await bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    console.log(error);
    return null;
  }
};
