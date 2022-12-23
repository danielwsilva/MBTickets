import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from 'styles/theme';

type Props = {
  active: boolean;
}

export const getStyles = ({ active }: Props) => StyleSheet.create({
  button: {
    width: RFValue(84),
    paddingVertical: RFValue(4),
    backgroundColor: active ? theme.colors.success : theme.colors.primary
  }
});
