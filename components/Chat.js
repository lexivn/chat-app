import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ db, route, navigation }) => {
  const { userID } = route.params;
  const { name } = route.params;
  const { backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  // Function to send message
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);    
  };

  // Function to change the background color of the messages
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
          },
          right: {
            backgroundColor: "green",
          },
        }}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default Chat;
