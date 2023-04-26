import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import sizes from '../../../res/sizes';
import TextViewBase from '../../../components/TextViewBase';
import strings from '../../../res/strings';
import ImageBase from '../../../components/ImageBase';
import images from '../../../res/images';
import GoogleHandle from '../../../auth/GoogleHandle';
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <TextViewBase title={strings.login} style={styles.txtLogin} />
      <View style={styles.btnInput}>
        <ImageBase style={styles.iconEmail} imageSource={images.email} />
        <TextInput
          placeholderTextColor={'#BFBFBF'}
          style={styles.txtInput}
          placeholder={strings.inputEmail}
        />
      </View>
      <View style={styles.btnInput}>
        <ImageBase style={styles.iconEmail} imageSource={images.ic_pass} />
        <TextInput
          placeholderTextColor={'#BFBFBF'}
          style={styles.txtInput}
          placeholder={strings.inputPassword}
        />
      </View>
      <TouchableOpacity>
        <TextViewBase
          title={strings.forgotPassword}
          style={styles.txtForgotPass}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogin}>
        <TextViewBase title={strings.login} style={styles.txtBtnLogin} />
      </TouchableOpacity>
      <TextViewBase title={strings.orLoginWith} style={styles.txtLoginWith} />
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          marginTop: sizes._26sdp,
        }}>
        <TouchableOpacity
          onPress={() => {
            GoogleHandle.getInstance().signInToApp((res: any) => {}, true);
          }}
          style={{
            width: sizes._48sdp,
            height: sizes._48sdp,
          }}>
          <Image style={styles.icon} source={images.Google} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: sizes._48sdp,
            height: sizes._48sdp,
            marginLeft: sizes._24sdp,
          }}>
          <Image style={{...styles.icon}} source={images.Facebook} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBF7',
    paddingHorizontal: sizes._20sdp,
  },
  txtLogin: {
    marginTop: sizes._160sdp,
    color: '#262626',
    textAlign: 'center',
    fontSize: sizes._24sdp,
    fontWeight: '500',
    marginBottom: sizes._18sdp,
  },
  btnInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizes._12sdp,
    flexDirection: 'row',
    paddingHorizontal: sizes._18sdp,
    paddingVertical: sizes._16sdp,
    backgroundColor: '#FFFFFF',
    borderRadius: sizes._15sdp,
  },
  txtInput: {
    flex: 1,
    color: '#000000',
    fontSize: sizes._16sdp,
    marginLeft: sizes._11sdp,
    fontWeight: '500',
  },
  iconEmail: {
    width: sizes._28sdp,
    height: sizes._28sdp,
  },
  iconPassword: {
    width: sizes._28sdp,
    height: sizes._28sdp,
  },
  txtForgotPass: {
    textAlign: 'right',
    marginTop: sizes._11sdp,
    fontSize: sizes._16sdp,
    color: '#94A0B8',
  },
  btnLogin: {
    alignSelf: 'center',
    width: sizes._200sdp,
    marginTop: sizes._100sdp,
    backgroundColor: '#1D7C4D',
    paddingVertical: sizes._12sdp,
    borderRadius: sizes._8sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnLogin: {
    fontSize: sizes._20sdp,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  txtLoginWith: {
    color: '#838483',
    marginTop: sizes._26sdp,
    fontWeight: '500',
    textAlign: 'center',
  },
  icon: {
    width: sizes._48sdp,
    height: sizes._48sdp,
    resizeMode: 'cover',
  },
});
