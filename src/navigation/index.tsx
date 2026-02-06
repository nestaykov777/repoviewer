import { ComponentProps } from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import feed from '../assets/feed.png';
import gear from '../assets/gear.png';
import { Home } from './screens/Home';
import { RepoDetail } from './screens/RepoDetail';
import { Settings } from './screens/Settings';

type RootStackParamList = {
  HomeTabs: undefined;
  RepoDetail: { owner: string; repo: string };
  NotFound: undefined;
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: t('navigation.feed'),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Image
              source={feed}
              tintColor={color}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t('navigation.settings'),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Image
              source={gear}
              tintColor={color}
              style={{
                width: size,
                height: size,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RepoDetail"
        component={RepoDetail}
        options={{
          title: t('navigation.repoDetail'),
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack.Navigator>
  );
}

export function Navigation(
  props: Omit<ComponentProps<typeof NavigationContainer>, 'children'>,
) {
  return (
    <NavigationContainer {...props}>
      <RootNavigator />
    </NavigationContainer>
  );
}
