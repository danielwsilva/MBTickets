import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  list: {
    paddingTop: RFValue(1),
    paddingBottom: RFValue(100),
  },
  listEmpty: {
    marginTop: '50%',
    paddingHorizontal: RFValue(16)
  },
  listEmptyText: {
    marginTop: RFValue(16),
    marginBottom: RFValue(32),
    textAlign: 'center'
  }
});
