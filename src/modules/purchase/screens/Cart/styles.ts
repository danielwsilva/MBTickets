import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from 'styles/theme';

export default StyleSheet.create({
  containerTicket: {
    marginBottom: RFValue(16)
  },
  swipeable: {
    width: RFValue(74),
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ticket: {
    elevation: 0,
    borderRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    marginLeft: 16
  },
  ticketContent: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.grayLight,
    borderStyle: 'dotted'
  },
  footer: {
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(20)
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFValue(8)
  },
  listEmpty: {
    marginTop: '50%',
    alignItems: 'center',
    paddingHorizontal: RFValue(16)
  },
  listEmptyText: {
    marginTop: RFValue(16),
    textAlign: 'center'
  }
});
