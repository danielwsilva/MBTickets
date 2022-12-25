import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from 'navigation/appRoutes';

import { MyTickets } from '../screens';

export type TicketRouteMap = {
  [ROUTES.TICKET_INITIAL]: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<TicketRouteMap>();

const TicketRoutes = () => {
  return (
    <Navigator
      initialRouteName={ROUTES.TICKET_INITIAL}
      screenOptions={{ headerShown: false, animation: 'slide_from_right', animationTypeForReplace: 'pop' }}
    >
      <Screen name={ROUTES.TICKET_INITIAL} component={MyTickets} />
    </Navigator>
  );
};

export default TicketRoutes;
