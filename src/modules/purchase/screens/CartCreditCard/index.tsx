import { useState } from 'react';
import { Platform, View, ScrollView } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { Formik } from 'formik';
import { v4 } from 'uuid';

import { Button, Input, Text, Wrapper, CreditCard } from 'components';
import { cardFlagKey, validityCardCredMask } from 'utils/helpers';
import svgs from 'components/Icon/svgs';

import { CardInfo, initialValues, validate, validationSchema } from './form';
import { usePayment } from 'services/api/purchase';
import { useCart } from 'hooks/cart';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ROUTES } from 'navigation/appRoutes';

export const CartCreditCard = () => {
  const [cardFlag, setCardFlag] = useState<keyof typeof svgs>('defaultCard');
  const { cart, setCart } = useCart();

  const { mutate, isLoading } = usePayment();
  const { dispatch } = useNavigation();

  const onSubmit = (values: CardInfo) => {
    const item = { id: v4(), card: values, tickets: cart };
    mutate(item, {
      onSuccess() {
        setCart([]);
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ROUTES.PURCHASE_INITIAL }]
          })
        );
      }
    });
  };

  const disabled = (values: CardInfo) => {
    return !values.number || !values.cvv || !values.exp_date || !values.holder;
  };

  return (
    <Wrapper title="Pagamento" styleContainer={{ paddingHorizontal: 16,  paddingBottom: 20 }}>
      <Text style={{ textAlign: 'center' }}>Cadastre seu cartão de crédito para efetuar o pagamentos</Text>

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
                <View style={{ flex: 1, marginLeft: 20 }}>
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

            <Button disabled={disabled(values) || isLoading} loading={isLoading} onPress={() => handleSubmit()} >
                Finalizar pagamento
            </Button>
          </>
        )}
      </Formik>
    </Wrapper>
  );
};
