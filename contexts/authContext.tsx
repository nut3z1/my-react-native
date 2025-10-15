import { auth, firebase } from "@/config/firebase";
import { AuthContextType, UserType } from "@/type";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          image: firebaseUser.photoURL,
        });
        updateUserData(firebaseUser.uid);
        router.replace("/(tabs)" as any);
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "Login successfully" };
    } catch (error: any) {
      let msg = error?.message || "Login failed";
      if (msg.includes("(auth/invalid-credential)")) msg = "Wrong credentials";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      return { success: false, msg: msg };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(firebase, "users", response.user.uid), {
        email,
        name,
        uid: response.user.uid,
      });

      return { success: true, message: "Registration successful" };
    } catch (error: any) {
      let msg = error?.message || "Registration failed";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already in use";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      return { success: false, msg: msg };
    }
  };

  const updateUserData = async (uid: string): Promise<void> => {
    try {
      const docRef = doc(firebase, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as UserType;
        const userData: UserType = {
          uid: data?.uid,
          name: data?.name || null,
          email: data?.email || null,
          image: data?.image || null,
        };
        setUser(userData);
      }
    } catch (error: any) {
      let msg = error?.message || "Failed to update user data";
      console.error("Failed to update user data:", msg);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
