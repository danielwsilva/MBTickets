import { Image, View } from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { Text, Button } from '../../../../components';
import theme from '../../../../styles/theme';

import styles from './styles';

export const Ticket = () => {
  const { colors } = theme;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/p/AF1QipNkSsRe5qSbhvfQgyqvL6fPMxqTnps50EF14uIs=s680-w680-h510'
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.wrapper}>
          <Text fontSize={14} numberOfLines={1} style={{ flex: 1, marginRight: RFValue(6) }}>
            Casa Boulevard Festas
          </Text>
          <View style={styles.wrapper}>
            <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color={colors.primary} />
            <Text fontSize={10} style={{ marginLeft: RFValue(4) }}>
              2 Ingresso(s)
            </Text>
          </View>
        </View>
        <View style={{ ...styles.wrapper, marginVertical: RFValue(4) }}>
          <SimpleLineIcons name="location-pin" size={20} color={colors.textLight} />
          <Text fontSize={10} numberOfLines={1} style={{ flex: 1, marginLeft: RFValue(4) }}>
            R. Cmte. Marcondes, 1620 - Ribeirão Preto
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text fontSize={14}>R$ 32,00</Text>
          <Button fontWeight='normal' fontSize={14} buttonStyle={{ paddingVertical: RFValue(4) }}>
            Comprar
          </Button>
        </View>
      </View>
    </View>
  );
};
