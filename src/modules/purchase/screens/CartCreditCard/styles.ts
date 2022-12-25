import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(16),
    paddingBottom: RFValue(20)
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFValue(16)
  },
  modalText: {
    textAlign: 'center',
    marginTop: RFValue(32)
  }
});
