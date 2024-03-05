import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

const App = () => {
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

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      {/* Stack.Navitaor has a prop call route. */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
          // component={Chat}
        >
          {(props) => <Chat db={db} {...props} />}
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
