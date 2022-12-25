export type TicketResponse = {
  id: string;
  image: string;
  name: string;
  address: string;
  addressNumber: string;
  city: string;
  state: string;
  price: number;
  totalTickets: number;
  date: string;
  hour: string;
  categoty: 'Empresas' | 'Universidades';
  loading: boolean;
  amount: number;
};

type Card = {
  number: string;
  exp_date: string;
  holder: string;
  cvv: string;
}

export type PaymentRequest = {
  id: string;
  card: Card;
  tickets: TicketResponse[];
};
