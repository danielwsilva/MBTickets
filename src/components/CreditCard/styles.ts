import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: RFValue(24),
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: RFValue(40),
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: RFValue(15),
  },
  contentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(20)
  }
});
