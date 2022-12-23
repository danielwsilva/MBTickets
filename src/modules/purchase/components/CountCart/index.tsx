import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Text } from 'components';
import { useCart } from 'hooks/cart';
import theme from 'styles/theme';

import styles from './styles';

export const CountCart = ({ ...rest }: TouchableOpacityProps) => {
  const { colors } = theme;
  const { cart } = useCart();

  return (
    <TouchableOpacity {...rest} activeOpacity={0.8}>
      {!!cart.length && (
        <View style={styles.countCart}>
          <Text fontSize={10} color={colors.white}>
            {cart.length}
          </Text>
        </View>
      )}

      <AntDesign name="shoppingcart" color={colors.white} size={18} />
    </TouchableOpacity>
  );
};
