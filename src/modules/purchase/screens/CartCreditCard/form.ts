import * as Yup from 'yup';

export type CardInfo = {
  number: string;
  exp_date: string;
  cvv: string;
  holder: string;
};

export const initialValues: CardInfo = {
  number: '',
  exp_date: '',
  cvv: '',
  holder: ''
};

export const validationSchema = Yup.object().shape({
  number: Yup.string().min(15, 'Cartão inválido.'),
  cvv: Yup.string().min(3, 'Insira um código válido.'),
  exp_date: Yup.string().min(3, 'Insira um código válido.')
});

const getYear = () => {
  const year = new Date().getFullYear();
  return year.toString().substring(2);
};

export const validate = (values: CardInfo) => {
  const errors = {} as CardInfo;

  if (
    values.exp_date &&
    (values.exp_date.length < 5 ||
    Number(values.exp_date.substring(0, 2)) > 12 ||
    Number(values.exp_date.substring(0, 2)) < 1) ||
    getYear() > values.exp_date.substring(3)
  ) {
    errors.exp_date = 'Insira uma data válida.';
  }

  if (values.holder && !/\s/g.test(values.holder.trim())) {
    errors.holder = 'Nome e sobrenome como no cartão.';
  }

  return errors;
};
