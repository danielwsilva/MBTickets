import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { format } from 'date-fns';

import { Button, Text, Wrapper } from 'components';
import { Ticket } from 'modules/purchase/components';
import { useMyTicket } from 'services/api';
import { PaymentRequest, TicketResponse } from 'services/api/types';
import theme from 'styles/theme';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export const MyTickets = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { colors } = theme;

  const { goBack } = useNavigation();

  const { data, refetch } = useMyTicket({
    onSettled() {
      setRefreshing(false);
    }
  });

  const tickets = data?.reduce((finalArr: TicketResponse[], item: PaymentRequest) => {
    if (item.tickets) {
      const products = item.tickets.map((product) => {
        return {
          ...product,
          date: format(new Date(product.date), 'dd/MM/yy')
        };
      });

      finalArr.push(...products);
    }

    return finalArr;
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
  }, [refetch]);

  const listEmptyComponent = () => (
    <View style={styles.listEmpty}>
      <Feather name="alert-triangle" size={48} color={colors.warning} style={{ alignSelf: 'center' }} />
      <Text fontWeight="normal" style={styles.listEmptyText}>
        {'Você ainda não tem ingressos :( \n\n Quer saber a boa de hoje?\n Seu ingresso tá aqui! Vem ver ;) '}
      </Text>
      <Button onPress={() => goBack()}>Ver ingressos</Button>
    </View>
  );

  const renderItem: ListRenderItem<TicketResponse> = ({ item }) => (
    <Ticket data={item}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name="tagso" size={18} color={colors.primary} />
        <Text fontSize={14}>{item.amount}</Text>
      </View>
      <Text fontSize={14}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
      <Text fontSize={14}>{item.date}</Text>
    </Ticket>
  );

  return (
    <Wrapper title="Meus ingressos" hasBackButton={false}>
      <FlashList
        data={tickets}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        onRefresh={onRefresh}
        refreshing={refreshing}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
      />
    </Wrapper>
  );
};
