import { useState } from 'react';
import { Platform, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { Formik } from 'formik';

import { Button, Input, Text, Wrapper, CreditCard } from 'components';
import { cardFlagKey, validityCardCredMask } from 'utils/helpers';
import svgs from 'components/Icon/svgs';

import { CardInfo, initialValues, validate, validationSchema } from './form';

export const CartCreditCard = () => {
  const [cardFlag, setCardFlag] = useState<keyof typeof svgs>('defaultCard');

  const onSubmit = (values: CardInfo) => {
    console.log(values);
  };

  const disabled = (values: CardInfo) => {
    return !values.number || !values.cvv || !values.exp_date || !values.holder;
  };

  return (
    <Wrapper title="Pagamento" styleContainer={{ paddingHorizontal: 16 }}>
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
          <View style={{ flex: 1, marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
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
            </View>

            <Button onPress={() => handleSubmit()} disabled={disabled(values)}>
              Finalizar pagamento
            </Button>
          </View>
        )}
      </Formik>
    </Wrapper>
  );
};
