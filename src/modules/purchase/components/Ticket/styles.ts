import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../../../styles/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    marginBottom: RFValue(16),
    marginHorizontal: RFValue(16),
    backgroundColor: theme.colors.white,
  },
  image: {
    borderRadius: 10,
    width: RFValue(92),
    height: RFValue(92),
    resizeMode: 'stretch',
  },
  content: {
    flex: 1,
    paddingHorizontal: RFValue(10)
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
