import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {StyleProp, ViewStyle, ModalProps} from 'react-native';

interface Props extends ModalProps {
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
  deviceWidth?: number;
  animationInTiming?: number;
  animationOutTiming?: number;
  onModalHide?: () => void;
}

type State = {};

export default class ModalBase extends Component<Props, State> {
  state: State = {};

  render() {
    return (
      //@ts-ignore
      <Modal
        animationInTiming={
          this.props.animationInTiming ? this.props.animationInTiming : 400
        }
        animationOutTiming={
          this.props.animationOutTiming ? this.props.animationOutTiming : 300
        }
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        backdropOpacity={0.7}
        onModalHide={
          this.props.onModalHide ? this.props.onModalHide : undefined
        }
        {...this.props}>
        {this.props.children}
      </Modal>
    );
  }
}
