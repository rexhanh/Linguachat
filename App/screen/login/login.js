import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput, Button, HelperText } from "react-native-paper";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
const LoginScreen = ({ navigation }) => {
  const [textinputUserName, setTextInputUserName] = useState("");
  const [textInputPassword, setTextInputPassword] = useState("");
  const [userNameBorderColor, setUserNameBorderColor] = useState("#000");
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);

  const [isUserNameRequired, setIsUserNameRequire] = useState(false);
  const clearInput = React.useCallback(() => onChangeText("", []));

  const handleTextOnChange = (value, type) => {
    switch (type) {
      case "username":
        setTextInputUserName(value);
        if (!value) {
          setIsUserNameRequire(true);
        } else {
          setIsUserNameRequire(false);
        }
        break;
      case "password":
        setTextInputPassword(value);
        if (!value) {
          setIsPasswordRequired(true);
        } else {
          setIsPasswordRequired(false);
        }
        break;
    }
  };

  // Need for later login
  const [userPwdBorderColor, setUserPwdBorderColor] = useState("#000");
  const shakingAnim = useRef(new Animated.Value(1)).current;

  // Handles forget password
  const handleForget = () => {
    console.log("handle forget");
  };

  // Handles userName textbox input
  const handleUserNameTextInput = (value) => {
    setTextInputUserName(value);
    setUserNameBorderColor("#000");
  };
  // Handles log in
  const handleLogin = async () => {
    setIsUserNameRequire(false);
    if (textinputUserName.length === 0) {
      setUserNameBorderColor("red");
      setIsUserNameRequire(true);
      return;
    }

    if (textInputPassword.length === 0) {
      setIsPasswordRequired(true);
      return;
    }
    setTextInputPassword("");
    setTextInputUserName("");
    // NAVIGATE TO MAIN SCREEN
    // Login with Firebase
    await doSignInWithEmailAndPassword(textinputUserName, textInputPassword)
      .then(() => {
        navigation.navigate("TabNavigator");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   Handles Sign up
  const handleSignup = () => {
    navigation.navigate("SignupScreen");
    setTextInputPassword("");
    setTextInputUserName("");
  };

  function handleKeyboardDismiss() {
    if (Platform.OS != "web") {
      Keyboard.dismiss();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => handleKeyboardDismiss()}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "row",
          }}
        ></View>
        <TextInput
          value={textinputUserName}
          error={isUserNameRequired}
          style={{
            backgroundColor: "transparent",
            fontSize: 20,
          }}
          label={"Email"}
          placeholder="Your Email"
          mode="outlined"
          outlineStyle={{ borderWidth: 2 }}
          left={
            <TextInput.Icon
              icon={() => <Icon name="user" size={24} />}
              disabled={true}
            />
          }
          onChangeText={(value) => handleTextOnChange(value, "username")}
        />
        <HelperText visible={isUserNameRequired} type="error">
          User name cannot be empty
        </HelperText>

        <TextInput
          value={textInputPassword}
          error={isPasswordRequired}
          style={{
            backgroundColor: "transparent",
            fontSize: 20,
          }}
          label={"Password"}
          placeholder="Please enter password"
          mode="outlined"
          secureTextEntry={true}
          outlineStyle={{ borderWidth: 2 }}
          left={<TextInput.Icon icon={() => <Icon name={"eye"} size={24} />} />}
          onChangeText={(value) => handleTextOnChange(value, "password")}
        />
        <HelperText visible={isPasswordRequired} type="error">
          Password cannot be empty
        </HelperText>

        <View
          style={{
            height: 30,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              width: "50%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          ></View>
          <View
            style={{
              width: "50%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => handleForget()}>
              <Text>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Login Button */}
        <Button
          mode="contained"
          style={{ height: 50, justifyContent: "center" }}
          contentStyle={{ height: "100%" }}
          labelStyle={{ fontSize: 30, lineHeight: 32 }}
          onPressOut={() => handleLogin()}
        >
          Login
        </Button>

        {/* Signup Button */}
        <Button
          mode="elevated"
          style={{ marginTop: 10, height: 50, justifyContent: "center" }}
          contentStyle={{ height: "100%" }}
          labelStyle={{ fontSize: 30, lineHeight: 32 }}
          onPressOut={() => handleSignup()}
        >
          Signup
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
});

export default LoginScreen;
