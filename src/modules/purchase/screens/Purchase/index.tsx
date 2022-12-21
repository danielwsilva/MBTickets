import { useState } from 'react';
import { TouchableOpacity, View, TextInput } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Feather  } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

import { Text, Wrapper } from '../../../../components';
import theme from '../../../../styles/theme';

import { CountCart, Day, Ticket } from '../../components';
import { ptBR } from './localeConfig';
import styles from './styles';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export const Purchase = () => {
  const [initialDate, setInitialDate] = useState('2022-12-21');
  const { colors, fonts } = theme;

  const listHeaderComponent = () => (
    <View style={styles.listHeader}>
      <Calendar
        firstDay={1}
        minDate={new Date().toDateString()}
        renderArrow={(direction) => (
          <Feather size={24} color={colors.textLight} name={direction == 'left' ? 'chevron-left' : 'chevron-right'} />
        )}
        dayComponent={({ date, state }) => (
          <Day
            date={date?.day}
            disabled={state === 'disabled'}
            isActive={initialDate === date?.dateString}
            onPress={() => setInitialDate(state !== 'disabled' ? date!.dateString : initialDate)}
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
            placeholderTextColor={colors.textLight}
            onChange={() => ''}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text color={colors.white}>Todos</Text>
          <Feather name="chevron-down" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Wrapper title="Ingressos" disabledScrollView hasBackButton={false} action={<CountCart />}>

      <FlashList
        data={[1,2,3,4,5,6,7,8]}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <Ticket />}
        ListHeaderComponent={listHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        estimatedItemSize={200}
      />

    </Wrapper>
  );
};
