import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from 'styles/theme';

type Props = {
  disabled?: boolean;
  color: string;
}

export const getStyles = ({ disabled, color }: Props) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: disabled ? theme.colors.textLight : color,
      paddingVertical: RFValue(14),
      paddingHorizontal: RFValue(10),
      borderRadius: 8
    }
  });
};
