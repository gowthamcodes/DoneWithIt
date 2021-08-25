import React from "react";
import { Button, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Screen from "./app/components/Screen";

const tweets = ({ navigation: { navigate } }) => (
  <Screen>
    <Text>Tweets</Text>
    <Button title="Go to" onPress={() => navigate("TweetsDetails")} />
  </Screen>
);
const tweetDetails = () => (
  <Screen>
    <Text>Tweet Details</Text>
  </Screen>
);

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tweets" component={tweets} />
    <Stack.Screen name="TweetsDetails" component={tweetDetails} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
