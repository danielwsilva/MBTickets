import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from 'styles/theme';

type Props = {
  valid: boolean;
  isFocused?: boolean;
};

const getStyles = ({ valid, isFocused }: Props) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    container: {
      paddingBottom: RFValue(14)
    },
    label: {
      color: !valid ? colors.error : isFocused ? colors.textLight : colors.textLight,
      fontFamily: fonts.primary_400,
      lineHeight: 20
    },
    inputAndIconContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      fontFamily: fonts.primary_400,
      borderBottomWidth: 1,
      borderBottomColor: !valid ? colors.error : colors.lightGray,
      color: !valid ? colors.error : colors.text,
      fontSize: RFValue(16)
    },
    errorText: {
      fontSize: RFValue(12),
      color: colors.error,
      fontFamily: fonts.primary_400
    },
  });
};

export default getStyles;
