import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(modals)/profileModal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}

export default RootLayout;

const styles = StyleSheet.create({});
