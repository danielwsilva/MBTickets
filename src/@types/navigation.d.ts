import { PurchaseRouteMap } from 'modules/purchase/routes/PurchaseStack';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends PurchaseRouteMap,
        ProfileRouteMap {}
  }
}
