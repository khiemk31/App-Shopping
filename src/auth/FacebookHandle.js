import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {EventRegister} from 'react-native-event-listeners';
import AppConstants from '../../base/AppConstants';
import {facebookLogin} from '../AccountHandle';
import DataUtils from '../../utils/DataUtils';
import DataLocal from '../../data/DataLocal';
import {strings} from "../../assets/languages/i18n";

export default class FacebookAuthen {
  static mFacebookAuthen = null;

  static getInstance() {
    if (FacebookAuthen.mFacebookAuthen == null) {
      FacebookAuthen.mFacebookAuthen = new FacebookAuthen();
    }
    return this.mFacebookAuthen;
  }

  async signInWithFacebook(callback) {
    const tokenObj = await AccessToken.getCurrentAccessToken().catch(err=>{
      callback(false, `${err}`)
    });
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: tokenObj?.accessToken,
        parameters: {
          fields: {
            string:
              'email,name,first_name,middle_name,last_name,gender,address,picture.type(large)',
          },
        },
      },
      (error, res) => {
        if (res) {
          AccessToken.getCurrentAccessToken().then(accessToken => {
            let params = {
              accessToken: accessToken?.accessToken.toString(),
              ...res,
              token_device: DataLocal.tokenFirebase
            };
            facebookLogin(params, {
              success: res => {
                let success = DataUtils.successfully(res);
                if (success === true) {
                  DataLocal.saveInfoUser(res.data).then(r => {
                    if (callback !== undefined && callback !== null) {
                      callback(success);
                    }
                  });
                  DataLocal.saveTypeLogin(
                    AppConstants.SharedPreferencesKey.TYPE_LOGIN.FACEBOOK,
                  );
                } else {
                  if (callback !== undefined && callback !== null) {
                    callback(success, DataUtils.checkErrResponse(res));
                  }
                }
              },
              failure: err => {
                callback(false, 'err login facebook: '+ err);
              },
            });
          });
        }
        else {
          callback(false)
        }
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  loginFacebook(callback) {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          callback(false, strings('loginCanceled'));
        } else {
          this.signInWithFacebook(callback);
        }
      },
      error => {
        callback(false, 'Login fail with error: ' + error);
      },
    );
  }

  signOut() {
    LoginManager.logOut();
  }
  //Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Result Name: ' + result.name);
    }
  };
}
