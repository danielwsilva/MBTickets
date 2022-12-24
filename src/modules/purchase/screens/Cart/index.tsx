import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Button, Text, Wrapper } from 'components';
import { useCart } from 'hooks/cart';
import { ROUTES } from 'navigation/appRoutes';
import { TicketResponse } from 'services/api/purchase/types';
import theme from 'styles/theme';

import {FooterTicketCart, Ticket } from '../../components';
import styles from './styles';

export const Cart = () => {
  const { cart, total, calcTotal, removeProduct } = useCart();

  const { navigate } = useNavigation();

  const { colors } = theme;

  const listEmptyComponent = () => (
    <View style={styles.listEmpty}>
      <Feather name="alert-triangle" size={48} color={colors.warning} />
      <Text fontWeight="normal" style={styles.listEmptyText}>
        {'Seu carrinho está vazio :( \n\nAdicione ingressos clicando no botão Comprar'}
      </Text>
    </View>
  );

  const renderItem: ListRenderItem<TicketResponse> = ({ item }) => {
    const hasSeperator = cart[cart.length - 1].id !== item.id;

    const rightSwipe = () => (
      <TouchableOpacity onPress={() => removeProduct(item)} style={styles.swipeable}>
        <Ionicons name="md-trash-sharp" size={20} color={colors.white} />
        <Text color={colors.white} fontSize={12}>
          Excluir
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.containerTicket}>
        <Swipeable overshootRight={false} renderRightActions={rightSwipe}>
          <Ticket
            data={item}
            style={styles.ticket}
            styleContent={{ ...styles.ticketContent, borderBottomWidth: hasSeperator ? 2 : 0 }}
          >
            <FooterTicketCart data={item} />
          </Ticket>
        </Swipeable>
      </View>
    );
  };

  useEffect(() => {
    calcTotal(cart);
  }, [cart]);

  return (
    <Wrapper title="Carrinho">
      <FlashList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
      />

      <View style={styles.footer}>
        <View style={styles.wrapper}>
          <Text>TOTAL</Text>
          <Text>{`R$ ${total.toFixed(2).replace('.', ',')}`}</Text>
        </View>
        <Button disabled={!cart.length} onPress={() => navigate(ROUTES.PURCHASE_CREDIT_CARD)}>
          Avançar
        </Button>
      </View>
    </Wrapper>
  );
};
