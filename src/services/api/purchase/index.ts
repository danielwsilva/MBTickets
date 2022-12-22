import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ticketAPI } from '../../apiConfig';
import { createTicket } from './keys';
import { TicketResponse } from './types';

export const useTicket = (options?: UseQueryOptions<TicketResponse[]>) => {
  return useQuery(
    createTicket(),
    (data) => ticketAPI.get<TicketResponse[]>('/tickets', data).then((response) => response.data),
    options
  );
};
