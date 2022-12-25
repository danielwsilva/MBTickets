import PurchaseStack, { PurchaseRouteMap } from 'modules/purchase/routes/PurchaseStack';
import TicketStack from 'modules/ticket/routes/TicketStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ROUTES } from 'navigation/appRoutes';

type RoutesProps = {
  name: string;
  component: ({ route }: NativeStackScreenProps<PurchaseRouteMap>) => JSX.Element;
  iconName: 'shoppingcart' | 'tagso';
  size: number;
  textBottomBar: string;
}

export const MENU_ROUTES: RoutesProps[] = [
  {
    name: ROUTES.PURCHASE_STACK,
    component: PurchaseStack,
    iconName: 'shoppingcart',
    size: 22,
    textBottomBar: 'Comprar'
  },
  {
    name: ROUTES.TICKET_STACK,
    component: TicketStack,
    iconName: 'tagso',
    size: 24,
    textBottomBar: 'Meus ingressos'
  }
];
