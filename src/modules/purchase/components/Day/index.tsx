import { TouchableOpacity } from 'react-native';

import { Text } from 'components';

import { getStyles } from './styles';

type DayProps = {
  date: number | undefined;
  isActive: boolean;
  disabled: boolean;
  onPress: () => void;
};

export const Day = ({ date, isActive, disabled, onPress }: DayProps) => {
  const styles = getStyles(isActive, disabled);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text fontSize={12} fontWeight="normal" style={styles.text}>
        {date}
      </Text>
    </TouchableOpacity>
  );
};
