import { PurchaseRouteMap } from 'modules/purchase/routes/PurchaseStack';
import { TicketRouteMap } from 'modules/ticket/routes/TicketStack';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends PurchaseRouteMap,
        TicketRouteMap {}
  }
}
