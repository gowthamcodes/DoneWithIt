import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeperator,
} from "../components/lists";

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/mosh.jpg"),
  },
];

function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    setMessages(messages.filter((x) => x.id !== message.id));
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subTitle={item.description}
      image={item.image}
      onPress={() => console.log("message selected", item)}
      renderRightActions={() => (
        <ListItemDeleteAction onPress={() => handleDelete(item)} />
      )}
    />
  );

  return (
    <>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
