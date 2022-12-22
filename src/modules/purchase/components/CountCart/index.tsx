import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import theme from 'styles/theme';
import { Text } from 'components';

import styles from './styles';

export const CountCart = ({ ...rest }: TouchableOpacityProps) => {
  const { colors } = theme;

  return (
    <TouchableOpacity {...rest} activeOpacity={0.8}>
      <View style={styles.countCart}>
        <Text fontSize={10} color={colors.white}>99</Text>
      </View>

      <AntDesign name="shoppingcart" color={colors.white} size={18} />
    </TouchableOpacity>
  );
};
