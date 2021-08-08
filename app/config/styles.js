import { Platform } from "react-native";
import colors from "./colors";

export default {
  text: {
    color: colors.dark,
    fontFamily: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
