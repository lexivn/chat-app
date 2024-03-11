import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View, LogBox, Alert } from "react-native";
LogBox.ignoreLogs(["@firebus/auth: Auth (10.3.1)", ])
// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

// Import Firestore
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNetInfo } from "@react-native-community/netinfo";

const App = () => {
  const connectionStatus = useNetInfo();
  // We app's Firebase configuration
  const firebaseConfig = {
    // YOUR FIREBASE CONFIG INFO
    apiKey: "AIzaSyAVB9vVFRE2rJc65JkupTZCwOnu8FrYmRU",
    authDomain: "chat-app-db-649fc.firebaseapp.com",
    projectId: "chat-app-db-649fc",
    storageBucket: "chat-app-db-649fc.appspot.com",
    messagingSenderId: "608456422602",
    appId: "1:608456422602:web:ed220521f3ee236f8cb033",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app); // Review

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Check Network Connectivity status.
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection is Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      {/* Stack.Navitaor has a prop call route. */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
          // component={Chat}
        >
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
