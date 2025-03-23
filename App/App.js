import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import TabNavigator from "./navigation/navigator";
import LoginScreen from "./screen/login/login";
import SignupScreen from "./screen/signup/signup";
import MainScreen from "./screen/main/main";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    // <MainScreen />
    // <NavigationContainer>
    //   <View>
    //     <Stack.Navigator initialRouteName="MainScreen">
    //       <Stack.Screen name="MainScreen" component={MainScreen} />
    //     </Stack.Navigator>
    //   </View>
    // </NavigationContainer>
    // <NavigationContainer>
    //   <TabNavigator />
    // </NavigationContainer>
    // <LoginScreen />

    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"

          // screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerBackTitle: "Back", headerTitle: "Sign Up" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    // <MainScreen />

    // <NavigationContainer>
    //   <TabNavigator />
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
