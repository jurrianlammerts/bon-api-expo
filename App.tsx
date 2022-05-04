import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";

const process = {
  env: {
    authHeader: "344f1e6e60b59946a4429f6a4b72ea9cd1b13d64",
  },
};

export default function App() {
  const [recipeData, setRecipeData] = useState<{
    grocery_widget_url: string;
    delivery_partner_logos: string;
    show_widget_button: boolean;
  }>();

  // call the fetch function on mount with the id
  useEffect(() => {
    async function fetchData() {
      const response = await getRecipeData("11004", "Widget inApp Testing");

      console.log("response", response);
      setRecipeData(response);
    }
    fetchData();
  }, []);

  const _handlePressButtonAsync = async () => {
    const url = recipeData?.grocery_widget_url;
    // open the link in a in-app browser
    if (url) {
      await WebBrowser.openBrowserAsync(url);
    }
  };

  const getRecipeData = async (id: string, recipeName: string) => {
    // fetch the recipe data from the Bon API
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.authHeader}`,
      },
      body: JSON.stringify({
        recipe_id: id,
        recipe_name: recipeName,
      }),
    };
    return await fetch(
      "https://bon-api.com/api/v1/grocery/delivery/app/recipe-check/",
      requestOptions
    ).then((data) => data.json());
  };

  return (
    <View style={styles.container}>
      {recipeData?.show_widget_button && (
        <Image
          source={{
            uri: recipeData?.delivery_partner_logos,
            width: 120,
            height: 120,
          }}
        />
      )}
      <Button
        title={
          recipeData?.show_widget_button
            ? "Order recipe"
            : "No recipe available"
        }
        // disable button if the recipe link is not available
        disabled={!recipeData?.show_widget_button}
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
