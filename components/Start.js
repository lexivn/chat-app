import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const image = require("../img/BackgroundImage.png");
  const icon = require("../img/icon.png");

  const [name, setName] = useState("");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const tittleText = "Chat App";

  // const handleColorSelection = (color) => {
  //   setSelectedColor(color);
  // };

  // Initialize the Firebase authentication handle
  const auth = getAuth();

  // Allows the user to sign in anonymously
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          userID: result.user.uid,
          selectedColor: selectedColor,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.tittleText}>{tittleText}</Text>

        <View style={styles.whiteContainer}>
          <View style={styles.inputContainer}>
            <Image source={icon} style={styles.icon} />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#757083"
            />
          </View>

          <Text style={styles.backGroundColorTxt}>
            Choose Background Color:
          </Text>

          <View style={styles.colorButtonsContainer}>
            {colors.map((color) => {
              const colorButton = {
                ...styles.colorButton,
                backgroundColor: color,
              };
              return color == selectedColor ? (
                <TouchableOpacity
                  style={colorButton}
                  key={color}
                  onPress={() => setSelectedColor(color)}
                />
              ) : (
                <TouchableOpacity
                  style={colorButton}
                  key={color}
                  onPress={() => setSelectedColor(color)}
                />
              );
            })}
          </View>

          <TouchableOpacity
            accessible={true}
            accessibilityHint="Let’s you choose to start chatting"
            accessibilityLabel="Start Chatting"
            accessibilityRole="button"
            style={styles.buttonStartChatting}
            onPress={signInUser}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tittleText: {
    flex: 6,
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  whiteContainer: {
    width: "88%",
    height: "44%",
    justifyContent: "center",
    backgroundColor: "white",
    bottom: 0,
    alignItems: "center",
    marginBottom: "6%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#757083",
    padding: 18,
    marginLeft: 20,
    marginRight: 20,
    marginTop: -10,
    marginBottom: 10,
    opacity: 0.5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  backGroundColorTxt: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },
  colorButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  buttonStartChatting: {
    width: "88%",
    alignItems: "center",
    backgroundColor: "#757083",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default Start;
