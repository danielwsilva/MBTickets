import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import theme from 'styles/theme';

import { Text } from '../Text';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  title?: string;
  hasBackButton?: boolean;
  hasClose?: boolean;
  action?: React.ReactNode;
};

export const Header = ({ title, hasBackButton = true, hasClose, action }: HeaderProps) => {
  const { goBack } = useNavigation();

  const { colors } = theme;

  return (
    <View style={styles.container}>
      {hasBackButton ? (
        <TouchableOpacity onPress={() => goBack()}>
          <AntDesign name="arrowleft" color={colors.white} size={16} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 16 }} />
      )}

      {title && (
        <Text color={colors.white} numberOfLines={1}>
          {title}
        </Text>
      )}

      {action ? (
        <View>{action}</View>
      ) : hasClose ? (
        <TouchableOpacity>
          <AntDesign name="close" color={theme.colors.text} size={16} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 16 }} />
      )}
    </View>
  );
};
