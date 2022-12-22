import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from 'styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: RFValue(16),
    backgroundColor: theme.colors.white
  }
});

