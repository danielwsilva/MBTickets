import React from 'react';
import { View, StatusBar, ViewStyle, KeyboardAvoidingView, Platform } from 'react-native';

import theme from 'styles/theme';

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
};

export const Wrapper = ({ children, styleContainer, ...props }: WrapperProps) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.black} />
      <Header {...props} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={[styles.container, styleContainer]}>{children}</View>
      </KeyboardAvoidingView>
    </>
  );
};
