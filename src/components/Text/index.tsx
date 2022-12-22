import { StyleProp, Text as DefaultText, TextProps as TextPropsDefault, TextStyle } from 'react-native';

import theme from '../../styles/theme';

import { getStyles } from './styles';

export type TextProps = TextPropsDefault & {
  style?: StyleProp<TextStyle>;
  fontWeight?: 'normal' | 'semiBold' | 'bold';
  fontSize?: number;
  color?: string;
};

export const Text = ({
  style,
  fontWeight = 'semiBold',
  fontSize = 16,
  color = theme.colors.text,
  children,
  ...props
}: TextProps) => {
  const styles = getStyles(fontWeight, fontSize, color);

  return (
    <DefaultText {...props} style={[styles.text, style]}>
      {children}
    </DefaultText>
  );
};
