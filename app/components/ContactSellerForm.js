import React from "react";
import { View, StyleSheet, Keyboard, Alert } from "react-native";
import * as Yup from "yup";
import messagesApi from "../api/messages";
import * as Notifications from "expo-notifications";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const validationSchema = Yup.object().shape({
  message: Yup.string().required("You can't send an empty message"),
});

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);
    if (!result.ok) {
      console.log("Error", result);
      Alert.alert("Error", "Could not send the message to seller");
    }
    resetForm();

    const content = {
      title: "Awesome",
      body: "Your message was sent to seller",
    };
    Notifications.scheduleNotificationAsync({ content, trigger: null });
  };
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{ message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <View style={styles.container}>
          <AppFormField name="message" placeholder="Message" />
          <SubmitButton title="Contact Seller" />
        </View>
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ContactSellerForm;
