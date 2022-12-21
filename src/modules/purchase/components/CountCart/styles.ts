import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../../../styles/theme';

export default StyleSheet.create({
  countCart: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    width: RFValue(18),
    height: RFValue(18),
    top: RFValue(-8),
    left: RFValue(-8),
    zIndex: 1
  }
});
