import { useState } from 'react';
import { Platform, View, ScrollView } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { v4 } from 'uuid';

import { Button, Input, Text, Wrapper, CreditCard, Modal } from 'components';
import { cardFlagKey, validityCardCredMask } from 'utils/helpers';
import svgs from 'components/Icon/svgs';
import { useCart } from 'hooks/cart';
import { ROUTES } from 'navigation/appRoutes';
import { usePayment } from 'services/api';
import { createMyTicket } from 'services/api/keys';
import theme from 'styles/theme';

import { CardInfo, initialValues, validate, validationSchema } from './form';
import styles from './styles';

export const CartCreditCard = () => {
  const [cardFlag, setCardFlag] = useState<keyof typeof svgs>('defaultCard');
  const [visible, setVisible] = useState(false);

  const { cart, setCart } = useCart();
  const { mutate, isLoading } = usePayment();
  const { dispatch } = useNavigation();
  const queryClient = useQueryClient();

  const { colors } = theme;

  const onSubmit = (values: CardInfo) => {
    const item = { id: v4(), card: values, tickets: cart };
    mutate(item, {
      onSuccess() {
        setVisible(true);

        setTimeout(() => {
          queryClient.invalidateQueries(createMyTicket());
          setVisible(false);
          setCart([]);

          dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ROUTES.PURCHASE_INITIAL }]
            })
          );
        }, 3000);
      }
    });
  };

  const disabled = (values: CardInfo) => {
    return !values.number || !values.cvv || !values.exp_date || !values.holder;
  };

  return (
    <>
      <Wrapper title="Pagamento" styleContainer={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, handleSubmit, values, errors, setErrors }) => (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ textAlign: 'center' }}>Cadastre seu cartão de crédito para efetuar o pagamentos</Text>

                <CreditCard
                  cardNumber={values.number}
                  expireDate={values.exp_date}
                  cardFlag={cardFlag}
                  cardName={values.holder}
                  cardCvv={values.cvv}
                />

                <Input
                  placeholder="Número do cartão"
                  valid={errors.number === '' || !errors.number}
                  errorText={errors.number}
                  value={values.number}
                  onChangeText={handleChange('number')}
                  keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
                  mask={Masks.CREDIT_CARD}
                  onChange={(event) => {
                    setErrors({ ...errors, number: '' });

                    const card = cardFlagKey(event.nativeEvent.text) as keyof typeof svgs;
                    setCardFlag(card);
                  }}
                  maxLength={19}
                />

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Input
                      placeholder="Validade"
                      valid={errors.exp_date === '' || !errors.exp_date}
                      errorText={errors.exp_date}
                      onChangeText={handleChange('exp_date')}
                      value={values.exp_date}
                      keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
                      mask={validityCardCredMask}
                      onChange={() => setErrors({ ...errors, exp_date: '' })}
                      maxLength={5}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: RFValue(20) }}>
                    <Input
                      placeholder="CVV"
                      valid={errors.cvv === '' || !errors.cvv}
                      errorText={errors.cvv}
                      onChangeText={handleChange('cvv')}
                      value={values.cvv}
                      keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
                      onChange={() => setErrors({ ...errors, cvv: '' })}
                      maxLength={3}
                    />
                  </View>
                </View>

                <Input
                  placeholder="Nome como no cartão"
                  valid={errors.holder === '' || !errors.holder}
                  errorText={errors.holder}
                  onChangeText={handleChange('holder')}
                  value={values.holder}
                  onChange={() => setErrors({ ...errors, holder: '' })}
                  maxLength={64}
                />
              </ScrollView>

              <Button disabled={disabled(values) || isLoading} loading={isLoading} onPress={() => handleSubmit()}>
                Finalizar pagamento
              </Button>
            </>
          )}
        </Formik>
      </Wrapper>

      <Modal visible={visible} height={500}>
        <View style={styles.modal}>
          <AntDesign name="checkcircle" size={180} color={colors.success} />
          <Text fontWeight="bold" fontSize={24} color={colors.success} style={styles.modalText}>
            {'Compra realizada\n com sucesso'}
          </Text>
        </View>
      </Modal>
    </>
  );
};
