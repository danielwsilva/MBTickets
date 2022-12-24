import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from 'hooks/cart';

import { ROUTES } from 'navigation/appRoutes';

import { Purchase, Cart } from '../screens';

export type PurchaseRouteMap = {
  [ROUTES.PURCHASE_INITIAL]: undefined;
  [ROUTES.PURCHASE_CART]: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<PurchaseRouteMap>();

const PurchaseRoutes = () => {
  return (
    <CartProvider>
      <Navigator
        initialRouteName={ROUTES.PURCHASE_INITIAL}
        screenOptions={{ headerShown: false, animation: 'slide_from_right', animationTypeForReplace: 'pop' }}
      >
        <Screen name={ROUTES.PURCHASE_INITIAL} component={Purchase} />
        <Screen name={ROUTES.PURCHASE_CART} component={Cart} />
      </Navigator>
    </CartProvider>
  );
};

export default PurchaseRoutes;
