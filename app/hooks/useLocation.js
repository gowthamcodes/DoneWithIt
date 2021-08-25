import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  try {
    const [location, setLocation] = useState(null);

    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    };

    useEffect(() => {
      getLocation();
    }, []);

    return location;
  } catch (error) {
    console.log(error);
  }
};
