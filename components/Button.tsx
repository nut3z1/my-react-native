import { colors, radius } from "@/constants/theme";
import { CustomButtonProps } from "@/type";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Loading from "./Loading";

const Button = ({
  style,
  children,
  loading = false,
  onPress,
}: CustomButtonProps) => {
  if (loading) {
    return (
      <View
        style={[[styles.button, style, { backgroundColor: "transparent" }]]}
      >
        <Loading />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[[styles.button, style]]}
      onPress={onPress}
      disabled={loading}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: radius._17,
    backgroundColor: colors.primary,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
