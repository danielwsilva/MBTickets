import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartProvider } from 'hooks/cart';

import styles from 'navigation/tabNavigation/styles';
import { ROUTES } from 'navigation/appRoutes';
import { useEffect } from 'react';

import { Purchase, Cart, CartCreditCard } from '../screens';

export type PurchaseRouteMap = {
  [ROUTES.PURCHASE_INITIAL]: undefined;
  [ROUTES.PURCHASE_CART]: undefined;
  [ROUTES.PURCHASE_CREDIT_CARD]: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<PurchaseRouteMap>();

const PurchaseRoutes = ({ route }: NativeStackScreenProps<PurchaseRouteMap>) => {
  const navigation = useNavigation();

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (!!routeName && routeName !== ROUTES.PURCHASE_INITIAL) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: styles.navigator });
    }
  }, [navigation, route]);

  return (
    <CartProvider>
      <Navigator
        initialRouteName={ROUTES.PURCHASE_INITIAL}
        screenOptions={{ headerShown: false, animation: 'slide_from_right', animationTypeForReplace: 'pop' }}
      >
        <Screen name={ROUTES.PURCHASE_INITIAL} component={Purchase} />
        <Screen name={ROUTES.PURCHASE_CART} component={Cart} />
        <Screen name={ROUTES.PURCHASE_CREDIT_CARD} component={CartCreditCard} />
      </Navigator>
    </CartProvider>
  );
};

export default PurchaseRoutes;
