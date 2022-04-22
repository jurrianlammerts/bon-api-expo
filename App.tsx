import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";

export default function App() {
  const [data, setData] = useState<{
    id: string;
    link: string;
    isActive: boolean;
  }>();

  // call the fetch function on mount with the id: "123"
  useEffect(() => {
    getData("123").then((items) => {
      // save the json response in state
      setData(items);
    });
  }, []);

  const _handlePressButtonAsync = async () =>
    // open the link in a in-app browser
    await WebBrowser.openBrowserAsync("https://www.bon-api.com/");

  const getData = (id: string) =>
    // fetch the recipe data from the Bon API
    fetch(`https://bon-api.com/api/v1/recipes/${id}`).then((data) =>
      data.json()
    );

  return (
    <View style={styles.container}>
      <Button
        title="Order recipe"
        // disabled={!data.isActive} -> disable button if the recipe link is not available
        onPress={_handlePressButtonAsync}
        color="#259137"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
