import React from 'react';
import { ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import theme from '../../styles/theme';
import { Text, TextProps } from '../Text';

import { getStyles } from './styles';

type ButtonProps = TextProps & {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  buttonColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const Button = ({
  color,
  fontWeight,
  loading,
  disabled,
  children,
  buttonColor,
  buttonStyle,
  onPress,
  ...rest
}: ButtonProps) => {
  const { colors } = theme;
  const styles = getStyles({ disabled, color: buttonColor || colors.primary });

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={onPress} style={[styles.container, buttonStyle]}>
      {loading ? (
        <ActivityIndicator size={24} color={colors.white} />
      ) : (
        <Text color={color || colors.white} fontWeight={fontWeight || 'bold'} {...rest}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
