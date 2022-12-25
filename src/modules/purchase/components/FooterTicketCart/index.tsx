import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { Text } from 'components';
import { TicketResponse } from 'services/api/types';
import theme from 'styles/theme';

import styles from './styles';
import { TouchableOpacity, View } from 'react-native';
import { useCart } from 'hooks/cart';

type FooterTicketPurchaseProps = {
  data: TicketResponse;
}

export const FooterTicketCart = ({ data }: FooterTicketPurchaseProps) => {
  const [amount, setAmount] = useState(data.amount);
  const { updateTicket } = useCart();

  const { colors } = theme;

  const increment = () => {
    const amount = updateTicket(data, data.amount + 1);
    setAmount(amount);
  };

  const decrement = () => {
    const amount = updateTicket(data, data.amount - 1);
    setAmount(amount);
  };

  const total = (data.price * amount).toFixed(2).replace('.', ',');

  return (
    <>
      <View style={styles.wrapper}>
        <TouchableOpacity style={{ ...styles.buttonMinus, backgroundColor: colors.black }} onPress={decrement}>
          <Feather name="minus" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.text}>{amount}</Text>
        <TouchableOpacity style={{ ...styles.buttonPlus, backgroundColor: colors.none }} onPress={increment}>
          <Feather name="plus" size={20} color={colors.black} />
        </TouchableOpacity>
      </View>
      <Text fontSize={14}>{`R$ ${total}`}</Text>
    </>
  );
};
