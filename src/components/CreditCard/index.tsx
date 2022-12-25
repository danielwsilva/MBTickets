import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { onlyNumbers } from 'utils/helpers';

import svgs from '../Icon/svgs';
import { SVG } from '../Icon';
import { Text } from '../Text';
import styles from './styles';

type CreditCardProps = {
  cardFlag: keyof typeof svgs;
  cardNumber: string;
  expireDate: string;
  cardName: string;
  cardCvv: string;
};

export const CreditCard = ({
  cardNumber,
  expireDate,
  cardFlag,
  cardName,
  cardCvv
}: CreditCardProps) => {
  const cvv = cardCvv || '000';
  const expiredDate = expireDate || '00/00';
  const name = cardName || 'Nome como no cartão';

  const { width } = useWindowDimensions();

  const renderCardNumber = useMemo(() => {
    const cardNumberArray = onlyNumbers(cardNumber).split('');

    while (cardNumberArray.length < 16) {
      cardNumberArray.push('0');
    }

    const newCardNumber = cardNumberArray.join('');
    const formattedCardNumber = newCardNumber.match(/.{1,4}/g);

    return formattedCardNumber ? formattedCardNumber.join(' ') : '';
  }, [cardNumber]);

  return (
    <View style={styles.container}>
      <SVG name={cardFlag} width={width} style={{ alignSelf: 'center' }} />
      <View style={styles.wrapper}>
        <View style={styles.contentTop}>
          <Text fontSize={16} allowFontScaling={false} color="white">
            {renderCardNumber}
          </Text>
          <Text fontSize={16} allowFontScaling={false} color="white">
            {cvv}
          </Text>
        </View>
        <View style={styles.contentFooter}>
          <View>
            <Text fontSize={12} fontWeight="normal" color="white">
              Nome do titular
            </Text>
            <Text fontSize={14} color="white" numberOfLines={1} style={{ width: RFValue(160) }}>
              {name}
            </Text>
          </View>

          <View>
            <Text fontSize={12} allowFontScaling={false} fontWeight="normal" color="white">
              Validade
            </Text>
            <Text fontSize={14} allowFontScaling={false} color="white">
              {expiredDate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
