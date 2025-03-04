import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, RefreshControl, ScrollView } from "react-native";
import "../global.css"
import tw from 'twrnc';
import GlobalProvider from "@/context/GlobalPovider";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      console.log("Fonts Loaded:", fontsLoaded, "Font Error:", fontError);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GlobalProvider>
      <SafeAreaView style={tw`flex-1 bg-[#161622]`}>
        <StatusBar backgroundColor="#161622" style="light" />
        <View style={tw`flex-1`}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Stack
              screenOptions={{
                animation: "slide_from_right",
                gestureEnabled: true,
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
          </ScrollView>
        </View>
      </SafeAreaView>
    </GlobalProvider>
  );
}
