import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from 'styles/theme';

export const getStyles = (isActive: boolean, disabled: boolean) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      width: RFValue(32),
      height: RFValue(32),
      justifyContent: 'center',
      backgroundColor: isActive ? theme.colors.primary : theme.colors.none,
    },
    text: {
      textAlign: 'center',
      color: disabled ? theme.colors.grayLight : isActive ? theme.colors.white : theme.colors.text
    }
  });
