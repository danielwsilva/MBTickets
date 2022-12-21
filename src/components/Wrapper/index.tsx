import React from 'react';
import { View, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, ViewStyle } from 'react-native';

import { Header } from '../Header';
import { TextProps } from '../Text';

import styles from './styles';

type WrapperProps = TextProps & {
  title: string;
  hasBackButton?: boolean;
  hasClose?: boolean;
  action?: React.ReactNode;
  children: React.ReactNode;
  styleContainer?: ViewStyle;
  disabledScrollView?: boolean;
};

export const Wrapper = ({ children, disabledScrollView = false, styleContainer, ...props}: WrapperProps) => {
  return (
    <>
      <StatusBar barStyle='light-content' />
      <Header {...props}/>
      <View style={[styles.container, styleContainer]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {!disabledScrollView ? <ScrollView style={{ flex: 1 }}>{children}</ScrollView> : <>{children}</>}
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
