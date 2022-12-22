import { Image, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';

import { Text, Button } from '../../../../components';
import { TicketResponse } from '../../../../services/api/purchase/types';
import theme from '../../../../styles/theme';

import styles from './styles';

type TicketProps = {
  data: TicketResponse;
};

export const Ticket = ({ data }: TicketProps) => {
  const { colors } = theme;
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.wrapper}>
          <Text fontSize={14} numberOfLines={1} style={{ flex: 1, marginRight: RFValue(6) }}>
            {data.name}
          </Text>
          <View style={styles.wrapper}>
            <Feather name="clock" size={18} color={colors.primary} />
            <Text fontSize={10} style={{ marginLeft: RFValue(4) }}>
              {data.hour}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.wrapper, marginVertical: RFValue(6) }}>
          <SimpleLineIcons name="location-pin" size={14} color={colors.textLight} />
          <Text fontSize={10} numberOfLines={1} style={{ flex: 1, marginLeft: RFValue(4) }}>
            {`${data.address}, ${data.addressNumber} - ${data.city}/${data.state}`}
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text fontSize={14}>{`R$ ${data.price.toFixed(2).replace('.', ',')}`}</Text>
          <Button fontWeight="normal" fontSize={14} buttonStyle={{ paddingVertical: RFValue(4) }}>
              Comprar
          </Button>
        </View>
      </View>
    </View>
  );
};
