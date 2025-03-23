import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "../screen/main/main";
import ChatScreen from "../screen/user/user";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route, navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Chat"
        component={MainScreen}
        options={{
          tabBarColor: "#fff",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "chatbox" : "chatbox-outline"}
                size={25}
              ></Ionicons>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ChatScreen}
        options={{
          tabBarColor: "#fff",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={25}
              ></Ionicons>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
