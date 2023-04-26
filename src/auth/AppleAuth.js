import appleAuth from '@invertase/react-native-apple-authentication';
import AccountHandle, {appleLogin} from '../AccountHandle';
import {AsyncStorage} from 'react-native';
import AppConstants from '../../base/AppConstants';
import DataUtils from '../../utils/DataUtils';
import DataLocal from '../../data/DataLocal';

export default class AppleAuthen {
  static instance = null;

  static getInstance() {
    if (AppleAuthen.instance == null) {
      AppleAuthen.instance = new AppleAuthen();
    }
    return this.instance;
  }
  async login(callback, forceLogin = true) {
    let tokenKey = '';
    let response;
    if (forceLogin) {
      // performs login request
      const appleAuthRequestResponse = await appleAuth
        .performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        })
        .catch(err => {
          callback(false, err);
        });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        tokenKey = appleAuthRequestResponse.identityToken;
        response = appleAuthRequestResponse;
      }
    } else {
      tokenKey = await AsyncStorage.getItem(
        AppConstants.SharedPreferencesKey.APPLE_KEY,
      );
    }
    if (DataUtils.stringNullOrEmpty(tokenKey)) {
      callback(false);
      this.logout();
      return;
    }
    let params = {
      access_token: tokenKey,
      response: response,
      token_device: DataLocal.tokenFirebase,
    };
    appleLogin(params, {
      success: res => {
        let success = DataUtils.successfully(res);
        if (success === true) {
          DataLocal.saveInfoUser(res?.data).then(r => {
            if (callback !== undefined && callback !== null) {
              callback(success);
            }
          });
          DataLocal.saveTypeLogin(
            AppConstants.SharedPreferencesKey.TYPE_LOGIN.APPLE,
          );
        } else {
          if (callback !== undefined && callback !== null) {
            callback(success);
          }
        }
      },
      failure: err => {
        callback(false, err);
        console.log('err login facebook: ', err);
      },
    });
  }
  async logout() {
    await appleAuth.Operation.LOGOUT;
    await AsyncStorage.removeItem(
      AppConstants.SharedPreferencesKey.APPLE_KEY,
      null,
    );
  }
}
