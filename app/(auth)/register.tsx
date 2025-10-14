import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
const Register = () => {
  const router = useRouter();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }
    setIsLoading(true);

    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    setIsLoading(false);
    console.log(res);
    if (res?.success) {
      Alert.alert("Register", res.msg);
    }
    console.log(emailRef.current, passwordRef.current, nameRef.current);
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={800}>
            {`Let's`}
          </Typo>
          <Typo size={30} fontWeight={800}>
            Get started!
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create an account to track your expenses
          </Typo>

          <Input
            placeholder="Enter your name"
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
            onChangeText={(value) => (nameRef.current = value)}
          />

          <Input
            placeholder="Enter your email"
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
            onChangeText={(value) => (emailRef.current = value)}
          />

          <Input
            placeholder="Enter your password"
            secureTextEntry
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
            onChangeText={(value) => (passwordRef.current = value)}
          />

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo size={21} fontWeight="700" color={colors.black}>
              Sign Up
            </Typo>
          </Button>

          <View style={styles.footer}>
            <Typo size={16}>Already have an account?</Typo>
            <Pressable onPress={() => router.push("/(auth)/login")}>
              <Typo size={16} fontWeight={"700"} color={colors.primary}>
                Login
              </Typo>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: { flex: 1, gap: spacingY._30, paddingHorizontal: spacingY._20 },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
