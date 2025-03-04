import { useRouter } from "expo-router";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import images from "../constants/images"; // Ensure this file exists & exports images
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import tw from 'twrnc';

export default function Index() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={tw`bg-[#161622] flex-1`}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={tw`flex-1 justify-center items-center w-full h-full`}>
          {/* Logo */}
          <Image
            source={images.logo}
            style={tw`w-[130px] h-[80px]`}
            resizeMode="contain"
          />

          {/* Banner Image */}
          <Image
            source={images.cards}
            style={tw`w-full max-w-[380px] h-[300px]`}
            resizeMode="contain"
          />

          {/* Text with Highlight */}
          <View style={tw`relative mt-5`}>
            <Text style={tw`text-white font-bold text-2xl text-center`}>
              Discover Endless Possibilities With{" "}
              <Text style={tw`text-[#FFD700]`}>Aora</Text>
            </Text>
            <Image
              source={images.path}
              style={tw`absolute w-[136px] h-[15px] bottom-[-5px] right-[-20px]`}
              resizeMode="contain"
            />
          </View>

          {/* Subtitle */}
          <Text style={tw`text-sm text-white mt-4 text-center`}>
            Where creativity meets innovation: embark on a journey of limitless
          </Text>

          {/* Custom Button */}
          <CustomButton
            title="Continue With Email"
            handlePress={() => router.push("/sign-in")}
            containerStyle="w-full mt-5"
            isLoading={false}
          />
        </View>
      </ScrollView>
      {/* Status Bar */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}