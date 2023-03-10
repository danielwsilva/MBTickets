import { Pressable, View, PressableProps, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'components';
import { ROUTES } from 'navigation/appRoutes';
import theme from 'styles/theme';

import { MENU_ROUTES } from './consts';
import styles from './styles';

const Tab = createBottomTabNavigator();

export const BottomNav = () => {
  const { colors } = theme;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName={ROUTES.PURCHASE_STACK}
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.navigator,
          tabBarHideOnKeyboard: true
        }}
      >
        {MENU_ROUTES.map((item) => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              tabBarLabel: () => null,
              tabBarButton: ({ onPress, ...props }: PressableProps) => {
                return <Pressable {...props} onPress={onPress} />;
              },
              tabBarIcon: ({ focused }) => (
                <View style={styles.content}>
                  <AntDesign name={item.iconName} size={item.size} color={focused ? colors.primary : colors.textLight} />
                  <Text
                    fontWeight="normal"
                    fontSize={12}
                    color={focused ? colors.primary : colors.textLight}
                    style={{ marginTop: 2, textAlign: 'center' }}
                  >
                    {item.textBottomBar}
                  </Text>
                </View>
              )
            }}
          />
        ))}
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};
