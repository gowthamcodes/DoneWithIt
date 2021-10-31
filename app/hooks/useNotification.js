import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import pushTokenApi from "../api/expoPushToken";
import navigation from "../navigation/rootNavigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const useNotification = (notificationListener) => {
  useEffect(() => {
    registerForPushNotifications();
    if (notificationListener)
      Notifications.addNotificationReceivedListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.getPermissionsAsync();
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      pushTokenApi.register(token.data);
    } catch (error) {
      console.log("Error getting push notification token ", error);
    }
  };
};

export default useNotification;
