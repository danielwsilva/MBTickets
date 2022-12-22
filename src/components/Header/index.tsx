import { View, TouchableOpacity, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import theme from '../../styles/theme';

import styles from './styles';

type HeaderProps = {
  title?: string;
  hasBackButton?: boolean;
  hasClose?: boolean;
  action?: React.ReactNode;
};

export const Header = ({ title, hasBackButton = true, hasClose, action }: HeaderProps) => {
  const { colors } = theme;

  return (
    <View style={styles.container}>
      {hasBackButton ? (
        <TouchableOpacity>
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
