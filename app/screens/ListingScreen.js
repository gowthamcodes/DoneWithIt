import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, RefreshControl } from "react-native";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import listingApi from "../api/listings";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";

function ListingScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const getListingsApi = useApi(listingApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getListingsApi.request();
    setRefreshing(false);
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <View style={styles.errorContainer}>
            <AppText>Couldn't retrieve the listings.</AppText>
            <AppButton title="RETRY" onPress={getListingsApi.request} />
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={colors.primary}
              colors={[colors.white]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.images[0].url}
              thumbnailUrl={item.images[0].thumbnailUrl}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListingScreen;
