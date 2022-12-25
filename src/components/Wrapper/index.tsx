import React from 'react';
import { View, StatusBar, ViewStyle } from 'react-native';

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
      <View style={[styles.container, styleContainer]}>
        {children}
      </View>
    </>
  );
};
