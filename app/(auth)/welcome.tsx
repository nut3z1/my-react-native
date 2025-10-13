import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* login */}
        <View>
          <TouchableOpacity style={styles.loginButton}>
            <Typo size={16} fontWeight="500">
              Sign in
            </Typo>
          </TouchableOpacity>

          <Image
            style={styles.welcomeImage}
            resizeMode="contain"
            source={require("@/assets/images/welcome.png")}
          />
        </View>
        {/* footer */}

        <View style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <Typo size={30} fontWeight={"800"}>
              Always take control{" "}
            </Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(100),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    width: "100%",
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
