import { ResponseType, WalletType } from "@/type";

import { firebase } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageServiecs";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletToSave = { ...walletData };

    if (walletData.image) {
      const imageUploadRes = await uploadFileToCloudinary(
        walletData.image,
        "wallets"
      );
      if (imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes?.msg || "Failed to upload image",
        };
      }
    }

    if (!walletData?.id) {
      walletData.amount = 0;
      walletData.totalIncome = 0;
      walletData.totalExpenses = 0;
      walletData.created = new Date();
    }

    const walletRef = walletData?.id
      ? doc(firebase, "wallets", walletData?.id)
      : doc(collection(firebase, "wallets"));

    await setDoc(walletRef, walletToSave, { merge: true });

    return { success: true, data: walletToSave };
  } catch (error: any) {
    console.log("Error updating user:", error);
    return { success: false, msg: error?.message };
  }
};
