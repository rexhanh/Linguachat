import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../../firebase/firebase";
const ChatScreen = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // After sign out, you could navigate back to a login screen, for example:
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
        <Text style={styles.title}>Profile Information</Text>
        <Text style={styles.subtitle}>User Email</Text>
        <Text style={styles.emailText}>{auth.currentUser.email}</Text>

        {/* <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity> */}
        <Button
          mode="outlined"
          style={styles.signOutButton}
          contentStyle={{ height: "100%" }}
          labelStyle={{ fontSize: 30, lineHeight: 30 }}
          onPressOut={() => handleSignOut()}
          textColor="red"
        >
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1cc",
//     justifyContent: "center",
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "500",
  },
  emailText: {
    fontSize: 16,
    marginBottom: 24,
  },
  signOutButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    // alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  signOutButtonText: {
    fontSize: 16,
  },
});
export default ChatScreen;
