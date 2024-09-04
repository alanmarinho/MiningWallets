import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Image, Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Minerando',
          headerShown: false,

          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="pickaxe" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="desafios"
        options={{
          title: 'Desafios',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="local-fire-department" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Resultados',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="btc" color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
