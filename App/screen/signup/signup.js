import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, HelperText } from "react-native-paper";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
const SignupScreen = ({ navigation }) => {
  const [userName, setuserName] = useState("");
  const [emailAdd, setemailAdd] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [isConfirmPasswordRequired, setIsConfirmPasswordRequired] =
    useState(false);
  const [firebaseResponse, setFirebaseResponse] = useState("");
  async function handleNext() {
    if (userName === "") {
      Alert.alert("Please enter your user name");
    } else if (emailAdd === "" && confirmEmailAdd === "") {
      Alert.alert("Please enter your email");
    } else if (emailAdd !== confirmEmailAdd) {
      Alert.alert("Email address not matching");
    } else if (password === "") {
      Alert.alert("Please enter you password");
    } else if (password !== confirmPassword) {
      Alert.alert("Your passwords are not matching");
    } else {
      console.log("All good");
    }

    return;
  }

  function handleKeyboardDismiss() {
    if (Platform.OS != "web") {
      Keyboard.dismiss();
    }
  }

  // Helper function to check email validity
  const isValidEmail = (input) => {
    // Basic regex for email validation: checks structure like "name@domain.tld"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (value) => {
    const currentEmailIsLegal = isValidEmail(value);
    setemailAdd(value);
    setIsValid(currentEmailIsLegal);
  };

  const handlePasswordChange = (value) => {
    if (value === "") {
      setIsPasswordRequired(true);
    } else {
      setIsPasswordRequired(false);
    }
    setPassword(value);
    setIsPasswordSame(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value) => {
    if (value === "") {
      setIsConfirmPasswordRequired(true);
    } else {
      setIsConfirmPasswordRequired(false);
    }
    setConfirmPassword(value);
    console.log(value === password);
    setIsPasswordSame(value === password);
  };
  const handleSignupSubmit = async () => {
    if (confirmPassword !== password) {
      setIsPasswordSame(false);
      return;
    }
    if (password === "" || confirmPassword === "") {
      setIsPasswordSame(false);

      return;
    }
    if (userName === "") {
      return;
    }
    console.log("Submit");
    // await doCreateUserWithEmailAndPassword(emailAdd, password);
    const response = await doCreateUserWithEmailAndPassword(emailAdd, password)
      .catch((err) => {
        setFirebaseResponse(err.message);
      })
      .then((res) => {
        navigation.goBack();
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => handleKeyboardDismiss()}>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 50, fontWeight: "bold" }}>Sign Up</Text>
        </View>
        {/* User name Textinput */}
        <TextInput
          style={{
            marginTop: 20,
            backgroundColor: "transparent",
            fontSize: 20,
          }}
          label={"User Name"}
          placeholder="Enter your user name"
          mode="outlined"
          outlineColor={"black"}
          activeOutlineColor={"black"}
          outlineStyle={{ borderWidth: 1 }}
          onChangeText={(value) => setuserName(value)}
          left={
            <TextInput.Icon
              icon={() => <Icon name="user" size={24} />}
              disabled={true}
            />
          }
        />

        {/* Email Address Textinput */}
        <TextInput
          error={!isValid}
          style={{
            marginTop: 20,
            backgroundColor: "transparent",
            fontSize: 20,
          }}
          label={"Email Address"}
          placeholder="Enter your email address"
          mode="outlined"
          outlineColor={"black"}
          activeOutlineColor={"black"}
          outlineStyle={{ borderWidth: 1 }}
          onChangeText={(value) => handleEmailChange(value)}
          left={
            <TextInput.Icon
              icon={() => <Icon name="envelope" size={24} />}
              disabled={true}
            />
          }
        />
        {/* Ask user password */}
        <TextInput
          style={{
            marginTop: 20,
            backgroundColor: "transparent",
            fontSize: 20,
          }}
          error={isPasswordRequired}
          label={"Password"}
          placeholder="Enter your password"
          mode="outlined"
          secureTextEntry={true}
          outlineColor={"black"}
          activeOutlineColor={"black"}
          outlineStyle={{ borderWidth: 1 }}
          onChangeText={(value) => handlePasswordChange(value)}
          left={
            <TextInput.Icon
              icon={() => <Icon name="lock" size={24} />}
              disabled={true}
            />
          }
        />
        {/* Confirm password */}
        <TextInput
          style={{
            marginTop: 20,
            backgroundColor: "transparent",
            fontSize: 20,
          }}
          error={isConfirmPasswordRequired}
          label={"Confirm Password"}
          placeholder="Confirm your password"
          mode="outlined"
          outlineColor={"black"}
          secureTextEntry={true}
          activeOutlineColor={"black"}
          outlineStyle={{ borderWidth: 1 }}
          onChangeText={(value) => handleConfirmPasswordChange(value)}
          left={
            <TextInput.Icon
              icon={() => <Icon name="lock" size={24} />}
              disabled={true}
            />
          }
        />

        <HelperText
          visible={isConfirmPasswordRequired || !isPasswordSame}
          type="error"
        >
          {/* Password cannot be empty */}
          {isConfirmPasswordRequired
            ? "Password cannot be empty"
            : "Password not matching"}
        </HelperText>

        {/* Sign up button */}
        <Button
          mode="contained"
          style={{ marginTop: 30, height: 50, justifyContent: "center" }}
          contentStyle={{ height: "100%" }}
          labelStyle={{ fontSize: 30, lineHeight: 32 }}
          onPressOut={() => handleSignupSubmit()}
        >
          Signup
        </Button>
        <HelperText visible={firebaseResponse !== ""} type="error">
          {firebaseResponse}
        </HelperText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    marginTop: 50,
    marginHorizontal: 10,
  },
});

export default SignupScreen;
