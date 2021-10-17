import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { ListItem } from "../components/lists";
import AuthContext from "../auth/context";

function ListingDetailScreen({ route }) {
  const listing = route.params;
  const { user } = useContext(AuthContext);
  return (
    <View>
      <Image
        style={styles.image}
        tint={"light"}
        preview={{
          uri: listing.images[0].thumbnailUrl,
        }}
        uri={listing.images[0].url}
      />
      <View style={styles.detailContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>$ {listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title={user?.name}
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
});

export default ListingDetailScreen;
