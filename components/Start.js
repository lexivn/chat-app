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
} from "react-native";

const Start = ({ navigation }) => {
  const image = require("../img/BackgroundImage.png");
  const icon = require("../img/icon.png");

  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const tittleText = "Chat App";

  const handleColorSelection = (color) => {
    setSelectedColor(color);
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
          
          <Text style={styles.backGroundColorTxt}>Choose Background Color:</Text>

          <View style={styles.colorButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.colorButton,
                {
                  backgroundColor: "#090C08",
                  opacity: selectedColor === "#090C08" ? 1 : 0.7,
                },
              ]}
              onPress={() => handleColorSelection("#090C08")}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                {
                  backgroundColor: "#474056",
                  opacity: selectedColor === "#474056" ? 1 : 0.7,
                },
              ]}
              onPress={() => handleColorSelection("#474056")}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                {
                  backgroundColor: "#8A95A5",
                  opacity: selectedColor === "#8A95A5" ? 1 : 0.7,
                },
              ]}
              onPress={() => handleColorSelection("#8A95A5")}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                {
                  backgroundColor: "#B9C6AE",
                  opacity: selectedColor === "#B9C6AE" ? 1 : 0.7,
                },
              ]}
              onPress={() => handleColorSelection("#B9C6AE")}
            />
            </View>
            
            <Button
              title="Start Chatting"
              onPress={() => navigation.navigate("Chat", { name: name })}
              style={styles.buttonStartChatting}
              color="#757083"
            />            
          
        </View>
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
    width: '88%',
    height: '44%',
    justifyContent: 'center',
    backgroundColor: 'white',
    bottom: 0,
    alignItems: 'center',
    marginBottom: '6%',
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
    opacity: "50%",
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  colorButton: {    
      width: 40,
      height: 40,
      borderRadius: 20,
      margin: 10,    
  },
  buttonStartChatting: {
    backgroundColor: '#757083',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default Start;
