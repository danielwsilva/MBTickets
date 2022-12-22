import React from 'react';
import { Modal as ModalDefault, ModalProps, View, TouchableOpacity } from 'react-native';

import styles from './styles';

type Props = ModalProps & {
  height: number;
  close?: () => void;
  animationType?: 'none' | 'slide' | 'fade';
};

export const Modal = ({ height, close, animationType = 'fade', children, ...rest }: Props) => {
  return (
    <ModalDefault {...rest} animationType={animationType} transparent statusBarTranslucent onRequestClose={() => null}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={close} />
        <View style={{ ...styles.container, height }}>{children}</View>
      </View>
    </ModalDefault>
  );
};
