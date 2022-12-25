import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ticketAPI } from '../apiConfig';
import { createTicket, createMyTicket } from './keys';
import { TicketResponse, PaymentRequest } from './types';

export const useTicket = (options?: UseQueryOptions<TicketResponse[]>) => {
  return useQuery(
    createTicket(),
    (data) => ticketAPI.get<TicketResponse[]>('/tickets', data).then((response) => response.data),
    options
  );
};

export const useMyTicket = (options?: UseQueryOptions<PaymentRequest[]>) => {
  return useQuery(
    createMyTicket(),
    (data) => ticketAPI.get<PaymentRequest[]>('/payment', data).then((response) => response.data),
    options
  );
};

export const usePayment = () => {
  return useMutation<unknown, unknown, PaymentRequest>((data) =>
    ticketAPI.post('/payment', data).then((response) => response.data)
  );
};
