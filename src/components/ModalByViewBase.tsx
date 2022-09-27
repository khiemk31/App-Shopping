/**
 * @flow
 */
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import ModalBase from './ModalBase';
import sizes from '../res/sizes';

type ModalByViewBaseProps = {
  children?: any;
  onShown?: Function;
  onDismissed?: Function;
  animationOutTiming?: number;
  isTouchOutsideToDismiss?: boolean;
};

type ModalByViewBaseState = {
  isVisible: boolean;
};

export default class ModalByViewBase extends Component<
  ModalByViewBaseProps,
  ModalByViewBaseState
> {
  state: ModalByViewBaseState = {
    isVisible: false,
  };

  _show(callback?: Function) {
    this.setState(
      {
        isVisible: true,
      },
      () => {
        setTimeout(() => {
          if (callback) {
            callback();
          }
        }, 400);
      },
    );
  }

  _dismiss(callback?: Function) {
    this.setState(
      {
        isVisible: false,
      },
      () => {
        setTimeout(
          () => {
            if (callback) {
              callback();
            }
          },
          this.props.animationOutTiming ? this.props.animationOutTiming : 300,
        );
      },
    );
  }

  render() {
    return (
      <ModalBase
        {...this.props}
        isVisible={this.state.isVisible}
        style={{
          margin: 0,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (
              this.props.isTouchOutsideToDismiss != null &&
              this.props.isTouchOutsideToDismiss
            ) {
              this._dismiss();
            }
          }}
          style={{
            left: 0,
            top: 0,
            width: sizes._screen_width,
            height: sizes._screen_height,
            position: 'absolute',
          }}></TouchableOpacity>
        {this.props.children}
      </ModalBase>
    );
  }
}
