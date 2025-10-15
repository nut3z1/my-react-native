import { firebase } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/type";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageServiecs";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    if (updatedData.image && updatedData?.image?.uri) {
      const imageUploadRes = await uploadFileToCloudinary(
        updatedData.image,
        "users"
      );
      if (imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes?.msg || "Failed to upload image",
        };
      }
      updatedData.image = imageUploadRes.data;
    }

    const userRef = doc(firebase, "users", uid);
    await updateDoc(userRef, updatedData);
    return { success: true, msg: "updated successfully" };
  } catch (error: any) {
    console.log("Error updating user:", error);
    return { success: false, msg: error?.message };
  }
};
