import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
export default class GoogleHandle {
  static mGoogleAuthen = null;

  static getInstance() {
    if (GoogleHandle.mGoogleAuthen == null) {
      GoogleHandle.mGoogleAuthen = new GoogleHandle();
      GoogleHandle.mGoogleAuthen.configureGoogleSignIn();
    }
    return this.mGoogleAuthen;
  }

  configureGoogleSignIn() {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: 'AIzaSyDBYgeW7uU7iLeEqt-xWHPrdFDw4ByCecU',
      offlineAccess: true,
    });
  }

  async isSignedIn() {
    return await GoogleSignin.isSignedIn();
  }
  async signInGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      return true;
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          return false;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          return false;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          return false;
        default:
          Alert.alert('Something went wrong', error.toString());
          return false;
      }
    }
  }
  async signInToApp(callback, forceSignInAgain) {
    let isLogin = await this.isSignedIn();
    if (isLogin) {
      await this.signInToAppImpl(callback);
    } else if (forceSignInAgain) {
      let loginSuccess = await this.signInGoogle();
      if (loginSuccess) {
        await this.signInToAppImpl(callback);
      } else {
      }
    }
  }
  async signInToAppImpl(callback) {
    try {
      await GoogleSignin.signInSilently();
      const isSignedIn = await GoogleSignin.getTokens();
      const user = await GoogleSignin.getCurrentUser();
      console.log('user google: ', user);
    } catch {}
  }
  async signOut() {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }
}
