import { firebaseApp } from "@/config/config-firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageToFirebase = async (files: File[]) => {
  try {
    const storage = getStorage(firebaseApp);
    const uploadedImagesRefs = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return storageRef;
      })
    );

    // get the urls of the images uploaded
    const urls = await Promise.all(
      uploadedImagesRefs.map(async (ref) => {
        const url = await getDownloadURL(ref);
        return url;
      })
    );

    return urls;
  } catch (error: any) {
    console.log("UPLOAD_IMAGE_ERROR", error);
  }
};
