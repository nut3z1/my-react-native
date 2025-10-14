export const getProfileImage = (file?: string | { url?: string }) => {
  if (file && typeof file === "string") {
    return file;
  }
  if (file && typeof file === "object") {
    return file?.url;
  }
  return require("@/assets/images/defaultAvatar.png");
};
