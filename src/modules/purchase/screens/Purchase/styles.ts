import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from 'styles/theme';

export default StyleSheet.create({
  listHeader: {
    flex: 1,
    paddingHorizontal: RFValue(16)
  },
  headerStyle: {
    borderBottomWidth: 0.8,
    borderBottomColor: theme.colors.grayLight,
    paddingBottom: 10
  },
  containerInput: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: RFValue(8),
    elevation: 3
  },
  input: {
    flex: 1,
    fontSize: RFValue(14),
    fontFamily: theme.fonts.primary_400,
    color: theme.colors.text
  },
  containerFilter: {
    flexDirection: 'row',
    marginVertical: RFValue(24)
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginLeft: RFValue(8),
    paddingHorizontal: RFValue(10)
  },
  list: {
    paddingBottom: RFValue(100),
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButton: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: RFValue(10),
    marginBottom: RFValue(10),
    borderBottomColor: theme.colors.grayLight,
    borderStyle: 'dashed'
  }
});
