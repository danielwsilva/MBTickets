import { useMemo } from 'react';
import { Feather } from '@expo/vector-icons';

import { useCart } from 'hooks/cart';
import { Button, Text } from 'components';
import { TicketResponse } from 'services/api/purchase/types';
import theme from 'styles/theme';

import { getStyles } from './styles';

type FooterTicketPurchaseProps = {
  data: TicketResponse;
}

export const FooterTicketPurchase = ({ data }: FooterTicketPurchaseProps) => {
  const { cart, addTicket } = useCart();
  const { colors } = theme;

  const ticketCart = useMemo(() => cart.find((ticket) => ticket.id === data.id), [cart]);
  const active = ticketCart?.id === data.id;

  const styles = getStyles({ active });

  const handleAddCart = () => {
    addTicket({ ...data, amount: 1 });
  };

  return (
    <>
      <Text fontSize={14}>{`R$ ${data.price.toFixed(2).replace('.', ',')}`}</Text>
      <Button fontWeight="normal" fontSize={14} buttonStyle={styles.button} onPress={handleAddCart}>
        {active ? <Feather name="check" size={20} color={colors.white} /> : 'Comprar'}
      </Button>
    </>
  );

};
