import { CLOUDINARY_API_URL, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/type";
import axios from "axios";

type FileObject = { uri?: string };

export const uploadFileToCloudinary = async (
  file: string | FileObject,
  folderName: string
): Promise<ResponseType> => {
  try {
    if (typeof file === "string") {
      return { success: true, data: file };
    }
    if (file && (file as FileObject)?.uri) {
      console.log("chay rui", file);
      const formData = new FormData();
      formData.append("file", {
        uri: (file as FileObject)?.uri,
        type: "image/jpeg",
        name: (file as FileObject)?.uri?.split("/").pop() || `file.jpg`,
      } as any);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);
      console.log("formData", formData);

      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response Upload", response);
      return { success: true, data: response.data.secure_url };
    }

    return { success: false };
  } catch (error: any) {
    console.log("got error uploading file", error);
    return { success: false, msg: error?.message || "Could not upload file" };
  }
};

export const getProfileImage = (file?: string | { uri?: string }) => {
  if (file && typeof file === "string") {
    return file;
  }
  if (file && typeof file === "object") {
    return file?.uri;
  }
  return require("@/assets/images/defaultAvatar.png");
};
