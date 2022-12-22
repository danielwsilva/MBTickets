import { Platform } from 'react-native';
import axios from 'axios';

const API_TICKET = ' http://192.168.0.105:3333';

export const ticketAPI = axios.create({
  baseURL: API_TICKET,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Device: Platform.OS
  }
});

export default {
  ticketAPI
};
