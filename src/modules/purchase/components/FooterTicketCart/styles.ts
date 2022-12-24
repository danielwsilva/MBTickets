import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonMinus: {
    padding: RFValue(4),
    borderRadius: 8,
    borderWidth: 1
  },
  buttonPlus: {
    padding: RFValue(4),
    borderRadius: 8,
    borderWidth: 1
  },
  text: {
    textAlign: 'center',
    width: RFValue(34)
  }
});
