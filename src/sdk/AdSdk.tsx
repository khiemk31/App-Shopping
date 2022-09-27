// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
//   setTestDeviceIDAsync,
// } from 'expo-ads-admob';
import React from 'react';
import {View} from 'react-native';
import {Platform} from 'react-native';
export const ENABLE_FULL = true;
export const ENABLE_REWARD = false;
export const ENABLE_BANNER = false;
const DEV_MODE = false;
const MAX_RETRY = 0;
export const ShowBanner = (props: any) => {
  const bannerError = (data: string) => {
    console.log(data);
  };
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
      }}>
      {/* <AdMobBanner
        style={{alignSelf: 'center'}}
        bannerSize={'banner'}
        adUnitID={ADMOD_ID.BANNER} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={bannerError}
      /> */}
    </View>
  );
};
class AdSdk {
  static currentIntance: AdSdk;
  static getInstance = () => {
    if (!this.currentIntance) {
      console.log('INIT_AD_NEW');
      this.currentIntance = new AdSdk();
    }
    console.log('INIT_AD_OLD');
    return this.currentIntance;
  };
  adFullError: number = 0;
  videoError: number = 0;
  callBackFull: any;
  callbackVideo: any;
  constructor() {
    if (DEV_MODE) {
      // setTestDeviceIDAsync('EMULATOR');
    }
    this.adFullError = 0;
    this.videoError = 0;
    this.init();
  }
  public init = async () => {
    if (ENABLE_FULL) {
      // AdMobInterstitial.addEventListener('interstitialDidClose', async () => {
      //   console.log('interstitialDidClose');
      //   if (this.callBackFull) {
      //     this.callBackFull();
      //   }
      //   this.adFullError = 0;
      //   await AdMobInterstitial.requestAdAsync({servePersonalizedAds: true});
      // });
      // AdMobInterstitial.addEventListener(
      //   'interstitialDidFailToLoad',
      //   async () => {
      //     console.log('interstitialDidFailToLoad');
      //     if (this.callBackFull) {
      //       this.callBackFull();
      //     }
      //     this.adFullError += 1;
      //     if (this.adFullError <= MAX_RETRY) {
      //       await AdMobInterstitial.requestAdAsync({
      //         servePersonalizedAds: true,
      //       });
      //     }
      //   },
      // );
      // AdMobInterstitial.addEventListener('interstitialDidLoad', async () => {
      //   console.log('interstitialDidLoad');
      // });
      // AdMobInterstitial.addEventListener('interstitialDidOpen', async () => {
      //   console.log('interstitialDidOpen');
      //   this.adFullError = 0;
      // });
      // AdMobInterstitial.addEventListener(
      //   'interstitialWillLeaveApplication',
      //   async () => {
      //     console.log('interstitialWillLeaveApplication');
      //   },
      // );
      // await AdMobInterstitial.setAdUnitID(ADMOD_ID.FULL); // Test ID, Replace with your-admob-unit-id
      // await AdMobInterstitial.requestAdAsync({servePersonalizedAds: true});
    }
    if (ENABLE_REWARD) {
      // AdMobRewarded.addEventListener('rewardedVideoDidDismiss', async () => {
      //   console.log('rewardedVideoDidDismiss');
      //   if (this.callbackVideo) {
      //     this.callbackVideo();
      //   }
      // });
      // AdMobRewarded.addEventListener(
      //   'rewardedVideoUserDidEarnReward',
      //   async () => {
      //     console.log('rewardedVideoUserDidEarnReward');
      //   },
      // );
      // AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', async () => {
      //   console.log('rewardedVideoDidFailToLoad');
      //   if (this.callbackVideo) {
      //     this.callbackVideo();
      //   }
      //   this.videoError += 1;
      //   if (this.videoError <= MAX_RETRY) {
      //     await AdMobRewarded.requestAdAsync({
      //       servePersonalizedAds: true,
      //     });
      //   }
      // });
      // AdMobRewarded.addEventListener('rewardedVideoDidLoad', async () => {
      //   console.log('rewardedVideoDidLoad');
      // });
      // AdMobRewarded.addEventListener('rewardedVideoDidPresent', async () => {
      //   console.log('rewardedVideoDidPresent');
      //   this.videoError = 0;
      //   await AdMobRewarded.requestAdAsync({servePersonalizedAds: true});
      // });
      // AdMobRewarded.addEventListener(
      //   'rewardedVideoDidFailToPresent',
      //   async () => {
      //     console.log('rewardedVideoDidFailToPresent');
      //     if (this.callbackVideo) {
      //       this.callbackVideo();
      //     }
      //     this.videoError += 1;
      //     if (this.videoError <= MAX_RETRY) {
      //       await AdMobRewarded.requestAdAsync({
      //         servePersonalizedAds: true,
      //       });
      //     }
      //   },
      // );
      // await AdMobRewarded.setAdUnitID(ADMOD_ID.REWARD); // Test ID, Replace with your-admob-unit-id
      // await AdMobRewarded.requestAdAsync();
    }
  };
  public showInterstitial = async (callback: any) => {
    this.callBackFull = callback;
    if (ENABLE_FULL) {
      // try {
      //   if (await AdMobInterstitial.getIsReadyAsync()) {
      //     console.log('getIsReadyAsync', true);
      //     await AdMobInterstitial.showAdAsync();
      //   } else {
      //     console.log('getIsReadyAsync', false);
      //     if (this.callBackFull) {
      //       this.callBackFull();
      //     }
      //   }
      // } catch (error) {
      //   console.log('error');
      //   if (this.callBackFull) {
      //     this.callBackFull(false);
      //   }
      // }
    } else {
      if (this.callBackFull) {
        this.callBackFull(false);
      }
    }
  };
  public showReward = async (callback: any) => {
    this.callbackVideo = callback;
    if (ENABLE_REWARD) {
      try {
        // Display a rewarded ad
        // AdMobInterstitial.removeAllListeners();
        // if (await AdMobRewarded.getIsReadyAsync()) {
        //   console.log('getIsReadyAsync', true);
        //   await AdMobRewarded.showAdAsync();
        // } else {
        //   console.log('getIsReadyAsync', false);
        //   if (this.callbackVideo) {
        //     this.callbackVideo(false);
        //   }
        // }
      } catch (error) {
        console.log(error);
        if (this.callbackVideo) {
          this.callbackVideo(false);
        }
      }
    } else {
      if (this.callbackVideo) {
        this.callbackVideo(false);
      }
    }
  };
}
export default AdSdk;
export const ADMOD_ID = DEV_MODE
  ? {
      BANNER:
        Platform.select({
          // https://developers.google.com/admob/ios/test-ads
          ios: 'ca-app-pub-3940256099942544/2934735716',
          // https://developers.google.com/admob/android/test-ads
          android: 'ca-app-pub-3940256099942544/6300978111',
        }) ?? '',
      FULL:
        Platform.select({
          // https://developers.google.com/admob/ios/test-ads
          ios: 'ca-app-pub-3940256099942544/4411468910',
          // https://developers.google.com/admob/android/test-ads
          android: 'ca-app-pub-3940256099942544/1033173712',
        }) ?? '',
      REWARD:
        Platform.select({
          // https://developers.google.com/admob/ios/test-ads
          ios: 'ca-app-pub-3940256099942544/1712485313',
          // https://developers.google.com/admob/android/test-ads
          android: 'ca-app-pub-3940256099942544/5224354917',
        }) ?? '',
    }
  : {
      BANNER:
        Platform.select({
          ios: '',
          android: '',
        }) ?? '',
      FULL:
        Platform.select({
          ios: 'ca-app-pub-4404801066435608/6408423306',
          android: 'ca-app-pub-4404801066435608/6408423306',
        }) ?? '',
      REWARD:
        Platform.select({
          ios: '',
          android: '',
        }) ?? '',
    };
