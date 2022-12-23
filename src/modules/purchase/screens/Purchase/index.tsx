import { useState, useCallback, useMemo, useEffect } from 'react';
import { TouchableOpacity, View, TextInput } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { format } from 'date-fns';

import { Button, Modal, Text, Wrapper } from 'components';
import { useTicket } from 'services/api/purchase';
import { TicketResponse } from 'services/api/purchase/types';
import theme from 'styles/theme';

import { CountCart, Day, FooterTicketPurchase, Ticket } from '../../components';
import { PurchaseSkeleton } from '../../skeletons/PurchaseSkeleton';
import { ptBR } from './localeConfig';
import styles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useCart } from 'hooks/cart';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

const CATEGORY = ['Todos', 'Empresas', 'Universidades'];

export const Purchase = () => {
  const [name, setName] = useState('');
  const [category, setCategoty] = useState('Todos');
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [ticketsAll, setTicketsAll] = useState<TicketResponse[]>([]);
  const [initialDate, setInitialDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { colors, fonts } = theme;
  const { data, refetch } = useTicket();

  const filterCalendarDate = (value: string, render?: boolean) => {
    if (!render && initialDate === value) return;
    setInitialDate(value);
    setLoading(true);
    setTickets([]);

    if (!data) return;
    setTimeout(() => {
      setTickets(data?.filter((item) => item.date.includes(value)));
      setTicketsAll(data?.filter((item) => item.date.includes(value)));
      setLoading(false);
      setRefreshing(false);
    }, 700);
  };

  const dataFormatted = useMemo(() => {
    filterCalendarDate(initialDate, true);
  }, [data, refreshing]);

  const filterModalCategoty = (array: TicketResponse[], value: string) => {
    if (value !== 'Todos') return array.filter((item) => item.categoty.includes(value));

    return array;
  };

  const filterSearchName = (array: TicketResponse[], value: string) => {
    return array.filter((item) => item.name.toUpperCase().includes(value.toUpperCase()));
  };

  const handlePressCategory = (value: string) => {
    setCategoty(value);
    setVisible(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
  }, [refetch]);

  useEffect(() => {
    let result = ticketsAll;

    result = filterSearchName(result, name);
    result = filterModalCategoty(result, category);

    setTickets(result);
  }, [name, category]);

  const listHeaderComponent = useMemo(
    () => (
      <View style={styles.listHeader}>
        <Calendar
          firstDay={1}
          hideExtraDays
          minDate={new Date().toDateString()}
          renderArrow={(direction) => (
            <Feather size={24} color={colors.textLight} name={direction == 'left' ? 'chevron-left' : 'chevron-right'} />
          )}
          dayComponent={({ date, state }) => (
            <Day
              date={date?.day}
              disabled={state === 'disabled'}
              isActive={initialDate === date?.dateString}
              onPress={() => filterCalendarDate(state !== 'disabled' ? date!.dateString : initialDate) }
            />
          )}
          headerStyle={styles.headerStyle}
          theme={{
            textDayHeaderFontFamily: fonts.primary_400,
            textMonthFontSize: 20,
            monthTextColor: colors.text,
            arrowStyle: {
              marginHorizontal: -15
            }
          }}
        />

        <View style={styles.containerFilter}>
          <View style={styles.containerInput}>
            <Feather name="search" size={24} color={colors.textLight} style={{ marginRight: 14 }} />
            <TextInput
              placeholder="Buscar ingressos"
              value={name}
              onChangeText={setName}
              placeholderTextColor={colors.textLight}
              style={styles.input}
            />
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => setVisible(true)}>
            <Text color={colors.white} fontSize={14} numberOfLines={1} style={{ flex: 1 }}>
              {category}
            </Text>
            <Feather name="chevron-down" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [initialDate, dataFormatted, name, category, data]
  );

  const renderEmptyComponent = () => {
    if (loading) return <PurchaseSkeleton />;

    return (
      <Text
        color={colors.textLight}
        fontWeight="normal"
        fontSize={14}
        style={{ paddingHorizontal: 16, textAlign: 'center' }}
      >
        Não encontramos ingressos nesse período.
      </Text>
    );
  };

  return (
    <>
      <Wrapper title="Ingressos" hasBackButton={false} action={<CountCart />}>
        <FlashList
          data={tickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Ticket data={item}>
              <FooterTicketPurchase data={item} />
            </Ticket>
          )}
          ListHeaderComponent={listHeaderComponent}
          ListEmptyComponent={renderEmptyComponent}
          onRefresh={onRefresh}
          refreshing={refreshing}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={200}
        />
      </Wrapper>
      <Modal visible={visible} close={() => setVisible(!visible)} height={200}>
        <View style={styles.modalContainer}>
          {CATEGORY.map((item) => (
            <TouchableOpacity
              key={item}
              style={{ ...styles.modalButton, borderBottomWidth: CATEGORY[CATEGORY.length - 1] !== item ? 1 : 0 }}
              onPress={() => handlePressCategory(item)}
            >
              <Text fontSize={18} fontWeight="bold" color={category === item ? colors.primary : colors.text}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
};
