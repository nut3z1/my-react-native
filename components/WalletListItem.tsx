import { colors, radius } from "@/constants/theme";
import { WalletType } from "@/type";
import { verticalScale } from "@/utils/styling";
import { Router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const WalletListItem = ({
  item,
  index,
  router,
}: {
  item: WalletType;
  index: number;
  router: Router;
}) => {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.imageContainer}></View>
      </TouchableOpacity>
    </View>
  );
};

export default WalletListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
  },
  imageContainer: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderWidth: 1,
    borderColor: colors.neutral600,
    borderRadius: radius._12,
    borderCurve: "continuous",
  },
});
